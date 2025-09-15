import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AdminComponent } from './admin/admin.component';
import { HeaderComponent } from './admin/header/header.component';
import { FooterComponent } from './admin/footer/footer.component';
import { AgentAssignmentComponent } from './admin/agent-assignment/agent-assignment.component';
import { OrdersSectionComponent } from './admin/orders-section/orders-section.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AgentDetailsComponent } from './admin/agent-details/agent-details.component';
import { AgentDashboardComponent } from './admin/agent-dashboard/agent-dashboard.component';
import { RestaurantsComponent } from './admin/restaurants/restaurants.component';
import { RestaurantByIDComponent } from './admin/restaurants/restaurant-by-id/restaurant-by-id.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';

@NgModule({
  declarations: [
    NavbarComponent,
    AppComponent,
    NavbarComponent,
    OrdersSectionComponent,
    AdminComponent,
    HeaderComponent,
    FooterComponent,
    AgentAssignmentComponent,
    OrdersSectionComponent,
    AgentDetailsComponent,
    AgentDashboardComponent,
    RestaurantsComponent,
    RestaurantByIDComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    DashboardComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
