import { readdir, readFile } from 'node:fs/promises';
import { join, relative } from 'node:path';

/**
 * The page list the console's `read_docs` tool reads
 * (aptiveaihq/core apps/console/src/server/agent/docs-reader.ts):
 * `{ pages: [{ slug, title, description, content }] }`.
 *
 * `/api/docs.json` is the English site, exactly as before the Spanish
 * translation landed: the same slugs, with no `es/` pages mixed in.
 * `/api/docs.es.json` is the same shape for the Spanish pages, with the SAME
 * slugs (no `es/` prefix), so a reader can switch language by switching URL.
 */

/** Top-level directories under src/content/docs that hold a translation. */
const LOCALE_DIRS = ['es'];

async function collectMdx(dir: string, top = true): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true });
  const files: string[] = [];
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (top && LOCALE_DIRS.includes(entry.name)) continue;
      files.push(...(await collectMdx(full, false)));
    } else if (entry.name.endsWith('.mdx') || entry.name.endsWith('.md')) {
      files.push(full);
    }
  }
  return files;
}

function parseFrontmatter(raw: string): { title: string; description: string; body: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return { title: '', description: '', body: raw };
  const fm = match[1];
  const body = match[2];
  const title = fm.match(/^title:\s*(.+)$/m)?.[1]?.trim().replace(/^['"]|['"]$/g, '') ?? '';
  const description = fm.match(/^description:\s*(.+)$/m)?.[1]?.trim().replace(/^['"]|['"]$/g, '') ?? '';
  return { title, description, body };
}

/** `locale` undefined = English (the root); otherwise a directory in LOCALE_DIRS. */
export async function docsResponse(locale?: string): Promise<Response> {
  const root = join(process.cwd(), 'src', 'content', 'docs');
  const docsDir = locale ? join(root, locale) : root;
  try {
    const files = await collectMdx(docsDir);

    const pages = await Promise.all(
      files.map(async (filePath) => {
        const raw = await readFile(filePath, 'utf-8');
        const rel = relative(docsDir, filePath).replace(/\\/g, '/');
        const slug = rel.replace(/\.(mdx|md)$/, '').replace(/\/index$/, '');
        const { title, description, body } = parseFrontmatter(raw);
        return { slug, title, description, content: body.trim() };
      }),
    );

    pages.sort((a, b) => a.slug.localeCompare(b.slug));

    return new Response(JSON.stringify({ pages }, null, 2), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch {
    return new Response(JSON.stringify({ pages: [] }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
