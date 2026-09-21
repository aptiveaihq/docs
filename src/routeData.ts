import { defineRouteMiddleware } from '@astrojs/starlight/route-data';

/**
 * Environment-aware, brand-first `<title>` tag for browser tab identification —
 * the same middleware the ClusterCode docs use (clustercodehq/docs
 * src/routeData.ts):
 *
 * - Production build (`astro build`): NO env prefix — the home page is plainly
 *   `AptiveAI Docs`, inner pages `AptiveAI Docs · Page`.
 * - Dev server (`astro dev`): a `[LOCAL Docs] ` prefix so a docs tab is easy
 *   to tell apart from prod tabs. Dev-only (`import.meta.env.DEV`).
 *
 * Starlight's default title is page-first (`Page | Site`, via
 * `titleDelimiter`); this middleware rewrites the generated `<title>` head
 * entry to the brand-first order. It only touches the `title` tag — per-page
 * `og:*`/`twitter:*` overrides are left untouched.
 */
const envPrefix = import.meta.env.DEV ? '[LOCAL Docs] ' : '';
const BRAND = 'AptiveAI Docs';

export const onRequest = defineRouteMiddleware((context) => {
  const { starlightRoute } = context.locals;
  const isHome = context.url.pathname === '/' || context.url.pathname === '';

  const pageTitle = isHome ? BRAND : `${BRAND} · ${starlightRoute.entry.data.title}`;

  const titleTag = starlightRoute.head.find((tag) => tag.tag === 'title');
  if (!titleTag) return;

  // A page that sets its own `head: - tag: title` in frontmatter is making a
  // deliberate (usually SEO) choice — respect it instead of silently
  // clobbering it. The dev env prefix is still applied so local tabs stay
  // identifiable.
  const hasFrontmatterTitle = (starlightRoute.entry.data.head ?? []).some(
    (tag) => tag.tag === 'title',
  );
  titleTag.content = hasFrontmatterTitle
    ? `${envPrefix}${titleTag.content ?? ''}`
    : `${envPrefix}${pageTitle}`;
});
