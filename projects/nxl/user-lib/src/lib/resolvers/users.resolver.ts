import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';

import { select, Store } from '@ngrx/store';
import { tap, filter, first, map } from 'rxjs/operators';
import * as fromStore from '../store/index';
import { funGetUserActiveTenantId } from '../functions/user.function';

@Injectable()
export class UserListResolver implements Resolve<boolean> {
  sortingOrder: { active: string; direction: string };
  constructor(private store: Store<fromStore.UserState>) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.store.pipe(
      select(fromStore.getSelectedUsersLoaded),
      tap(loaded => {
        if (!loaded) {
          let response;
          combineLatest([
            this.store.pipe(select(fromStore.getSelectedUsersPageDetails)),
            this.store.pipe(select(fromStore.getSelectedSortingOrder)),
            this.store.pipe(select(fromStore.getSelectedFilterValues)),
            this.store.pipe(select(fromStore.getSelectedUserSearchText)),
          ])
            .pipe(
              map(result => {
                return (response = result);
              }),
            )
            .subscribe();
          this.store.dispatch(
            fromStore.loadUsers({
              payload: {
                pagination: response[0], sort: response[1], filter: response[2],
                searchText: response[3],
                tenantId: funGetUserActiveTenantId()
              },
            }),
          );
        }
      }),
      filter(loaded => loaded !== undefined),
      first(),
    );
  }
}
