import {defineField, defineType} from 'sanity'

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
      type: 'internationalizedArrayBlockEditor',
      validation: (rule) =>
        rule.custom(async (i18nBlocks, context) => {
          const faktagrunnlagPerSpråk = (
            i18nBlocks as {
              _type: string
              _key: string
              value: {_type: string; children: {_type: string; _ref: string}[]}[]
            }[]
          ).map((i18nBlock) => {
            const faktagrunnlag = i18nBlock.value
              .filter((block) => block._type === 'block')
              .flatMap((block) => block.children)
              .filter((child) => child._type === 'faktagrunnlag')
              .map((child) => child._ref)
            return {
              lang: i18nBlock._key,
              faktagrunnlag,
            }
          })

          const client = context.getClient({apiVersion: '2025-09-09'})
          const fraDatoId = await client.fetch(
            `*[_type=="faktagrunnlag" && tekniskNavn == 'PERIODE_FRA_DATO'][0]._id`,
          )

          const mangler = faktagrunnlagPerSpråk.filter(({faktagrunnlag}) => {
            return faktagrunnlag.filter((faktagrunnlag) => faktagrunnlag === fraDatoId).length === 0
          })

          if (mangler.length > 0) {
            const message = `Mangler faktagrunnlag PERIODE_FRA_DATO for språk ${mangler.map(({lang}) => lang).join(', ')}`
            return {
              message,
            }
          }
          return true
        }),
    }),
  ],
})
