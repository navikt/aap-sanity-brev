import { defineField } from 'sanity';
import { delmal } from './delmal';
import { DelmalRefPreview } from 'lib/services/sanity/model/20250910/components/DelmalRefPreview';

export const delmalRef = defineField({
  name: 'delmalRef',
  title: 'DelmalRef',
  type: 'object',
  preview: {
    select: {
      title: 'delmal.beskrivelse',
      content: 'delmal.teksteditor',
    },
  },
  components: {
    // @ts-expect-error
    preview: DelmalRefPreview,
  },
  fields: [
    defineField({
      title: 'delmal',
      name: 'delmal',
      type: 'reference',
      to: [delmal],
    }),
    defineField({
      title: 'Obligatorisk',
      name: 'obligatorisk',
      type: 'boolean',
      initialValue: false,
    }),
  ],
});
