import { isPlatformBrowser, ViewportScroller } from '@angular/common';
import {
	afterNextRender,
	ChangeDetectionStrategy,
	Component,
	computed,
	DestroyRef,
	effect,
	inject,
	PLATFORM_ID,
	signal,
} from '@angular/core';
import { MenuItemComponent } from '../../components/menu-item/menu-item.component';
import { LanguageService } from '../../feature/language/language.service';
import { buildMenuGroups } from '../../feature/menu/menu-by-language.data';
import { MenuGroup, MenuSection } from '../../feature/menu/menu.data';

@Component({
	imports: [MenuItemComponent],
	templateUrl: './landing.component.html',
	styleUrl: './landing.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingComponent {
	private readonly _languageService = inject(LanguageService);
	private readonly _viewportScroller = inject(ViewportScroller);
	private readonly _destroyRef = inject(DestroyRef);
	private readonly _isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
	private _observer: IntersectionObserver | null = null;

	protected readonly groups = computed(() => buildMenuGroups(this._languageService.language()));
	protected readonly selectedGroupId = signal('appetizers');
	protected readonly activeSectionId = signal('');
	protected readonly activeGroup = computed(
		() => this.groups().find((group) => group.id === this.selectedGroupId()) ?? this.groups()[0],
	);
	protected readonly activeSections = computed(() => this.activeGroup()?.sections ?? []);

	constructor() {
		if (this._isBrowser) {
			afterNextRender(() => this._observeSections());

			// Scroll active pill into view when active section changes
			effect(() => {
				const id = this.activeSectionId();
				if (!id) return;
				const pill = document.querySelector<HTMLElement>(`[data-pill="${id}"]`);
				pill?.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
			});
		}

		this._destroyRef.onDestroy(() => this._observer?.disconnect());
	}

	private _observeSections(): void {
		this._observer?.disconnect();

		const els = document.querySelectorAll<HTMLElement>('[data-section-id]');
		if (!els.length) return;

		this.activeSectionId.set(els[0].getAttribute('data-section-id') ?? '');

		this._observer = new IntersectionObserver(
			(entries) => {
				const visible = entries
					.filter((e) => e.isIntersecting)
					.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

				if (visible[0]) {
					const id = visible[0].target.getAttribute('data-section-id');
					if (id) this.activeSectionId.set(id);
				}
			},
			{ rootMargin: '-5% 0px -75% 0px', threshold: 0 },
		);

		els.forEach((el) => this._observer!.observe(el));
	}

	protected setGroup(groupId: string) {
		if (this.selectedGroupId() === groupId) return;
		this.selectedGroupId.set(groupId);
		this._viewportScroller.scrollToPosition([0, 0]);
		if (this._isBrowser) {
			setTimeout(() => this._observeSections(), 60);
		}
	}

	protected trackByGroup(_: number, group: MenuGroup) {
		return group.id;
	}

	protected trackBySection(_: number, section: MenuSection) {
		return section.id;
	}
}
