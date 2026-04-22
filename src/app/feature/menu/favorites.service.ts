import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';

const FAVORITES_STORAGE_KEY = 'favorite-menu-items';

@Injectable({ providedIn: 'root' })
export class FavoritesService {
	private readonly _platformId = inject(PLATFORM_ID);

	readonly favoriteIds = signal<string[]>(this._readFavorites());

	isFavorite(itemId: string) {
		return this.favoriteIds().includes(itemId);
	}

	toggleFavorite(itemId: string) {
		const nextFavorites = this.isFavorite(itemId)
			? this.favoriteIds().filter((id) => id !== itemId)
			: [...this.favoriteIds(), itemId];

		this.favoriteIds.set(nextFavorites);
		this._persistFavorites(nextFavorites);
	}

	private _readFavorites() {
		if (!isPlatformBrowser(this._platformId)) {
			return [];
		}

		const rawValue = localStorage.getItem(FAVORITES_STORAGE_KEY);

		if (!rawValue) {
			return [];
		}

		try {
			const favoriteIds = JSON.parse(rawValue);

			return Array.isArray(favoriteIds)
				? favoriteIds.filter((id): id is string => typeof id === 'string')
				: [];
		} catch {
			return [];
		}
	}

	private _persistFavorites(favoriteIds: string[]) {
		if (!isPlatformBrowser(this._platformId)) {
			return;
		}

		localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favoriteIds));
	}
}
