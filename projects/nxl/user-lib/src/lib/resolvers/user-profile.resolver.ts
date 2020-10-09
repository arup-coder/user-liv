import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { tap, filter, first } from 'rxjs/operators';
import * as fromStore from '../store/index';
import { funGetUserActiveTenantId } from '../functions';

@Injectable({
  providedIn: 'root',
})
export class UserResolver implements Resolve<boolean> {
  selectedUserId = localStorage.getItem('nxl_user_id');
  constructor(private store: Store<fromStore.UserState>) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.store.pipe(
      select(fromStore.getSelectedUserProfileLoaded),
      tap(loaded => {
        if (!loaded) {
          this.store.dispatch(
            fromStore.userProfile({
              payload: { profileUserId: this.selectedUserId, tenantId : funGetUserActiveTenantId() },
            }),
          );
        }
      }),
      filter(loaded => loaded),
      first(),
    );
  }
}


