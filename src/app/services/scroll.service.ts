import { isPlatformBrowser, ViewportScroller } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';

@Injectable({
	providedIn: 'root',
})
export class ScrollService {
	private readonly _router = inject(Router);
	private readonly _viewportScroller = inject(ViewportScroller);
	private readonly _isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
	private _landingPosition: [number, number] | null = null;
	private _initialized = false;

	initialize() {
		if (!this._isBrowser || this._initialized) {
			return;
		}

		this._initialized = true;

		if ('scrollRestoration' in window.history) {
			window.history.scrollRestoration = 'manual';
		}

		this._router.events.subscribe((event) => {
			if (event instanceof NavigationStart) {
				this._saveLandingPosition();
				return;
			}

			if (event instanceof NavigationEnd) {
				this._applyPosition(event.urlAfterRedirects);
			}
		});
	}

	private _saveLandingPosition() {
		if (!this._isLandingUrl(this._router.url)) {
			return;
		}

		this._landingPosition = this._viewportScroller.getScrollPosition();
	}

	private _applyPosition(url: string) {
		requestAnimationFrame(() => {
			if (this._isLandingUrl(url)) {
				if (this._landingPosition) {
					this._viewportScroller.scrollToPosition(this._landingPosition);
				}

				return;
			}

			this._viewportScroller.scrollToPosition([0, 0]);
		});
	}

	private _isLandingUrl(url: string) {
		const path = url.split(/[?#]/)[0];

		return path === '' || path === '/';
	}
}
