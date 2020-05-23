import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiProxy } from '../../api.proxy';
import { AppSettings } from 'src/app/app.settings';
@Injectable({
  providedIn: 'root'
})
export class PagesService {
  emailemitter: EventEmitter<any> = new EventEmitter();
  private authUrl: string = AppSettings.microservices.gateway_MicroService_BaseUrl;
  constructor(private apiProxy: ApiProxy, private http: HttpClient) { }

  /**
   * This function for User Registration
   * @param username 
   * @param password 
   */
  public registration(data) {
    console.log(data);
    return this.apiProxy.post(this.authUrl + '/user/register', data)
    .pipe();

  }
  
}
