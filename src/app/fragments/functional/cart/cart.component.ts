import { Component, OnInit } from '@angular/core';
import { AppSingletonService } from 'src/app/app.singleton.service';

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
  constructor( private singletonService: AppSingletonService ) { }

  ngOnInit() {
    this.singletonService.metadataChangeObservable.subscribe(
      (received) => {
        if (received) {
          this.cartItem = this.singletonService.getCartItems();
          console.log('this.cartitem', this.cartItem);
          this.itemCount = this.cartItem.length;
          this.totalProductQuantity = this.cartItem.reduce((a, b) => a + (parseFloat(b.productQuantity) || 0), 0);
          this.totalProductPrice = this.cartItem.reduce((a, b) => a + (parseFloat(b.productQuantity) * parseFloat(b.productPrice) || 0), 0);

          console.log('this.totalValue', this.totalProductPrice);
        }
      }
    );
  }

}
