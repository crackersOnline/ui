import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'minuteSeconds'
  })
  export class MinuteSecondsPipe implements PipeTransform {

      transform(value) {

        if ( parseInt(value, 10) < 0) {
            value = Math.abs(value);
            return('-' + moment().startOf('day').seconds(value).format('mm:ss') );
        } else if (parseInt(value, 10) > 0) {
            return moment().startOf('day').seconds(value).format('mm:ss');
        } else {
            return '';
        }
      }
  }
