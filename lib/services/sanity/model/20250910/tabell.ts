import { defineField, defineType } from 'sanity';

export const tabell = defineType({
  title: 'Tabell',
  name: 'tabell',
  type: 'document',
  fields: [
    defineField({
      title: 'Visningsnavn',
      name: 'visningsnavn',
      type: 'string',
    }),
    defineField({
      title: 'Teknisk navn',
      name: 'tekniskNavn',
      type: 'string',
    }),
    defineField({
      title: 'Kolonner',
      name: 'kolonner',
      type: 'array',
      of: [
        defineField({
          title: 'Kolonne',
          name: 'kolonne',
          type: 'object',
          fields: [
            defineField({
              title: 'Overskrift',
              name: 'overskrift',
              type: 'string',
            }),
            defineField({
              title: 'Teknisk navn',
              name: 'tekniskNavn',
              type: 'string',
            }),
          ],
        }),
      ],
    }),
  ],
});
