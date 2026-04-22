import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { TranslateDirective } from '@wawjs/ngx-translate';

interface GalleryPhoto {
	src: string;
	alt: string;
}

@Component({
	imports: [TranslateDirective],
	templateUrl: './gallery.component.html',
	styleUrl: './gallery.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalleryComponent {
	protected readonly photos: GalleryPhoto[] = [
		{ src: 'gallery/demo-1.webp', alt: 'Horeca bar service photo' },
		{ src: 'gallery/demo-2.webp', alt: 'Horeca hotel reception photo' },
		{ src: 'gallery/demo-3.webp', alt: 'Horeca hotel reception photo' },
	];

	protected readonly selectedPhoto = signal<GalleryPhoto | null>(null);

	protected openPhoto(photo: GalleryPhoto) {
		this.selectedPhoto.set(photo);
	}

	protected closePhoto() {
		this.selectedPhoto.set(null);
	}
}
