import { defineField, defineType } from 'sanity';

export const Brevtittel = defineType({
  name: 'brevtittel',
  type: 'document',
  title: 'Brevtittel',
  fields: [
    defineField({
      name: 'tittel',
      type: 'string',
      title: 'Tittel',
      description: 'Tittel på brevet.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tekniskNavn',
      type: 'string',
      title: 'Teknisk navn',
      description: 'Settes av utvikler, må samsvare med tekniskNavn i kode.',
      validation: (Rule) => Rule.required(),
      readOnly: ({ currentUser }) => !currentUser?.roles.find((x) => x.name === 'developer'),
    }),
  ],
});
