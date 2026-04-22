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
		{ src: 'gallery/1.jpg', alt: 'Домашня Редакція gallery photo 1' },
		{ src: 'gallery/2.jpg', alt: 'Домашня Редакція gallery photo 2' },
		{ src: 'gallery/3.jpg', alt: 'Домашня Редакція gallery photo 3' },
		{ src: 'gallery/4.jpg', alt: 'Домашня Редакція gallery photo 4' },
		{ src: 'gallery/5.jpg', alt: 'Домашня Редакція gallery photo 5' },
		{ src: 'gallery/6.jpg', alt: 'Домашня Редакція gallery photo 6' },
	];

	protected readonly selectedPhoto = signal<GalleryPhoto | null>(null);

	protected openPhoto(photo: GalleryPhoto) {
		this.selectedPhoto.set(photo);
	}

	protected closePhoto() {
		this.selectedPhoto.set(null);
	}
}
