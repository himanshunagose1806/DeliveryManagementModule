import { Component, OnInit } from '@angular/core';
import { AdminDataService } from '../admin-data.service';

@Component({
  selector: 'app-orders-section',
  standalone: false,
  templateUrl: './orders-section.component.html',
  styleUrls: ['./orders-section.component.css']
})

export class OrdersSectionComponent implements OnInit {
  orders: any[] = [];
  selectedAgent: { [orderId: string]: any } = {};
  availableAgents: any[] = [];

  constructor(private adminService: AdminDataService) {}

  ngOnInit(): void {
    this.adminService.getOrders().subscribe((data) => {
      this.orders = this.sortOrders(data);
    });
    this.adminService.getAgents().subscribe(data => {
      this.availableAgents = data.filter(agent => agent.status === 'available');
    });
  }

  sortOrders(data: any[]): any[] {
    const priority = { 'Pending': 1, 'Delivered': 2, 'Cancelled': 3 };
    return data.sort(
      (a, b) =>
        priority[a.status as 'Pending' | 'Delivered' | 'Cancelled'] -
        priority[b.status as 'Pending' | 'Delivered' | 'Cancelled']
    );
  }

  assignAgent(orderId: string, agent: any): void {
    if (!agent) return;

    this.adminService.assignAgentToOrder(orderId, agent.name, agent.id).subscribe({
      next: () => {
        this.startEtaCountdown(agent.id);
        alert(`✅ Agent ${agent.name} assigned to Order ${orderId}`);
        this.refreshData();
      },
      error: (err) => {
        console.error('Assignment error:', err);
        alert(`Failed to assign agent!!`);
      }
    });
  }

refreshData(): void {
  this.adminService.getOrders().subscribe(data => {
    this.orders = data;
  });

  this.adminService.getAgents().subscribe(data => {
    this.availableAgents = data.filter(agent => agent.status === 'available');
  });
}

startEtaCountdown(agentId: string): void {
  const interval = setInterval(() => {
    this.adminService.getAgentById(agentId).subscribe(agent => {
      if (agent.eta > 0) {
        const updatedEta = agent.eta - 1;
        let updatedStatus = agent.status;

        if (updatedEta <= 5 && agent.status !== 'on the way') {
          updatedStatus = 'on the way';
        }

        if (updatedEta === 0) {
          updatedStatus = 'available';
        }

        this.adminService.updateAgent(agentId, {
          eta: updatedEta,
          status: updatedStatus,
          currentOrderId: updatedEta === 0 ? '' : agent.currentOrderId
        }).subscribe();

        if (updatedEta === 0) {
          clearInterval(interval);
        }
      }
    });
  }, 300000); // every 5 minute
}

}
