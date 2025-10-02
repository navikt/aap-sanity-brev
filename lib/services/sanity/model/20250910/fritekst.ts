import {defineField} from 'sanity'

export const fritekst = defineField({
  name: 'fritekst',
  type: 'object',
  fields: [
    {name: 'fritekst', type: 'string', initialValue: 'fritekst', readOnly: true, hidden: true},
  ],
})
