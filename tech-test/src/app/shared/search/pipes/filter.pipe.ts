import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false,
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], args: any): any {
    if (!args) return items;
    return items.filter(item => item.label.toLowerCase().includes(args.toLowerCase()));
  }
}
