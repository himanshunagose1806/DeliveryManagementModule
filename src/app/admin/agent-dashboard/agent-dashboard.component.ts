import { Component, OnInit } from '@angular/core';
import { AdminDataService } from '../admin-data.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DeliveryAgent } from '../models/delivery-agent.model';
import { OrderDelivery } from '../models/order-delivery.model';

@Component({
  selector: 'app-agent-dashboard',
  standalone: false,
  templateUrl: './agent-dashboard.component.html',
  styleUrl: './agent-dashboard.component.css'
})
export class AgentDashboardComponent implements OnInit {

  agent: any;
  agents: DeliveryAgent[] = [];
  activeOrders: OrderDelivery[] = [];
  deliveredOrders: OrderDelivery[] = [];

  activeOpen = false;
  deliveredOpen = false;

  constructor(private route: ActivatedRoute, private http: HttpClient, private adminService : AdminDataService) {}

  toggleSection(section: string): void {
    if (section === 'active') this.activeOpen = !this.activeOpen;
    if (section === 'delivered') this.deliveredOpen = !this.deliveredOpen;
  }


  // ngOnInit(): void {
  //   const agentId = this.route.snapshot.paramMap.get('id');

  //   if (!agentId) return;

  //   this.http.get<any>(`http://localhost:3000/DeliveryAgent/${agentId}`).subscribe(agent => {
  //     this.agent = agent;

  //     this.activeOrders = agent.orders.filter((o: any) => o.status === 'assigned');
  //     this.deliveredOrders = agent.orders.filter((o : any) => o.status === 'delivered');

  //   });
  // }

  ngOnInit(): void {
    const agentId: string = this.route.snapshot.paramMap.get('id')!;
    this.adminService.getAgentById(agentId).subscribe((agent: any) => {
    this.agent = agent;

    this.adminService.getOrders().subscribe((orders: OrderDelivery[]) => {
      this.activeOrders = orders.filter(order =>
        order.orderDetails.deliveryStatus === 'assigned' &&
        order.orderId === this.agent.currentOrderId
      );
    
      this.deliveredOrders = orders.filter(order =>
        order.orderDetails.deliveryStatus === 'delivered' &&
        this.agent.orders.some((o: any) => o.orderId === order.orderId)
      );
    });
  });
}


  // agentId: string = '';
  // agent: any;
  // activeOrders: any[] = [];
  // deliveredOrders: any[] = [];
  
  // constructor(private http: HttpClient, private route: ActivatedRoute, private adminDataService : AdminDataService) {}

  // ngOnInit(): void {
  //   this.agentId = this.route.snapshot.paramMap.get('id') || '';

  //   if (!this.agentId) {
  //     console.warn('Missing agentId in route');
  //     return;
  //   }

  //   this.http.get<any>('http://localhost:3000/DeliveryAgent/' + this.agentId).subscribe((agent) => {
  //     this.agent = agent;
  //     this.activeOrders = agent.orders.filter((o: any) => o.status === 'assigned');
  //     this.deliveredOrders = agent.orders.filter((o: any) => o.status === 'delivered');
  //   });

  // }


  // fetchAgentDetails(): void {
  //   this.adminDataService.getAgentById(this.agentId).subscribe(agent => {
  //     this.agent = agent;
  //     this.activeOrders = agent.orders.filter((o: any) => o.status === 'active');
  //     this.deliveredOrders = agent.orders.filter((o: any) => o.status === 'delivered');
  //   });
  // }

}