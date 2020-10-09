import { Component, OnInit, ElementRef, HostListener, ViewChild, OnDestroy } from '@angular/core';
import { ProductService } from '../product.service';
import { AppSingletonService } from 'src/app/app.singleton.service';
import { CommonService } from 'src/app/common/services/common.service';
import { AuthService } from 'src/app/common/services/auth.service';
import { Subscription } from 'rxjs';
import { DialogBoxComponent } from 'src/app/fragments/core/dialog-box/dialog-box.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {
  public cartItem: any[];
  productsList: any =  [];
  categoryList: any;
  productQtySubscription: Subscription;
  constructor(
    private productService: ProductService,
    private singletonService: AppSingletonService,
    private commonService: CommonService,
    private authService: AuthService,
    private dialog:MatDialog) { }

  ngOnInit() {
    this.authService.getCartItems().subscribe((cartItem) => {
      this.cartItem = [];
      if (cartItem && cartItem.code === 200) {
        this.singletonService.setCartItems(cartItem.data);
        this.singletonService.notifyMetaDataChanged(true);
        this.cartItem = cartItem.data;
        // console.log('success login & cart Item', this.cartItem);
      }
    },
    (error) => {
      console.log('get cart item error', error);
    },
    () => {
       this.productService.getProducts().subscribe(
        res => {
          this.productsList = (this.cartItem.length > 0) ? this.cartItemChange(res.data) : res.data;
        }
      );
       this.productService.getCategories().subscribe(
        res => {
          this.categoryList = res.data;
        }
      );
    });
    this.productQtyChange();
  }

  cartItemChange(product) {
    let cartItemList = this.cartItem;
    if (cartItemList && cartItemList.length > 0 && product.length > 0) {
       cartItemList = cartItemList.filter(
        cartItem => {
          if (cartItem.productID > 0) {
            product.forEach(productArr => {
              if (productArr[0] === cartItem.categoryName) {
                  const index =  productArr[1].findIndex(item => item.productID === cartItem.productID);
                  if (index >= 0) {
                    productArr[1][index].productQuantity = parseInt(cartItem.productQuantity, 10);
                   }
              }
          });
        }
      }
      );
    }
    return product;
  }


  productQtyChange() {
    this.productQtySubscription = this.singletonService.$productQuantityObservable.subscribe(
      (received) => {
        // console.log('received', received);
         if (received.productID > 0 && this.productsList.length > 0) {
          this.productsList.forEach(productArr => {
            if (productArr[0] === received.categoryName) {
                const index =  productArr[1].findIndex(item => item.productID === received.productID);
                if (index >= 0) {
                  productArr[1][index].productQuantity = parseInt(received.productQuantity, 10);
                 }
            }
          });

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
  }
  // Dialog box
  openDialog(productItem) {
    this.dialog.open(DialogBoxComponent, {
      data:productItem,
      width: '300px',        
      panelClass: 'custom-modalbox'
    });
  }
// Scroll function
  scroll(el) {
    const ele = document.getElementById(el);
    const yourheight = 200;
    // console.log('Ele', ele);
    ele.scrollIntoView(true);
    // ele.scrollIntoView({behavior: 'smooth'});
    const scrolledY = window.scrollY;
    if (scrolledY) {
      window.scroll(0, scrolledY - yourheight);
    }
  }
  // @HostListener('scroll', ['$event']) // for scroll events of the current element
  @HostListener('window:scroll', ['$event']) // for window scroll events
  onScroll(event) {
    // console.log('Window Page Y off', window.pageYOffset);
  }
  ngOnDestroy() {
    if (this.productQtySubscription) {
      this.productQtySubscription.unsubscribe();
    }
  }

}
