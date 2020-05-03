import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  status = false;
  @Output () enableregister = new EventEmitter();
  @Output () disableregister = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }
  enable_register() {
    this.status = true;
    this.enableregister.emit(this.status);
    console.log('Enable Status', this.status = this.status);
  }
  disable_register() {
    this.status = false;
    this.disableregister.emit(this.status);
    console.log('Disable Status', this.status = this.status);
  }
}
