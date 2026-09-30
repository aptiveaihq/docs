import type { APIRoute } from 'astro';
import { docsResponse } from '../../lib/docs-api';

// English pages only — the endpoint the console's read_docs tool fetches.
// Spanish is /api/docs.es.json (same shape, same slugs). See src/lib/docs-api.ts.
export const GET: APIRoute = () => docsResponse();
