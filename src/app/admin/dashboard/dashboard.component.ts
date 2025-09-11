import { Component, OnInit } from '@angular/core';
import { AdminDataService } from '../admin-data.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  orders: any[] = [];
  agents: any[] = [];

  totalOrders = 0;
  activeAgents = 0;
  availableAgents = 0;
  avgDeliveryTime = 0;
  pendingOrders = 0;
  deliveredOrders = 0;
  cancelledOrders = 0;

  constructor(private adminService: AdminDataService) {}

  ngOnInit(): void {
    this.adminService.getOrders().subscribe(data => {
      this.orders = data;
      this.totalOrders = data.length;
      this.pendingOrders = data.filter(o => o.status === 'Pending').length;
      this.deliveredOrders = data.filter(o => o.status === 'Delivered').length;
      this.cancelledOrders = data.filter(o => o.status === 'Cancelled').length;
      this.avgDeliveryTime = this.calculateAvgDeliveryTime(data);
    });

    this.adminService.getAgents().subscribe(data => {
      this.agents = data;
      this.activeAgents = data.filter(a => a.status === 'on the way' || a.status === 'out for delivery').length;
      this.availableAgents = data.filter(a => a.status === 'available').length;
    });
  }

  calculateAvgDeliveryTime(orders: any[]): number {
    const delivered = orders.filter(o => o.status === 'Delivered' && o.deliveryTime);
    if (delivered.length === 0) return 0;
    const totalTime = delivered.reduce((sum, o) => sum + o.deliveryTime, 0);
    return Math.round(totalTime / delivered.length);
  }

  metrics = [
  { label: 'Total Orders', value: this.totalOrders, icon: '🧾', color: 'primary' },
  { label: 'Active Agents', value: this.activeAgents, icon: '👥', color: 'success', subtext: `${this.availableAgents} available` },
  { label: 'Avg Delivery Time', value: `${this.avgDeliveryTime} mins`, icon: '⏱', color: 'warning' },
  { label: 'Pending Orders', value: this.pendingOrders, icon: '⏳', color: 'secondary' },
  { label: 'Delivered', value: this.deliveredOrders, icon: '✅', color: 'success' },
  { label: 'Cancelled', value: this.cancelledOrders, icon: '❌', color: 'danger' }
];

}
