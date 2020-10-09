import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as fromStore from '../../store/index';
import { GroupList } from '../../models/group.model';
import { Router } from '@angular/router';
import { GroupPaginationHeaders, FilterValues } from '../../models/group-response.model';
import { funGetUserActiveTenantId, funGroupCheckAll, funGroupSetIsSelect, funGroupCheck, funSortingOrder } from '../../functions';
import { tap } from 'rxjs/operators';

import * as groupDefaults from '../../data/defaults/group-default-values';

@Component({
  selector: 'lib-user-group-management-page',
  templateUrl: './user-group-management-page.component.html',
  styleUrls: ['./user-group-management-page.component.scss'],
})
export class UserGroupManagementPageComponent implements OnInit {
  title: string;
  showFilters: boolean;
  groupList$: Observable<GroupList[]>;
  groups: GroupList[];
  pagination: GroupPaginationHeaders;
  latestSortingOrder: string;
  filterValues: FilterValues[];
  latestSearch: string;
  clearOn: boolean;
  today = new Date();
  groupShowSelection: boolean;
  filterProperties: FilterValues[];
  selectedGroups: GroupList[];
  isSelectAll: boolean;
  isIntermediateSelect: boolean;

  constructor(private store: Store<fromStore.UserState>, public router: Router) {
    this.groupList$ = store.pipe(select(fromStore.getSelectedGroupsList));

    store
      .pipe(select(fromStore.getSelectedGroupsPageDetails))
      .pipe(tap(paginationData => (this.pagination = paginationData)))
      .subscribe();

    store
      .pipe(select(fromStore.getSelectedGroupSortingOrder))
      .pipe(tap(sortedValues => (this.latestSortingOrder = sortedValues)))
      .subscribe();

    store
      .pipe(select(fromStore.getSelectedGroupFilterValues))
      .pipe(tap(filtervals => (this.filterValues = filtervals)))
      .subscribe();

    store
      .pipe(select(fromStore.getSelectedGroupsSearchText))
      .pipe(tap(groupSearchText => (this.latestSearch = groupSearchText)))
      .subscribe();

    store
      .pipe(select(fromStore.getSelectedGroupShowFilters))
      .pipe(tap(showFilter => (this.showFilters = showFilter)))
      .subscribe();

    store
      .pipe(select(fromStore.getSelectedGroupFilterSource))
      .pipe(tap(filterProperties => (this.filterProperties = filterProperties)))
      .subscribe();

    store
      .pipe(select(fromStore.getSelectedGroupShowSelection))
      .pipe(tap(showSelection => (this.groupShowSelection = showSelection)))
      .subscribe();

    store
      .pipe(select(fromStore.getSelectedGroupIsSelectAll))
      .pipe(tap(isSelectAll => (this.isSelectAll = isSelectAll)))
      .subscribe();

    store
      .pipe(select(fromStore.getSelectedGroupIsIntermediateSelect))
      .pipe(tap(isIntermediateSelect => (this.isIntermediateSelect = isIntermediateSelect)))
      .subscribe();
  }

