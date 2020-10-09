import { Component, OnInit, Input, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';
import { UserPermissionResponse } from '../../models/user-permission-response.model';

import * as defaultValues from '../../data/defaults/user-default-values';
@Component({
  selector: 'lib-user-dialog-set-permissions',
  templateUrl: './user-dialog-set-permissions.component.html',
  styleUrls: ['./user-dialog-set-permissions.component.scss']
})
export class UserDialogSetPermissionsComponent implements OnInit {
  displayedColumns: string[] = [
    'moduleName',
    'all',
    'create',
    'read',
    'update',
    'delete'
  ];
  setPermissions: UserPermissionResponse[];
  router: any;
  store: any;
  dialog: any;
  name: string;
  userId: string;
  PermissionsDataChanges: boolean;
  setSavePermissionRequest: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {

    if (this.data.setPermissions && this.data.setPermissions.length) {
      this.setPermissions = this.data.setPermissions;
    }
    else {
      this.setPermissions = defaultValues.defaultPermission;
    }
    this.name = this.data.setname;
    this.PermissionsDataChanges = true;
  }
  onCheck(event, selectedPermission: UserPermissionResponse) {
    const checked = event.checked;
    this.PermissionsDataChanges = false;
    selectedPermission.create = checked;
    selectedPermission.delete = checked;
    selectedPermission.read = checked;
    selectedPermission.update = checked;
  }

  allSelection(event, value, object) {
    const checked = event.checked;
    this.PermissionsDataChanges = false;
    if (object === 'create') {
      value.create = checked;
    } else if (object === 'read') {
      value.read = checked;
    } else if (object === 'update') {
      value.update = checked;
    } else if (object === 'delete') {
      value.delete = checked;
    }
    if (value.create && value.read && value.update && value.delete) {
      value.all = true;
    } else {
      value.all = false;
    }
  }

  onClickCancel() { }
  onClickSave(selectedPermissions) {
  }
  getAllPermissionChecked(selectedPermissions) {
    if (selectedPermissions) {
      return (selectedPermissions.create && selectedPermissions.read &&
        selectedPermissions.update && selectedPermissions.delete) ? true : false;
    }
    else {
      return false;
    }

  }
}
