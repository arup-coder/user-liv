import { RouterTestingModule } from '@angular/router/testing';
import { MaterialLibModule } from '@nxl/material-lib';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import * as TestData from '../../data/test/user-test-data';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { MatDialogModule } from '@angular/material';
import { MAT_DIALOG_DATA, MatSort, MatTableDataSource } from '@angular/material';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDialogSetPermissionsComponent } from './user-dialog-set-permissions.component';

describe('UserDialogSetPermissionsComponentComponent', () => {
  let component: UserDialogSetPermissionsComponent;
  let fixture: ComponentFixture<UserDialogSetPermissionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserDialogSetPermissionsComponent],
       imports: [
        RouterTestingModule,
        MaterialLibModule,
        BrowserAnimationsModule,
        MatDialogModule
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: TestData.userPermission }
      ]
    })
      .overrideModule(BrowserDynamicTestingModule, { set: { entryComponents: [UserDialogSetPermissionsComponent] } });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDialogSetPermissionsComponent);
    component = fixture.componentInstance;
    component.setPermissions = TestData.userPermission;
    component.PermissionsDataChanges = false;
    fixture.detectChanges();
    spyOn(component, 'onClickCancel').and.callThrough();
    spyOn(component, 'onClickSave').and.callThrough();
    spyOn(component, 'getAllPermissionChecked').and.callThrough();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call onClickCancel', () => {
    component.onClickCancel();
    fixture.detectChanges();
    expect(component.onClickCancel).toHaveBeenCalled();
  });

  it('should call onClickSave', () => {
    const selectedPermission = TestData.userPermission;
    component.onClickSave(selectedPermission);
    fixture.detectChanges();
    expect(component.onClickSave).toHaveBeenCalled();
  });
  it('should call getAllPermissionChecked', () => {
    const selectedPermission = TestData.userPermission;
    component.getAllPermissionChecked(selectedPermission);
    fixture.detectChanges();
    expect(component.getAllPermissionChecked).toHaveBeenCalled();
  });
  
});
