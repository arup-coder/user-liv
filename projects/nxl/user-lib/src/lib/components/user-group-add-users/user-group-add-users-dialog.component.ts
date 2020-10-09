import { Component, OnInit, Optional, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatPaginator } from '@angular/material';
import * as fromPermissions from '../../enums/user-permission-values-enums';
import { User } from '../../models/user.model';

@Component({
  selector: 'lib-user-group-add-users-dialog',
  templateUrl: './user-group-add-users-dialog.component.html',
  styleUrls: ['./user-group-add-users-dialog.component.scss'],
})
export class UserGroupAddUsersDialogComponent implements OnInit {
  @ViewChild('paginator', { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = ['checkbox', 'name', 'email'];
  searchText: string;
  moduleName: any;
  permissions: any;
  groupName: string;
  pagination: any;
  usersList: User[];
  isSelectAll: boolean;
  isIntermediateSelect: boolean;
  selectedUsers: any[];

  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
    this.moduleName = fromPermissions.ModuleName;
    this.permissions = fromPermissions.Permissions;
  }

  ngOnInit() {
    this.usersList = this.data.usersList;
    this.pagination = this.data.pagination;
    this.searchText = this.data.searchText;
    this.isSelectAll = this.data.isSelectAll;
    this.isIntermediateSelect = this.data.isIntermediateSelect;
  }
  onCancel() {}
  onChangePageEvent(event) {}
  onSearchKeyUp(event) {}
  onCheckAll(event) {}
  onCheck(event, selectedUser: User) {}
  onSave() {}
  onNewUserClick(){}
}
