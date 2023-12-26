import { DocumentLocationResolver, DocumentLocationsState } from 'sanity/presentation';
import { map, Observable } from 'rxjs';

export const locate: DocumentLocationResolver = (params, context) => {
  if (params.type === 'standardtekst' || params.type === 'systeminnhold') {
    const doc$ = context.documentStore.listenQuery(
      `*[_id==$id || references($id)]{_id, _type, brevtittel}`,
      params,
      {}
    ) as Observable<
      | {
          _id: string;
          _type: string;
          brevtittel: string;
        }[]
      | null
    >;
    return doc$.pipe(
      map((docs) => {
        if (!docs) {
          console.log('docs is null');
          return {
            message: 'Unable to map document type to locations',
            tone: 'critical',
          } satisfies DocumentLocationsState;
        }
        const brevmalLocations = docs
          .filter(({ _type }) => _type === 'brev')
          .map(({ _id, brevtittel }) => {
            return {
              title: `${brevtittel}`,
              href: `/sanity/${_id}`,
            };
          });
        return {
          locations: [...brevmalLocations],
        } satisfies DocumentLocationsState;
      })
    );
  }
  return null;
};
