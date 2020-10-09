import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'elementWeightMultiplier'})
export class ElementWeightMultiplierPipe implements PipeTransform {
  transform(value: number, multiplier?: number): number {
    return multiplier ? value * multiplier : value;
  }
}
