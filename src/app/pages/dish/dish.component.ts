import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TranslatePipe, TranslateService } from '@wawjs/ngx-translate';
import { LanguageService } from '../../feature/language/language.service';
import { FavoritesService } from '../../feature/menu/favorites.service';
import {
	type RawMenuItem,
	type RawMenuSection,
	cleanText,
	findRawMenuItemBySlug,
	rawMenuSections,
	translateMenuValue,
} from '../../feature/menu/menu.data';

interface DishFact {
	label: string;
	value: string;
}

interface DishSuggestion {
	slug: string;
	title: string;
	description: string | null;
	price: string;
	imageAlt: string;
}

interface DishViewModel {
	id: string;
	slug: string;
	sectionName: string;
	title: string;
	description: string | null;
	fullDescription: string | null;
	price: string;
	labels: string[];
	imageAlt: string;
	facts: DishFact[];
	suggestions: DishSuggestion[];
}

const _fallbackEntry = _resolveFallbackEntry();

@Component({
	imports: [RouterLink, TranslatePipe],
	templateUrl: './dish.component.html',
	styleUrl: './dish.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DishComponent {
	private readonly _route = inject(ActivatedRoute);
	private readonly _favoritesService = inject(FavoritesService);
	private readonly _languageService = inject(LanguageService);
	private readonly _translateService = inject(TranslateService);
	private readonly _slug = toSignal(this._route.paramMap, {
		initialValue: this._route.snapshot.paramMap,
	});

	protected readonly dish = computed(() => {
		const language = this._languageService.language();
		const slug = this._slug().get('slug');
		const entry = slug ? (findRawMenuItemBySlug(slug) ?? _fallbackEntry) : _fallbackEntry;

		return _buildDishViewModel(entry.section, entry.item, language, this._translateService);
	});
	protected readonly isFavorite = computed(() =>
		this._favoritesService.isFavorite(this.dish().id),
	);
	protected readonly favoriteLabel = computed(() =>
		this._translateService.translate(
			this.isFavorite() ? 'Remove from favorites' : 'Add to favorites',
		)(),
	);

	protected toggleFavorite() {
		this._favoritesService.toggleFavorite(this.dish().id);
	}
}

function _buildDishViewModel(
	section: RawMenuSection,
	item: RawMenuItem,
	language: ReturnType<LanguageService['language']>,
	translateService: TranslateService,
) {
	return {
		id: `${section.slug}-${item.slug}`,
		slug: item.slug,
		sectionName: translateMenuValue(section.name, language) ?? item.slug,
		title: translateMenuValue(item.title, language) ?? item.slug,
		description: cleanText(translateMenuValue(item.description, language)),
		fullDescription: cleanText(translateMenuValue(item.fullDescription, language)),
		price: _formatPrice(item.price, translateService),
		labels: item.labels
			.map((label) => cleanText(translateMenuValue(label, language)))
			.filter((label): label is string => Boolean(label)),
		imageAlt: translateMenuValue(item.title, language) ?? item.slug,
		facts: _buildFacts(section, item, language, translateService),
		suggestions: _buildSuggestions(section, item, language, translateService),
	};
}

function _buildFacts(
	section: RawMenuSection,
	item: RawMenuItem,
	language: ReturnType<LanguageService['language']>,
	translateService: TranslateService,
) {
	return [
		{
			label: translateService.translate('Menu section')(),
			value: translateMenuValue(section.name, language) ?? section.slug,
		},
		{
			label: translateService.translate('Portion')(),
			value:
				item.portion ??
				translateService.translate('Ask restaurant staff for portion details')(),
		},
		{
			label: translateService.translate('Cooking time')(),
			value:
				item.cookTimeMinutes === null
					? translateService.translate('Ask restaurant staff')()
					: `${item.cookTimeMinutes} min`,
		},
		{
			label: translateService.translate('Calories')(),
			value:
				item.caloriesKcal === null
					? translateService.translate('Ask restaurant staff')()
					: `${item.caloriesKcal} kcal`,
		},
		{
			label: translateService.translate('Allergens')(),
			value:
				item.allergens.length > 0
					? item.allergens.join(', ')
					: translateService.translate('No allergen information available')(),
		},
	];
}

function _buildSuggestions(
	section: RawMenuSection,
	currentItem: RawMenuItem,
	language: ReturnType<LanguageService['language']>,
	translateService: TranslateService,
) {
	const suggestedItems = currentItem.suggested
		.map((slug) => section.items.find((item) => item.slug === slug))
		.filter((item): item is RawMenuItem => Boolean(item));

	return (
		suggestedItems.length
			? suggestedItems
			: section.items.filter((item) => item.slug !== currentItem.slug)
	)
		.slice(0, 3)
		.map((item) => ({
			slug: item.slug,
			title: translateMenuValue(item.title, language) ?? item.slug,
			description: cleanText(translateMenuValue(item.description, language)),
			price: _formatPrice(item.price, translateService),
			imageAlt: translateMenuValue(item.title, language) ?? item.slug,
		}));
}

function _formatPrice(price: number | null, translateService: TranslateService) {
	if (price === null) {
		return translateService.translate('Ask for price')();
	}

	return `${price} €`;
}

function _resolveFallbackEntry() {
	for (const section of rawMenuSections) {
		const item = section.items[0];

		if (item) {
			return { section, item };
		}
	}

	throw new Error('No dishes available in menu data.');
}
