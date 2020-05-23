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
  productsList:any;
  categoryList:any;
  constructor(private productService:ProductService, private myElement: ElementRef, private singletonService:AppSingletonService) { }

  ngOnInit() {
    this.productService.getProducts().subscribe(
      res=> {
        this.productsList = res.data;
        console.log("products",res.data);
      }
    );
    this.productService.getCategories().subscribe(
      res=> {
        this.categoryList = res.data;
        console.log("Categories",res.data);
      }
    );
    this.cartItem = this.singletonService.getCartItems();
    console.log("Onnit", this.cartItem);
  }  
  addQuantity(item){        
    item.count += 1;
    // let isExist = true;
    let data = {
      productID:item.productID,
      productName:item.productName,
      prouductPrice:item.prouductPrice,
      productQuantity:item.count
    };
    if(this.cartItem && this.cartItem.length>0) {
      this.cartItem.filter(res => {
        if(res.productID===item.productID) {
          return res.productQuantity = item.count;
        } 
       })
       let isExist = this.cartItem.some(function(el){ return el.productID === item.productID});
       console.log("isExist: ",isExist);
       if(isExist === false) {
        this.cartItem.push(data);
       }
    }
    else {
      this.cartItem=[];
      this.cartItem.push(data);
    }
    // this.cartItem.push(data);
    this.singletonService.setCartItems(this.cartItem);
    console.log("Cart Item", this.singletonService.getCartItems());
  }
  minusQuantity(item) {
    item.count -= 1;
  }
  scroll(el) {    
    let ele = document.getElementById(el);
    ele.scrollIntoView({behavior: "smooth"})    
  }
}
