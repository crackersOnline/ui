import { Component, OnInit } from '@angular/core';
import { MyAccountService } from '../my-account.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {
  public userInfo:any;

  constructor( private myaccountService: MyAccountService ) { }

  ngOnInit() {
    this.myaccountService.getMyProfile().subscribe(res => {
      // console.log('myprofile', res.data[0]);
      this.userInfo = res.data[0];
    })
    this.myaccountService.getMyOrders().subscribe(res => {
      // console.log('myorder', res);
    })
  }

}
