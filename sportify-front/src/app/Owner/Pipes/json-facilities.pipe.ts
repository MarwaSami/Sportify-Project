import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'jsonFacilities'
})
export class JsonFacilitiesPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
