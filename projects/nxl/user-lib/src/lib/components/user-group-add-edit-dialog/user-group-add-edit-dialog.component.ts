import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { GroupList } from '../../models/group.model';

@Component({
  selector: 'lib-user-group-add-edit-dialog',
  templateUrl: './user-group-add-edit-dialog.component.html',
  styleUrls: ['./user-group-add-edit-dialog.component.scss'],
})
export class UserGroupAddEditDialogComponent implements OnInit {
  title: string;
  groupDetail: GroupList;
  groupAddEditForm = this.fb.group({
    groupName: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
    groupDescription: ['', []],
  });

  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder) {}

  ngOnInit() {
    this.title = 'Add';
    if (this.data) {
      this.title = 'Update';
      this.groupAddEditForm.patchValue({
        groupName: this.data.groupName,
        groupDescription: this.data.groupDescription,
      });
    }
  }

  get groupNameControl() {
    return this.groupAddEditForm.get('groupName') as FormControl;
  }

  get groupNameControlRequired() {
    return this.groupNameControl.hasError('required') && this.groupNameControl.touched;
  }

  get groupNameControlInvalid() {
    return this.groupNameControl.hasError('pattern') && this.groupNameControl.touched;
  }

  onSaveGroup(groupAddEditForm: FormGroup) {}
  onUpdateGroup(groupAddEditForm: FormGroup) {}
  onCancelGroup() {}
}
