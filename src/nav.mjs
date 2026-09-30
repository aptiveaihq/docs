/**
 * Single source of truth for site navigation.
 *
 * Copied from the ClusterCode docs (clustercodehq/docs), where every nav
 * surface reads from this file — the Starlight sidebar (`astro.config.mjs`),
 * the desktop header nav, the mobile bottom-nav menu and the Ctrl+K command
 * palette. There it replaced four hand-maintained copies that drifted: pages
 * reached the sidebar and never the mobile menu or the search index, and the
 * palette kept linking a page long after it was renamed. Adding a page here
 * makes it appear on every surface that reads the tree at once. On this site
 * the sidebar reads it today; `pnpm check:nav` fails the build when a page on
 * disk is missing from it, or an entry here points at no page.
 *
 * Plain `.mjs` (not `.ts`) so `astro.config.mjs` can import it directly.
 *
 * Group fields:
 *   label     — sidebar heading, palette group heading, mobile menu entry
 *   short     — compact label for the header nav + pinned bottom bar
 *   icon      — key into NAV_ICONS
 *   href      — landing page for the group (header / mobile menu target)
 *   collapsed — sidebar starts collapsed
 *   primary   — appears in the desktop header nav
 *   pinned    — appears in the always-visible mobile bottom bar
 *   external  — links off-site; excluded from search
 *
 * Item fields: label, slug, desc (palette subtitle), badge (sidebar only).
 *
 * Per language (groups and items): `es: { label, short, desc }` — the Spanish
 * text for the same fields. See "Languages" below.
 */

const beta = { text: 'Beta', variant: 'default', class: 'beta-badge' };

