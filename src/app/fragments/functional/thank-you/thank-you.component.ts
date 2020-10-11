import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-thank-you',
  templateUrl: './thank-you.component.html',
  styleUrls: ['./thank-you.component.scss']
})
export class ThankYouComponent implements OnInit {
  public order:any;
  @Input() set data(value: any ) {
    this.order = value;
  }

  constructor() { }

  ngOnInit() {
  }

}
