import { Component } from '@angular/core';

@Component({
  selector: 'app-orders',
  standalone: false,
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent {
  orders = [
    {
      orderId : 'FD103',
      customerName : 'Ashish Mehta',
      address : '12 MG Road, Coimbatore',
      items : ['Pizza', 'Coke'],
      status : 'Pending',
      agentName : ''
    },
    {
      orderId : 'FD105',
      customerName : 'Karan Singh',
      address : 'Nagar Road, Chennai',
      items : ['Pizza', 'Burger', 'Coke'],
      status : 'Assigned',
      agentName : 'Akash'
    },
    {
      orderId : 'FD102',
      customerName : 'Aman Gupta',
      address : '45 Race Course, Kolkata',
      items : ['Burger', 'Fries'],
      status : 'Pending',
      agentName : ''
    },
  ];

  assignAgent(order: any) {
  order.agentName = 'DemoAgent';
  order.status = 'Assigned';
}
}
