import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AgentsComponent } from './agents/agents.component';
import { AgentDashboardComponent } from './agent-dashboard/agent-dashboard.component';
import { AdminNavbarComponent } from './admin-navbar/admin-navbar.component';
import { AdminFooterComponent } from './admin-footer/admin-footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { OrdersComponent } from './orders/orders.component';

const routes: Routes = [
  { path : 'navbar', component : NavbarComponent},
  { path : 'admin-dashboard', component : AdminDashboardComponent},
  { path : 'agents', component : AgentsComponent },
  { path : 'agent-dashboard', component : AgentDashboardComponent },
  { path : 'admin-navbar', component : AdminNavbarComponent},
  { path : 'admin-footer', component : AdminFooterComponent},
  { path : 'orders', component : OrdersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
