
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiProxy } from '../../api.proxy';
import { environment } from '../../../environments/environment';
// import * as jwt_decode from 'jwt-decode';
// import { v4 as uuid } from 'uuid';
import { AppSettings } from '../../app.settings';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppSingletonService } from 'src/app/app.singleton.service';
// import { CommonFunctionsHelper } from '../helpers/common-functions.helper';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private authUrl: string = AppSettings.microservices.gateway_MicroService_BaseUrl;

    constructor(private apiProxy: ApiProxy, private http: HttpClient, private singletonService: AppSingletonService) {
    }
/*
    private generateUUID() {
        let uid = uuid();
        uid = uid.replace(/[^\w\s]/gi, '');
        return uid;
    }

    public getDecodedAccessToken(token: string): any {
        let tokenDecode: any;
        try {
            tokenDecode = jwt_decode(token);
        } catch (Error) {
            tokenDecode = null;
        }
        return tokenDecode;
    }

    public getOpenIdToken() {
        const stateKey = this.generateUUID();
        const nonceKey = this.generateUUID();
        localStorage.setItem('nonce_key', nonceKey);
        const oAuthUrlWithQueryString = environment.oAuthUrl +
            '?client_id=' + environment.oAuthClientId +
            '&redirect_uri=' + environment.oAuthRedirctUrl +
            '&response_type=id_token token' +
            '&state=' + stateKey +
            '&nonce=' + nonceKey +
            '&scope=NoMFA openid';
        window.location.replace(oAuthUrlWithQueryString);
    }

    public getUserDetails(sso: string) {
        const data: any = {};
        data.sso = sso;
        return this.apiProxy.post(this.authUrl + 'auth/getUser', data);
    }

    public logoutUser() {
        CommonFunctionsHelper.clearLocalStorageForAuth();
        window.location.href = environment.oAuthLogoutUrl;
    } */

    public login(userEmail: string, password: string): Observable<any> {
        return this.apiProxy.post(this.authUrl + '/user/auth', { userEmail, password})
            .pipe(
                map((result: any) => {
                    localStorage.setItem('access_token', result.token);
                    localStorage.setItem('userEmail', result.userEmail);
                    this.singletonService.setUserInfo(result);
                    return true;
                })
            );
    }

    public logout() {
        localStorage.removeItem('access_token');
        localStorage.removeItem('userName');
    }

    public get loggedIn(): boolean {
        return (localStorage.getItem('access_token') !== null);
    }

    public verifyToken() {
        return this.apiProxy.post(this.authUrl + '/user/tokenVerify/', { token: localStorage.getItem('access_token') })
            .pipe(
                map((res: any) => {
                    localStorage.setItem('access_token', res.token);
                    localStorage.setItem('userEmail', res.userEmail);
                    this.singletonService.setUserInfo(res);
                    return true;
                })
            );
    }
}
