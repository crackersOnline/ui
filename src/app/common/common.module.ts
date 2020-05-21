import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmEqualValidatorDirective } from './directives/confirm-equal-validator.directive';



@NgModule({
  declarations: [ConfirmEqualValidatorDirective],
  imports: [
    CommonModule
  ],
  exports:[
    ConfirmEqualValidatorDirective
  ]

})
export class CommonProjectModule { }
