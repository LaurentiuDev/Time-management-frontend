import { Pipe, PipeTransform } from '@angular/core';

/**
 * Filters the object's keys on numeric values (!isNan) and maps those back into a key-value pair of {number, any}.
 * Implicitely takes care of string to number conversion.
 */
@Pipe({ name: 'enumKeyValue' })
export class EnumKeyValuePipe implements PipeTransform {
  transform(value): Object {
    return Object.keys(value)
      .filter((e) => !isNaN(+e))
      .map((o) => {
        return { key: +o, value: value[o] };
      });
  }
}
