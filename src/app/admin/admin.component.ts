import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DeliveryService } from '../delivery.service';
import * as deliveryAgentsData from '../../../deliveryAgent.json';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin',
  standalone: false,
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  agents: any[] = [];
  agentFilter: string = '';
  filteredAgents: any[] = [];
  agentSearch: string = '';
  statusFilter: string = 'all';
  
  constructor(private router : Router, private deliveryState : DeliveryService) {}

  ngOnInit() {
    this.deliveryState.isDeliveryPageActive = true;
    this.agents = deliveryAgentsData.DeliveryAgent;
    this.filteredAgents = this.agents;
  }

  ngOnDestroy() {
    this.deliveryState.isDeliveryPageActive = false;
  }

  goBack() {
    this.deliveryState.isDeliveryPageActive = false;
    this.router.navigate(['/']);
  }

  assignAgent(agentId: string): void {
    alert(`Agent assigned with ID: ${agentId}`);
  }

  filterAgents() {
    const search = this.agentSearch.toLowerCase();
    const status = this.statusFilter;
  
    this.filteredAgents = this.agents.filter(agent => {
      const matchesSearch =
        agent.name.toLowerCase().includes(search) ||
        agent.agentId.toString().includes(search);
  
      const matchesStatus =
        status === 'all' || agent.status.toLowerCase() === status;
  
      return matchesSearch && matchesStatus;
    });
  }
}
