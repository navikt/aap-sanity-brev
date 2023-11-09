import {AuthConfig, defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'

// const auth: AuthConfig = {
//   redirectOnSingle: true,
//   providers: () => [
//     {
//       name: 'saml',
//       title: 'NAV SSO',
//       url: 'https://api.sanity.io/v2021-10-01/auth/saml/login/f3270b37',
//       logo: '/static/navlogo.svg',
//     },
//   ],
//   loginMethod: 'dual',
// };

export default defineConfig({
  name: 'default',
  title: 'aap-kelvin-brev',

  projectId: '948n95rd',
  dataset: 'production',

  plugins: [deskTool(), visionTool()],

  // auth: auth,
  schema: {
    types: schemaTypes,
  },
})
