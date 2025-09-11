import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { HeaderComponent } from './admin/header/header.component';
import { FooterComponent } from './admin/footer/footer.component';
import { AgentAssignmentComponent } from './admin/agent-assignment/agent-assignment.component';
import { OrdersSectionComponent } from './admin/orders-section/orders-section.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AgentDetailsComponent } from './admin/agent-details/agent-details.component';
import { AgentDashboardComponent } from './agent-dashboard/agent-dashboard.component';
import { RestaurantsComponent } from './admin/restaurants/restaurants.component';
import { RestaurantByIDComponent } from './admin/restaurants/restaurant-by-id/restaurant-by-id.component';


// import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
// import { AgentsComponent } from './agents/agents.component';
// import { AgentDashboardComponent } from './agent-dashboard/agent-dashboard.component';
// import { AdminNavbarComponent } from './admin-navbar/admin-navbar.component';
// import { AdminFooterComponent } from './admin-footer/admin-footer.component';
// import { NavbarComponent } from './navbar/navbar.component';
// import { OrdersComponent } from './orders/orders.component';

const routes: Routes = [
  { path : 'navbar', component : NavbarComponent },
  { path : 'agent-dashboard', component : AgentDashboardComponent},
  { path : 'admin', component : AdminComponent,
    children : [
      { path : 'agent-details', component : AgentDetailsComponent},
      { path : 'agent-assignent', component : AgentAssignmentComponent},
      { path : 'dashboard', component : DashboardComponent },
      { path : 'footer', component : FooterComponent},
      { path : 'header', component : HeaderComponent},
      { path : 'order-section', component : OrdersSectionComponent },  
      { path: 'restaurants', component: RestaurantsComponent },
      { path: 'restaurants/:id/menu', component: RestaurantByIDComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
