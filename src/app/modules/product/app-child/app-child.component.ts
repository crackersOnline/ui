import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './app-child.component.html',
  styleUrls: ['./app-child.component.scss']
})
export class AppChildComponent implements OnInit, OnChanges {
@Input() changedata = 'test';
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    for (let name_prop in changes) {
      const change = changes[name_prop];
      let current_value = JSON.stringify(change.currentValue);
      let previous_value = JSON.stringify(change.previousValue);
      console.log('ngOnChange is called');
      console.log('Current value is:' + current_value);
      console.log('Previous value is:' + previous_value);

      if (change.firstChange) {
      this.changedata = 'Test';
    }
  }
    console.log('Onchanges', changes,  this.changedata );
  }
}
