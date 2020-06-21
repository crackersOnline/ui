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
export class CheckoutComponent implements OnInit, DoCheck, AfterContentInit, AfterContentChecked,
AfterViewInit,
AfterViewChecked,
OnDestroy, OnChanges {

  constructor() {
    console.log('Constructor called');
   }

  title = 'app';
  usertext = '';

  ngOnInit() {
    console.log('ngOnInit called');
  }
  ngDoCheck() {
    console.log('ngDoCheck called');
  }
  ngAfterContentInit() {
    console.log('ngAfterContentInit called');
  }
  ngAfterContentChecked() {
    console.log('ngAfterContentChecked called');
  }
  ngAfterViewInit() {
    console.log('ngAfterViewInit called');
  }
  ngAfterViewChecked() {
    console.log('ngAfterViewChecked called');
  }
  ngOnChanges(changes) {
    console.log('ngOnChanges called', changes);
  }
  ngOnDestroy() {
    console.log('ngOnDestroy called');
  }

}
