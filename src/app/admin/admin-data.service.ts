import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminDataService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  // 🧾 Orders
  getOrders(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/OrderDelivery`);
  }

  getOrderById(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/OrderDelivery/${id}`);
  }

  // 🚚 Delivery Agents
  getAgents(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/DeliveryAgent`);
  }

  getAgentById(agentId: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/DeliveryAgent/${agentId}`);
  }

  updateAgent(agentId: string, update: any): Observable<any> {
    return this.http.patch(`${this.baseUrl}/DeliveryAgent/${agentId}`, update);
  }

  getActiveAgents(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/DeliveryAgent`).pipe(
      map(agents => agents.filter(agent =>
        agent.status === 'on the way' || agent.status === 'out for delivery'
      ))
    );
  }

  // 🔄 Assign Agent to Order
  assignAgentToOrder(orderId: string, agentName: string, agentPhone: string, agentId: string): Observable<any> {
    const orderUpdate = {
      agentName,
      agentContact: agentPhone,
      orderDetails: {
        deliveryStatus: 'assigned',
        eta: 15
      }
    };

    const agentUpdate = {
      status: 'out for delivery',
      currentOrderId: orderId,
      eta: 15
    };

    const order$ = this.http.patch(`${this.baseUrl}/OrderDelivery/${orderId}`, orderUpdate);
    const agent$ = this.http.patch(`${this.baseUrl}/DeliveryAgent/${agentId}`, agentUpdate);
    
    return forkJoin([order$, agent$]);
  }











    // 🍽️ Restaurants & Menus
  getRestaurants(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/Restaurants`);
  }

  getMenuByRestaurantId(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/Menus?restaurantId=${id}`);
  }
}
