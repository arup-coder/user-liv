import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import * as fromStore from '../../store/index';
import { Observable, of } from 'rxjs';
import { User } from '../../models/user.model';
import { tap } from 'rxjs/operators';
import { UserPutRequest } from '../../models/user-put-request.model';
import { create_UUID, funGetUserActiveTenantId } from '../../functions';
import { UserRequest } from '../../models/user-request.model';
import { Country } from '../../models/user-country.model';
import { State } from '../../models/user-state.model';

@Component({
  selector: 'lib-user-add-edit-page',
  templateUrl: './user-add-edit-page.component.html',
  styleUrls: ['./user-add-edit-page.component.scss'],
})
export class UserAddEditPageComponent implements OnInit {
  title: string;
  usersList$: Observable<User[]>;
  userDetail$: Observable<User>;
  usersList: User[];
  countryList: Country[];
  stateList: State[];
  selectedUserId: User['userId'];

  constructor(
    private store: Store<fromStore.UserState>,
    public route: ActivatedRoute,
    public router: Router,
  ) {
    this.usersList$ = store.pipe(select(fromStore.getSelectedUsersList));
    this.store.pipe(select(fromStore.getSelectedCountryList))
      .pipe(tap(countries => { this.countryList = countries })).subscribe();
    this.store.pipe(select(fromStore.getSelectedStateList))
      .pipe(tap(states => { this.stateList = states })).subscribe();
  }

  ngOnInit() {
    this.title = 'Add User';
    this.route.params
      .pipe(
        tap(params => {
          this.selectedUserId = params.userId;
        }),
      )
      .subscribe();
    this.onLoadEditScreen();
  }

  onLoadEditScreen() {
    if (this.selectedUserId) {
      this.title = 'Edit User';
      this.userDetail$ = this.store.pipe(
        select(fromStore.getSelectedUserById(this.selectedUserId)),
      );
    }
  }

  onCreateUser(event: UserRequest) {
    event.userPostRequest.userId = create_UUID();
    this.store.dispatch(fromStore.addUser({ payload: { body: event, tenantId: funGetUserActiveTenantId() } }));
  }

  onUpdateUser(event: any) {
    this.store.dispatch(
      fromStore.updateUser({
        payload: {
          body: {
            request: event.User,
            isRegistered: event.isRegistered,
          },
          selectedUserId: this.selectedUserId,
          tenantId: event.tenantId,
        },
      }),
    );
  }

  onCancel() {
    this.router.navigate(['/user/user-list']);
  }

  onSelectCountry(event) {
    this.store.dispatch(fromStore.loadStateList({ payload: event }));

  }
}
