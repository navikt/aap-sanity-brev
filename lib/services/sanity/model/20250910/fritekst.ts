import {defineType} from 'sanity'

export const fritekst = defineType({
  name: 'fritekst',
  type: 'object',
  fields: [
    { name: 'fritekst', type: 'string', initialValue: 'fritekst', readOnly: true, hidden: true },
  ],
})
