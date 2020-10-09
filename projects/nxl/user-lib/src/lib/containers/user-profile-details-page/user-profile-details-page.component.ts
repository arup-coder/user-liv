import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { Store, select } from '@ngrx/store';
import * as fromStore from '../../store/index';
import { tap } from 'rxjs/operators';
import { UserPutRequest } from '../../models/user-put-request.model';
import { State } from '../../models/user-state.model';
import { Country } from '../../models/user-country.model';
import { Observable, of } from 'rxjs';
@Component({
  selector: 'lib-user-profile-details-page',
  templateUrl: './user-profile-details-page.component.html',
  styleUrls: ['./user-profile-details-page.component.scss'],
})
export class UserProfileDetailsPageComponent implements OnInit {
  selectedUserId: User['userId'] = localStorage.getItem('nxl_user_id');
  userDetail$: User[];
  countryList: Country[];
  stateList: State[];
  opened: boolean;
  constructor(private store: Store<fromStore.UserState>) {
    this.store
      .pipe(select(fromStore.getSelectedUserProfile))
      .pipe(tap(userData => (this.userDetail$ = userData)))
      .subscribe();
    this.store
      .pipe(select(fromStore.getSelectedCountryList))
      .pipe(
        tap(countries => {
          this.countryList = countries;
        }),
      )
      .subscribe();
    this.store
      .pipe(select(fromStore.getSelectedStateList))
      .pipe(
        tap(states => {
          this.stateList = states;
        }),
      )
      .subscribe();
  }

  ngOnInit() {}
  onUpdateUserData(event: any) {
    this.store.dispatch(
      fromStore.updateUserProfile({
        payload: {
          body: { request: event.User, isRegistered: this.userDetail$[0].isRegistered },
          userId: this.selectedUserId,
          tenantId: event.tenantId,
        },
      }),
    );
  }
  onSelectCountry(event) {
    this.store.dispatch(fromStore.loadStateList({ payload: event }));
  }
}
