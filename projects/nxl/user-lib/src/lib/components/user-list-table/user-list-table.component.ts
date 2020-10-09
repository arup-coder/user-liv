import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { User } from '../../models/user.model';
import { PaginationHeaders } from '../../models/user-response.model';
import { TableColumns } from '../../models/user-table-column-model';
import { CdkDragStart, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatPaginator, MatSort, MatSortHeader } from '@angular/material';
import { funLastSortingOrder } from '../../functions';
import * as fromPermissions from '../../enums/user-permission-values-enums';
import { GroupList } from '../../models/group.model';
import { Country } from '../../models/user-country.model';
@Component({
  selector: 'lib-user-list-table',
  templateUrl: './user-list-table.component.html',
  styleUrls: ['./user-list-table.component.scss'],
})
export class UserListTableComponent implements OnInit, AfterViewInit {
  @Input() pagination: PaginationHeaders;
  @Input() sortOrder: string;
  @Input() usersList: any[];
  @Input() displayedColumns: TableColumns[];
  @Input() today: Date;
  @Input() showFilters: boolean;
  @Input() userShowSelection: boolean;
  @Input() clearOn: boolean;
  @Input() filters: [];

  @Input() filterHeaderValue: string;
  @Input() pageSize: number;
  @Input() countries: Country[];
  @Input() selectedUsers: User[];
  @Input() isSelectAll: boolean;
  @Input() isIntermediateSelect: boolean;
  @Input() latestSearchText: string;

  @Input() isGroupManagement: boolean;
  @Input() groupDetail: GroupList;

  @Output() onFilter = new EventEmitter();
  @Output() onClearFilter = new EventEmitter();
  @Output() onHideFilter = new EventEmitter();
  @Output() onUserShowSelection = new EventEmitter<{ show: boolean }>();

  @Output() onUserFilter = new EventEmitter<{ event: any }>();
  @Output() onSortUserData = new EventEmitter<{ event: any }>();
  @Output() onPageEvent = new EventEmitter<{ event: any }>();
  @Output() onRefreshEvent = new EventEmitter<{ event: any }>();
  @Output() onSearchUser = new EventEmitter<{ event: any }>();
  @Output() onCheckAllUsers = new EventEmitter<{ event: any }>();
  @Output() onCheckUser = new EventEmitter<{ event: any; selectedUser: User }>();
  @Output() onSelectPermissions = new EventEmitter<{ selectedUser: User }>();
  @Output() onMultipleDelete = new EventEmitter<{ $event: any }>();
  @Output() ondropListDropped = new EventEmitter<{ $event: any; allColumns: TableColumns }>();
  @Output() onActivateUsers = new EventEmitter<{ userId: string }>();
  @Output() onDeactivateUsers = new EventEmitter<{ userId: string }>();
  @ViewChild('paginator', { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @Output() onClickRemoveUsers = new EventEmitter<{ selectedUser: User }>();
  
  moduleName: any;
  permissions: any;
  previousIndex: number;
  sortActiveField: string;
  sortDirection: string;

  constructor() {
    this.sortActiveField = 'firstName' ? 'firstName' : 'name';
    this.sortDirection = 'asc';
    this.moduleName = fromPermissions.ModuleName;
    this.permissions = fromPermissions.Permissions;
  }
  ngOnInit() {}
  ngAfterViewInit() {
    if (this.pagination) {
      setTimeout(() => {
        this.usersList.length > 0
          ? this.paginator
            ? (this.paginator.pageIndex = this.pagination.page - 1)
            : null
          : null;
      }, 1000);
    }
    if (this.sortOrder !== '') {
      setTimeout(() => {
        let sortColumn = funLastSortingOrder(this.sortOrder);
        this.sortDirection = sortColumn.toString().indexOf('-') > -1 ? 'desc' : 'asc';
        sortColumn = sortColumn.replace('-', '');
        this.sortActiveField = sortColumn;
        if (this.sort) {
          if (this.sort.sortables.get(sortColumn)) {
            (this.sort.sortables.get(sortColumn) as MatSortHeader)._setAnimationTransitionState({
              toState: 'active',
            });
          }
        }
      }, 1000);
    }
  }
  onClickFilter() {
    this.onFilter.emit();
  }

  onClickClearFilter() {
    if (this.paginator) {
      this.paginator.pageIndex = 0;
    }
    this.onClearFilter.emit();
  }

  onClickHideFilter() {
    this.onHideFilter.emit();
  }
  onClickUserShowSelection(show: boolean) {
    this.onUserShowSelection.emit({ show });
  }
  onClickUserFilter(event: any) {
    if (this.paginator) {
      this.paginator.pageIndex = 0;
    }
    this.onUserFilter.emit(event);
  }

  onSortData($event: any) {
    this.onSortUserData.emit($event);
  }

  onChangePageEvent(event: any) {
    this.onPageEvent.emit({ event });
  }

  onRefresh() {
    this.onRefreshEvent.emit({ event });
  }
  getDisplayedColumns(): string[] {
    return this.displayedColumns.filter(cd => cd.visible === true).map(cd => cd.columnName);
  }

  onSearch($event: any) {
    if (this.paginator) {
      this.paginator.pageIndex = 0;
    }
    this.onSearchUser.emit($event);
  }

  dragStarted(event: CdkDragStart, index: number) {
    this.previousIndex = index;
  }

  dropListDropped($event: CdkDropList, index: number, allColumns) {
    moveItemInArray(this.displayedColumns, this.previousIndex, index);
    this.ondropListDropped.emit({ $event, allColumns });
  }
  onClickActivateUsers(userId: string) {
    this.onActivateUsers.emit({ userId });
  }

  onClickDeactivateUsers(userId: string) {
    this.onDeactivateUsers.emit({ userId });
  }
  onCheckAll(event) {
    this.onCheckAllUsers.emit(event);
  }
  onCheck(event, selectedUser: User) {
    this.onCheckUser.emit({ event, selectedUser });
  }
  onPermissionSetting(selectedUser) {
    this.onSelectPermissions.emit({ selectedUser });
  }

  onRemoveUsers(selectedUser) {
    this.onClickRemoveUsers.emit({ selectedUser });
  }
}
