import {defineField, defineType} from 'sanity'
import {faktagrunnlag} from './faktagrunnlag'

export const periodetekst = defineType({
  title: 'Periodetekst',
  name: 'periodetekst',
  type: 'document',
  fields: [
    defineField({
      title: 'Beskrivelse',
      name: 'beskrivelse',
      type: 'string',
    }),
    defineField({
      title: 'Editor',
      name: 'teksteditor',
      type: 'array',
      validation: (rule) =>
        rule.custom(async (blocks, context) => {
          const faktagrunnlag = (
            blocks as {_type: string; children: {_type: string; _ref: string}[]}[]
          )
            .filter((block) => block._type === 'block')
            .flatMap((block) => block.children)
            .filter((child) => child._type === 'faktagrunnlag')

          const client = context.getClient({apiVersion: '2025-09-09'})
          const tekniskeNavn = await Promise.all(
            faktagrunnlag.map((faktagrunnlag) =>
              client.fetch(`*[_id=='${faktagrunnlag._ref}'].tekniskNavn`),
            ),
          )

          const fraDato = tekniskeNavn
            .flat()
            .find((tekniskNavn) => tekniskNavn === 'PERIODE_FRA_DATO')

          return fraDato !== undefined
            ? true
            : {
                message: 'Mangler faktagrunnlag PERIODE_FRA_DATO',
              }
        }),
      of: [
        {
          type: 'block',
          of: [
            {
              type: 'reference',
              title: 'Referanse til faktagrunnlag',
              name: 'faktagrunnlag',
              to: [faktagrunnlag],
            },
          ],
        },
      ],
    }),
  ],
})
