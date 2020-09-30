import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})
export class ApiProxy {
// centralized http calls
    constructor(private httpClient: HttpClient) { }

    public get(url: string) {
        return this.httpClient.get<any>(url);
    }

    public post(url, data, options?) {
        if (options) {
            return this.httpClient.post(url, data, options);
        } else {
            return this.httpClient.post(url, data);
        }
    }

    public put(url, data) {
        return this.httpClient.put(url, data);
    }

    public delete(url) {
        return this.httpClient.delete(url);
    }
}
