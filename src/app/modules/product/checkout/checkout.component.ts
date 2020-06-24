import { Component, OnInit, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit,
  AfterViewChecked,
  OnDestroy,
  OnChanges
 } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  
  constructor() {
    console.log('Constructor called');
   }
   ngOnInit(){    
   }  
}
