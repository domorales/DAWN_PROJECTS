import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'asNumber'
})
export class AsNumberPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): number {
    return parseInt(value);
  }

}
