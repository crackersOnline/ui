import { Component, OnInit, Output, EventEmitter, OnChanges, SimpleChanges, DoCheck } from '@angular/core';
import { AppSingletonService } from 'src/app/app.singleton.service';
import { CommonService } from 'src/app/common/services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationComponent } from '../../core/notification/notification.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, DoCheck {
  @Output() cartDetailEmit = new EventEmitter();
  public itemCount;
  public cartItem;
  public totalProductPrice = 0;
  public totalProductQuantity = 0;
  public totalMRPPrice = 0;
  public totalSavingPrice = 0;
  public couponCode = '';
  public totalProductPriceWithCoupon = 0;
  public couponAppliedAmt = 0;
  public OldCouponCode = '';
  public path: any;
  public applyCouponDesign = true;
  public couponCodeError;
  public couponName;
  constructor( private singletonService: AppSingletonService, private commonService: CommonService, private router: Router,
               private activatedRoute: ActivatedRoute, public snackBar: MatSnackBar  ) { }

  ngOnInit() {
    this.path = this.activatedRoute.snapshot.url[0].path;
    console.log('this.path', this.path);
    this.singletonService.$metadataChangeObservable.subscribe(
      (received) => {
        if (received) {
          this.cartItem = this.singletonService.getCartItems();
          if (this.cartItem) {
            this.itemCount = this.cartItem.length;
            this.totalProductQuantity = this.cartItem.reduce((a, b) => a + (parseFloat(b.productQuantity) || 0), 0);
            this.totalProductPrice =
            this.cartItem.reduce((a, b) => a + (parseFloat(b.productQuantity) * parseFloat(b.productPrice) || 0), 0);
            this.totalMRPPrice = this.cartItem.reduce((a, b) => a + (parseFloat(b.productQuantity) * parseFloat(b.productMRP) || 0), 0);
            this.totalSavingPrice = this.totalMRPPrice - this.totalProductPrice;
            console.log('this.totalProductPrice', this.totalProductQuantity, this.totalProductPrice, this.totalMRPPrice);

            console.log('localStorage.getItem', localStorage.getItem('appliedCoupon'));
            if (localStorage.getItem('appliedCoupon')) {
              this.couponCode = localStorage.getItem('appliedCoupon');
              this.applyCoupon();
            } else {
              this.totalProductPriceWithCoupon = this.totalProductPrice;
            }
            console.log('after this.couponCode', localStorage.getItem('appliedCoupon'));
            this.cartDetailEmit.emit({
              cartItem: this.cartItem,
              itemCount: this.itemCount,
              totalProductQuantity: this.totalProductQuantity,
              totalProductPrice: this.totalProductPrice,
              totalMRPPrice: this.totalMRPPrice,
              totalSavingPrice: this.totalSavingPrice,
              couponApplied: (localStorage.getItem('appliedCoupon')) ? localStorage.getItem('appliedCoupon') : '',
              couponAppliedAmt: this.couponAppliedAmt,
              totalProductPriceWithCoupon: this.totalProductPriceWithCoupon
            });
          }
        }
      }
    );
  }

  ngDoCheck() {
    if (this.couponCode !== this.OldCouponCode) {
    //console.log('ngDoCheck');
    this.cartDetailEmit.emit({
              cartItem: this.cartItem,
              itemCount: this.itemCount,
              totalProductQuantity: this.totalProductQuantity,
              totalProductPrice: this.totalProductPrice,
              totalMRPPrice: this.totalMRPPrice,
              totalSavingPrice: this.totalSavingPrice,
              couponApplied: (localStorage.getItem('appliedCoupon')) ? localStorage.getItem('appliedCoupon') : '',
              couponAppliedAmt: this.couponAppliedAmt,
              totalProductPriceWithCoupon: this.totalProductPriceWithCoupon
            });
          }
    this.OldCouponCode = this.couponCode;
        }

  // Increase Count
  addQuantity(item) {
    this.cartItem = this.commonService.increaseCount(item, this.cartItem);
    this.singletonService.setCartItems(this.cartItem);
    this.commonService.saveCart(item).subscribe(res => console.log(res));
    this.singletonService.changeProductQuantity(item);
    this.singletonService.notifyMetaDataChanged(true);
  }

  // Decrease Count
  minusQuantity(item) {
    console.log('minusquant', item);
    if (this.cartItem.length > 0) {
      this.cartItem = this.commonService.decreaseCount(item, this.cartItem);
      this.singletonService.setCartItems(this.cartItem);
      this.commonService.saveCart(item).subscribe(res => console.log(res));
      this.singletonService.changeProductQuantity(item);
      this.singletonService.notifyMetaDataChanged(true);
    }
  }
  checkoutProduct() {
    this.router.navigate(['checkout']);
  }

  applyCoupon() {
    this.totalProductPriceWithCoupon = this.totalProductPrice;
    if (this.couponCode) {
      const coupon = this.couponCode;
      this.commonService.getCoupon({couponCode:  this.couponCode}).subscribe(
        (res: any) => {
          console.log('couponCode', coupon, res);
          if (res) {
            if (res.recCount > 0) {
              const currDateTime:any=new Date(),
                    vaildOn:any = new Date(res.data[0].validOn),
                    expired = (vaildOn.getTime() - currDateTime.getTime()) / 1000;
              if(expired <=0) {
                this.snackBar.openFromComponent(NotificationComponent, {
                  data: "Coupon is expired. Try valid coupon",
                  panelClass: 'error'
                });
              } else {
                if(this.totalProductPrice >= 1000) {
                  localStorage.setItem('appliedCoupon', coupon);
                  this.couponAppliedAmt = res.data[0].couponValue;
                  this.totalProductPriceWithCoupon = this.totalProductPrice - res.data[0].couponValue;
                  this.applyCouponDesign = false;
                  this.couponName = coupon;
                  this.snackBar.openFromComponent(NotificationComponent, {
                    data: "'"+coupon+"' applied. " +"Rs."+res.data[0].couponValue +" savings with this coupon",
                    panelClass: 'sucesss'
                  });
                } else {
                  localStorage.removeItem('appliedCoupon');
                  this.couponAppliedAmt = 0;
                  this.applyCouponDesign = true;
                  console.log("Coupon code applicable for cart value Rs.1000 or above");
                  this.snackBar.openFromComponent(NotificationComponent, {
                    data: "Coupon code applicable for cart value Rs.1000 or above",
                    panelClass: 'error'
                  });
                }
              }              
            } else {
              console.log('202');
              localStorage.removeItem('appliedCoupon');
              this.couponAppliedAmt = 0;
              this.applyCouponDesign = true;
              this.couponCodeError = "couponCodeError_alert";
            }
          }          
          this.couponCode = '';
        },
        err => {
          console.log("Error:",err);
        }
      );
    }
    else {
      this.couponCodeError = "couponCodeError_alert";
    }
  }
  couponValidation() {
    console.log("blur start");
    if(this.couponCode){
      console.log("if blur start");
      this.couponCodeError = "";
    } else {
      console.log("else blur start");
      this.couponCodeError = "couponCodeError_alert";
    }    
  }
  removeCoupon() {
    localStorage.removeItem('appliedCoupon');
    this.couponAppliedAmt = 0;
    this.applyCouponDesign = true;
    this.totalProductPriceWithCoupon = this.totalProductPrice;
    this.snackBar.openFromComponent(NotificationComponent, {
      data: "Coupon Removed",
      panelClass: 'error'
    });
  }

  convertToInt(param) {
    return parseInt(param, 10);
  }

}
