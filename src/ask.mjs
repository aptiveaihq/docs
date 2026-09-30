/**
 * "Ask me anything" — the one place the docs' link into the console lives.
 *
 * Every surface that offers it (the header nav, the phone menu, the landing
 * page's card) builds its href and label from here, so the console URL and
 * the questions are never restated in a component or a page.
 *
 * The link opens the console's create door with `?prompt=` only. The console
 * reads that parameter and PREFILLS the composer (apps/console
 * `client/navigation/ask-message.ts`); it sends on arrival only when `send=1`
 * is also present, which this link must never add — the reader sees the
 * question, can change it, and presses Send themselves.
 *
 * "Search the docs" in the question is what makes the task load the console's
 * built-in `docs` skill, which reads this site through `/api/docs.json`.
 *
 * Plain `.mjs` so both Astro components and Node scripts can import it.
 */

/** The console's origin, without a trailing slash. */
export const CONSOLE_URL = 'https://console.aptiveai.io';

/** Per page language: the link's label and the question it prefills. */
export const ASK = {
  en: {
    label: 'Ask me anything',
    question:
      'What can you help me with in the AptiveAI documentation? Search the docs and list the topics you can help with.',
    cardTitle: 'Ask me anything',
    cardBody:
      'Not sure where to start? Ask an AptiveAI agent. It opens the console with a question ready, searches these docs, and answers with links to the pages.',
    cardCta: 'Open the console',
  },
  es: {
    label: 'Pregúntame lo que quieras',
    question:
      '¿En qué me puedes ayudar con la documentación de AptiveAI? Busca en la documentación y enumera los temas en los que me puedes ayudar.',
    cardTitle: 'Pregúntame lo que quieras',
    cardBody:
      '¿No sabes por dónde empezar? Pregúntale a un agente de AptiveAI. Abre la consola con una pregunta lista, busca en esta documentación y te responde con enlaces a las páginas.',
    cardCta: 'Abrir la consola',
  },
};

/** The strings for a page language; anything unknown falls back to English. */
export function askFor(locale) {
  return ASK[locale] ?? ASK.en;
}

/** The console's create door with the question prefilled — never `send=1`. */
export function askHref(locale) {
  return `${CONSOLE_URL}/?prompt=${encodeURIComponent(askFor(locale).question)}`;
}
