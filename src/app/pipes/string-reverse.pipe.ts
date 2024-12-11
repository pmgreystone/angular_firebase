import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stringReverse',
  standalone: true
})
export class StringReversePipe implements PipeTransform {

  inputString: String = ""

  transform(value: String): String {
    this.inputString = value.split('')
                .reverse()
                .join('')
    return this.inputString
  }

}
