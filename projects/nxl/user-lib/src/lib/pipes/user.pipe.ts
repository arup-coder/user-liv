import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneNumber',
})
export class PhoneNumberPipe implements PipeTransform {
  transform(value: any): any {
    const isNaN = /^[a-zA-Z-()]+$/.test(value);
    if (value && value !== '' && value.length > 4 && isNaN === false) {
      value = value.match(/\d/g).join('');
      return (
        '(' +
        value.substring(0, 3) +
        ')' +
        ' ' +
        value.substring(3, 6) +
        '' +
        '-' +
        value.substring(6)
      );
    }
    return value;
  }
}



@Pipe({
  name: 'status'
})
export class StatusPipe implements PipeTransform {
  transform(value: any): any {
    return value ? 'Active' : 'Inactive';

  }
}

@Pipe({ name: 'searchTextPipe' })
export class FilterSearchTextPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLowerCase();
    return items.filter(it => {
      return it.firstName.toLowerCase().includes(searchText);
    });
  }
}

