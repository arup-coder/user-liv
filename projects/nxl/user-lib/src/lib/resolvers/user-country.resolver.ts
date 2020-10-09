import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';

import { select, Store } from '@ngrx/store';
import { tap, filter, first, map } from 'rxjs/operators';
import * as fromStore from '../store/index';

@Injectable()
export class UserCountryResolver implements Resolve<boolean> {
    sortingOrder: { active: string; direction: string };
    constructor(private store: Store<fromStore.UserState>) {
    }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.store.pipe(
            select(fromStore.getSelectedIsCountryListLoaded),
            tap(loaded => {
                if (!loaded) {
                    this.store.dispatch(
                        fromStore.loadCountryList(),
                    );
                }
            }),
            filter(loaded => loaded !== undefined),
            first(),
        );
    }
}
