import {defineField, defineType} from 'sanity'

export const gruppe = defineType({
  title: 'Gruppering',
  name: 'gruppe',
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
