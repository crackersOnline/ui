import { Component, OnInit, ElementRef } from '@angular/core';
import { ProductService } from '../product.service';
import { AppSingletonService } from 'src/app/app.singleton.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  public cartItem = [];
  productsList: any;
  categoryList: any;
  constructor(private productService: ProductService, private myElement: ElementRef, private singletonService: AppSingletonService) { }

  ngOnInit() {
    this.productService.getProducts().subscribe(
      res => {
        this.productsList = res.data;
        console.log('products', res.data);
      }
    );
    this.productService.getCategories().subscribe(
      res => {
        this.categoryList = res.data;
        console.log('Categories', res.data);
      }
    );
    this.cartItem = this.singletonService.getCartItems();
    console.log('Onnit', this.cartItem);
  }

// Increase Count
  addQuantity(item) {
    item.count += 1;
    // let isExist = true;
    const data = {
      productID: item.productID,
      productName: item.productName,
      productPrice: item.productPrice,
      productQuantity: item.count,
      productTtlQtyPrice: item.count * item.productPrice
    };
    console.log("Product QTY Total Price")
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
    this.singletonService.setCartItems(this.cartItem);
    this.singletonService.notifyMetaDataChanged(true);
    console.log('Cart Item', this.singletonService.getCartItems());
  }

  // Decrease Count
minusQuantity(item) {
  item.count -= 1;
  if (this.cartItem.length > 0) {
      const productIndex = this.cartItem.findIndex(obj => obj.productID === item.productID);
      this.cartItem[productIndex].productQuantity -= 1;
      this.cartItem[productIndex].productTtlQtyPrice = this.cartItem[productIndex].productQuantity * this.cartItem[productIndex].productPrice;
      if (this.cartItem[productIndex].productQuantity === 0 ) {
        this.cartItem.splice(productIndex, 1);
      }
      console.log('this.cartItem', this.cartItem);

      this.singletonService.setCartItems(this.cartItem);
      this.singletonService.notifyMetaDataChanged(true);
    }
  }

// Scroll function
scroll(el) {
    const ele = document.getElementById(el);
    ele.scrollIntoView({behavior: 'smooth'});
  }
}
