import { Component, OnInit, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
public noticationData:string;
  constructor(@Inject(MAT_SNACK_BAR_DATA) data:any) {
    console.log("Notification:", data);
    this.noticationData=data;
   }

  ngOnInit() {
  }

}
