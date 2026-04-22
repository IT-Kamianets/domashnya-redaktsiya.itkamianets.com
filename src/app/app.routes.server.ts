import { RenderMode, ServerRoute } from '@angular/ssr';
import { dishSlugs } from './feature/menu/menu.data';

export const serverRoutes: ServerRoute[] = [
	{
		path: 'dish/:slug',
		renderMode: RenderMode.Prerender,
		async getPrerenderParams() {
			return dishSlugs.map((slug) => ({ slug }));
		},
	},
	{
		path: '**',
		renderMode: RenderMode.Prerender,
	},
];
