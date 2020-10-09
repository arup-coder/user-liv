import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromStore from '../../store/index';
import { tap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../models/user.model';
@Component({
  selector: 'lib-user-password-rest-page',
  templateUrl: './user-password-rest-page.component.html',
  styleUrls: ['./user-password-rest-page.component.scss']
})
export class UserPasswordRestPageComponent implements OnInit {

  constructor(private store: Store<fromStore.UserState>,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
  }
  onClickResetPassword(event: any)
  {
    // this.store.dispatch(
    //   fromStore.updateUser({ payload: { body: event, selectedUserId: this.selectedUserId } }),
    // );
  }
}
