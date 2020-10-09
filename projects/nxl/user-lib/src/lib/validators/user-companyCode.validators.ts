import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import * as fromStore from '../store/index';
import { select, Store } from '@ngrx/store';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  first,
  map,
  switchMap,
  take,
  tap,
} from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class UserValidators {
  constructor(private store: Store<fromStore.UserState>) {}
  CompanyCode(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<{ [key: string]: any | null }> => {
      if (isEmptyCompanyCode(control.value)) {
        return of(null);
      } else {
        return control.valueChanges.pipe(
          debounceTime(1000),
          take(1),
          distinctUntilChanged(),
          switchMap(_ => { 
            this.store.dispatch(fromStore.clearUserDefaultTenant());            
            return this.store.pipe(
              select(fromStore.getSelectedUserVerifyCompanyCodeTenantId),
              tap(validTenant => {
                if (validTenant === '') {
                  this.store.dispatch(fromStore.verifyUserCompanyCode({ payload: control.value }));
                }
              }),
              filter(validTenant => {
                return validTenant !== '';
              }),
              map(validTenant => {
                return validTenant === null ? { inValidCompanyCode: control.value } : null;
              }),
              first(),
            );
          })
        );
      }
    };
  }
}

function isEmptyCompanyCode(value: any): boolean {
  return value === null || value.length === 0;
}
