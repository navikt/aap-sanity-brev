import { defineMigration, unset } from 'sanity/migrate';

export default defineMigration({
  title: 'slett_paragraf_felt',
  documentTypes: ['delmal'],

  migrate: {
    node(_, path) {
      // this will be called for every node in every document of the matching type
      // any patch returned will be applied to the document
      // you can also return mutations that touches other documents

      if (path[path.length - 1] === 'paragraf') {
        return unset();
      }
    },
  },
});
