import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

type RoomCard = {
	name: string;
	description: string;
	price: string;
	image: string;
	imageAlt: string;
};

type ContactLink = {
	label: string;
	href: string;
	description: string;
};

@Component({
	imports: [NgOptimizedImage],
	templateUrl: './rooms.component.html',
	styleUrl: './rooms.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoomsComponent {
	protected readonly amenities = [
		'Комфортні номери',
		'Сніданки для гостей',
		'Ресторан або кафе на території',
		'Room service',
		'Wi-Fi у номерах',
		'Паркінг',
		'Робоча зона',
		'Кондиціонер',
		'Трансфер за запитом',
		'Підтримка бронювання',
	];

	protected readonly rooms: RoomCard[] = [
		{
			name: 'Делюкс із балконом',
			description:
				'Просторий демо-номер для готелю або апарт-готелю: велике ліжко, зона відпочинку, балкон, робоче місце, чайна станція та мінібар. Добре підходить для романтичного вікенду або короткої подорожі містом.',
			price: 'від 2400 грн/доба',
			image: 'room/room-1.webp',
			imageAlt: 'Демо номер Делюкс із балконом у Horeca',
		},
		{
			name: 'Стандарт бізнес',
			description:
				'Практичний номер для гостей у відрядженні: зручне двоспальне ліжко, письмовий стіл, швидкий Wi-Fi, телевізор, шафа та набір для кави або чаю. Формат легко адаптується під міський готель.',
			price: 'від 1800 грн/доба',
			image: 'room/room-2.webp',
			imageAlt: 'Демо номер Стандарт бізнес у Horeca',
		},
		{
			name: 'Преміум номер',
			description:
				'Затишний номер підвищеної категорії з м’яким освітленням, великим ліжком, окремою зоною для відпочинку та деталями для комфортного перебування. Підійде для сторінки готелю, комплексу або ресторану з номерами.',
			price: 'від 3200 грн/доба',
			image: 'room/room-3.webp',
			imageAlt: 'Демо Преміум номер у Horeca',
		},
	];

	protected readonly contactLinks: ContactLink[] = [
		{
			label: 'Зателефонувати',
			href: 'tel:+380970000000',
			description: '+38 097 000 00 00',
		},
		{
			label: 'Написати у Viber',
			href: 'https://example.com/horeca-demo/viber',
			description: 'Демо-чат для швидкого бронювання',
		},
		{
			label: 'Написати у Telegram',
			href: 'https://example.com/horeca-demo/telegram',
			description: '@horeca_demo',
		},
	];
}
