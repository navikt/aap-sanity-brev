// @ts-check
import console from 'node:console';
import { readFile, readdir, rename, writeFile } from 'node:fs/promises';
import { basename, join, resolve } from 'node:path';
import process from 'node:process';
import { pathToFileURL } from 'node:url';
import { parseArgs } from 'node:util';
import ts from 'typescript';

export const usage = `Generate a Mermaid class diagram directly from the Sanity schema source.

Usage: yarn schema:model [options]

  --source <path>  Schema directory. Default: lib/services/sanity/model/20250910
  --root <name>    Root exported schema. Default: mal
  --output <path>  Output file. Default: lib/services/sanity/model/model.mermaid
  --help           Show this help

The output file is replaced on each run.`;

/** @param {ts.ObjectLiteralExpression} object @param {string} name */
function property(object, name) {
  return object.properties.find(
    (item) => ts.isPropertyAssignment(item) && item.name.getText().replaceAll(/['"]/g, '') === name
  );
}

/** @param {ts.Expression | undefined} expression */
function objectValue(expression) {
  if (!expression) return undefined;
  if (ts.isObjectLiteralExpression(expression)) return expression;
  if (
    ts.isCallExpression(expression) &&
    expression.arguments[0] &&
    ts.isObjectLiteralExpression(expression.arguments[0])
  ) {
    return expression.arguments[0];
  }
}

/** @param {ts.ObjectLiteralExpression} object @param {string} name */
function expressionValue(object, name) {
  const item = property(object, name);
  return item && ts.isPropertyAssignment(item) ? item.initializer : undefined;
}

/** @param {ts.ObjectLiteralExpression} object @param {string} name */
function stringValue(object, name) {
  const value = expressionValue(object, name);
  return value && (ts.isStringLiteral(value) || ts.isNoSubstitutionTemplateLiteral(value)) ? value.text : undefined;
}

/** @param {ts.ObjectLiteralExpression} object @param {string} name */
function arrayValue(object, name) {
  const value = expressionValue(object, name);
  return value && ts.isArrayLiteralExpression(value) ? value.elements : [];
}

/** @param {string} value */
function id(value) {
  return value.replaceAll(/[^a-zA-Z0-9_]/g, '_');
}

/** @param {string} value */
function mermaidText(value) {
  return value.replaceAll('"', '#quot;').replaceAll(/[\r\n\t]+/g, ' ');
}

/**
 * @param {string} directory
 * @returns {Promise<string[]>}
 */
async function sourceFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  /** @type {string[][]} */
  const nested = await Promise.all(
    entries.map(
      /** @returns {Promise<string[]> | string[]} */ (entry) => {
        const path = join(directory, entry.name);
        if (entry.isDirectory()) return sourceFiles(path);
        return /\.(?:ts|tsx)$/.test(entry.name) ? [path] : [];
      }
    )
  );
  return nested.flat();
}

/**
 * @param {string} sourceDirectory
 * @param {string} rootName
 */
export async function renderModel(sourceDirectory, rootName = 'mal') {
  const files = await sourceFiles(sourceDirectory);
  // faktagrunnlag er delt mellom gammel og ny modell, derfor må det litt spesialhåndtering til
  const factSchema = resolve(sourceDirectory, '../faktagrunnlag/faktagrunnlagSchema.ts');
  try {
    await readFile(factSchema, 'utf8');
    files.push(factSchema);
  } catch {
    // Faktagrunnlag is outside the versioned directory and is optional for other schema roots.
  }

  /** @type {Map<string, {object: ts.ObjectLiteralExpression, source: string}>} */
  const definitions = new Map();
  for (const file of files) {
    const contents = await readFile(file, 'utf8');
    const source = ts.createSourceFile(file, contents, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
    for (const statement of source.statements) {
      if (!ts.isVariableStatement(statement)) continue;
      for (const declaration of statement.declarationList.declarations) {
        if (!ts.isIdentifier(declaration.name)) continue;
        const object = objectValue(declaration.initializer);
        if (object) definitions.set(declaration.name.text, { object, source: file });
      }
    }
  }
  if (!definitions.has(rootName)) {
    throw new Error(`Schema export "${rootName}" was not found below ${sourceDirectory}.`);
  }
  const definitionsBySchemaName = new Map(
    [...definitions.values()].flatMap((definition) => {
      const name = stringValue(definition.object, 'name');
      return name ? [[name, definition]] : [];
    })
  );

  /** @type {Map<string, {name: string, title: string, kind: string, fields: string[]}>} */
  const nodes = new Map();
  /** @type {{from: string, to: string, many: boolean, label: string, containment: boolean, dependency: boolean}[]} */
  const edges = [];
  const edgeKeys = new Set();
  const processed = new Set();

  /**
   * @param {string} from
   * @param {string} to
   * @param {boolean} many
   * @param {string} label
   * @param {boolean} containment
   * @param {boolean} [dependency]
   */
  function addEdge(from, to, many, label, containment, dependency = false) {
    const key = [from, to, many, label, containment, dependency].join('\0');
    if (edgeKeys.has(key)) return;
    edgeKeys.add(key);
    edges.push({ from, to, many, label, containment, dependency });
  }

  /** @param {ts.Expression} expression */
  function definitionFor(expression) {
    return ts.isIdentifier(expression) ? definitions.get(expression.text) : undefined;
  }

  /** @param {ts.Expression} expression */
  function schemaObject(expression) {
    return objectValue(expression) ?? definitionFor(expression)?.object;
  }

  /** @param {ts.ObjectLiteralExpression} field */
  function targets(field) {
    const targetValue = expressionValue(field, 'to');
    const targetExpressions = targetValue
      ? ts.isArrayLiteralExpression(targetValue)
        ? targetValue.elements
        : [targetValue]
      : [];
    return targetExpressions.flatMap((item) => {
      const definition = definitionFor(item);
      if (!definition) return [];
      return [stringValue(definition.object, 'name') ?? (ts.isIdentifier(item) ? item.text : '')];
    });
  }

  /**
   * @param {string} owner
   * @param {ts.ObjectLiteralExpression} field
   * @param {boolean} many
   * @param {string} [fieldName]
   */
  function processField(owner, field, many = false, fieldName) {
    const name = fieldName ?? stringValue(field, 'name') ?? 'item';
    const type = stringValue(field, 'type') ?? 'object';
    const ownerNode = nodes.get(owner);
    if (!ownerNode) return;

    if (type === 'reference') {
      for (const target of targets(field)) {
        ownerNode.fields.push(`+ref${many ? '[]' : ''} ${name}`);
        addEdge(owner, target, many, name, false);
        processDefinition(target);
      }
      return;
    }

    if (type === 'array') {
      for (const item of arrayValue(field, 'of')) {
        const itemObject = schemaObject(item);
        if (itemObject) processArrayItem(owner, name, itemObject);
      }
      return;
    }

    if (type === 'block') {
      for (const item of arrayValue(field, 'of')) {
        const itemObject = schemaObject(item);
        if (!itemObject || stringValue(itemObject, 'type') !== 'reference') continue;
        for (const target of targets(itemObject)) {
          addEdge(owner, target, true, 'inline reference', false, true);
          processDefinition(target);
        }
      }
      return;
    }

    const internationalized = /^internationalizedArray(.+)$/.exec(type);
    if (internationalized) {
      const customName = internationalized[1][0].toLowerCase() + internationalized[1].slice(1);
      if (definitions.has(customName)) {
        addEdge(owner, customName, false, name, true);
        processDefinition(customName);
      } else {
        ownerNode.fields.push(`+i18n${internationalized[1]} ${name}`);
      }
      return;
    }

    ownerNode.fields.push(`+${type} ${name}`);
  }

  /** @param {string} owner @param {string} fieldName @param {ts.ObjectLiteralExpression} item */
  function processArrayItem(owner, fieldName, item) {
    const type = stringValue(item, 'type') ?? 'object';
    if (type === 'reference') {
      processField(owner, item, true, stringValue(item, 'name') ?? fieldName);
      return;
    }
    if (type === 'block') {
      processField(owner, item, true);
      return;
    }
    const itemName = stringValue(item, 'name');
    if (itemName && type === 'object') {
      addEdge(owner, itemName, true, fieldName, true);
      processObject(itemName, item, 'object');
      return;
    }
    const definition = [...definitions.entries()].find(([, value]) => value.object === item);
    if (definition) {
      const target = stringValue(item, 'name') ?? definition[0];
      addEdge(owner, target, true, fieldName, true);
      processDefinition(definition[0]);
    }
  }

  /** @param {string} exportName */
  function processDefinition(exportName) {
    const definition = definitions.get(exportName) ?? definitionsBySchemaName.get(exportName);
    if (!definition) return;
    const schemaName = stringValue(definition.object, 'name') ?? exportName;
    const type = stringValue(definition.object, 'type') ?? 'object';
    processObject(
      schemaName,
      definition.object,
      type === 'document' ? 'document' : type === 'array' ? 'array field' : type
    );
  }

  /** @param {string} name @param {ts.ObjectLiteralExpression} object @param {string} kind */
  function processObject(name, object, kind) {
    if (processed.has(name)) return;
    processed.add(name);
    nodes.set(name, {
      name,
      title: stringValue(object, 'title') ?? name,
      kind,
      fields: [],
    });
    if (kind === 'array field') {
      for (const item of arrayValue(object, 'of')) {
        const itemObject = schemaObject(item);
        if (itemObject) processArrayItem(name, name, itemObject);
      }
      return;
    }
    for (const fieldExpression of arrayValue(object, 'fields')) {
      const field = schemaObject(fieldExpression);
      if (field) processField(name, field);
    }
  }

  processDefinition(rootName);
  const sortedNodes = [...nodes.values()].sort((a, b) => {
    if (a.name === rootName) return -1;
    if (b.name === rootName) return 1;
    return a.name.localeCompare(b.name);
  });
  const lines = [
    `%% Generated from ${basename(sourceDirectory)}. Run "yarn schema:model" to update.`,
    'classDiagram',
    '    direction TB',
    '',
  ];
  for (const node of sortedNodes) {
    const title = node.title === node.name ? node.name : `${node.name} · ${node.title}`;
    lines.push(`    class ${id(node.name)}["${mermaidText(title)}"] {`, `        <<${node.kind}>>`);
    lines.push(...node.fields.map((field) => `        ${mermaidText(field)}`), '    }', '');
  }
  for (const edge of edges.sort((a, b) =>
    [a.from, a.label, a.to].join('\0').localeCompare([b.from, b.label, b.to].join('\0'))
  )) {
    const connector = edge.dependency ? '..>' : edge.containment ? '*--' : '-->';
    const cardinality = edge.dependency ? '' : ` "1" ${connector} "${edge.many ? '*' : '1'}"`;
    lines.push(
      edge.dependency
        ? `    ${id(edge.from)} ${connector} ${id(edge.to)} : ${mermaidText(edge.label)}`
        : `    ${id(edge.from)}${cardinality} ${id(edge.to)} : ${mermaidText(edge.label)}`
    );
  }
  return lines.join('\n').trimEnd() + '\n';
}

/** @param {string[]} args */
export async function main(args) {
  const { values } = parseArgs({
    args,
    options: {
      source: { type: 'string', default: 'lib/services/sanity/model/20250910' },
      root: { type: 'string', default: 'mal' },
      output: { type: 'string', default: 'lib/services/sanity/model/model.mermaid' },
      help: { type: 'boolean', default: false },
    },
    allowPositionals: false,
  });
  if (values.help) {
    console.log(usage);
    return;
  }
  const source = resolve(values.source ?? 'lib/services/sanity/model/20250910');
  const output = resolve(values.output ?? 'lib/services/sanity/model/model.mermaid');
  const model = await renderModel(source, values.root ?? 'mal');
  const temporary = `${output}.tmp-${process.pid}`;
  await writeFile(temporary, model, 'utf8');
  await rename(temporary, output);
  console.log(`Schema model written to ${output}.`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  main(process.argv.slice(2)).catch((error) => {
    console.error(`Schema model failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    process.exitCode = 1;
  });
}
