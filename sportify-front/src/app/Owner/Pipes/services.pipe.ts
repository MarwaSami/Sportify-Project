import { Pipe, PipeTransform } from '@angular/core';
import { pipe } from 'rxjs';

@Pipe({
  name: 'services',
})
export class ServicesPipe implements PipeTransform {
  transform(value: number): string {
    switch (value) {
      case 1:
        return 'Restroom';
      case 2:
        return 'Changing Room';
      case 3:
        return 'Canteen';
      case 4:
        return 'Locker';
      case 5:
        return 'Kids Area';
      default:
        return 'Unknown Service';
    }
  }
}
