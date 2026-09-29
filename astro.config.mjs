import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { toStarlightSidebar } from './src/nav.mjs';

// Same mechanism as the ClusterCode docs site (clustercodehq/docs): an Astro
// Starlight site built by GitHub Actions and served from GitHub Pages behind a
// custom domain (public/CNAME → docs.aptiveai.io).
export default defineConfig({
  site: 'https://docs.aptiveai.io',
  integrations: [
    starlight({
      title: 'AptiveAI Docs',
      // Rewrites the generated <title> to the brand-first "AptiveAI Docs ·
      // Page" order (home page: just "AptiveAI Docs"), matching the
      // ClusterCode docs. See src/routeData.ts.
      routeMiddleware: './src/routeData.ts',
      favicon: '/favicon.ico',
      logo: {
        dark: './src/assets/logo-dark.png',
        light: './src/assets/logo-light.png',
        replacesTitle: true,
      },
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/orgs/aptiveaihq' },
      ],
      // The chrome is the ClusterCode docs' own (clustercodehq/docs): the same
      // component overrides, copied, with only brand, URLs and nouns changed.
      components: {
        Header: './src/components/Header.astro',
        ThemeSelect: './src/components/ThemeSelect.astro',
        PageFrame: './src/components/PageFrame.astro',
        Sidebar: './src/components/Sidebar.astro',
        MobileMenuFooter: './src/components/MobileMenuFooter.astro',
        MobileMenuToggle: './src/components/MobileMenuToggle.astro',
      },
      // nav-icons.generated.css is emitted from NAV_ICONS by
      // scripts/generate-nav-icons.mjs and loads after custom.css.
      customCss: ['./src/styles/custom.css', './src/styles/nav-icons.generated.css'],
      // Nav lives in src/nav.mjs, as in the ClusterCode docs. Add pages
      // there, not here — `pnpm check:nav` fails the build otherwise.
      sidebar: toStarlightSidebar(),
    }),
  ],
});