  ngOnInit() {
    this.title = 'Group Management';
    this.selectedGroups = [];
    this.store.dispatch(
      fromStore.loadGroupsList({
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

  onClickFilter() {
    this.showFilters = true;
    this.store.dispatch(
      fromStore.gorupFilterOnOff({
        payload: { filter: groupDefaults.filterProperties, showFilter: this.showFilters },
      }),
    );
    this.store
      .pipe(select(fromStore.getSelectedGroupFilterSource))
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
    this.store.dispatch(fromStore.filterValueGroups({ payload: { filter: this.filterValues } }));
    this.pagination.page = 1;
    this.store.dispatch(
      fromStore.groupPaginationChange({ payload: { pagination: this.pagination } }),
    );

    this.store.dispatch(
      fromStore.loadGroupsList({
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
      .pipe(select(fromStore.getSelectedGroupFilterTitle(value)))
      .pipe(tap(filtervals => (this.filterProperties = filtervals)))
      .subscribe();
  }

  onClickClearFilter() {
    this.clearOn = false;
    this.filterValues = [];
    const clearValues = { title: '', value: { value: '', displayValue: '' } };
    this.store
      .pipe(select(fromStore.getSelectedGroupFilterTitle(clearValues)))
      .pipe(tap(filtervals => (this.filterProperties = filtervals)))
      .subscribe();
    this.store.dispatch(fromStore.filterValueGroups({ payload: { filter: [clearValues] } }));
    this.pagination.page = 1;
    this.store.dispatch(
      fromStore.groupPaginationChange({ payload: { pagination: this.pagination } }),
    );
    this.store.dispatch(
      fromStore.loadGroupsList({
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
      .pipe(select(fromStore.getSelectedGroupFilterValues))
      .pipe(tap(filtervals => (this.filterValues = filtervals)))
      .subscribe();
    this.store.dispatch(fromStore.filterValueGroups({ payload: { filter: this.filterProperties } }));
  }

  onClickHideFilter() {
    this.showFilters = false;
    this.store.dispatch(
      fromStore.filterOnOff({
        payload: { filter: groupDefaults.filterProperties, showFilter: this.showFilters },
      }),
    );
  }

  onClickRefreshEvent(event: any) {
    this.store.dispatch(
      fromStore.loadGroupsList({
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

  onClickSearchGroupUser(event: any) {
    this.latestSearch = '';
    const searchText = event.searchText;
    this.store.dispatch(fromStore.userGroupSearch({ payload: { searchText } }));
    this.pagination.page = 1;
    this.store.dispatch(
      fromStore.groupPaginationChange({ payload: { pagination: this.pagination } }),
    );
    this.store
      .pipe(select(fromStore.getSelectedGroupsSearchText))
      .pipe(tap(groupSearchText => (this.latestSearch = groupSearchText)))
      .subscribe();
    this.store.dispatch(
      fromStore.loadGroupsList({
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

  onCheckAllGroups(event) {
    this.store
      .pipe(select(fromStore.getSelectedGroups))
      .pipe(tap(selectedGroups => (this.selectedGroups = selectedGroups)))
      .subscribe();
    this.groupList$.pipe(tap(groups => (this.groups = groups))).subscribe();
    this.selectedGroups = funGroupCheckAll({ event, groups: this.groups }, this.selectedGroups);
    this.groups = funGroupSetIsSelect(this.groups, this.selectedGroups);
    this.store.dispatch(
      fromStore.groupSelectionChange({
        payload: {
          selectedGroups: this.selectedGroups,
          groups: this.groups,
        },
      }),
    );
  }

  onCheckGroup(event) {
    this.store
      .pipe(select(fromStore.getSelectedGroups))
      .pipe(tap(selectedGroups => (this.selectedGroups = selectedGroups)))
      .subscribe();
    this.groupList$.pipe(tap(groups => (this.groups = groups))).subscribe();
    this.selectedGroups = funGroupCheck(event, this.selectedGroups);
    this.groups = funGroupSetIsSelect(this.groups, this.selectedGroups);
    this.store.dispatch(
      fromStore.groupSelectionChange({
        payload: {
          selectedGroups: this.selectedGroups,
          groups: this.groups,
        },
      }),
    );
  }

  onClickGroupShowSelection(event: any) {
    this.groupShowSelection = event.show;
    this.store.dispatch(
      fromStore.groupSelectionOnOff({
        payload: { groupSelection: this.groupShowSelection },
      }),
    );
  }

  onClickUpdateGroupStatus(event: any) {
    let updateGroupIds = [];
    if (event.groupId !== '') {
      updateGroupIds.push(event.groupId);
    } else {
      this.store.select(fromStore.getSelectedGroups).subscribe(selectedGroups => {
        updateGroupIds = selectedGroups.map(groups => groups.groupId);
      });
    }
    this.store.dispatch(
      fromStore.updateGroupStatus({ payload: { groupIds: updateGroupIds, status: event.status } }),
    );
  }

  onClickPageEvent(value: any) {
    const event = value.event;
    this.pagination.pageSize = event.pageSize;
    this.pagination.page = event.pageIndex + 1;
    this.pagination.recordCount = event.length;
    this.store.dispatch(
      fromStore.groupPaginationChange({
        payload: { pagination: this.pagination },
      }),
    );
    this.store.dispatch(
      fromStore.loadGroupsList({
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
  onSortGroupData(event: any) {
    this.latestSortingOrder = '';
    this.store
      .pipe(select(fromStore.getSelectedSortingOrder))
      .pipe(tap(sortedValues => (this.latestSortingOrder = sortedValues)))
      .subscribe();
    this.latestSortingOrder = funSortingOrder(event, this.latestSortingOrder);
    this.store.dispatch(fromStore.sortGroups({ payload: { sort: this.latestSortingOrder } }));
    this.store.dispatch(
      fromStore.loadGroupsList({
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
}
