import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ApiProxy } from 'src/app/api.proxy';
import { AppSettings } from 'src/app/app.settings';
@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private loadingSpinner = new Subject<boolean>();
  public $loadingSpinnerObservable = this.loadingSpinner.asObservable();

  private baseUrl: string = AppSettings.microservices.gateway_MicroService_BaseUrl;
  constructor(private apiProxy: ApiProxy) { }

  sendSpinnerStatus(loadingStatus: boolean) {
    this.loadingSpinner.next(loadingStatus);
  }
  // Increase Count
  increaseCount(item, cartItem) {
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
    if (cartItem && cartItem.length > 0) {
      cartItem.filter((res) => {
        if (res.productID === item.productID) {
          res.productQuantity = item.productQuantity;
          res.productTtlQtyPrice = item.productQuantity * item.productPrice;
          return res;
        }
       });
      const isExist = cartItem.some(el => el.productID === item.productID);
      if (isExist === false) {
        cartItem.push(data);
       }
    } else {
      cartItem = [];
      cartItem.push(data);
    }
    // this.cartItem.push(data);
    return cartItem;
  }

  // Decrease Count
  decreaseCount(item, cartItem) {
    if (cartItem.length > 0) {
      const productIndex = cartItem.findIndex(obj => obj.productID === item.productID);
      cartItem[productIndex].productQuantity -= 1;
      // tslint:disable-next-line: max-line-length
      cartItem[productIndex].productTtlQtyPrice = cartItem[productIndex].productQuantity * cartItem[productIndex].productPrice;
      if (cartItem[productIndex].productQuantity === 0 ) {
        cartItem.splice(productIndex, 1);
      }
      return cartItem;
    }
  }

  public saveCart(inputData) {
    return this.apiProxy.post(this.baseUrl + '/product/cartsave', inputData).pipe();
  }

  public saveAddressBookDetail(inputData) {
    return this.apiProxy.post(this.baseUrl + '/user/addressBook', inputData).pipe();
  }

  public getCoupon(inputData) {
    return this.apiProxy.post(this.baseUrl + '/product/getCoupon', inputData).pipe();
  }
}
