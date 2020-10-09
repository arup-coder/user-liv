import { Component, OnInit, Inject } from '@angular/core';
import { User } from '../../models/user.model';
import { Store, select } from '@ngrx/store';
import * as fromStore from '../../store/index';
import { tap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
// import { UserRequest } from '../../models/user-request.model';

@Component({
  selector: 'lib-user-profile-page',
  templateUrl: './user-profile-page.component.html',
  styleUrls: ['./user-profile-page.component.scss'],
})
export class UserProfilePageComponent implements OnInit {
  selectedUserId: User['userId'] = localStorage.getItem('nxl_user_id');
  userDetail$: User[];
  title = 'Profile';
  opened: boolean;  
  constructor(
    private store: Store<fromStore.UserState> ) {
    this.store
      .pipe(select(fromStore.getSelectedUserProfile))
      .pipe(tap(userData => (this.userDetail$ = userData)))
      .subscribe();
   
  }

  ngOnInit() {}
}
