import {defineField, defineType} from 'sanity'

export const valgGruppe = defineType({
  title: 'Gruppering av valg',
  name: 'valgGruppe',
  type: 'document',
  fields: [
    defineField({
      title: 'Gruppenavn',
      name: 'gruppenavn',
      type: 'string',
    }),
    defineField({
      title: 'Teknisk navn',
      name: 'tekniskNavn',
      type: 'string',
    }),
  ],
})
