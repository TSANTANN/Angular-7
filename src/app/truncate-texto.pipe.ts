import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateTexto'
})
export class TruncateTextoPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
