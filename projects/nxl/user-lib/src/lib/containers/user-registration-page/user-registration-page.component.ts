import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromStore from '../../store/index';
import { tap } from 'rxjs/operators';
import { User } from '../../models/user.model';
import { UserPostRequest } from '../../models/user-post-request.model';
import { UserPutRequest } from '../../models/user-put-request.model';
import { RegistrationFields } from '../../models/user-registration-fields-names.model';
import { Observable, of } from 'rxjs';
import { funGetUserActiveTenantId } from '../../functions';
import { Country } from '../../models/user-country.model';
import { State } from '../../models/user-state.model';

@Component({
  selector: 'lib-user-registration-page',
  templateUrl: './user-registration-page.component.html',
  styleUrls: ['./user-registration-page.component.scss'],
})
export class UserRegistrationPageComponent implements OnInit {
  title: string;
  userId: string;
  userDetail: User[];
  userEmailAddress: string;
  fieldList$: Observable<RegistrationFields[]>;
  countryList: Country[];
  stateList: State[];
  constructor(private store: Store<fromStore.UserState>) {
    this.store
      .pipe(select(fromStore.getSelectedFieldsNames))
      .pipe(tap(fieldList => (this.fieldList$ = of(fieldList))))
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
  ngOnInit() {
    this.title = 'Tell us a little about yourself';
    this.store
      .pipe(select(fromStore.getSelectedUserProfile))
      .pipe(tap(userData => (this.userDetail = userData)))
      .subscribe();
    this.store
      .pipe(select(fromStore.getSelectedUserEmailAddress))
      .pipe(tap(userEmail => (this.userEmailAddress = userEmail)))
      .subscribe();
  }

  onCreateUser(event: UserPostRequest) {
    this.store
      .pipe(select(fromStore.getSelectedUserIdFun))
      .pipe(tap(selectedUserId => (this.userId = selectedUserId)))
      .subscribe();
    event.externalId = event.externalId.toString();
    event.userId = this.userId;
    this.store.dispatch(
      fromStore.createUnRegisteredUser({
        payload: { body: [event], tenantId: funGetUserActiveTenantId() },
      }),
    );
  }

  onUpdateUser(event: any) {
    this.store
      .pipe(select(fromStore.getSelectedUserIdFun))
      .pipe(tap(selectedUserId => (this.userId = selectedUserId)))
      .subscribe();
    event.externalId = event.User.externalId.toString();
    this.store.dispatch(
      fromStore.updateUnRegisteredUser({
        payload: { body: event.User, userId: this.userId, tenantId: event.tenantId },
      }),
    );
  }

  onSelectCountry(event) {
    this.store.dispatch(fromStore.loadStateList({ payload: event }));
  }
}
