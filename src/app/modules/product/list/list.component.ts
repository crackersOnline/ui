import { Component, OnInit, ElementRef } from '@angular/core';
import { ProductService } from '../product.service';
import { AppSingletonService } from 'src/app/app.singleton.service';
import { CommonService } from 'src/app/common/services/common.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  public cartItem = [];
  productsList: any =  [];
  categoryList: any;
  constructor(
    private productService: ProductService,
    private myElement: ElementRef,
    private singletonService: AppSingletonService,
    private commonService: CommonService) { }

  ngOnInit() {
    this.productService.getProducts().subscribe(
      res => {
        this.productsList = res.data;
        this.productQtyChange();
      }
    );
    this.productService.getCategories().subscribe(
      res => {
        this.categoryList = res.data;
      }
    );
    this.cartItem = this.singletonService.getCartItems();
    console.log('this.cartItem', this.cartItem);
  //  this.productQtyChange();
  }

  productQtyChange() {
    this.singletonService.$productQuantityObservable.subscribe(
      (received) => {
         console.log('received', received);
         if (received.productID > 0 && this.productsList.length > 0) {
          this.productsList.forEach(productArr => {
            if (productArr[0] === received.categoryName) {
                const index =  productArr[1].findIndex(item => item.productID === received.productID);
                if (index >= 0) {
                  productArr[1][index].productQuantity = parseInt(received.productQuantity);
                 }
            }
           // console.log('received list page', this.productsList);
          });
          /*
          for (let products = 0; products < this.productsList.length; products++) {
            for (let i = 0; i < this.productsList[products].length; i++) {
             const index =  this.productsList[products][1].findIndex(item => item.productID === received.productID);
             const array = this.productsList[products][1];
             console.log('index', index, array);
             if (index >= 0) {
              array[index].productQuantity = received.productQuantity;
             }
          }
        } */
         /*    const ProductIndex = this.productsList.findIndex(item => item.ProductID === received.productID);
            this.productsList[ProductIndex].productQuantity = received.productQuantity; */

        }

    });
  }

// Increase Count
  addQuantity(item) {
    this.cartItem = this.commonService.increaseCount(item, this.cartItem);
    this.singletonService.setCartItems(this.cartItem);
    this.commonService.saveCart(item).subscribe(res => console.log(res));
    this.singletonService.notifyMetaDataChanged(true);
  }

  // Decrease Count
  minusQuantity(item) {
    item.productQuantity -= 1;
    if (this.cartItem.length > 0) {
      this.cartItem = this.commonService.decreaseCount(item, this.cartItem);
      this.singletonService.setCartItems(this.cartItem);
      this.commonService.saveCart(item).subscribe(res => console.log(res));
      this.singletonService.notifyMetaDataChanged(true);
    }
    console.log('minusquant', item, this.cartItem);
  }

// Scroll function
  scroll(el) {
    const ele = document.getElementById(el);
    ele.scrollIntoView({behavior: 'smooth'});
  }

}
