import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateDirective } from '@wawjs/ngx-translate';

@Component({
	imports: [RouterLink, TranslateDirective],
	templateUrl: './navigation.component.html',
	styleUrl: './navigation.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent {
	protected readonly navItems = [
		{ label: 'Rooms', badge: '01', icon: 'hotel', route: '/rooms' },
		{ label: 'Sales', badge: '02', icon: 'sell', route: '/sales' },
		{ label: 'Articles', badge: '03', icon: 'article', route: '/articles' },
		{ label: 'Reviews', badge: '04', icon: 'rate_review', route: '/reviews' },
		{ label: 'Events', badge: '05', icon: 'event', route: '/events' },
		{ label: 'Jobs', badge: '06', icon: 'work', route: '/jobs' },
	];
}
