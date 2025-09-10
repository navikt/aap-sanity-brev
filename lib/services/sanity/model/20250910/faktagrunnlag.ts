import {defineField, defineType} from 'sanity'

export const faktagrunnlag = defineType({
  title: 'Faktagrunnlag',
  name: 'faktagrunnlag',
  type: 'document',
  fields: [
    defineField({
      title: 'Teknisk navn',
      name: 'tekniskNavn',
      type: 'string',
    })
  ]
})