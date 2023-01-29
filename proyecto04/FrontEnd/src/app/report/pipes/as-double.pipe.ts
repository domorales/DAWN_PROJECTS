import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'asDouble'
})
export class AsDoublePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): number {
    return parseFloat(value);
  }

}
