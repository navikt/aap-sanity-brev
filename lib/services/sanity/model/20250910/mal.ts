import {defineField, defineType} from 'sanity'
import {delmalRef} from './delmalRef'

export const mal = defineType({
  title: 'Mal',
  name: 'mal',
  type: 'document',
  fields: [
    defineField({
      title: 'Overskrift',
      name: 'overskrift',
      type: 'string',
    }),
    defineField({
      title: 'Delmaler',
      name: 'delmaler',
      type: 'array',
      of: [delmalRef]
    })
  ],
})