export const nav = [
  {
    label: 'Getting Started',
    es: { label: 'Primeros pasos', short: 'Empezar' },
    short: 'Start',
    icon: 'book',
    href: '/getting-started/introduction/',
    collapsed: false,
    primary: true,
    pinned: true,
    items: [
      { label: 'Introduction', slug: 'getting-started/introduction', desc: 'What is AptiveAI', es: { label: 'Introducción', desc: 'Qué es AptiveAI' } },
      { label: 'Finding your way around', slug: 'getting-started/finding-your-way', desc: 'A tour of AptiveAI Agents: sidebar, hubs, Activity, phone', es: { label: 'Cómo orientarte', desc: 'Un recorrido por AptiveAI Agents: barra lateral, secciones, Actividad, teléfono' } },
    ],
  },
  {
    // The four nouns of AptiveAI Agents — agent, task, schedule, connector —
    // plus the skills an agent loads, the files a task carries, and the Inbox
    // where the product tells you what happened. Tasks leads because it is
    // where work starts and where every other concept shows up.
    label: 'Concepts',
    es: { label: 'Conceptos' },
    icon: 'puzzle',
    href: '/concepts/tasks/',
    collapsed: false,
    primary: true,
    pinned: true,
    items: [
      { label: 'Tasks', slug: 'concepts/tasks', desc: 'One piece of work, start to finish', es: { label: 'Tareas', desc: 'Un trabajo, de principio a fin' } },
      { label: 'Agents', slug: 'concepts/agents', desc: 'Configured AI workers on their own computers', es: { label: 'Agentes', desc: 'Trabajadores de IA configurados, cada uno en su propia computadora' } },
      { label: 'Schedules', slug: 'concepts/schedules', desc: 'Start a task on a recurring cadence', es: { label: 'Programaciones', desc: 'Inicia una tarea con una frecuencia recurrente' } },
      { label: 'Connectors', slug: 'concepts/connectors', desc: "Access to your company's systems", es: { label: 'Conectores', desc: 'Acceso a los sistemas de tu empresa' } },
      { label: 'Skills', slug: 'concepts/skills', desc: 'Reusable know-how an agent loads on demand', es: { label: 'Habilidades', desc: 'Conocimiento reutilizable que un agente carga cuando lo necesita' } },
      { label: 'Files', slug: 'concepts/files', desc: 'Attach, view and get back files; knowledge files', es: { label: 'Archivos', desc: 'Adjunta, ve y recupera archivos; archivos de conocimiento' } },
      { label: 'Inbox', slug: 'concepts/inbox', desc: 'Notifications and what arrives when', es: { label: 'Bandeja de entrada', desc: 'Notificaciones y qué llega cuándo' } },
    ],
  },
  {
    label: 'Reference',
    es: { label: 'Referencia' },
    icon: 'file',
    href: '/reference/settings/',
    collapsed: true,
    primary: true,
    pinned: true,
    items: [
      { label: 'Settings', slug: 'reference/settings', desc: 'Every section of Settings', es: { label: 'Configuración', desc: 'Cada sección de Configuración' } },
      { label: 'Personal sign-ins', slug: 'reference/settings/sign-ins', desc: 'Your own accounts an agent signs in to for you', es: { label: 'Inicios de sesión personales', desc: 'Tus propias cuentas, en las que un agente inicia sesión por ti' } },
      { label: 'Notifications', slug: 'reference/settings/notifications', desc: 'Which notifications reach you, and how', es: { label: 'Notificaciones', desc: 'Qué notificaciones te llegan y cómo' } },
    ],
  },
  {
    // Looking after the account rather than doing the work: the admin area,
    // people and roles, who sees what, and credit and billing. For an
    // enterprise's owners and admins; AptiveAI's own operator screens are
    // deliberately not documented here.
    label: 'Administration',
    es: { label: 'Administración', short: 'Admin' },
    short: 'Admin',
    icon: 'shield',
    href: '/administration/overview/',
    collapsed: true,
    primary: true,
    items: [
      { label: 'The admin area', slug: 'administration/overview', desc: 'Who can enter, and what each role sees', es: { label: 'El área de administración', desc: 'Quién puede entrar y qué ve cada rol' } },
      { label: 'Users and roles', slug: 'administration/users', desc: 'Invite people, change roles, remove someone', es: { label: 'Usuarios y roles', desc: 'Invita personas, cambia roles, quita a alguien' } },
      { label: 'Access and sharing', slug: 'administration/access', desc: 'Workspaces, and who sees which agent, task and schedule', es: { label: 'Acceso y uso compartido', desc: 'Espacios de trabajo, y quién ve cada agente, tarea y programación' } },
      { label: 'Usage and credit', slug: 'administration/usage', desc: 'AI credit, what spends it, and billing', es: { label: 'Uso y crédito', desc: 'Crédito de IA, qué lo consume y facturación' } },
    ],
  },
  {
    label: 'Links',
    es: { label: 'Enlaces' },
    icon: 'external',
    href: 'https://aptiveai.io',
    collapsed: true,
    external: true,
    items: [
      { label: 'Home', link: 'https://aptiveai.io', es: { label: 'Inicio' } },
      { label: 'AI Assessment', link: 'https://aptiveai.io/assessment', es: { label: 'Evalúa tu uso de IA' } },
      { label: 'Agents', link: 'https://console.aptiveai.io', es: { label: 'Agentes' } },
      { label: 'Admin', link: 'https://aptiveai.io/admin', es: { label: 'Administración' } },
    ],
  },
];

