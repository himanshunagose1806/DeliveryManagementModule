import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DeliveryService {

  constructor(private delivery : HttpClient) { }

  strUrl : string = "http://localhost:3000/DeliveryAgent";

  getAllData() : Observable <any> {
    return this.delivery.get(this.strUrl);
  }

  public isDeliveryPageActive = false;
}
