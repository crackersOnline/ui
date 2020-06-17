import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CommonService {
  cartItem: any;
  private loadingSpinner = new Subject<boolean>();
  public $loadingSpinnerObservable = this.loadingSpinner.asObservable();
  sendSpinnerStatus(loadingStatus: boolean) {
    this.loadingSpinner.next(loadingStatus);
  }
  constructor() { }
  // Increase Count
  increaseCount(item) {
    item.productQuantity += 1;
    // let isExist = true;
    const data = {
      productID: item.productID,
      productName: item.productName,
      categoryID: item.categoryID,
      categoryName: item.categoryName,
      productPrice: item.productPrice,
      productQuantity: item.productQuantity,
      productTtlQtyPrice: item.productQuantity * item.productPrice,
      productMRP: item.productMRP
    };
    if (this.cartItem && this.cartItem.length > 0) {
      this.cartItem.filter((res) => {
        if (res.productID === item.productID) {
          res.productQuantity = item.productQuantity;
          res.productTtlQtyPrice = item.productQuantity * item.productPrice;
          return res;
        }
       });
      const isExist = this.cartItem.some(el => el.productID === item.productID);
      if (isExist === false) {
        this.cartItem.push(data);
       }
    } else {
      this.cartItem = [];
      this.cartItem.push(data);
    }
    // this.cartItem.push(data);
    return this.cartItem;
  }

  // Decrease Count
  decreaseCount(item) {
    if (this.cartItem.length > 0) {
      const productIndex = this.cartItem.findIndex(obj => obj.productID === item.productID);
      this.cartItem[productIndex].productQuantity -= 1;
      // tslint:disable-next-line: max-line-length
      this.cartItem[productIndex].productTtlQtyPrice = this.cartItem[productIndex].productQuantity * this.cartItem[productIndex].productPrice;
      if (this.cartItem[productIndex].productQuantity === 0 ) {
        this.cartItem.splice(productIndex, 1);
      }
      return this.cartItem;
    }
  }
}
