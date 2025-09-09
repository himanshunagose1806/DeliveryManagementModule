import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-agent-dashboard',
  standalone: false,
  templateUrl: './agent-dashboard.component.html',
  styleUrl: './agent-dashboard.component.css'
})
export class AgentDashboardComponent implements OnInit {
  showAvailable = false;
  showActive = false;
  showCompleted = false;
  isChecked1 = false;
  isDisabled1 = false;
  isChecked2 = false;
  isDisabled2 = false;
  isChecked3 = false;
  isDisabled3 = false;

  summary = {
    todayEarnings : 1200,
    totalDeliveries : 45,
    distanceTravelled : 120,
    totalEarnings : 56890 
  };

  availableOrders = [
    {
      orderId : 101,
      pickup : 'Restaurant A',
      drop : 'Customer X',
      distance : '5.2 km',
      time: '14:30',
      customerName : 'Amit',
      mobile : '9647385629'
    },
    {
      orderId : 102,
      pickup : 'Restaurant B',
      drop : 'Customer Y',
      distance : '3.5 km',
      time: '15:00',
      customerName : 'Priya',
      mobile : '9648573939'
    },
    {
      orderId : 103,
      pickup : 'Restaurant C',
      drop : 'Customer Z',
      distance : '6.1 km',
      time: '18:00',
      customerName : 'Rahul',
      mobile : '964739'
    }
  ];

  activeDeliveries = [
    {
      orderId: 103,
      pickup: 'Restaurant C',
      drop: 'Customer Z',
      distance: '6.5 km',
      time: '13:45',
      customerName: 'Rahul',
      mobile: '9988776655',
      status: 'Out for Delivery'
    }
  ];

  completedOrders = [
    {
      orderId: 100,
      pickup: 'Restaurant D',
      drop: 'Customer W',
      distance: '4.0 km',
      time: '12:15',
      customerName: 'Sneha',
      mobile: '9090909090'
    }
  ]

  ngOnInit(): void { }

  acceptOrder(orderId : number) {
    alert(`Accepted Order ${orderId}`);
  }

  declineOrder(orderId : number) {
    alert(`Declined order ${orderId}`);
  }

  toggleSection(section: string) {
    if (section === 'available') this.showAvailable = !this.showAvailable;
    if (section === 'active') this.showActive = !this.showActive;
    if (section === 'completed') this.showCompleted = !this.showCompleted;
  }

  onCheckBoxChange1(event : Event) {
    const checkbox  = event.target as HTMLInputElement;
    this.isChecked1 = checkbox.checked;

    if(this.isChecked1) {
      this.isDisabled1 = true;
    } 
  }
  onCheckBoxChange2(event : Event) {
    const checkbox  = event.target as HTMLInputElement;
    this.isChecked2 = checkbox.checked;

    if(this.isChecked2) {
      this.isDisabled2 = true;
    } 
  }
  onCheckBoxChange3(event : Event) {
    const checkbox  = event.target as HTMLInputElement;
    this.isChecked3 = checkbox.checked;

    if(this.isChecked3) {
      this.isDisabled3 = true;
    } 
  }
}
