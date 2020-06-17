import { Component, OnInit, ElementRef, HostListener, ViewChild } from '@angular/core';
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
    private commonService: CommonService,
    private cartService: CartService) { }

  ngOnInit() {
    this.productService.getProducts().subscribe(
      res => {
        this.productsList = res.data;
      }
    );
    this.productService.getCategories().subscribe(
      res => {
        this.categoryList = res.data;
      }
    );
    this.cartItem = this.singletonService.getCartItems();

    this.singletonService.$productQuantityObservable.subscribe(
      (received) => {
        console.log('received list page', received);
        if (received.productID > 0) {
          console.log('received list page', this.productsList);
          for (let products = 0; products < this.productsList.length; products++) {
            for (let i = 0; i < this.productsList[products].length; i++) {
             const index =  this.productsList[products][1].findIndex(item => item.productID === received.productID);
             const array = this.productsList[products][1];
             console.log('index', index, array);
             if (index >= 0) {
              array[index].productQuantity = received.productQuantity;
             }
            /* if (projects[i].value == value) {
               projects[i].desc = desc;
               break; //Stop this loop, we found it!
            } */
          }
        }
         /*    const ProductIndex = this.productsList.findIndex(item => item.ProductID === received.productID);
            this.productsList[ProductIndex].productQuantity = received.productQuantity; */
          console.log('received list page', this.productsList);
        }

    });
  }

// Increase Count
  addQuantity(item) {
    this.cartItem = this.commonService.increaseCount(item);
    this.singletonService.setCartItems(this.cartItem);
    this.cartService.saveCart(this.cartItem);
    this.singletonService.notifyMetaDataChanged(true);
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
    const yourheight = 200;
    console.log("Ele", ele);
    ele.scrollIntoView(true);    
    //ele.scrollIntoView({behavior: 'smooth'});
    var scrolledY = window.scrollY;
    if(scrolledY){
      window.scroll(0, scrolledY - yourheight);
    }    
  }
  // @HostListener('scroll', ['$event']) // for scroll events of the current element
  @HostListener('window:scroll', ['$event']) // for window scroll events
  onScroll(event) {
    console.log("Window Page Y off", window.pageYOffset); 
  }

}
