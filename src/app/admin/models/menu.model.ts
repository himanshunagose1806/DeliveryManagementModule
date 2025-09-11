import { MenuItem } from './menu-item.model';

export interface Menu {
    id: string;
    restaurantId: number;
    items: MenuItem[];
}
