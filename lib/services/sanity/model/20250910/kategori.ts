import {defineField, defineType} from 'sanity'

export const kategori = defineType({
  title: 'Kategori',
  name: 'kategori',
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
  ],
})
