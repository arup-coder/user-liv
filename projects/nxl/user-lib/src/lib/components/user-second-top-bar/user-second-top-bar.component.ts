import { Component, OnInit, Input, Inject, Output, EventEmitter } from '@angular/core';
import * as fromPermissions from '../../enums/user-permission-values-enums';
@Component({
  selector: 'lib-user-second-top-bar',
  templateUrl: './user-second-top-bar.component.html',
  styleUrls: ['./user-second-top-bar.component.scss'],
})
export class UserSecondTopBarComponent implements OnInit {
  @Input() title: string;
  @Input() selectedUserId: string;
  moduleName: any;
  permissions: any;

  constructor() {
    this.moduleName = fromPermissions.ModuleName;
    this.permissions = fromPermissions.Permissions;
  }

  ngOnInit() {}
}
