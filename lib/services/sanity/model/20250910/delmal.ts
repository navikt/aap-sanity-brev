import { defineField, defineType } from 'sanity';
import { paragrafOptions } from './paragrafOptions';

export const delmal = defineType({
  title: 'Delmal',
  name: 'delmal',
  type: 'document',
  preview: {
    select: {
      title: 'overskrift.0.value',
      paragraf: 'paragraf',
    },
    prepare(selection) {
      const { title, paragraf } = selection;
      return {
        title: title,
        subtitle: `§ ${paragraf}`,
      };
    },
  },
  fields: [
    defineField({
      title: 'Overskrift',
      name: 'overskrift',
      type: 'internationalizedArrayString',
    }),
    defineField({
      name: 'paragraf',
      title: 'Paragraf',
      type: 'string',
      options: {
        list: paragrafOptions,
      },
    }),
    defineField({
      title: 'Editor',
      name: 'teksteditor',
      type: 'internationalizedArrayTeksteditor',
    }),
    // defineField({
    //   title: 'Editor',
    //   name: 'teksteditor',
    //   type: 'array',
    //   of: [
    //     valgRef,
    //     periodetekstRef,
    //     betingetTekstRef,
    //     {
    //       type: 'block',
    //       of: [
    //         {
    //           type: 'reference',
    //           title: 'Referanse til faktagrunnlag',
    //           name: 'faktagrunnlag',
    //           to: [{type: 'faktagrunnlag'}],
    //         },
    //       ],
    //     },
    //   ],
    // }),
  ],
});
