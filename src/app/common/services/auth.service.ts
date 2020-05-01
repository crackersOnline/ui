/*
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiProxy } from '../../api.proxy';
import { environment } from '../../../environments/environment';
import * as jwt_decode from 'jwt-decode';
import { v4 as uuid } from 'uuid';
import { AppSettings } from '../../app.settings';
import { CommonFunctionsHelper } from '../helpers/common-functions.helper';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private authUrl: string = AppSettings.microservices.Gateway_MicroService_BaseUrl;

    constructor(private apiProxy: ApiProxy, private http: HttpClient) {
    }

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
    }
}
 */
