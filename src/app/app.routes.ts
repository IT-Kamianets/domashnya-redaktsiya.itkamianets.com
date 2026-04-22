import { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: '',
		loadComponent: () =>
			import('./pages/landing/landing.component').then((m) => m.LandingComponent),
	},
	{
		path: 'rooms',
		loadComponent: () => import('./pages/rooms/rooms.component').then((m) => m.RoomsComponent),
	},
	{
		path: 'navigation',
		loadComponent: () =>
			import('./pages/navigation/navigation.component').then((m) => m.NavigationComponent),
	},
	{
		path: 'gallery',
		loadComponent: () =>
			import('./pages/gallery/gallery.component').then((m) => m.GalleryComponent),
	},
	{
		path: 'dish/:slug',
		loadComponent: () => import('./pages/dish/dish.component').then((m) => m.DishComponent),
	},
	{
		path: 'sales',
		loadComponent: () => import('./pages/sales/sales.component').then((m) => m.SalesComponent),
	},
	{
		path: 'articles',
		loadComponent: () =>
			import('./pages/articles/articles.component').then((m) => m.ArticlesComponent),
	},
	{
		path: 'reviews',
		loadComponent: () =>
			import('./pages/reviews/reviews.component').then((m) => m.ReviewsComponent),
	},
	{
		path: 'events',
		loadComponent: () => import('./pages/events/events.component').then((m) => m.EventsComponent),
	},
	{
		path: 'jobs',
		loadComponent: () => import('./pages/jobs/jobs.component').then((m) => m.JobsComponent),
	},
	{
		path: 'socials',
		loadComponent: () =>
			import('./pages/socials/socials.component').then((m) => m.SocialsComponent),
	},
	{
		path: 'favorites',
		loadComponent: () =>
			import('./pages/favorites/favorites.component').then((m) => m.FavoritesComponent),
	},
	{
		path: '**',
		redirectTo: '/',
	},
];
