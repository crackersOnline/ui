import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/common/services/auth.service';
import { AppSingletonService } from 'src/app/app.singleton.service';
@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit {
  constructor(public authService: AuthService, public singletonService: AppSingletonService ) { }

  ngOnInit() {
    this.authService.getCartItems().subscribe((cartItem) => {
      if (cartItem && cartItem.code === 200) {
        this.singletonService.setCartItems(cartItem.data);
        this.singletonService.notifyMetaDataChanged(true);
      }
    })
  }

}
