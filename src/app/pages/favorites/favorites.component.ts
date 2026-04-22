import { ViewportScroller } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { MenuItemComponent } from '../../components/menu-item/menu-item.component';
import { LanguageService } from '../../feature/language/language.service';
import { FavoritesService } from '../../feature/menu/favorites.service';
import { buildMenuGroups, MenuGroup, MenuSection } from '../../feature/menu/menu.data';
import { TranslateDirective } from '@wawjs/ngx-translate';

@Component({
	imports: [MenuItemComponent, TranslateDirective],
	templateUrl: './favorites.component.html',
	styleUrl: './favorites.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoritesComponent {
	private readonly _languageService = inject(LanguageService);
	private readonly _favoritesService = inject(FavoritesService);
	private readonly _viewportScroller = inject(ViewportScroller);

	protected readonly selectedGroupId = signal('appetizers');
	protected readonly groups = computed(() =>
		buildMenuGroups(this._languageService.language())
			.map((group) => ({
				...group,
				sections: group.sections
					.map((section) => ({
						...section,
						items: section.items.filter((item) => this.isFavorite(item.id)),
					}))
					.filter((section) => section.items.length > 0),
			}))
			.filter((group) => group.sections.length > 0),
	);
	protected readonly activeGroup = computed(
		() =>
			this.groups().find((group) => group.id === this.selectedGroupId()) ??
			this.groups()[0] ??
			null,
	);
	protected readonly activeSections = computed(() => this.activeGroup()?.sections ?? []);
	protected readonly hasFavorites = computed(() => this.groups().length > 0);

	protected setGroup(groupId: string) {
		if (this.selectedGroupId() === groupId) {
			return;
		}

		this.selectedGroupId.set(groupId);
		this._viewportScroller.scrollToPosition([0, 0]);
	}

	protected trackByGroup(_: number, group: MenuGroup) {
		return group.id;
	}

	protected trackBySection(_: number, section: MenuSection) {
		return section.id;
	}

	protected isFavorite(itemId: string) {
		return this._favoritesService.isFavorite(itemId);
	}
}
