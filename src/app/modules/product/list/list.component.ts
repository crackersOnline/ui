import { Component, OnInit, ElementRef } from '@angular/core';
import { ProductService } from '../product.service';
import { AppSingletonService } from 'src/app/app.singleton.service';
import { CartService } from 'src/app/common/services/cart.service';
import { CommonService } from 'src/app/common/services/common.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  public cartItem = [];
  productsList: any;
  categoryList: any;
  constructor(
    private productService: ProductService,
    private myElement: ElementRef,
    private singletonService: AppSingletonService,
    private commonService : CommonService,
    private cartService: CartService) { }

  ngOnInit() {
    this.singletonService.metadataChangeObservable.subscribe(
      (received) => {
        if (received) {
          
        }
      }
    );
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
    this.cartItem = this.commonService.increaseCount(item);
    this.singletonService.setCartItems(this.cartItem);
    this.cartService.saveCart(this.cartItem);
    this.singletonService.notifyMetaDataChanged(true);
    console.log('Cart Item', this.singletonService.getCartItems());
  }

  // Decrease Count
  minusQuantity(item) {    
    if (this.cartItem.length > 0) {
      this.cartItem = this.commonService.decreaseCount(item);
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
