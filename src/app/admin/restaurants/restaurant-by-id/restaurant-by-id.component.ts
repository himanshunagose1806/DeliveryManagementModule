import { ActivatedRoute } from '@angular/router';
import { AdminDataService } from '../../admin-data.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from '../../models/menu-item.model';
import { Menu } from '../../models/menu.model';

@Component({
  selector: 'app-restaurant-by-id',
  standalone: false,
  templateUrl: './restaurant-by-id.component.html',
  styleUrl: './restaurant-by-id.component.css'
})

export class RestaurantByIDComponent {
  menuItems: MenuItem[] = [];
  editingItem: MenuItem | null = null;
  editForm: MenuItem = { Itemid: 0, name: '', price: 0, image: '' };
  newItem: MenuItem = { Itemid: 0, name: '', price: 0, image: '' };
  restaurantId!: number;
  showAddForm: boolean = false;

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
      
      const updatedItems = menu.items.filter((item: MenuItem) => item.Itemid !== itemId);
      
      this.http.patch(`${this.baseUrl}/menus/${menu.id}`, { items: updatedItems }).subscribe(() => {
        this.menuItems = updatedItems;
        alert(`🗑️ Item ${itemId} deleted successfully`);
      });
    });
  }

  saveEdit(): void {
  if (!this.editingItem) return;

  const menuUrl = `${this.baseUrl}/menus?restaurantId=${this.restaurantId}`;

  this.http.get<Menu[]>(menuUrl).subscribe(menus => {
    const menu = menus[0];
    if (!menu) return;

    const index = menu.items.findIndex((i: MenuItem) => i.Itemid === this.editingItem!.Itemid);
    if (index === -1) return;

    menu.items[index] = { ...menu.items[index], ...this.editForm };

    this.http.patch(`${this.baseUrl}/menus/${menu.id}`, { items: menu.items }).subscribe(() => {
      this.menuItems = [...menu.items];
      this.editingItem = null;
      alert(`✅ Item updated successfully`);
    });
  });
}
  

 addItem(): void {
    const menuUrl = `${this.baseUrl}/menus?restaurantId=${this.restaurantId}`;
  
    this.http.get<Menu[]>(menuUrl).subscribe(menus => {
      const menu = menus[0];
      if (!menu) return;
    
      const maxId = Math.max(...menu.items.map(i => i.Itemid), 0);
      const newItemWithId = { ...this.newItem, Itemid: maxId + 1 };
    
      const updatedItems = [...menu.items, newItemWithId];
    
      this.http.patch(`${this.baseUrl}/menus/${menu.id}`, { items: updatedItems }).subscribe(() => {
        this.menuItems = updatedItems;
        this.newItem = { Itemid: 0, name: '', price: 0, image: '' };
        this.showAddForm = false;
        alert(`✅ Item "${newItemWithId.name}" added successfully`);
      });
    });
  }
  

}
