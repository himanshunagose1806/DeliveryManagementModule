import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AdminNavbarComponent } from './admin-navbar/admin-navbar.component';
import { AgentsComponent } from './agents/agents.component';
import { AgentDashboardComponent } from './agent-dashboard/agent-dashboard.component';
import { AdminFooterComponent } from './admin-footer/admin-footer.component';
import { OrdersComponent } from './orders/orders.component';

@NgModule({
  declarations: [
    NavbarComponent,
    AppComponent,
    AdminDashboardComponent,
    NavbarComponent,
    AdminNavbarComponent,
    AgentsComponent,
    AgentDashboardComponent,
    AdminFooterComponent,
    OrdersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
