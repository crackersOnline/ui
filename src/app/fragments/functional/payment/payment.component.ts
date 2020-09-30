import { AfterViewInit, Component, ElementRef, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { AppSingletonService } from 'src/app/app.singleton.service';
import { CommonService } from 'src/app/common/services/common.service';
import { ProductService } from 'src/app/modules/product/product.service';
// import * as svg from 'node_modules/save-svg-as-png';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit, AfterViewInit {

  public ifDeliveryAddressSelected = false;
  public captcha: any;
  public confirmCaptcha: any;
  public errorCaptcha: string;
  @Output() buttonClicked: EventEmitter<boolean> = new EventEmitter<boolean>();
  @ViewChild('dataContainer',{static:false}) dataContainer: ElementRef;
  constructor(private singletonService: AppSingletonService, 
    private productService: ProductService, private commonService: CommonService ) { }

  ngOnInit() {
   

    this.productService.generateCaptcha().subscribe((res) => {
      console.log('res', res);
      /* svg.svgAsPngUri(document.getElementsByTagName('svg'), {}, (uri) => {
        console.log('png base 64 encoded', uri);
      }); */
    this.captcha = res;
   //   this.svg = this.sanitizer.bypassSecurityTrustHtml('<!DOCTYPE HTML>' + res.data);
 
    });
    this.singletonService.deliveryAddStatus.subscribe((res:any)=> {
      this.ifDeliveryAddressSelected = res;
      if(this.ifDeliveryAddressSelected){ 
        this.commonService.sendSpinnerStatus(true);
        setTimeout(()=>{
              console.log("Delivery Address Status: ",res);
              this.commonService.sendSpinnerStatus(false);
              this.dataContainer.nativeElement.innerHTML = this.captcha.data ;
          },3000);
      }
    });
   
    
  }
  ngAfterViewInit() {
    
  
     }
  
  confirmOrder() {
    if(this.confirmCaptcha) {
    this.errorCaptcha = '';
    console.log('this.captcha.text', this.captcha.text, 'this.confirmCaptcha', this.confirmCaptcha);
    if(this.captcha.text === this.confirmCaptcha) {
      this.buttonClicked.emit(true);
    } else {
      this.errorCaptcha = 'Please enter the correct captcha code';
    }
    } else {
      this.errorCaptcha = 'Please enter the captcha code';
    }
  }

}
