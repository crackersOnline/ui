import { Component, OnInit } from '@angular/core';
import { PagesService } from '../pages.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  public invalidResult = {
    duplicateEmailID: false,
  };
  constructor(public pageService:PagesService) { }

  ngOnInit() {
  }
  checkEmailExsit(e) {
    const email = e.target.value;
    if (email) {
      this.pageService.checkEmailExist(email).subscribe((res: any) => {
        console.log("res.recCount", res);
        if (res.recCount > 0) {
          this.invalidResult.duplicateEmailID = false;
        } else {
          this.invalidResult.duplicateEmailID = true;
        }
      });
    }
  }

}
