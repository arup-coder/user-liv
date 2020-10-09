import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGroupAddEditPageComponent } from './user-group-add-edit-page.component';
import { UserGroupAddEditDialogComponent } from '../../components';

import { RouterTestingModule } from '@angular/router/testing';
import { MaterialLibModule } from '@nxl/material-lib';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatDialogModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatNativeDateModule } from '@angular/material';
import { HAMMER_LOADER } from '@angular/platform-browser';
import { provideMockStore } from '@ngrx/store/testing';
import { Router } from '@angular/router';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { StoreModule } from '@ngrx/store';
import * as fromRoot from '../../store/reducers';
import * as testData from '../../data/test/user-test-data';
import { ReactiveFormsModule } from '@angular/forms';
import * as groupTestData from '../../data/test/group-test-data';

describe('UserGroupAddEditPageComponent', () => {
  let component: UserGroupAddEditPageComponent;
  let fixture: ComponentFixture<UserGroupAddEditPageComponent>;
  let router: Router;

  const initialState = {
    user: {
      user: {
        groupList: groupTestData.groupList,
        users: testData.usersList,
        usersTablePage: testData.paginationData,
        usersTableSort: 'firstName',
        usersTableFilter: null,
        selectedUsersList: testData.selectedUsers,
        isLoaded: false,
        isLoading: false,
        errorMessage: null,
        displayColumnList: testData.TableColumnList.map(x => Object.assign({}, x)),
        selectedUserPermissions: testData.userPermission,
      },
    },
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserGroupAddEditPageComponent, UserGroupAddEditDialogComponent],
      imports: [
        RouterTestingModule,
        MaterialLibModule,
        BrowserAnimationsModule,
        FlexLayoutModule,
        MatNativeDateModule,
        ReactiveFormsModule,
        StoreModule.forRoot({ user: fromRoot.reducers.user }),
      ],
      providers: [
        provideMockStore(),
        MatDialogModule,
        MatNativeDateModule,
        {
          provide: HAMMER_LOADER,
          useValue: () => new Promise(() => {}),
        },
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        provideMockStore({ initialState }),
      ],
    }).overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [UserGroupAddEditDialogComponent],
      },
    });
    router = TestBed.get(Router);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserGroupAddEditPageComponent);
    component = fixture.componentInstance;

    component.groupDetail = groupTestData.groupList[0];
    component.updatedGroupValue = groupTestData.updateGroup;
    component.selectedGroupId = '1';
    fixture.detectChanges();

    spyOn(component, 'onSaveGroup').and.callThrough();
    spyOn(component, 'onUpdateGroup').and.callThrough();
    spyOn(component, 'onCancelGroup').and.callThrough();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call on click cancel group', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.onCancelGroup();
    fixture.detectChanges();

    expect(component.onCancelGroup).toHaveBeenCalled();
    expect(navigateSpy).toHaveBeenCalledWith(['/user/user-group-management']);
  });

  it('should call save Event ', () => {
    const formValue = {
      groupName: 'test',
      groupDescription: 'test'
    };
    const groupAddEditForm = {
      value: formValue,
    };
    component.onSaveGroup(groupAddEditForm);
    fixture.detectChanges();
    expect(component.onSaveGroup).toHaveBeenCalled();
  });

  it('should call update Event ', () => {
    component.groupDetail = groupTestData.groupList[0];
    const formValue = {
      groupName: 'test',
      groupDescription: 'test',
      tenantId: testData.tenantId,
      groupId: 1
    };
    const groupAddEditForm = {
      value: formValue,
    };
    component.onUpdateGroup(groupAddEditForm);
    fixture.detectChanges();
    expect(component.onUpdateGroup).toHaveBeenCalled();
  });
});
