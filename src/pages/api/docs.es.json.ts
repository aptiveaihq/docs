import type { APIRoute } from 'astro';
import { docsResponse } from '../../lib/docs-api';

// Spanish pages, same shape and slugs as /api/docs.json. See src/lib/docs-api.ts.
export const GET: APIRoute = () => docsResponse('es');
