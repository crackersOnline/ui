import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';
import { AppMaterialModule } from '../app-material/app-material.module';
import { ConfirmEqualValidatorDirective } from '../common/directives/confirm-equal-validator.directive';



@NgModule({
  declarations: [HeaderComponent, FooterComponent],
  imports: [
    CommonModule,
    AppMaterialModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    AppMaterialModule
    
  ]
})
export class FragmentsModule { }
