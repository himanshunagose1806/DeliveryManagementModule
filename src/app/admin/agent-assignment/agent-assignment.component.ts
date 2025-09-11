import { Component } from '@angular/core';
import { DeliveryService } from '../../delivery.service';
import * as deliveryAgentsData from '../../../../db.json';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agent-assignment',
  standalone: false,
  templateUrl: './agent-assignment.component.html',
  styleUrl: './agent-assignment.component.css'
})
export class AgentAssignmentComponent {
  agent: any[] = [];
  agentFilter: string = '';
  filteredAgents: any[] = [];
  agentSearch: string = '';
  statusFilter: string = 'all';
  agentId : string = '';
  
  constructor(private router : Router, private deliveryState : DeliveryService) {}

  ngOnInit() {
    this.deliveryState.isDeliveryPageActive = true;
    this.agent = deliveryAgentsData.DeliveryAgent;
    this.filteredAgents = this.agent;
  }

  ngOnDestroy() {
    this.deliveryState.isDeliveryPageActive = false;
  }

  goBack() {
    this.deliveryState.isDeliveryPageActive = false;
    this.router.navigate(['/']);
  }

  filterAgents() {
    const search = this.agentSearch.toLowerCase();
    const status = this.statusFilter;
    
    this.filteredAgents = this.agent.filter(agent => {
      const matchesSearch =
      agent.name.toLowerCase().includes(search);
      
      const matchesStatus =
      status === 'all' || agent.status.toLowerCase() === status;
      
      return matchesSearch && matchesStatus;
    });
  }

  
  assignAgent(agentAssign: string) {
    this.agentId = agentAssign;
    return this.agentId;
  }  
}
