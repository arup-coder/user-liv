import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as fromStore from '../../store/index';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'lib-user-detail-view-page',
  templateUrl: './user-detail-view-page.component.html',
  styleUrls: ['./user-detail-view-page.component.scss'],
})
export class UserDetailViewPageComponent implements OnInit {
  userDetail$: Observable<User>;
  userId: string;
  groupId: string;

  constructor(
    private store: Store<fromStore.UserState>,
    private route: ActivatedRoute,
    public router: Router,
  ) {}

  ngOnInit() {
    this.route.params
      .pipe(
        tap(params => {
          this.userId = params.userId;
          this.groupId = params.groupId;
        }),
      )
      .subscribe();
    this.userDetail$ = this.store.pipe(select(fromStore.getSelectedUserById(this.userId)));
  }
  onCancelClick() {
    if (this.groupId) {
      this.router.navigate(['/user/user-group-details/', this.groupId]);
    } else {
      this.router.navigate(['/user/user-list']);
    }
  }
}
