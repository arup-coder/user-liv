import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GroupList } from '../../models/group.model';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'lib-user-group-details',
  templateUrl: './user-group-details.component.html',
  styleUrls: ['./user-group-details.component.scss'],
})
export class UserGroupDetailsComponent implements OnInit {
  @Input() groupDetail: GroupList;
  @Input() userList: any;
  // @Output() onAddUser = new EventEmitter();

  groupDetailForm = this.fb.group({
    groupName: ['', []],
    groupDescription: ['', []],
  });

  displayedColumns: string[] = ['checkbox', 'name', 'employeeId', 'userName', 'dateAdded', 'menu'];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    if (this.groupDetail) {
      this.groupDetailForm.patchValue({
        groupName: this.groupDetail.groupName,
        groupDescription: this.groupDetail.groupDescription,
      });
    }
  }

}
