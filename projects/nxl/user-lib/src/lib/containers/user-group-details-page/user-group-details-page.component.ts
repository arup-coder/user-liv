import { Component, OnInit } from '@angular/core';
import * as fromStore from '../../store/index';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { GroupList } from '../../models/group.model';
import {
  funGetUserActiveTenantId,
  funSortingOrder,
  funCheck,
  funSetIsSelect,
  funCheckAll,
} from '../../functions';
import { User } from '../../models/user.model';
import { PaginationHeaders, FilterValues } from '../../models/user-response.model';
import { TableColumns } from '../../models/user-table-column-model';

@Component({
  selector: 'lib-user-group-details-page',
  templateUrl: './user-group-details-page.component.html',
  styleUrls: ['./user-group-details-page.component.scss'],
})
export class UserGroupDetailsPageComponent implements OnInit {
  title: string;
  groupId: string;
  groupDetail: GroupList;
  usersList$: Observable<User[]>;
  pagination: PaginationHeaders;
  latestSortingOrder: string;
  latestSearch: string;
  filterValues: FilterValues[];
  displayedColumns$: Observable<TableColumns[]>;
  isGroupManagement: boolean;
  selectedUsers: User[];
  isSelectAll: boolean;
  isIntermediateSelect: boolean;
  users: User[];
  today = new Date();
  userShowSelection: boolean;
  opened: boolean;
  totalUsers: number;

  constructor(
    private store: Store<fromStore.UserState>,
    private route: ActivatedRoute,
    public router: Router,
  ) {
    this.usersList$ = store.pipe(select(fromStore.getSelectedGroupedUsersList));
    this.displayedColumns$ = store.pipe(select(fromStore.getSelectedIsGroupTableColumnList));

    store
      .pipe(select(fromStore.getSelectedGroupedUsersRecordCount))
      .pipe(
        tap(totalUsers => {
          this.totalUsers = totalUsers;
        }),
      )
      .subscribe();

    store
      .pipe(select(fromStore.getSelectedGroupedUsersPageDetails))
      .pipe(tap(paginationData => (this.pagination = paginationData)))
      .subscribe();
    store
      .pipe(select(fromStore.getSelectedGroupedUsersSearchText))
      .pipe(tap(userSearchText => (this.latestSearch = userSearchText)))
      .subscribe();
    store
      .pipe(select(fromStore.getSelectedGroupedUsersSortingOrder))
      .pipe(tap(sortedValues => (this.latestSortingOrder = sortedValues)))
      .subscribe();

    store
      .pipe(select(fromStore.getSelectedGrpedUsersIsSelectAll))
      .pipe(tap(isSelectAll => (this.isSelectAll = isSelectAll)))
      .subscribe();
    store
      .pipe(select(fromStore.getSelectedGrpedUsersIsIntermediateSelect))
      .pipe(tap(isIntermediateSelect => (this.isIntermediateSelect = isIntermediateSelect)))
      .subscribe();

    store
      .pipe(select(fromStore.getGroupedUsersShowSelection))
      .pipe(tap(showSelection => (this.userShowSelection = showSelection)))
      .subscribe();
    this.opened = false;
  }

  ngOnInit() {
    this.isGroupManagement = true;
    this.selectedUsers = [];
    this.title = 'Group Details';
    this.route.params
      .pipe(
        tap(params => {
          this.groupId = params.groupId;
        }),
      )
      .subscribe();
    this.store
      .pipe(select(fromStore.getSelectedGroupById(this.groupId)))
      .pipe(tap(groupDetails => (this.groupDetail = groupDetails)))
      .subscribe();
    this.store.dispatch(
      fromStore.loadGroupedUsers({
        payload: {
          pagination: this.pagination,
          sort: this.latestSortingOrder,
          filter: this.filterValues,
          searchText: this.latestSearch,
          groupId: this.groupId,
        },
      }),
    );
    if (this.groupId) {
      this.store.dispatch(
        fromStore.getAllGroupedUser({
          payload: {
            groupId: this.groupId,
          },
        }),
      );
    }
  }

  onAddUserClick() {
    const pagination = {
      page: 1,
      pageSize: 5,
      pageCount: 0,
      recordCount: 0,
    };

    this.store.dispatch(
      fromStore.loadAddUsers({
        payload: {
          pagination: pagination,
          sort: '',
          filter: [],
          searchText: '',
          tenantId: funGetUserActiveTenantId(),
          groupId: this.groupId,
        },
      }),
    );

    // this.store.dispatch(
    //   fromStore.getUnMappedUsers({
    //     payload: {
    //       pagination: pagination,
    //       searchText: '',
    //       tenantId: funGetUserActiveTenantId(),
    //       groupId: this.groupId,
    //     },
    //   }),
    // );
  }

