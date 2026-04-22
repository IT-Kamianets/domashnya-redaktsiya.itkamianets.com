import { Company } from '../company/company.interface';
import { Item } from '../item/item.interface';

export interface BootstrapData {
	company?: Company;
	items?: Item[];
}
