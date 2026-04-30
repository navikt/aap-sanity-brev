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
      description: 'Vises kun i Sanity.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: 'Teknisk navn',
      name: 'tekniskNavn',
      type: 'string',
      validation: (Rule) => Rule.required(),
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
              type: 'internationalizedArrayString',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              title: 'Teknisk navn',
              name: 'tekniskNavn',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
          ],
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
  ],
});
