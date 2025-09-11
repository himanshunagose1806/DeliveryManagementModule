import { ActivatedRoute } from '@angular/router';
import { AdminDataService } from '../../admin-data.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

interface MenuItem {
  Itemid: number;
  name: string;
  price: number;
  image: string;
}

export interface Menu {
  id: string;
  restaurantId: number;
  items: MenuItem[];
}

export interface Restaurant {
  id: string;
  name: string;
  rating: number;
  image: string;
  cusine: string;
}

@Component({
  selector: 'app-restaurant-by-id',
  standalone: false,
  templateUrl: './restaurant-by-id.component.html',
  styleUrl: './restaurant-by-id.component.css'
})

export class RestaurantByIDComponent {
  restaurantId!: number;
  menuItems: any[] = [];
  editingItem: any = null;
  editForm = { name: '', price: 0, image: '' };
  baseUrl = 'http://localhost:3000'; 

  constructor(private http: HttpClient, private route: ActivatedRoute, private restaurantService: AdminDataService) {}

  ngOnInit(): void {
    this.restaurantId = Number(this.route.snapshot.paramMap.get('id'));
    this.restaurantService.getMenuByRestaurantId(this.restaurantId).subscribe(data => {
      this.menuItems = data[0]?.items || [];
    });
  }

  editItem(item: any): void {
    this.editingItem = item;
    this.editForm = { ...item };
  }

  deleteItem(itemId: number): void {
    const menuUrl = `${this.baseUrl}/menus?restaurantId=${this.restaurantId}`;

    this.http.get<any[]>(menuUrl).subscribe(menus => {
      const menu = menus[0];
      if (!menu || !menu.items) return;

      const updatedItems = menu.items.filter((item: any) => item.Itemid !== itemId);
      // const updatedItems = menu.items.filter(item => item.Itemid !== itemId);

      this.http.patch(`${this.baseUrl}/menus/${menu.id}`, { items: updatedItems }).subscribe(() => {
        this.menuItems = updatedItems;
        alert(`🗑️ Item ${itemId} deleted successfully`);
      });
    });
  }

  saveEdit(): void {
    const menuUrl = `${this.baseUrl}/menus?restaurantId=${this.restaurantId}`;

    this.http.get<any[]>(menuUrl).subscribe(menus => {
      const menu = menus[0];
      if (!menu) return;

      // Find index of the item to update
      const index = menu.items.findIndex((i: any) => i.Itemid === this.editingItem.Itemid);
      if (index === -1) return;

      // Update the item directly
      menu.items[index] = { ...menu.items[index], ...this.editForm };

      // Save back to database
      this.http.patch(`${this.baseUrl}/menus/${menu.id}`, { items: menu.items }).subscribe(() => {
        this.menuItems = [...menu.items]; // update local view
        this.editingItem = null;
        alert(`✅ Item updated successfully`);
      });
    });
  }

  

  addItem(): void {
    // implement add logic here
  }
}
