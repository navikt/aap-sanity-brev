type Props = {
  title?: string;
  content?: unknown;
  renderDefault: (props: Record<string, unknown>) => unknown;
};

const refTypes = {
  fritekst: { label: 'Fritekst' },
  faktagrunnlag: { label: 'Faktagrunnlag' },
  valgRef: { label: 'Valg' },
  betingetTekstRef: { label: 'Betinget tekst' },
  kategorisertTekstRef: { label: 'Kategorisert tekst' },
  span: { label: 'Tekst - Ikke redigerbar' },
} as const;

const refTypeValues = new Set(Object.keys(refTypes));

const findReferenceTypes = (value: unknown, types = new Set<string>()): Set<string> => {
  if (!value || typeof value !== 'object') {
    return types;
  }

  if (Array.isArray(value)) {
    value.forEach((item) => findReferenceTypes(item, types));
    return types;
  }

  const record = value as Record<string, unknown>;
  if (typeof record._type === 'string' && refTypeValues.has(record._type)) {
    types.add(record._type);
  }

  Object.values(record).forEach((item) => findReferenceTypes(item, types));
  return types;
};

export const DelmalRefPreview = (props: Props) => {
  const { content, renderDefault } = props;
  const types = [...findReferenceTypes(content)];
  const subtitle =
    types.length > 0
      ? `${types.map((type) => refTypes[type as keyof typeof refTypes].label).join(', ')}`
      : 'Tom delmal';

  return renderDefault({
    ...props,
    subtitle,
  });
};
