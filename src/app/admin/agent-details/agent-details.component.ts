import { Component } from '@angular/core';
import { AdminDataService } from '../admin-data.service';

@Component({
  selector: 'app-agent-details',
  standalone: false,
  templateUrl: './agent-details.component.html',
  styleUrl: './agent-details.component.css'
})
export class AgentDetailsComponent {
  agents: any[] = [];

  constructor(private adminService: AdminDataService) {}

  ngOnInit(): void {
    this.adminService.getAgents().subscribe((data) => {
      this.agents = this.sortAgentsByStatus(data);
    });
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