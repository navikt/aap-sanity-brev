import { ListItemBuilder, StructureBuilder, structureTool } from 'sanity/structure';
import { paragrafOptions } from './paragrafOptions';
import { ParagraphIcon } from '@navikt/aksel-icons';

const today = new Date();
// Dagens dato vil alltid vi siste versjon av api
const apiVersion = today.toISOString().slice(0, 10);

const byggParagrafBlokker = (structureBuilder: StructureBuilder): ListItemBuilder[] => {
  return paragrafOptions.map((opt) =>
    structureBuilder
      .listItem()
      .icon(ParagraphIcon)
      .title(opt.title)
      .id(opt.value)
      .child(
        structureBuilder
          .documentList()
          .apiVersion(apiVersion)
          .title(opt.title)
          .filter(`_type == 'delmal' && paragraf == "${opt.value}"`)
          .menuItems(structureBuilder.documentTypeList('delmal').getMenuItems())
      )
  );
};

// Faktagrunnlag gjenbrukes
const gammelBrevmodell = ['brevtype', 'content', 'innhold', 'localestring', 'tekstbolk'];

export const studioStructure = () =>
  structureTool({
    structure: (s) =>
      s
        .list()
        .title('Innhold')
        .items([
          s.divider().title('Delmaler pr paragraf'),
          ...byggParagrafBlokker(s),
          s.divider().title('Andre tekster'),
          // @ts-ignore (TODO fix denne)
          ...s.documentTypeListItems().filter((item) => !gammelBrevmodell.includes(item.getId())),
          s.divider().title('Gammel modell'),
          // @ts-ignore (TODO fix denne)
          ...s.documentTypeListItems().filter((item) => gammelBrevmodell.includes(item.getId())),
        ]),
  });
