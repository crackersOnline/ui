import { Component, OnInit, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit,
  AfterViewChecked,
  OnDestroy,
  OnChanges
 } from '@angular/core';
import { AppSingletonService } from 'src/app/app.singleton.service';
import { ProductService } from '../product.service';
import { AuthService } from 'src/app/common/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationComponent } from 'src/app/fragments/core/notification/notification.component';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/common/services/common.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  cartItem = [];
  deliveryAddressID;
  cartDetails;
  constructor(
    private productService: ProductService,
    private router: Router,
    private commonService: CommonService,
    private authService: AuthService, private singletonService: AppSingletonService, private snackBar: MatSnackBar ) {}
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
    });
   }

   backToShop() {
    this.router.navigate(['products']);
   }
   getCartDetails(event) {
    this.cartDetails = event;
    //console.log('getCartDetails', this.cartDetails);
   }
   oderSave() {
    console.log('oderSave', this.cartDetails);
    if (!this.deliveryAddressID) {
      console.log(this.deliveryAddressID);
      this.snackBar.openFromComponent(NotificationComponent, {
        data: 'Kindly select any one of the Delivery Address',
        panelClass:  'error'
      });
      return false;
    } else {
      const inputData = {
        orderProducts: this.cartItem,
        orderStatus: 'Active',
        paymentMethod: 'COD',
        paymentStatus: 'Inprogress',
        deliveryAddress: this.deliveryAddressID,
        cartAmount: this.cartDetails.totalProductPrice,
        couponApplied: this.cartDetails.couponApplied,
        orderDiscount: this.cartDetails.couponAppliedAmt,
        orderAmount: this.cartDetails.totalProductPriceWithCoupon
      };
      console.log('oderSave', inputData);
      this.productService.saveOrder(inputData).subscribe(
        res => { console.log('res', res);
                 if (res) {
          this.snackBar.openFromComponent(NotificationComponent, {
            data: 'Your order successfully placed.',
            panelClass: 'sucesss'
          });
          localStorage.removeItem('appliedCoupon');
          this.cartItem = [];
          this.singletonService.setCartItems(this.cartItem);
          this.singletonService.notifyMetaDataChanged(true);
          this.router.navigate(['products']);
        }
      },
      (error) => {
        this.snackBar.openFromComponent(NotificationComponent, {
          data: error,
          panelClass: 'error'
        });
      }
      );
    }
   }
}
