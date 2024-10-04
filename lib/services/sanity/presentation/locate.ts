import { groq } from 'next-sanity';
import { DocumentLocationResolver } from 'sanity/presentation';
import { map } from 'rxjs';

export const locate: DocumentLocationResolver = (params, context) => {
  if (params.type === 'brevtype') {
    const documents = context.documentStore.listenQuery(groq`*[_id == $id][0]{_id, overskrift}`, params, {
      perspective: 'previewDrafts',
    });
    return documents.pipe(
      map((doc) => {
        if (!doc) {
          return null;
        }
        return {
          locations: [
            {
              title: doc.overskrift.nb,
              href: `/${doc._id}`,
            },
          ],
        };
      })
    );
  }

  return null;
};
