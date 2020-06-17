import { Component, OnInit } from '@angular/core';
import { AppSingletonService } from 'src/app/app.singleton.service';
import { CommonService } from 'src/app/common/services/common.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  public itemCount;
  public cartItem;
  public totalProductPrice = 0;
  public totalProductQuantity = 0;
  public totalMRPPrice = 0;
  public totalSavingPrice = 0;
  constructor( private singletonService: AppSingletonService, private commonService: CommonService ) { }

  ngOnInit() {
    this.singletonService.$metadataChangeObservable.subscribe(
      (received) => {
        if (received) {
          this.cartItem = this.singletonService.getCartItems();
          this.itemCount = this.cartItem.length;
          this.totalProductQuantity = this.cartItem.reduce((a, b) => a + (parseFloat(b.productQuantity) || 0), 0);
          this.totalProductPrice = this.cartItem.reduce((a, b) => a + (parseFloat(b.productQuantity) * parseFloat(b.productPrice) || 0), 0);
          this.totalMRPPrice = this.cartItem.reduce((a, b) => a + (parseFloat(b.productQuantity) * parseFloat(b.productMRP) || 0), 0);
          this.totalSavingPrice = this.totalMRPPrice - this.totalProductPrice;
        }
      }
    );
  }
  // Increase Count
  addQuantity(item) {
    this.cartItem = this.commonService.increaseCount(item);
    this.singletonService.setCartItems(this.cartItem);
    this.singletonService.changeProductQuantity(item);
    this.commonService.saveCart(this.cartItem).subscribe(res => console.log(res));
    this.singletonService.notifyMetaDataChanged(true);
  }

  // Decrease Count
  minusQuantity(item) {
    console.log('minusquant', item);
    if (this.cartItem.length > 0) {
      this.cartItem = this.commonService.decreaseCount(item);
      this.singletonService.setCartItems(this.cartItem);
      this.singletonService.changeProductQuantity(item);
      this.commonService.saveCart(this.cartItem).subscribe(res => console.log(res));
      this.singletonService.notifyMetaDataChanged(true);
    }
  }

}
