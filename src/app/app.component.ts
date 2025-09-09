import { Component } from '@angular/core';
import { DeliveryService } from './delivery.service';
import Delivery from './Delivery';
import { Router } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'deliveryModule';

  constructor(public deliveryState : DeliveryService, private router : Router) { }

  deliveryList! : Delivery[];

  goToDeliveryPage() {
    this.router.navigate(['/admin']);
  }

  showAdminDashboard() {
    this.router.navigate(['/agent']);
  }
}
