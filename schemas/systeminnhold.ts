import { defineField, defineType } from 'sanity';

export const Systeminnhold = defineType({
  name: 'systeminnhold',
  type: 'document',
  title: 'Systeminnhold',
  fields: [
    defineField({
      name: 'tittel',
      type: 'string',
      title: 'Tittel',
    }),
    defineField({
      name: 'systemNokkel',
      title: 'Systemnøkkel',
      type: 'string',
      description: 'Dette er et tekniskNavn som må representeres i kode. Legges inn av en utvikler.',
      validation: (Rule) => Rule.required(),
      readOnly: ({ currentUser }) => !currentUser?.roles.find((x) => x.name === 'developer'),
    }),
    defineField({
      name: 'overskrift',
      type: 'string',
      title: 'Overskrift',
      description: 'Overskrift på innholdet. Ikke obligatorisk',
    }),
  ],
});
