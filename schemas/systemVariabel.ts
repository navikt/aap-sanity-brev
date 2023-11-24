import { defineField, defineType } from 'sanity';

export const SystemVariabel = defineType({
  title: 'Systemvariabel',
  name: 'systemVariabel',
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
      description: 'Dette er et tekniskNavn som må representeres i kode. Legges inn av en utvikler.',
      validation: (Rule) => Rule.required(),
      readOnly: ({ currentUser }) => !currentUser?.roles.find((x) => x.name === 'developer'),
    }),
  ],
});
