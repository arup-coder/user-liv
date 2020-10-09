import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GroupList } from '../../models/group.model';
import { PaginationHeaders } from '../../models/user-response.model';

@Component({
  selector: 'lib-user-group-management',
  templateUrl: './user-group-management.component.html',
  styleUrls: ['./user-group-management.component.scss'],
})
export class UserGroupManagementComponent implements OnInit {
  @Input() groupList: GroupList[];
  @Input() showFilters: boolean;
  @Input() clearOn: boolean;
  @Input() today: Date;
  @Input() filters: [];
  @Input() groupShowSelection: boolean;
  @Input() selectedGroups: GroupList[];
  @Input() isSelectAll: boolean;
  @Input() isIntermediateSelect: boolean;
  @Input() pagination: PaginationHeaders;
  @Input() sortOrder: string;
  @Output() onFilter = new EventEmitter();
  @Output() onClearFilter = new EventEmitter();
  @Output() onHideFilter = new EventEmitter();
  @Output() onGroupFilter = new EventEmitter<{ event: any }>();
  @Output() onRefreshEvent = new EventEmitter<{ event: any }>();
  @Output() onSearchGroupUser = new EventEmitter<{ event: any }>();
  @Output() onCheckAllGroups = new EventEmitter<{ event: any }>();
  @Output() onCheckGroup = new EventEmitter<{ event: any; selectedGroup: GroupList }>();
  @Output() onUpdateGroupStatus = new EventEmitter<{ status: boolean; groupId: string }>();
  @Output() onGroupShowSelection = new EventEmitter<{ show: boolean }>();
  @Output() onPageEvent = new EventEmitter<{ event: any }>();
  @Output() onSortGroupData = new EventEmitter<{ event: any }>();

  displayedColumns: string[] = [
    'checkbox',
    'groupName',
    'groupDescription',
    'totalUsers',
    'createdDate',
    'isActive',
    'menu',
  ];
  constructor() {}

  ngOnInit() {}

  onClickFilter() {
    this.onFilter.emit();
  }

  onClickClearFilter() {
    this.onClearFilter.emit();
  }

  onClickHideFilter() {
    this.onHideFilter.emit();
  }
  onClickGroupFilter(event: any) {
    this.onGroupFilter.emit(event);
  }
  onRefresh() {
    this.onRefreshEvent.emit({ event });
  }
  onSearch($event: any) {
    this.onSearchGroupUser.emit($event);
  }

  onUpdateStatus(status: boolean, groupId: string) {
    this.onUpdateGroupStatus.emit({ status, groupId });
  }
  onCheckAll(event) {
    this.onCheckAllGroups.emit(event);
  }
  onCheck(event, selectedGroup: GroupList) {
    this.onCheckGroup.emit({ event, selectedGroup });
  }
  onClickGroupShowSelection(show: boolean) {
    this.onGroupShowSelection.emit({ show });
  }

  onChangePageEvent(event: any) {
    this.onPageEvent.emit({ event });
  }
  onSortData($event: any) {
    this.onSortGroupData.emit($event);
  }
}
