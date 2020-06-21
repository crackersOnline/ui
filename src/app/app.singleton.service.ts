import { Injectable, OnDestroy } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppSingletonService implements OnDestroy {
  constructor() {
    console.log('constructor data', this.cartInfo);
  }
  public cartInfo: any = [];
  public userInfo: any;
  private productQuantitySource: BehaviorSubject<any> = new BehaviorSubject({});
  $productQuantityObservable = this.productQuantitySource.asObservable();
  private metadataChange: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public $metadataChangeObservable = this.metadataChange.asObservable();

  public setCartItems(data) {
    console.log('setCartItems data', data, this.cartInfo);
    this.cartInfo = data;
  }
  public getCartItems() {
    console.log('getCart data', this.cartInfo);
    return this.cartInfo;
  }
  public notifyMetaDataChanged(isReady: boolean) {
   this.metadataChange.next(isReady);
  }

  public setUserInfo(data) {
    this.userInfo = data;
  }
  public getUserInfo() {
    return this.userInfo;
  }

  public changeProductQuantity(data) {
    this.productQuantitySource.next(data);
    console.log('productQuantityObservable', data);
  }

  public clearCartItems() {
    return this.cartInfo = null;
  }

  ngOnDestroy() {
    console.log('ng ondestroy');
    this.cartInfo = null;
    this.userInfo = null;
  }
}
