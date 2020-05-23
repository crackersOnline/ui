import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppSingletonService {
  public cartInfo:any;
  constructor() { }
  public setCartItems(data) {
    this.cartInfo = data;
  }
  public getCartItems() {
    console.log("getCartItems", this.cartInfo);
    return this.cartInfo;    
  }
}