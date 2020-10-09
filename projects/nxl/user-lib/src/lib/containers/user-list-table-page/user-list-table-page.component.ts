import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { User } from '../../models/user.model';
import { TableColumns } from '../../models/user-table-column-model';
import * as fromStore from '../../store/index';
import {
  funSortingOrder,
  funCheckAll,
  funCheck,
  funSetIsSelect,
  funGetUserActiveTenantId,
} from '../../functions/index';
import { PaginationHeaders, FilterValues } from '../../models/user-response.model';
import * as userDefaults from '../../data/defaults/user-default-values';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Country } from '../../models/user-country.model';
@Component({
  selector: 'lib-user-list-table-page',
  templateUrl: './user-list-table-page.component.html',
  styleUrls: ['./user-list-table-page.component.scss'],
})
export class UserMainPageComponent implements OnInit {
  title: string;
  usersList$: Observable<User[]>;
  displayedColumns$: Observable<TableColumns[]>;
  pagination: PaginationHeaders;
  opened: boolean;
  showFilters: boolean;
  userShowSelection: boolean;
  today = new Date();
  countries: Country[];
  filterCountries: string[] = [];
  hasBackdrop: boolean;
  latestSortingOrder: string;
  filterProperties: FilterValues[];
  filterValues: FilterValues[];
  clearOn: boolean;
  latestSearch: string;
  selectedUserId: string;
  isEditScreen: boolean;
  updatedSelectionList: User[];
  previousIndex: number;
  users: User[];
  selectedUsers: User[];
  isSelectAll: boolean;
  isIntermediateSelect: boolean;
  setPermissions$: any;
  moduleName: string;
  isGroupManagement: boolean;

  constructor(private store: Store<fromStore.UserState>, public router: Router) {
    this.usersList$ = store.pipe(select(fromStore.getSelectedUsersList));
    this.displayedColumns$ = store.pipe(select(fromStore.getIsVisableTableColumnList));
    this.store
      .pipe(select(fromStore.getSelectedCountryList))
      .pipe(
        tap(selectedCountries => {
          if (selectedCountries) {
            this.countries = selectedCountries;
          }
        }),
      )
      .subscribe();
    store
      .pipe(select(fromStore.getSelectedUsersPageDetails))
      .pipe(tap(paginationData => (this.pagination = paginationData)))
      .subscribe();
    store
      .pipe(select(fromStore.getSelectedUserSearchText))
      .pipe(tap(userSearchText => (this.latestSearch = userSearchText)))
      .subscribe();
    store
      .pipe(select(fromStore.getSelectedSortingOrder))
      .pipe(tap(sortedValues => (this.latestSortingOrder = sortedValues)))
      .subscribe();
    store
      .pipe(select(fromStore.getSelectedFilterSource))
      .pipe(tap(filterProperties => (this.filterProperties = filterProperties)))
      .subscribe();
    store
      .pipe(select(fromStore.getSelectedFilterValues))
      .pipe(tap(filtervals => (this.filterValues = filtervals)))
      .subscribe();
    store
      .pipe(select(fromStore.getuserShowSelection))
      .pipe(tap(showSelection => (this.userShowSelection = showSelection)))
      .subscribe();
    store
      .pipe(select(fromStore.getSelectedShowFilters))
      .pipe(tap(showFilter => (this.showFilters = showFilter)))
      .subscribe();
    store
      .pipe(select(fromStore.getSelectedIsSelectAll))
      .pipe(tap(isSelectAll => (this.isSelectAll = isSelectAll)))
      .subscribe();
    store
      .pipe(select(fromStore.getSelectedIsIntermediateSelect))
      .pipe(tap(isIntermediateSelect => (this.isIntermediateSelect = isIntermediateSelect)))
      .subscribe();
    this.opened = false;
  }

  ngOnInit() {
    this.title = 'User Management';
    this.isGroupManagement = false;
    this.selectedUsers = [];
    this.store.dispatch(
      fromStore.loadUsers({
        payload: {
          pagination: this.pagination,
          sort: this.latestSortingOrder,
          filter: this.filterValues,
          searchText: this.latestSearch,
          tenantId: funGetUserActiveTenantId(),
        },
      }),
    );

    this.clearOn = this.filterValues != null ? true : false;
  }

  activateRoute() {
    this.opened = true;
  }
  deactivateRoute() {
    this.opened = false;
  }

