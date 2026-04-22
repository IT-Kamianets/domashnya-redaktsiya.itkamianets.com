import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FavoritesService } from '../../feature/menu/favorites.service';
import { MenuItem } from '../../feature/menu/menu.data';
import { TranslatePipe, TranslateService } from '@wawjs/ngx-translate';

@Component({
	selector: 'app-menu-item',
	imports: [RouterLink, TranslatePipe],
	templateUrl: './menu-item.component.html',
	styleUrl: './menu-item.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuItemComponent {
	private readonly _favoritesService = inject(FavoritesService);
	private readonly _translateService = inject(TranslateService);

	readonly item = input.required<MenuItem>();
	protected readonly isFavorite = computed(() =>
		this._favoritesService.isFavorite(this.item().id),
	);
	protected readonly unavailableLabel = computed(() =>
		this._translateService.translate('Unavailable')(),
	);
	protected readonly favoriteLabel = computed(() =>
		this._translateService.translate(
			this.isFavorite() ? 'Remove from favorites' : 'Add to favorites',
		)(),
	);

	protected toggleFavorite() {
		this._favoritesService.toggleFavorite(this.item().id);
	}
}
