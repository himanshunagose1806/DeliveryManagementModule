import { Component } from '@angular/core';
import { DeliveryService } from './delivery.service';
import Delivery from './Delivery';
import { Router } from '@angular/router';

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
}
