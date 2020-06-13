import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/common/services/common.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  
  constructor(public commonService:CommonService) {
    
   }

  ngOnInit() {
    
  }

}
