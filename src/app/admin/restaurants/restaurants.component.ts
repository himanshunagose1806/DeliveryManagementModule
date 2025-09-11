import { Component } from '@angular/core';
import { AdminDataService } from '../admin-data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-restaurants',
  standalone: false,
  templateUrl: './restaurants.component.html',
  styleUrl: './restaurants.component.css'
})
export class RestaurantsComponent {
  restaurants: any[] = [];
  restaurantId!: number;
  menuItems: any[] = [];

  constructor(private adminService: AdminDataService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.adminService.getRestaurants().subscribe(data => {
      this.restaurants = data;
    });
    this.restaurantId = Number(this.route.snapshot.paramMap.get('id'));
    this.adminService.getMenuByRestaurantId(this.restaurantId).subscribe(data => {
      this.menuItems = data;
    });
  }

}