/** Inner markup for each nav icon, drawn inside a 24×24 stroked `<svg>`. */
export const NAV_ICONS = {
  book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>',
  puzzle:
    '<path d="M19.439 7.85c-.049.322.059.648.289.878l1.568 1.568c.47.47.706 1.087.706 1.704s-.235 1.233-.706 1.704l-1.611 1.611a.98.98 0 0 1-.837.276c-.47-.07-.802-.48-.968-.925a2.501 2.501 0 1 0-3.214 3.214c.446.166.855.497.925.968a.979.979 0 0 1-.276.837l-1.61 1.61a2.404 2.404 0 0 1-1.705.707 2.402 2.402 0 0 1-1.704-.706l-1.568-1.568a1.026 1.026 0 0 0-.877-.29c-.493.074-.84.504-1.02.968a2.5 2.5 0 1 1-3.237-3.237c.464-.18.894-.527.967-1.02a1.026 1.026 0 0 0-.289-.877l-1.568-1.568A2.402 2.402 0 0 1 1.998 12c0-.617.236-1.234.706-1.704L4.23 8.77c.24-.24.581-.353.917-.303.515.077.877.528 1.073 1.01a2.5 2.5 0 1 0 3.259-3.259c-.482-.196-.933-.558-1.01-1.073-.05-.336.062-.676.303-.917l1.525-1.525A2.402 2.402 0 0 1 12 1.998c.617 0 1.234.236 1.704.706l1.568 1.568c.23.23.556.338.877.29.493-.074.84-.504 1.02-.968a2.5 2.5 0 1 1 3.237 3.237c-.464.18-.894.527-.967 1.02Z"/>',
  zap: '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
  map: '<polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/>',
  terminal: '<polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/>',
  server:
    '<rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/>',
  // lucide `file-text` — the trailing short polyline was previously only in the
  // sidebar's CSS mask copy; folded in here so every surface draws the same art.
  file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>',
  external:
    '<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>',
  // lucide `shield`
  shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
  // lucide `sparkles` — the "Ask me anything" link into the console (src/ask.mjs)
  sparkles:
    '<path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/><path d="M20 3v4"/><path d="M22 5h-4"/><path d="M4 17v2"/><path d="M5 18H3"/>',
  search: '<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>',
  // lucide `languages` and `check` — the phone drawer's language row (MobileDrawer)
  languages: '<path d="m5 8 6 6"/><path d="m4 14 6-6 2-3"/><path d="M2 5h12"/><path d="M7 2h1"/><path d="m22 22-5-10-5 10"/><path d="M14 18h6"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
};

// ── Languages ─────────────────────────────────────────────────────────────
// English is the root locale (URLs unchanged); every other language lives
// under /<code>/ with the same slugs, and each group and item carries its
// labels for that language under the same key (`es: { label, short, desc }`).
// `pnpm check:nav` fails when a label is missing or a page exists in one
// language and not the other. Keep in step with `locales` in astro.config.mjs.

/** Non-root locales, as used in URLs and in the `es: {…}` keys above. */
export const LOCALES = ['es'];

/** The locale a URL path belongs to: 'es' for /es/…, otherwise 'en'. */
export function localeFromPath(pathname) {
  const first = (pathname ?? '').replace(/^\/+/, '').split('/')[0];
  return LOCALES.includes(first) ? first : 'en';
}

/** A path without its locale prefix: `/es/concepts/tasks/` → `/concepts/tasks/`. */
export function stripLocale(pathname) {
  const locale = localeFromPath(pathname);
  return locale === 'en' ? pathname ?? '' : (pathname ?? '').replace(new RegExp(`^/${locale}(?=/|$)`), '') || '/';
}

