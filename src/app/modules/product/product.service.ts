import { Injectable } from '@angular/core';
import { AppSettings } from 'src/app/app.settings';
import { ApiProxy } from 'src/app/api.proxy';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private authUrl: string = AppSettings.microservices.gateway_MicroService_BaseUrl;
  constructor(private apiProxy: ApiProxy, private http: HttpClient) { }

  getProducts(){
    return this.apiProxy.get(this.authUrl + '/product/productlist').pipe();
  }
  getCategories(){
    return this.apiProxy.get(this.authUrl + '/product/categories').pipe();
  }
}
