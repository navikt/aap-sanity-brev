import { defineField, defineType } from 'sanity';

export const Faktagrunnlag = defineType({
  title: 'Faktagrunnlag',
  name: 'faktagrunnlag',
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
      title: 'Type',
      name: 'datatype',
      type: 'string',
      description: 'Eks boolean, string etc',
      validation: (Rule) => Rule.required(),
      readOnly: ({ currentUser }) => !currentUser?.roles.find((x) => x.name === 'developer'),
      options: {
        list: ['string', 'boolean', 'number'],
      },
    }),
    defineField({
      title: 'Teknisk navn',
      name: 'tekniskNavn',
      type: 'string',
      description: 'Dette er et tekniskNavn som må representeres i kode. Legges inn av en utvikler.',
      validation: (Rule) => Rule.required(),
      readOnly: ({ currentUser }) => !currentUser?.roles.find((x) => x.name === 'developer'),
    }),
  ],
});
