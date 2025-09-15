import { Component } from '@angular/core';
import { AdminDataService } from '../admin-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agent-details',
  standalone: false,
  templateUrl: './agent-details.component.html',
  styleUrl: './agent-details.component.css'
})
export class AgentDetailsComponent {
  agents: any[] = [];

  constructor(private adminService: AdminDataService, private router : Router) {}

  ngOnInit(): void {
    this.adminService.getAgents().subscribe((data) => {
      this.agents = this.sortAgentsByStatus(data);
    });
  }

  viewAgent(agentId: number): void {
    this.router.navigate(['/admin/agent-dashboard', agentId]);
  }

  sortAgentsByStatus(data: any[]): any[] {
    const statusPriority: { [key: string]: number } = {
      'available': 1,
      'on the way': 2,
      'out for delivery': 3
    };
    return data.sort((a, b) => statusPriority[a.status] - statusPriority[b.status]);
  }
}