  onClickFilter() {
    this.showFilters = true;
    this.store.dispatch(
      fromStore.filterOnOff({
        payload: { filter: userDefaults.filterProperties, showFilter: this.showFilters },
      }),
    );
    this.store
      .pipe(select(fromStore.getSelectedFilterSource))
      .pipe(tap(filterProperties => (this.filterProperties = filterProperties)))
      .subscribe();
  }

  onSelectFilterValues(value: FilterValues) {
    this.clearOn = true;
    if (this.filterValues && this.filterValues.length > 0) {
      const found = this.filterValues.find(item => item.title === value.title);
      if (found) {
        const index = this.filterValues.indexOf(found, 0);
        if (index > -1) {
          this.filterValues.splice(index, 1);
        }
      }
    } else {
      this.filterValues = [];
    }
    this.filterValues.push(value);
    this.filterValues = [...new Map(this.filterValues.map(item => [item.value, item])).values()];
    this.store.dispatch(fromStore.filterValueUsers({ payload: { filter: this.filterValues } }));
    this.pagination.page = 1;
    this.store.dispatch(
      fromStore.userPaginationChange({ payload: { pagination: this.pagination } }),
    );

    this.store.dispatch(
      fromStore.loadUsers({
        payload: {
          sort: this.latestSortingOrder,
          pagination: this.pagination,
          filter: this.filterValues,
          searchText: this.latestSearch,
          tenantId: funGetUserActiveTenantId(),
        },
      }),
    );
    this.store
      .pipe(select(fromStore.getSelectedFilterTitle(value)))
      .pipe(tap(filtervals => (this.filterProperties = filtervals)))
      .subscribe();
  }

  onClickClearFilter() {
    this.clearOn = false;
    this.filterValues = [];
    const clearValues = { title: '', value: { value: '', displayValue: '' } };
    this.store
      .pipe(select(fromStore.getSelectedFilterTitle(clearValues)))
      .pipe(tap(filtervals => (this.filterProperties = filtervals)))
      .subscribe();
    this.store.dispatch(fromStore.filterValueUsers({ payload: { filter: [clearValues] } }));
    this.pagination.page = 1;
    this.store.dispatch(
      fromStore.userPaginationChange({ payload: { pagination: this.pagination } }),
    );
    this.store.dispatch(
      fromStore.loadUsers({
        payload: {
          sort: this.latestSortingOrder,
          pagination: this.pagination,
          filter: [clearValues],
          searchText: this.latestSearch,
          tenantId: funGetUserActiveTenantId(),
        },
      }),
    );
    this.store
      .pipe(select(fromStore.getSelectedFilterValues))
      .pipe(tap(filtervals => (this.filterValues = filtervals)))
      .subscribe();
    this.store.dispatch(fromStore.filterValueUsers({ payload: { filter: this.filterProperties } }));
  }

  onClickHideFilter() {
    this.showFilters = false;
    this.store.dispatch(
      fromStore.filterOnOff({
        payload: { filter: userDefaults.filterProperties, showFilter: this.showFilters },
      }),
    );
  }
  onClickUserShowSelection(event: any) {
    this.userShowSelection = event.show;
    this.store.dispatch(
      fromStore.userSelectionOnOff({
        payload: { userSelection: this.userShowSelection },
      }),
    );
  }
  onSortUserData(event: any) {
    this.latestSortingOrder = '';
    this.store
      .pipe(select(fromStore.getSelectedSortingOrder))
      .pipe(tap(sortedValues => (this.latestSortingOrder = sortedValues)))
      .subscribe();
    this.latestSortingOrder = funSortingOrder(event, this.latestSortingOrder);
    this.store.dispatch(fromStore.sortUsers({ payload: { sort: this.latestSortingOrder } }));
    this.store.dispatch(
      fromStore.loadUsers({
        payload: {
          sort: this.latestSortingOrder,
          pagination: this.pagination,
          filter: this.filterValues,
          searchText: this.latestSearch,
          tenantId: funGetUserActiveTenantId(),
        },
      }),
    );
  }

  onClickPageEvent(value: any) {
    const event = value.event;
    this.pagination.pageSize = event.pageSize;
    this.pagination.page = event.pageIndex + 1;
    this.pagination.recordCount = event.length;
    this.store.dispatch(
      fromStore.userPaginationChange({
        payload: { pagination: this.pagination },
      }),
    );
    this.store.dispatch(
      fromStore.loadUsers({
        payload: {
          sort: this.latestSortingOrder,
          pagination: this.pagination,
          filter: this.filterValues,
          searchText: this.latestSearch,
          tenantId: funGetUserActiveTenantId(),
        },
      }),
    );
  }

