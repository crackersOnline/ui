import { Injectable } from '@angular/core';
import { AppSettings } from 'src/app/app.settings';
import { ApiProxy } from 'src/app/api.proxy';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MyAccountService {
  private authUrl: string = AppSettings.microservices.gateway_MicroService_BaseUrl;
  constructor(private apiproxy:ApiProxy, private http:HttpClient) { }

  getMyProfile() {
    // console.log('this.getMyProfile');
    return this.apiproxy.get(this.authUrl + '/myaccount/fetchMyprofile').pipe();
  }

  getMyOrders() {
    return this.apiproxy.get(this.authUrl + '/myaccount/fetchMyOrders').pipe();
  }

  getDeliveryAddress(input) {
    return this.apiproxy.post(this.authUrl + '/myaccount/fetchDeliveryAddress', input);
  }
  
}
