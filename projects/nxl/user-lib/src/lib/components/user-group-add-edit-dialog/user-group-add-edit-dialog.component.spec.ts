import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGroupAddEditDialogComponent } from './user-group-add-edit-dialog.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HAMMER_LOADER } from '@angular/platform-browser';
import { MaterialLibModule } from '@nxl/material-lib';

describe('UserGroupAddEditDialogComponent', () => {
  let component: UserGroupAddEditDialogComponent;
  let fixture: ComponentFixture<UserGroupAddEditDialogComponent>;
  const groupName = 'groupName';
  const groupDescription = 'groupDescription';
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserGroupAddEditDialogComponent],
      imports: [MaterialLibModule, ReactiveFormsModule, BrowserAnimationsModule],
      providers: [
        {
          provide: HAMMER_LOADER,
          useValue: () => new Promise(() => {}),
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserGroupAddEditDialogComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    component.title = 'Add';
    component.data = {
      groupName: 'Account',
      groupDescription: 'test account',
    };
    fixture.detectChanges();

    spyOn(component, 'ngOnInit').and.callThrough();
    spyOn(component, 'onSaveGroup').and.callThrough();
    spyOn(component, 'onUpdateGroup').and.callThrough();
    spyOn(component, 'onCancelGroup').and.callThrough();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onClickCancel', () => {
    component.onCancelGroup();
    fixture.detectChanges();
    expect(component.onCancelGroup).toHaveBeenCalled();
  });

  it('should call onUpdateGroup', () => {
    const groupAddEditForm = component.groupAddEditForm;
    component.groupAddEditForm.controls[groupName].setValue('Group2');
    component.groupAddEditForm.controls[groupDescription].setValue('test group2');
    component.onUpdateGroup(groupAddEditForm);
    fixture.detectChanges();
    expect(component.onUpdateGroup).toHaveBeenCalled();
  });

  it('should call onSaveGroup', () => {
    const groupAddEditForm = component.groupAddEditForm;
    component.groupAddEditForm.controls[groupName].setValue('Group1');
    component.groupAddEditForm.controls[groupDescription].setValue('test group1');
    component.onSaveGroup(groupAddEditForm);
    fixture.detectChanges();
    expect(component.onSaveGroup).toHaveBeenCalled();
  });
});
