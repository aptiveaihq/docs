import { docsLoader, i18nLoader } from '@astrojs/starlight/loaders';
import { docsSchema, i18nSchema } from '@astrojs/starlight/schema';
import { defineCollection, z } from 'astro:content';

// The docs chrome's own strings (header, phone menu, bottom bar, search
// palette, sidebar) sit beside Starlight's built-in UI strings, one file per
// language: src/content/i18n/<lang>.json. Components read them with
// Astro.locals.t('aptive.…'). Every key is required, so a language that
// misses one fails the build instead of quietly showing English.
const chromeStrings = z.object({
  'aptive.nav.primary': z.string(),
  'aptive.nav.breadcrumb': z.string(),
  'aptive.nav.assessment': z.string(),
  'aptive.header.home': z.string(),
  'aptive.header.search': z.string(),
  'aptive.header.theme': z.string(),
  'aptive.header.login': z.string(),
  'aptive.header.demo': z.string(),
  'aptive.header.demoShort': z.string(),
  'aptive.drawer.close': z.string(),
  'aptive.drawer.nav': z.string(),
  'aptive.bottom.nav': z.string(),
  'aptive.bottom.menu': z.string(),
  'aptive.palette.placeholder': z.string(),
  'aptive.palette.empty': z.string(),
  'aptive.palette.navigate': z.string(),
  'aptive.palette.open': z.string(),
  'aptive.palette.close': z.string(),
  'aptive.sidebar.collapse': z.string(),
  'aptive.sidebar.expand': z.string(),
});

export const collections = {
  docs: defineCollection({ loader: docsLoader(), schema: docsSchema() }),
  i18n: defineCollection({
    loader: i18nLoader(),
    schema: i18nSchema({ extend: chromeStrings.partial() }),
  }),
};
