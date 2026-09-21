import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

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
      // Header mirrors the AptiveAI portal's marketing nav (see
      // src/components/Header.astro), the same way the ClusterCode docs
      // header mirrors clustercode.io.
      components: {
        Header: './src/components/Header.astro',
      },
      customCss: ['./src/styles/custom.css'],
      sidebar: [
        {
          label: 'Getting Started',
          items: [{ label: 'Introduction', slug: 'getting-started/introduction' }],
        },
      ],
    }),
  ],
});
