import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiProxy } from '../../api.proxy';
import { AppSettings } from 'src/app/app.settings';
@Injectable({
  providedIn: 'root'
})
export class PagesService {
  emailemitter: EventEmitter<any> = new EventEmitter();
  private baseUrl: string = AppSettings.microservices.gateway_MicroService_BaseUrl;
  constructor(private apiProxy: ApiProxy, private http: HttpClient) { }

  /**
   * This function for User Registration
   * @param username
   * @param password
   */
  public registration(data) {
    console.log(data);
    return this.apiProxy.post(this.baseUrl + '/user/register', data)
    .pipe();

  }
  public checkEmailExist(userEmail) {
    return this.apiProxy.post(this.baseUrl + '/user/emailExist', {userEmail});
  }
  public verifyOTP(data) {
    return this.apiProxy.post(this.baseUrl + '/user/verfiyPIN', data);
  }
  public updateNewPassword(data) {
    return this.apiProxy.put(this.baseUrl + '/user/resetPwd', data);
  }

  public forgotPassword(input) {
    return this.apiProxy.post(this.baseUrl + '/user/forgotPwd', input);
  }
}
