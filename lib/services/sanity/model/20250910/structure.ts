import { ListItemBuilder, StructureBuilder, structureTool } from 'sanity/structure';
import { paragrafOptions } from './paragrafOptions';
import { ParagraphIcon } from '@navikt/aksel-icons';

const byggParagrafBlokker = (structureBuilder: StructureBuilder): ListItemBuilder[] => {
  return paragrafOptions.map((opt) =>
    structureBuilder
      .listItem()
      .icon(ParagraphIcon)
      .title(opt.title)
      .id(opt.value)
      .child(
        structureBuilder
          .documentList()
          .title(opt.title)
          .filter(`_type == 'delmal' && paragraf == "${opt.value}"`)
          .menuItems(structureBuilder.documentTypeList('delmal').getMenuItems())
      )
  );
};

// Faktagrunnlag gjenbrukes
const gammelBrevmodell = ['brevtype', 'content', 'innhold', 'localestring', 'tekstbolk'];

export const studioStructure = () =>
  structureTool({
    structure: (s) =>
      s
        .list()
        .title('Innhold')
        .items([
          s.divider().title('Delmaler pr paragraf'),
          ...byggParagrafBlokker(s),
          s.divider().title('Andre tekster'),
          // @ts-ignore (TODO fix denne)
          ...s.documentTypeListItems().filter((item) => !gammelBrevmodell.includes(item.getId())),
          s.divider().title('Gammel modell'),
          // @ts-ignore (TODO fix denne)
          ...s.documentTypeListItems().filter((item) => gammelBrevmodell.includes(item.getId())),
        ]),
  });
