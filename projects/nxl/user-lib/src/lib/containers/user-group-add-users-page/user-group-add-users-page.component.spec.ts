import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGroupAddUsersPageComponent } from './user-group-add-users-page.component';
import { UserGroupAddUsersDialogComponent } from '../../components';
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
import { DisableIfUnauthorizedDirective } from '@nxl/authorization-lib';
import * as testData from '../../data/test/user-test-data';
import * as groupTestData from '../../data/test/group-test-data';

describe('UserGroupAddUsersPageComponent', () => {
  let component: UserGroupAddUsersPageComponent;
  let fixture: ComponentFixture<UserGroupAddUsersPageComponent>;
  let router: Router;
  const initialState = {
    user: {
      user: {
        addGroupUsersList: testData.usersList,
        allGroupedUsers: testData.usersList,
        addGroupUsersPagination: testData.paginationData,
        usersTableSort: '',
        addGroupUsersSearchText: '',
        addUsersShowSelection: true,
        addGroupSelectedUser: testData.selectedUsers,
        isLoaded: false,
        isLoading: false,
        errorMessage: null,
        displayColumnList: groupTestData.groupedUsersTableColumnList.map(x => Object.assign({}, x)),
        selectedUserPermissions: testData.userPermission,
        groupList: groupTestData.groupList,
      },
    },
    authorization: {
      authorization: {
        isLoaded: false,
        isLoading: false,
        errorMessage: '',
        permissions: testData.userPermission,
      },
    },
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        UserGroupAddUsersPageComponent,
        UserGroupAddUsersDialogComponent,
        DisableIfUnauthorizedDirective,
      ],
      imports: [
        RouterTestingModule,
        MaterialLibModule,
        BrowserAnimationsModule,
        FlexLayoutModule,
        MatNativeDateModule,
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
        entryComponents: [UserGroupAddUsersDialogComponent],
      },
    });
    router = TestBed.get(Router);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserGroupAddUsersPageComponent);
    component = fixture.componentInstance;

    component.usersList = testData.usersList;
    component.selectedUsers = testData.selectedUsers;
    component.latestSearch = 'test';
    component.allGroupedUsers = testData.usersList;
    component.groupName = 'Accounts';
    component.groupId = '1';

    fixture.detectChanges();
    spyOn(component, 'onCancel').and.callThrough();
    spyOn(component, 'onNewUserClick').and.callThrough();
    spyOn(component, 'onSearchKeyUp').and.callThrough();
    spyOn(component, 'onChangePageEvent').and.callThrough();
    spyOn(component, 'onCheckAll').and.callThrough();
    spyOn(component, 'onCheck').and.callThrough();
    spyOn(component, 'onSave').and.callThrough();
  });

  afterEach(() => {
    fixture.destroy();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call on Click Page Event ', () => {
    const value = {
      event: {
        previousPageIndex: 0,
        pageIndex: 0,
        pageSize: 10,
        length: 9,
      },
    };
    component.onChangePageEvent(value);
    fixture.detectChanges();
    expect(component.onChangePageEvent).toHaveBeenCalled();
  });

  it('should call on check User ', () => {
    testData.checkSingleEvent.listedUserLength = testData.usersList;
    testData.checkSingleEvent.selectedUser = testData.userDetail;
    component.onCheck(testData.checkSingleEvent, testData.selectedUsers);
    fixture.detectChanges();
    expect(component.onCheck).toHaveBeenCalled();
  });

  it('should call on check All Users ', () => {
    testData.checkAllEvent.totalUsersList = testData.usersList;
    component.onCheckAll(testData.checkAllEvent);
    fixture.detectChanges();
    expect(component.onCheckAll).toHaveBeenCalled();
  });

  it('should call on click cancel', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.groupId = '1';
    component.onCancel();
    fixture.detectChanges();

    expect(component.onCancel).toHaveBeenCalled();
    expect(navigateSpy).toHaveBeenCalledWith(['/user/user-group-details/', component.groupId]);
  });

  it('should call Search Event ', () => {
    const $event = {
      target: {
        value: 't',
      },
    };
    component.onSearchKeyUp($event);
    fixture.detectChanges();
    expect(component.onSearchKeyUp).toHaveBeenCalled();
  });

  it('should call new user add Event ', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.onNewUserClick();
    fixture.detectChanges();
    expect(component.onNewUserClick).toHaveBeenCalled();
    expect(navigateSpy).toHaveBeenCalledWith(['/user/user-add/']);
  });

  it('should call save Event ', () => {
    component.onSave();
    fixture.detectChanges();
    expect(component.onSave).toHaveBeenCalled();
  });
});
