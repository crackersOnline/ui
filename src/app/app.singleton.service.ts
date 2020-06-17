import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppSingletonService {
  public cartInfo: any;
  public userInfo: any;
  private productQuantitySource: BehaviorSubject<any> = new BehaviorSubject({});
  $productQuantityObservable = this.productQuantitySource.asObservable();
  private metadataChange: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public $metadataChangeObservable = this.metadataChange.asObservable();
  constructor() { }
  public setCartItems(data) {
    this.cartInfo = data;
  }
  public getCartItems() {
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
    console.log('productQuantityObservable', this.$productQuantityObservable);
  }
}
