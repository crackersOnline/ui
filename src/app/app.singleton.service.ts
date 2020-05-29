import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppSingletonService {
  public cartInfo:any;
  private $metadataChange: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public metadataChangeObservable = this.$metadataChange.asObservable();
  constructor() { }
  public setCartItems(data) {
    this.cartInfo = data;
  }
  public getCartItems() {
    console.log("getCartItems", this.cartInfo);
    return this.cartInfo;    
  }
  public notifyMetaDataChanged(isReady: boolean) {
   this.$metadataChange.next(isReady);
  }
}