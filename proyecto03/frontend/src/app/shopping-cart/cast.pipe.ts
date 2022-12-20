import { Pipe, PipeTransform } from '@angular/core';

import { ProductResponse } from '../shared/model/Product';

@Pipe({
  name: 'cast',
})
export class CastPipe implements PipeTransform {
  transform(
    value: string | ProductResponse,
    ...args: unknown[]
  ): ProductResponse {
    return value as ProductResponse;
  }
}