  onClickRefreshEvent(event: any) {
    this.store.dispatch(
      fromStore.loadUsers({
        payload: {
          sort: this.latestSortingOrder,
          pagination: this.pagination,
          filter: this.filterValues,
          searchText: this.latestSearch,
          tenantId: funGetUserActiveTenantId(),
        },
      }),
    );
  }
  onClickSearchUser(event: any) {
    this.latestSearch = '';
    const searchText = event.searchText;
    this.store.dispatch(fromStore.userSearch({ payload: { searchText } }));
    this.pagination.page = 1;
    this.store.dispatch(
      fromStore.userPaginationChange({ payload: { pagination: this.pagination } }),
    );
    this.store
      .pipe(select(fromStore.getSelectedUserSearchText))
      .pipe(tap(userSearchText => (this.latestSearch = userSearchText)))
      .subscribe();
    this.store.dispatch(
      fromStore.loadUsers({
        payload: {
          sort: this.latestSortingOrder,
          pagination: this.pagination,
          filter: this.filterValues,
          searchText: this.latestSearch,
          tenantId: funGetUserActiveTenantId(),
        },
      }),
    );
  }
  dropListDropped(event: any) {
    this.store.dispatch(
      fromStore.userTableColumnsVisableChange({
        payload: { tableColumnsChange: event.allColumns },
      }),
    );
  }
  onCheckAll(event) {
    this.store
      .pipe(select(fromStore.getSelectedUsers))
      .pipe(tap(selectedUsers => (this.selectedUsers = selectedUsers)))
      .subscribe();
    this.usersList$.pipe(tap(users => (this.users = users))).subscribe();
    this.selectedUsers = funCheckAll({ event, users: this.users }, this.selectedUsers);
    this.users = funSetIsSelect(this.users, this.selectedUsers);
    this.store.dispatch(
      fromStore.userSelectionChange({
        payload: {
          selectedUsers: this.selectedUsers,
          users: this.users,
        },
      }),
    );
  }
  onCheck(event) {
    this.store
      .pipe(select(fromStore.getSelectedUsers))
      .pipe(tap(selectedUsers => (this.selectedUsers = selectedUsers)))
      .subscribe();
    this.usersList$.pipe(tap(users => (this.users = users))).subscribe();
    this.selectedUsers = funCheck(event, this.selectedUsers);
    this.users = funSetIsSelect(this.users, this.selectedUsers);
    this.store.dispatch(
      fromStore.userSelectionChange({
        payload: {
          selectedUsers: this.selectedUsers,
          users: this.users,
        },
      }),
    );
  }
  onClickActivateUser(event: any) {
    let updateUserIds = [];
    let tenantId = funGetUserActiveTenantId();
    if (event.userId !== '') {
      updateUserIds.push(event.userId);
    } else {
      this.store.select(fromStore.getSelectedUsers).subscribe(selectedusers => {
        updateUserIds = selectedusers.map(users => users.userId);
      });
    }
    this.store.dispatch(
      fromStore.activateUsers({
        payload: { userIds: updateUserIds, tenantId },
      }),
    );
  }
  onClickDeactivateUser(event: any) {
    let updateUserIds = [];
    let tenantId = funGetUserActiveTenantId();
    if (event.userId !== '') {
      updateUserIds.push(event.userId);
    } else {
      this.store.select(fromStore.getSelectedUsers).subscribe(selectedusers => {
        updateUserIds = selectedusers.map(users => users.userId);
      });
    }
    this.store.dispatch(
      fromStore.deActivateUsers({
        payload: { userIds: updateUserIds, tenantId },
      }),
    );
  }
  onSelectPermissions(event: any) {
    const userId = event.selectedUser.userId;
    if (userId != null) {
      this.store.dispatch(fromStore.loadUserPermissionsSetting({ payload: { userId: userId } }));
      this.store
        .pipe(select(fromStore.getSelectedPermissionsSettingsLoaded))
        .pipe(
          tap(loaded => {
            if (loaded) {
              this.router.navigate([
                'user/user-list/',
                { outlets: { dialog: ['user-setpermissions', userId] } },
              ]);
            }
          }),
        )
        .subscribe();
    }
  }
}
