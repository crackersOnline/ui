import { Injectable } from '@angular/core';
import { AppSettings } from 'src/app/app.settings';
import { ApiProxy } from 'src/app/api.proxy';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private baseUrl: string = AppSettings.microservices.gateway_MicroService_BaseUrl;
  constructor(private apiProxy: ApiProxy, http: HttpClient) { }

  public saveCart(inputData) {
    return this.apiProxy.post(this.baseUrl + '/product/cartsave', inputData);
  }

}
