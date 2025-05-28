# AAP Brev

Frontendapplikasjon for ny redigering av brevmaler i AAP

## Bygge og kjøre app lokalt

### Github package registry

Vi bruker Github sitt package registry for npm pakker, siden flere av Nav sine pakker kun blir publisert her.

For å kunne kjøre `yarn install` lokalt må du logge inn mot Github package registry.
Legg til følgende i .bashrc eller .zshrc lokalt på din maskin:
I .bashrc eller .zshrc:

`export NPM_AUTH_TOKEN=github_pat`

Hvor github_pat er din personal access token laget på github (settings -> developer settings).
Husk`read:packages`-rettighet og enable SSO når du oppdaterer/lager PAT.

### .env.local-fil

I tillegg må du kopiere `.env-template` til `.env.local` for å kunne kjøre lokalt.

### Kjøre lokalt

```
yarn dev
```

---

## Publisere pakker til GitHub package registry

Dette repoet inneholder tre pakker:
- @navikt/aap-breveditor
- @navikt/aap-breveditor-css
- @navikt/aap-sanity-schema-types

Etter man har gjort endringer kan man publisere de på følgende måte:
- Kjør `yarn changeset` og følg anvisninger. Det vil lages en midlertidig fil `.changeset/[vilkårlig navn].md` med endringene.
- Kjør deretter `yarn changeset version`. Endringene legges nå i `CHANGELOG.md` for de pakkene som oppdateres.
- Commit og push endringene. Det er en egen GitHub action som vil publisere schema typene ved commit og push til main.


## Sanity schema

Vi eksporterer typer fra Sanity schema og publiserer disse slik at andre applikasjoner som bruker Sanity dataene kan
importere disse.

Ved endring av schema i Sanity må følgende gjøres for at det skal bygges og publiseres nye typer

```
yarn generateSchemaTypes
```

Deretter kan ny versjon av pakken @navikt/aap-sanity-schema-types publiseres

## Kode generert av GitHub Copilot

Dette repoet bruker GitHub Copilot til å generere kode.

# Henvendelser

---

Spørsmål knyttet til koden eller prosjektet kan stilles som issues her på GitHub

# For NAV-ansatte

---

Interne henvendelser kan sendes via Slack i kanalen #po-aap-team-aap.