/** An internal path in a locale: `/concepts/tasks/` → `/es/concepts/tasks/`. Off-site links pass through. */
export function localizePath(href, locale = 'en') {
  if (!href || locale === 'en' || /^https?:\/\//.test(href)) return href;
  return `/${locale}${href.startsWith('/') ? href : `/${href}`}`;
}

/** A group's or item's field in a locale, falling back to English. */
const tr = (entry, field, locale) => (locale !== 'en' && entry[locale]?.[field]) || entry[field];

/** `concepts/tasks` → `/concepts/tasks/` (or `/es/concepts/tasks/`) */
export const hrefFor = (item, locale = 'en') => item.link ?? localizePath(`/${item.slug}/`, locale);

/** Starlight's sidebar: label/slug/link/badge, plus per-language `translations`. */
export function toStarlightSidebar() {
  const translations = (entry) =>
    Object.fromEntries(LOCALES.filter((l) => entry[l]?.label).map((l) => [l, entry[l].label]));
  return nav.map((group) => ({
    label: group.label,
    translations: translations(group),
    collapsed: group.collapsed,
    items: group.items.map((item) =>
      item.link
        ? { label: item.label, link: item.link, translations: translations(item) }
        : {
            label: item.label,
            slug: item.slug,
            translations: translations(item),
            ...(item.badge ? { badge: item.badge } : {}),
          },
    ),
  }));
}

/** Flat, searchable index for the command palette. Off-site groups excluded. */
export function paletteItems(locale = 'en') {
  return nav
    .filter((group) => !group.external)
    .flatMap((group) =>
      group.items.map((item) => ({
        title: tr(item, 'label', locale),
        desc: tr(item, 'desc', locale) ?? '',
        href: hrefFor(item, locale),
        group: tr(group, 'label', locale),
        icon: group.icon,
      })),
    );
}

// `key` is always the canonical (English) group label, so callers can compare
// it against activeGroupLabel() whatever language the visible text is in.

/** Groups for the desktop header nav. */
export function primaryNav(locale = 'en') {
  return nav
    .filter((group) => group.primary)
    // Full labels on the desktop header (room to spare); the mobile pinned bar
    // keeps using `short` via pinnedGroups().
    .map((group) => ({ key: group.label, label: tr(group, 'label', locale), href: localizePath(group.href, locale) }));
}

/** Groups for the mobile bottom-nav menu panel. */
export function menuGroups(locale = 'en') {
  return nav.map((group) => ({
    key: group.label,
    label: tr(group, 'label', locale),
    href: localizePath(group.href, locale),
    icon: group.icon,
    external: Boolean(group.external),
  }));
}

/**
 * Nested tree for the mobile menu sheet — groups with their pages inside.
 *
 * Carries `badge` and `current` through from the tree so the sheet never
 * re-derives them: a Beta chip appears in the mobile menu because the item has
 * a badge in `nav`, and the current page highlights because its slug matches,
 * both decided here rather than restated in the component.
 *
 * @param pathname current URL path, used to mark the active item + open group
 *                 (and, through its /es/ prefix, the language of the labels)
 */
export function menuTree(pathname) {
  const locale = localeFromPath(pathname);
  const activeSlug = stripLocale(pathname).replace(/^\/+|\/+$/g, '');
  return nav.map((group) => {
    const items = group.items.map((item) => ({
      label: tr(item, 'label', locale),
      href: hrefFor(item, locale),
      badge: item.badge?.text ?? null,
      external: Boolean(item.link),
      current: item.slug != null && item.slug === activeSlug,
    }));
    const active = items.some((item) => item.current);
    return {
      key: group.label,
      label: tr(group, 'label', locale),
      icon: group.icon,
      external: Boolean(group.external),
      items,
      active,
      // The section you're currently in starts expanded; the rest start closed,
      // so the sheet opens short and scannable rather than 58 rows long.
      open: active,
    };
  });
}

/** Groups pinned to the always-visible mobile bottom bar. */
export function pinnedGroups(locale = 'en') {
  return nav
    .filter((group) => group.pinned)
    .map((group) => ({
      key: group.label,
      label: tr(group, 'short', locale) ?? tr(group, 'label', locale),
      href: localizePath(group.href, locale),
      icon: group.icon,
    }));
}

/**
 * Which group owns the current URL (in any language).
 *
 * Matches on the page's actual group membership rather than a path prefix,
 * because a group can hold pages from another section (in the ClusterCode docs
 * a `guides/` page lives under a `concepts/` group).
 */
export function activeGroupLabel(pathname) {
  const slug = stripLocale(pathname).replace(/^\/+|\/+$/g, '');
  for (const group of nav) {
    if (group.items.some((item) => item.slug === slug)) return group.label;
  }
  // No path-prefix fallback on purpose. A group can hold pages from another
  // section, so a prefix scan returns that group for ANY unlisted page under
  // the same prefix, which is worse than no highlight at all. `pnpm check:nav` guarantees every page is in a group,
  // so this only returns null for non-content routes (/, /404, /api/docs.json)
  // and for a brand-new page that has not been registered yet.
  return null;
}
