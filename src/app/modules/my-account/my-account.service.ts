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

  
}
