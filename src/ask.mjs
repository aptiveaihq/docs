/**
 * "Ask me anything" — the one place the docs' link into the console lives.
 *
 * Every surface that offers it (the header nav, the phone menu, the landing
 * page's card) builds its href and label from here, so the console URL is
 * never restated in a component or a page.
 *
 * The link opens the console's create door with `?ask=docs-help-<lang>`, a
 * NAMED question the console keeps in its own registry and sends on arrival.
 * The URL never carries the text: an outside page may only trigger a question
 * the console already knows, which is what makes sending on arrival safe (a
 * free-text `?prompt=` from outside the console is only ever prefilled). The
 * question's text lives ONLY in the console, in
 * `apps/console/src/client/navigation/ask-presets.ts`; nothing here restates it.
 *
 * The console sends on arrival only when the click carries this site's
 * origin as its Referer, which is why the links are `rel="noopener"` and
 * never `noreferrer` (AskLink.astro); a link from anywhere else is prefilled.
 *
 * The preset's "Search the docs" is what makes the task load the console's
 * built-in `docs` skill, which reads this site through `/api/docs.json`.
 *
 * Plain `.mjs` so both Astro components and Node scripts can import it.
 */

/**
 * The console's origin, without a trailing slash. `PUBLIC_CONSOLE_URL`
 * overrides it for a local stack (`PUBLIC_CONSOLE_URL=http://localhost:3100
 * pnpm dev`); a build without it links to production. `import.meta.env` is
 * absent when a Node script imports this file, hence the guard.
 */
export const CONSOLE_URL = (
  (import.meta.env && import.meta.env.PUBLIC_CONSOLE_URL) ||
  'https://console.aptiveai.io'
).replace(/\/+$/, '');

/** Per page language: the link's label and the landing page card's copy. */
export const ASK = {
  en: {
    label: 'Ask me anything',
    cardTitle: 'Ask me anything',
    cardBody:
      'Not sure where to start? Ask an AptiveAI agent. It opens AptiveAI Agents and asks for you: the agent searches these docs and answers with links to the pages.',
    cardCta: 'Open Agents',
  },
  es: {
    label: 'Pregúntame lo que quieras',
    cardTitle: 'Pregúntame lo que quieras',
    cardBody:
      '¿No sabes por dónde empezar? Pregúntale a un agente de AptiveAI. Abre AptiveAI Agents y pregunta por ti: el agente busca en esta documentación y te responde con enlaces a las páginas.',
    cardCta: 'Abrir Agentes',
  },
};

/** The strings for a page language; anything unknown falls back to English. */
export function askFor(locale) {
  return ASK[locale] ?? ASK.en;
}

/** The console's named docs question for a page language (`docs-help-en` / `-es`). */
export function askPreset(locale) {
  return `docs-help-${ASK[locale] ? locale : 'en'}`;
}

/** The console's create door, sending the named docs question on arrival. */
export function askHref(locale) {
  return `${CONSOLE_URL}/?ask=${askPreset(locale)}`;
}