  onClickPageEvent(value: any) {
    const event = value.event;
    this.pagination.pageSize = event.pageSize;
    this.pagination.page = event.pageIndex + 1;
    this.pagination.recordCount = event.length;
    this.store.dispatch(
      fromStore.groupedUsersPaginationChange({
        payload: { pagination: this.pagination },
      }),
    );
    this.store.dispatch(
      fromStore.loadGroupedUsers({
        payload: {
          pagination: this.pagination,
          sort: this.latestSortingOrder,
          filter: this.filterValues,
          searchText: this.latestSearch,
          groupId: this.groupId,
        },
      }),
    );
  }

  onClickRefreshEvent(event: any) {
    this.store.dispatch(
      fromStore.loadGroupedUsers({
        payload: {
          sort: this.latestSortingOrder,
          pagination: this.pagination,
          filter: this.filterValues,
          searchText: this.latestSearch,
          groupId: this.groupId,
        },
      }),
    );
  }

  onSortGroupedUserData(event: any) {
    this.latestSortingOrder = '';
    this.store
      .pipe(select(fromStore.getSelectedGroupedUsersSortingOrder))
      .pipe(tap(sortedValues => (this.latestSortingOrder = sortedValues)))
      .subscribe();
    this.latestSortingOrder = funSortingOrder(event, this.latestSortingOrder);
    this.store.dispatch(fromStore.groupedUsersSort({ payload: { sort: this.latestSortingOrder } }));
    this.store.dispatch(
      fromStore.loadGroupedUsers({
        payload: {
          sort: this.latestSortingOrder,
          pagination: this.pagination,
          filter: this.filterValues,
          searchText: this.latestSearch,
          groupId: this.groupId,
        },
      }),
    );
  }

  onCheck(event) {
    this.store
      .pipe(select(fromStore.getSelectedGrouppedUsers))
      .pipe(tap(selectedUsers => (this.selectedUsers = selectedUsers)))
      .subscribe();
    this.usersList$.pipe(tap(users => (this.users = users))).subscribe();
    this.selectedUsers = funCheck(event, this.selectedUsers);
    this.users = funSetIsSelect(this.users, this.selectedUsers);
    this.store.dispatch(
      fromStore.groupedUsersSelectionChange({
        payload: {
          selectedUsers: this.selectedUsers,
          users: this.users,
        },
      }),
    );
  }

  onCheckAll(event) {
    this.store
      .pipe(select(fromStore.getSelectedGrouppedUsers))
      .pipe(tap(selectedUsers => (this.selectedUsers = selectedUsers)))
      .subscribe();
    this.usersList$.pipe(tap(users => (this.users = users))).subscribe();
    this.selectedUsers = funCheckAll({ event, users: this.users }, this.selectedUsers);
    this.users = funSetIsSelect(this.users, this.selectedUsers);
    this.store.dispatch(
      fromStore.groupedUsersSelectionChange({
        payload: {
          selectedUsers: this.selectedUsers,
          users: this.users,
        },
      }),
    );
  }

  onClickUserShowSelection(event: any) {
    this.userShowSelection = event.show;
    this.store.dispatch(
      fromStore.grouppedUserSelectionOnOff({
        payload: { userSelection: this.userShowSelection },
      }),
    );
  }

  onClickRemoveUsers(event: any) {
    const selectedUser = Array.isArray(event.selectedUser)
      ? event.selectedUser
      : [event.selectedUser];
    this.store.dispatch(
      fromStore.removeUser({
        payload: { selectedUser: selectedUser, groupId: this.groupId },
      }),
    );

    this.usersList$.pipe(tap(users => (this.users = users))).subscribe();
    if (this.users.length === selectedUser.length) {
      this.pagination.page = 1;
      this.pagination.pageSize = 5;
       this.store.dispatch(
         fromStore.loadGroupedUsers({
           payload: {
             sort: this.latestSortingOrder,
             pagination: this.pagination,
             filter: this.filterValues,
             searchText: this.latestSearch,
             groupId: this.groupId,
           },
         }),
       );
    }

  }

  onClickSearchUser(event: any) {
    this.latestSearch = '';
    const searchText = event.searchText;
    this.store.dispatch(fromStore.groupedUserSearch({ payload: { searchText } }));
    this.pagination.page = 1;
    this.store.dispatch(
      fromStore.groupedUsersPaginationChange({ payload: { pagination: this.pagination } }),
    );
    this.store
      .pipe(select(fromStore.getSelectedGroupedUsersSearchText))
      .pipe(tap(userSearchText => (this.latestSearch = userSearchText)))
      .subscribe();
    this.store.dispatch(
      fromStore.loadGroupedUsers({
        payload: {
          sort: this.latestSortingOrder,
          pagination: this.pagination,
          filter: this.filterValues,
          searchText: this.latestSearch,
          groupId: this.groupId,
        },
      }),
    );
  }

  activateRoute() {
    this.opened = true;
  }
  deactivateRoute() {
    this.opened = false;
  }
}
