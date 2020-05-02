import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {
  public registerStatus:boolean = false;
  constructor() { }

  ngOnInit() {
  }
  enable_register(event){
    this.registerStatus = event;
  }
}
