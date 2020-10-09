import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { UserGroupAddUsersDialogComponent } from '../../components/user-group-add-users/user-group-add-users-dialog.component';
import { tap } from 'rxjs/operators';
import * as fromStore from '../../store/index';
import { Store, select } from '@ngrx/store';
import { User } from '../../models/user.model';
import { funGetUserActiveTenantId, funSetIsSelect, funCheckAll, funCheck } from '../../functions';

@Component({
  selector: 'lib-user-group-add-users-page',
  templateUrl: './user-group-add-users-page.component.html',
  styleUrls: ['./user-group-add-users-page.component.scss'],
})
export class UserGroupAddUsersPageComponent implements OnInit {
  dialogRef: any;
  groupId: string;
  usersList: User[];
  groupName: any;
  pagination: any;
  searchText: string;
  latestSearch: string;
  paginator: any;
  selectedUsers: User[];
  isSelectAll: boolean;
  isIntermediateSelect: boolean;
  allGroupedUsers: any;

  constructor(
    public dialog: MatDialog,
    private store: Store<fromStore.UserState>,
    private router: Router,
    public route: ActivatedRoute,
  ) {
    store
      .pipe(select(fromStore.getSelectedGroupAddUsersList))
      .pipe(tap(userList => (this.usersList = userList)))
      .subscribe();
    store
      .pipe(select(fromStore.getSelectedGrpAddUsersPageDetails))
      .pipe(tap(paginationData => (this.pagination = paginationData)))
      .subscribe();
    store
      .pipe(select(fromStore.getSelectedGroupAddUsersSearchText))
      .pipe(tap(groupSearchText => (this.latestSearch = groupSearchText)))
      .subscribe();
    store
      .pipe(select(fromStore.getSelectedAddUserGroupIsSelectAll))
      .pipe(tap(isSelectAll => (this.isSelectAll = isSelectAll)))
      .subscribe();
    store
      .pipe(select(fromStore.getSelectedAddUserIsIntermediateSelect))
      .pipe(tap(isIntermediateSelect => (this.isIntermediateSelect = isIntermediateSelect)))
      .subscribe();

    this.store
      .pipe(select(fromStore.getSelectedAddUsersGroup))
      .pipe(tap(selectedUsers => (this.selectedUsers = selectedUsers)))
      .subscribe();

    this.store
      .pipe(select(fromStore.getSelectedAddUsersGroup))
      .pipe(tap(allGroupedUsers => (this.allGroupedUsers = allGroupedUsers)))
      .subscribe();
  }

  ngOnInit() {
    // this.isSelectAll = false;
    // this.isIntermediateSelect = false;
    this.route.params
      .pipe(
        tap(params => {
          this.groupId = params.groupId;
          this.store
            .pipe(select(fromStore.getSelectedGroupById(this.groupId)))
            .pipe(tap(selectedGroup => (this.groupName = selectedGroup.groupName)))
            .subscribe();
        }),
      )
      .subscribe();
    this.openDialog();
  }

  openDialog() {
    // this.selectedUsers = [];

    this.dialogRef = this.dialog.open(UserGroupAddUsersDialogComponent, {
      panelClass: 'dialog-style-two',
      disableClose: true,
      data: {
        usersList: this.usersList,
        pagination: this.pagination,
        searchText: this.latestSearch,
        isSelectAll: this.isSelectAll,
        isIntermediateSelect: this.isIntermediateSelect,
      },
    });
    this.dialogRef.componentInstance.dialogRef = this.dialogRef;
    this.dialogRef.componentInstance.onCancel = this.onCancel;
    this.dialogRef.componentInstance.groupId = this.groupId;
    this.dialogRef.componentInstance.groupName = this.groupName;
    this.dialogRef.componentInstance.router = this.router;
    this.dialogRef.componentInstance.store = this.store;

    this.dialogRef.componentInstance.onChangePageEvent = this.onChangePageEvent;
    this.dialogRef.componentInstance.onSearchKeyUp = this.onSearchKeyUp;
    this.dialogRef.componentInstance.pagination = this.pagination;
    this.dialogRef.componentInstance.latestSearch = this.latestSearch;
    this.dialogRef.componentInstance.usersList = this.usersList;
    this.dialogRef.componentInstance.paginator = this.paginator;
    this.dialogRef.componentInstance.onCheckAll = this.onCheckAll;
    this.dialogRef.componentInstance.onCheck = this.onCheck;
    this.dialogRef.componentInstance.selectedUsers = this.selectedUsers;
    this.dialogRef.componentInstance.isSelectAll = this.isSelectAll;
    this.dialogRef.componentInstance.isIntermediateSelect = this.isIntermediateSelect;
    this.dialogRef.componentInstance.onSave = this.onSave;
    this.dialogRef.componentInstance.onNewUserClick = this.onNewUserClick;
    this.dialogRef.componentInstance.allGroupedUsers = this.allGroupedUsers;
  }

  onCancel() {
    this.store.dispatch(
      fromStore.groupAddUserListSelectionChange({
        payload: {
          selectedUsers: this.allGroupedUsers,
          users: [],
        },
      }),
    );
    this.router.navigate(['/user/user-group-details/', this.groupId]);
    this.dialogRef.close();
  }

  onNewUserClick() {
    this.store.dispatch(
      fromStore.groupAddUserListSelectionChange({
        payload: {
          selectedUsers: this.allGroupedUsers,
          users: [],
        },
      }),
    );
    this.router.navigate(['/user/user-add/']);
    this.dialogRef.close();
  }

