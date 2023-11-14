import {defineType} from '@sanity/types'
import {defineField} from 'sanity'

const brevmal = defineType({
  name: 'brev',
  type: 'document',
  title: 'Brevmal',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Name',
    }),
    defineField({
      title: 'Content',
      name: 'content',
      type: 'array',
      of: [{type: 'block'}],
    }),
  ],
})

export default brevmal
