import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateDirective, TranslatePipe } from '@wawjs/ngx-translate';

@Component({
	imports: [NgOptimizedImage, TranslateDirective, TranslatePipe],
	templateUrl: './socials.component.html',
	styleUrl: './socials.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SocialsComponent {
	private readonly _http = inject(HttpClient);

	protected readonly bookingOpen = signal(false);
	protected readonly name = signal('');
	protected readonly phone = signal('');
	protected readonly loading = signal(false);
	protected readonly success = signal(false);
	protected readonly errorMsg = signal('');

	protected openBooking(): void {
		this.name.set('');
		this.phone.set('');
		this.success.set(false);
		this.errorMsg.set('');
		this.bookingOpen.set(true);
	}

	protected closeBooking(): void {
		this.bookingOpen.set(false);
	}

	protected submit(): void {
		const name = this.name().trim();
		const phone = this.phone().trim();
		if (!name || !phone || this.loading()) return;

		this.loading.set(true);
		this.errorMsg.set('');

		const message = `📅 Бронювання — Домашня Редакція\nІм'я: ${name}\nТелефон: ${phone}`;

		this._http
			.post<boolean | { error: string }>(
				'https://it.webart.work/api/telegram/contact',
				{ slug: 'domashnya-redaktsiya', message },
			)
			.subscribe({
				next: () => {
					this.loading.set(false);
					this.success.set(true);
				},
				error: () => {
					this.loading.set(false);
					this.errorMsg.set('Failed to send. Please try again.');
				},
			});
	}
}
