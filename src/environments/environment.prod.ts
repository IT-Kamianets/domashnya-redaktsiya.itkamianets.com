import { Company } from '../app/feature/company/company.interface';
import { Item } from '../app/feature/item/item.interface';

export const environment: {
	apiUrl: string;
	onApiFall: 'spinner' | 'app reload' | 'app';
	appVersion: string;
	production: boolean;
	defaultLanguage: string;
	companyId: string;
	company: Company;
	items: Item[];
} = {
	apiUrl: 'https://api.webart.work',
	onApiFall: 'app',
	appVersion: '1.0.0',
	production: true,
	defaultLanguage: 'ua',
	items: [],
	companyId: 'demo',
	company: {
		_id: '',
		name: '',
	},
};
