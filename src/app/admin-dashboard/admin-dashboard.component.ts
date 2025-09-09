import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  standalone: false,
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {
    summary = {
    totalOrders: 1280,
    revenueToday: 4520,
    activeRestaurants: 34,
    activeAgents: 58
  };
}