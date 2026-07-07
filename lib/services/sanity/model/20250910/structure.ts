import { ListItemBuilder, StructureBuilder, structureTool } from 'sanity/structure';

const today = new Date();
// Dagens dato vil alltid vi siste versjon av api
const apiVersion = today.toISOString().slice(0, 10);

type DistribusjonstypeTelling = {
  automatiske: number;
  besluttes: number;
  mangler: number;
};

const grupperMaler = (
  structureBuilder: StructureBuilder,
  distribusjonstypeTelling: DistribusjonstypeTelling
): ListItemBuilder[] => {
  const malMenyvalg = structureBuilder.documentTypeList('mal').getMenuItems();
  const automatiskTittel = `Sendes automatisk (${distribusjonstypeTelling.automatiske})`;
  const besluttesTittel = `Må besluttes (${distribusjonstypeTelling.besluttes})`;
  const manglerTittel = `MANGLER (${distribusjonstypeTelling.mangler})`;

  return [
    structureBuilder
      .listItem()
      .title(automatiskTittel)
      .id('mal-automatiske')
      .child(
        structureBuilder
          .documentList()
          .apiVersion(apiVersion)
          .title(automatiskTittel)
          .filter(`_type == 'mal' && kanSendesAutomatisk == true`)
          .menuItems(malMenyvalg)
      ),
    structureBuilder
      .listItem()
      .title(besluttesTittel)
      .id('mal-besluttes')
      .child(
        structureBuilder
          .documentList()
          .apiVersion(apiVersion)
          .title(besluttesTittel)
          .filter(`_type == 'mal' && kanSendesAutomatisk == false`)
          .menuItems(malMenyvalg)
      ),
    structureBuilder
      .listItem()
      .title(manglerTittel)
      .id('mal-mangler')
      .child(
        structureBuilder
          .documentList()
          .apiVersion(apiVersion)
          .title(manglerTittel)
          .filter(`_type == 'mal' && !defined(kanSendesAutomatisk)`)
          .menuItems(malMenyvalg)
      ),
  ];
};

// Faktagrunnlag gjenbrukes
const gammelBrevmodell = ['brevtype', 'content', 'innhold', 'localestring', 'tekstbolk'];

export const studioStructure = () =>
  structureTool({
    structure: async (s, context) => {
      const client = context.getClient({ apiVersion });
      const distribusjonstypeTelling = await client.fetch<DistribusjonstypeTelling>(
        `{
          "automatiske": count(*[_type == "mal" && kanSendesAutomatisk == true]),
          "besluttes": count(*[_type == "mal" && kanSendesAutomatisk == false]),
          "mangler": count(*[_type == "mal" && !defined(kanSendesAutomatisk)])
        }`
      );

      return s
        .list()
        .title('Innhold')
        .items([
          s.divider().title('Hovedmaler'),
          ...grupperMaler(s, distribusjonstypeTelling),
          s.divider().title('Brevbyggerinnhold'),
          ...s
            .documentTypeListItems()
            // @ts-expect-error
            .filter((item) => !gammelBrevmodell.includes(item.getId()) && item.getId() !== 'mal'),
          s.divider().title('Gammel modell'),
          // @ts-expect-error
          ...s.documentTypeListItems().filter((item) => gammelBrevmodell.includes(item.getId())),
        ]);
    },
  });
