import { defineField, defineType } from 'sanity';

export const tekst = defineType({
  title: 'Tekst',
  name: 'tekst',
  type: 'document',
  fields: [
    defineField({
      title: 'Beskrivelse',
      name: 'beskrivelse',
      description: 'Brukes i brevbygger',
      type: 'string',
    }),
    defineField({
      title: 'Editor',
      name: 'teksteditor',
      type: 'internationalizedArrayBlockEditor',
      validation: (rule) =>
        rule.custom<{value?: any; _type: string; _key: string}[]>((oversettelser) => {
          if (oversettelser.length === 0) {
            return {
              message: 'Må ha minst en oversettelse',
            }
          }

          if (!oversettelser.every((oversettelse) => oversettelse.value)) {
            return {
              message: 'Alle valgte oversettelser må ha innhold',
            }
          }
          return true
        }),
    }),
  ],
});
