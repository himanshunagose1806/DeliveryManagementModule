import { Component, OnInit } from '@angular/core';
import { AdminDataService } from '../admin-data.service';
import { interval, Subscription } from 'rxjs';
import { switchMap, takeWhile } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { DeliveryAgent } from '../models/delivery-agent.model';
import { OrderDelivery } from '../models/order-delivery.model';

@Component({
  selector: 'app-orders-section',
  standalone: false,
  templateUrl: './orders-section.component.html',
  styleUrls: ['./orders-section.component.css']
})

export class OrdersSectionComponent implements OnInit {
  orders: any[] = [];
  agents: any[] = [];
  selectedAgent: { [orderId: string]: any } = {};
  pendingOrders: any[] = [];
  assignedOrders: any[] = [];
  deliveredOrders: any[] = [];
  activeOrders: OrderDelivery[] = [];

  pendingOpen = false;
  assignedOpen = false;
  deliveredOpen = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchOrders();
    this.fetchAvailableAgents();
  }

  toggleSection(section: string): void {
    if (section === 'pending') this.pendingOpen = !this.pendingOpen;
    if (section === 'assigned') this.assignedOpen = !this.assignedOpen;
    if (section === 'delivered') this.deliveredOpen = !this.deliveredOpen;
  }

  fetchOrders(): void {
    this.http.get<any[]>('http://localhost:3000/OrderDelivery').subscribe(data => {
      this.orders = data;
      this.pendingOrders = data.filter(o => o.orderDetails.deliveryStatus === 'pending');
      this.assignedOrders = data.filter(o => o.orderDetails.deliveryStatus === 'assigned');
      this.deliveredOrders = data.filter(o => o.orderDetails.deliveryStatus === 'delivered');
    });
  }

  fetchAvailableAgents(): void {
    this.http.get<any[]>('http://localhost:3000/DeliveryAgent?status=available').subscribe(data => {
      this.agents = data;
    });
  }

  assignAgent(orderId: string, agent: any): void {
  if (!agent || !agent.id) return;

  const order = this.orders.find(o => o.orderId === orderId);
  if (!order) return;

  // Step 1: Update the order
  const updatedOrderDetails = {
    ...order.orderDetails,
    deliveryStatus: 'assigned',
    eta: 15,
    agentId: agent.agentId
  };

  const orderUpdate = {
    orderDetails: updatedOrderDetails
  };

  this.http.patch(`http://localhost:3000/OrderDelivery/${order.id}`, orderUpdate).subscribe(() => {
    // Step 2: Fetch full agent object
    this.http.get(`http://localhost:3000/DeliveryAgent/${agent.id}`).subscribe((fullAgent: any) => {
      const newOrderEntry = {
        orderId: order.orderId,
        status: 'assigned',
        restaurantName: order.restaurant.name,
        customerName: order.customer.name,
        customerContact: order.customer.contact,
        customerAddress: order.customer.address,
        distance: order.orderDetails.distance,
        deliveredTime: null,
        paymentCollected: false,
        deliveryFeedback: ''
      };

      const agentUpdate = {
        status: 'on the way',
        currentOrderId: order.orderId,
        eta: 15,
        orders: [...fullAgent.orders, newOrderEntry]
      };

      this.http.patch(`http://localhost:3000/DeliveryAgent/${agent.id}`, agentUpdate).subscribe(() => {
        this.fetchOrders();
        this.fetchAvailableAgents();
        this.selectedAgent[orderId] = null;
      });
    });
  });
}



}




















































// import { Component, OnInit } from '@angular/core';
// import { AdminDataService } from '../admin-data.service';
// import { interval, Subscription } from 'rxjs';
// import { switchMap, takeWhile } from 'rxjs/operators';

// @Component({
//   selector: 'app-orders-section',
//   standalone: false,
//   templateUrl: './orders-section.component.html',
//   styleUrls: ['./orders-section.component.css']
// })

// export class OrdersSectionComponent implements OnInit {
//   orders: any[] = [];
//   availableAgents: any[] = [];
//   selectedAgent: { [orderId: string]: any } = {};
//   private etaSubscriptions: { [agentId: string]: Subscription } = {};

//   constructor(private adminService: AdminDataService) {}

//   ngOnInit(): void {
//     this.loadOrders();
//     this.loadAgents();
//   }

//   loadOrders(): void {
//     this.adminService.getOrders().subscribe(data => {
//       this.orders = this.sortOrders(data);
//     });
//   }

//   loadAgents(): void {
//     this.adminService.getAgents().subscribe(data => {
//       this.availableAgents = data.filter(agent => agent.status === 'available');
//     });
//   }

//   sortOrders(data: any[]): any[] {
//     const priority: Record<string, number> = {
//       pending: 1,
//       assigned: 2,
//       delivered: 3,
//       cancelled: 4
//     };

//     return data.sort(
//       (a, b) =>
//         priority[a.deliveryStatus as string] - priority[b.deliveryStatus as string]
//     );
//   }

//   assignAgent(orderId: string, agent: any): void {
//     if (!agent || !agent.agentId) {
//       this.showToast('⚠️ Invalid agent selection');
//       return;
//     }

//     this.adminService.assignAgentToOrder(orderId, agent.name, agent.phone, agent.agentId).subscribe({
//       next: () => {
//         this.startEtaCountdown(agent.agentId);
//         this.showToast(`✅ Agent ${agent.name} assigned to Order ${orderId}`);
//         this.refreshData();
//       },
//       error: (err) => {
//         console.error('Assignment error:', err);
//         this.showToast('❌ Failed to assign agent');
//       }
//     });
//   }

//   refreshData(): void {
//     this.adminService.getOrders().subscribe(data => {
//       this.orders = this.sortOrders(data);
//     });

//     this.adminService.getAgents().subscribe(data => {
//       this.availableAgents = data.filter(agent => agent.status === 'available');
//     });
//   }

//   startEtaCountdown(agentId: string): void {
//     if (this.etaSubscriptions[agentId]) return;

//     const countdown$ = interval(300000).pipe( // every 5 minutes
//       switchMap(() => this.adminService.getAgentById(agentId)),
//       takeWhile(agent => agent.eta > 0, true)
//     );

//     this.etaSubscriptions[agentId] = countdown$.subscribe(agent => {
//       const updatedEta = agent.eta - 1;
//       let updatedStatus = agent.status;

//       if (updatedEta <= 5 && agent.status !== 'on the way') {
//         updatedStatus = 'on the way';
//       }

//       if (updatedEta === 0) {
//         updatedStatus = 'available';
//       }

//       this.adminService.updateAgent(agentId, {
//         eta: updatedEta,
//         status: updatedStatus,
//         currentOrderId: updatedEta === 0 ? '' : agent.currentOrderId
//       }).subscribe(() => {
//         if (updatedEta === 0) {
//           this.etaSubscriptions[agentId]?.unsubscribe();
//           delete this.etaSubscriptions[agentId];
//         }
//       });
//     });
//   }

//   showToast(message: string): void {
//     const toast = document.createElement('div');
//     toast.className = 'toast';
//     toast.innerText = message;
//     document.body.appendChild(toast);
//     setTimeout(() => toast.remove(), 3000);
//   }
// }