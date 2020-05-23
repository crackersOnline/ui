import { Component, OnInit } from '@angular/core';
import { PagesService } from '../pages.service';

@Component({
  selector: 'app-user-verification',
  templateUrl: './user-verification.component.html',
  styleUrls: ['./user-verification.component.scss']
})
export class UserVerificationComponent implements OnInit {
  public registerEmail :string;
  constructor(private pages:PagesService) {
    this.pages.emailemitter.subscribe(data => {
      this.registerEmail=data;
    })
   }

  ngOnInit() {
  }

}
