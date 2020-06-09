import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class CommonService {
  cartItem: any;
  
  constructor() { }
  // Increase Count
  increaseCount(item) {
    item.count += 1;
    // let isExist = true;
    const data = {
      productID: item.productID,
      productName: item.productName,
      categoryID: item.categoryID,
      categoryName: item.categoryName,
      productPrice: item.productPrice,
      productQuantity: item.count,
      productTtlQtyPrice: item.count * item.productPrice
    };
    console.log('Product QTY Total Price', data);
    if (this.cartItem && this.cartItem.length > 0) {
      this.cartItem.filter((res) => {
        if (res.productID === item.productID) {
          return res.productQuantity = item.count, res.productTtlQtyPrice = item.count * item.productPrice;
        }
       });
      const isExist = this.cartItem.some(el => el.productID === item.productID);
      console.log('isExist: ', isExist);
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
    item.count -= 1;
    if (this.cartItem.length > 0) {
      const productIndex = this.cartItem.findIndex(obj => obj.productID === item.productID);
      this.cartItem[productIndex].productQuantity -= 1;
      this.cartItem[productIndex].productTtlQtyPrice = this.cartItem[productIndex].productQuantity * this.cartItem[productIndex].productPrice;
      if (this.cartItem[productIndex].productQuantity === 0 ) {
        this.cartItem.splice(productIndex, 1);
      }
      return this.cartItem;
    }
  }
}
