import { Component } from '@angular/core';

import { AuthService } from 'src/app/common/services/auth.service';
import { Router } from '@angular/router';
import { CommonService } from './common/services/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ui';
  private loadingSpinner;
  constructor(private auth: AuthService, private router: Router, private commonService:CommonService) {
    this.commonService.$loadingSpinnerObservable.subscribe(
      res => {
        this.loadingSpinner=res;
        console.log("Footer Res", res);
      }
    );
   }

}
