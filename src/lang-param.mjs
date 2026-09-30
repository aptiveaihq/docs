/**
 * `?lang=es` / `?lang=en` in a docs URL picks the language.
 *
 * The console and the portal link here as `https://docs.aptiveai.io/es/<slug>/?lang=es`
 * when they are in Spanish, and a reader may also hand-edit `?lang=` onto any
 * page. The site is static, so this runs as an inline script in <head> —
 * before anything paints — and uses `location.replace` so Back does not
 * bounce through the parameter:
 *
 *   /concepts/tasks/?lang=es      → /es/concepts/tasks/
 *   /es/concepts/tasks/?lang=en   → /concepts/tasks/
 *   /es/concepts/tasks/?lang=es   → /es/concepts/tasks/   (only strips `lang`)
 *
 * The hash and every other parameter are kept; `lang` itself is dropped. A
 * value other than `es` or `en` is ignored and the URL is left alone. There
 * is no stored preference: Starlight's language picker keeps none, and this
 * does not add one.
 *
 * Kept as a string of plain ES5 so it can be inlined as-is; wired in through
 * Starlight's `head` option in astro.config.mjs. Keep the locale list in step
 * with `locales` there.
 */
export const LANG_PARAM_SCRIPT = `(function () {
  try {
    var url = new URL(window.location.href);
    var lang = url.searchParams.get('lang');
    if (lang === null) return;
    lang = lang.toLowerCase();
    if (lang !== 'es' && lang !== 'en') return;
    var path = url.pathname;
    var isEs = /^\\/es(\\/|$)/.test(path);
    if (lang === 'es' && !isEs) path = '/es' + path;
    else if (lang === 'en' && isEs) path = path.replace(/^\\/es(?=\\/|$)/, '') || '/';
    url.searchParams.delete('lang');
    url.pathname = path;
    window.location.replace(url.href);
  } catch (e) {}
})();`;