  onSearchKeyUp($event) {
    this.searchText = $event.target.value;
    this.latestSearch = '';
    const searchText = $event.target.value;
    this.store.dispatch(fromStore.addUserGroupSearch({ payload: { searchText } }));
    this.store.dispatch(
      fromStore.addUsersGroupPaginationChange({ payload: { pagination: this.pagination } }),
    );
    this.store
      .pipe(select(fromStore.getSelectedGroupAddUsersSearchText))
      .pipe(tap(groupSearchText => (this.latestSearch = groupSearchText)))
      .subscribe();
    this.store.dispatch(
      fromStore.loadAddUsers({
        payload: {
          pagination: this.pagination,
          sort: '',
          filter: [],
          searchText: this.latestSearch,
          tenantId: funGetUserActiveTenantId(),
          groupId: this.groupId,
        },
      }),
    );
    // this.store.dispatch(
    //   fromStore.getUnMappedUsers({
    //     payload: {
    //       pagination: this.pagination,
    //       groupId: this.groupId,
    //       searchText: this.latestSearch,
    //       tenantId: funGetUserActiveTenantId(),
    //     },
    //   }),
    // );
    this.store
      .pipe(select(fromStore.getSelectedGroupAddUsersList))
      .pipe(tap(userList => (this.usersList = userList)))
      .subscribe();

    this.store
      .pipe(select(fromStore.getSelectedGrpAddUsersPageDetails))
      .pipe(tap(paginationData => (this.pagination = paginationData)))
      .subscribe();
  }

  onChangePageEvent(value: any) {
    const event = value;
    this.pagination.pageSize = event.pageSize;
    this.pagination.page = event.pageIndex + 1;
    this.pagination.recordCount = event.length;
    this.store.dispatch(
      fromStore.addUsersGroupPaginationChange({
        payload: { pagination: this.pagination },
      }),
    );
    this.store.dispatch(
      fromStore.loadAddUsers({
        payload: {
          pagination: this.pagination,
          sort: '',
          filter: [],
          searchText: this.latestSearch,
          tenantId: funGetUserActiveTenantId(),
          groupId: this.groupId,
        },
      }),
    );
    // this.store.dispatch(
    //   fromStore.getUnMappedUsers({
    //     payload: {
    //       pagination: this.pagination,
    //       groupId: this.groupId,
    //       searchText: this.latestSearch,
    //       tenantId: funGetUserActiveTenantId(),
    //     },
    //   }),
    // );
    this.store
      .pipe(select(fromStore.getSelectedGroupAddUsersList))
      .pipe(tap(userList => (this.usersList = userList)))
      .subscribe();
    this.store
      .pipe(select(fromStore.getSelectedAddUserGroupIsSelectAll))
      .pipe(tap(isSelectAll => (this.isSelectAll = isSelectAll)))
      .subscribe();
    this.store
      .pipe(select(fromStore.getSelectedAddUserIsIntermediateSelect))
      .pipe(tap(isIntermediateSelect => (this.isIntermediateSelect = isIntermediateSelect)))
      .subscribe();
  }

  onCheckAll(event) {
    this.store
      .pipe(select(fromStore.getSelectedAddUsersGroup))
      .pipe(tap(selectedUsers => (this.selectedUsers = selectedUsers)))
      .subscribe();
    this.selectedUsers = funCheckAll({ event, users: this.usersList }, this.selectedUsers);
    this.usersList = funSetIsSelect(this.usersList, this.selectedUsers);
    this.store.dispatch(
      fromStore.groupAddUserListSelectionChange({
        payload: {
          selectedUsers: this.selectedUsers,
          users: this.usersList,
        },
      }),
    );
  }

  onCheck(event, selectedUser) {
    event = { event, selectedUser };
    this.store
      .pipe(select(fromStore.getSelectedAddUsersGroup))
      .pipe(tap(selectedUsers => (this.selectedUsers = selectedUsers)))
      .subscribe();
    this.selectedUsers = funCheck(event, this.selectedUsers);
    this.usersList = funSetIsSelect(this.usersList, this.selectedUsers);
    this.store.dispatch(
      fromStore.groupAddUserListSelectionChange({
        payload: {
          selectedUsers: this.selectedUsers,
          users: this.usersList,
        },
      }),
    );

    this.store
      .pipe(select(fromStore.getSelectedAddUserGroupIsSelectAll))
      .pipe(tap(isSelectAll => (this.isSelectAll = isSelectAll)))
      .subscribe();
    this.store
      .pipe(select(fromStore.getSelectedAddUserIsIntermediateSelect))
      .pipe(tap(isIntermediateSelect => (this.isIntermediateSelect = isIntermediateSelect)))
      .subscribe();
  }

  onSave() {
    this.store
      .pipe(select(fromStore.getSelectedAddUsersGroup))
      .pipe(tap(selectedUser => (this.selectedUsers = selectedUser)))
      .subscribe();
    const unSelectedUsers = this.allGroupedUsers.filter(
      o1 => !this.selectedUsers.some(o2 => o1.userId === o2.userId),
    );
    const selectedUsers = this.selectedUsers.filter(
      o1 => !this.allGroupedUsers.some(o2 => o1.userId === o2.userId),
    );
    if (unSelectedUsers.length > 0) {
      this.store.dispatch(
        fromStore.removeUser({
          payload: { selectedUser: unSelectedUsers, groupId: this.groupId },
        }),
      );
      this.router.navigate(['/user/user-group-details/', this.groupId]);
    }
    if (selectedUsers.length > 0) {
      this.store.dispatch(
        fromStore.addUsersToGroup({
          payload: {
            selectedUsers: selectedUsers,
            groupId: this.groupId,
          },
        }),
      );
    }

    this.dialogRef.close();
  }
}
