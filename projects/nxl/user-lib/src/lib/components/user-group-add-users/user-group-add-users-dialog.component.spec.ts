import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGroupAddUsersDialogComponent } from './user-group-add-users-dialog.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HAMMER_LOADER } from '@angular/platform-browser';
import { MaterialLibModule } from '@nxl/material-lib';
import { DisableIfUnauthorizedDirective } from '@nxl/authorization-lib';
import { provideMockStore } from '@ngrx/store/testing';
import * as testData from '../../data/test/user-test-data';

describe('UserGroupAddUsersDialogComponent', () => {
  let component: UserGroupAddUsersDialogComponent;
  let fixture: ComponentFixture<UserGroupAddUsersDialogComponent>;
  const initialState = {
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
      declarations: [UserGroupAddUsersDialogComponent, DisableIfUnauthorizedDirective],
      imports: [MaterialLibModule, BrowserAnimationsModule],
      providers: [
        provideMockStore({ initialState }),
        {
          provide: HAMMER_LOADER,
          useValue: () => new Promise(() => {}),
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserGroupAddUsersDialogComponent);
    component = fixture.componentInstance;
    component.data = {
      usersList: testData.selectedUsers,
      pagination: testData.paginationData,
      searchText: '',
      isSelectAll: true,
      isIntermediateSelect: false,
    }
    component.selectedUsers = testData.selectedUsers;
    fixture.detectChanges();
    spyOn(component, 'ngOnInit').and.callThrough();
    spyOn(component, 'onChangePageEvent').and.callThrough();
    spyOn(component, 'onSearchKeyUp').and.callThrough();
    spyOn(component, 'onCheckAll').and.callThrough();
    spyOn(component, 'onCheck').and.callThrough();
    spyOn(component, 'onSave').and.callThrough();
    spyOn(component, 'onCancel').and.callThrough();



  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onSave', () => {
    component.onSave();
    fixture.detectChanges();
    expect(component.onSave).toHaveBeenCalled();
  });

   it('should call onClickCancel', () => {
     component.onCancel();
     fixture.detectChanges();
     expect(component.onCancel).toHaveBeenCalled();
   });

  it('should call onChangePageEvent', () => {
    component.onChangePageEvent(testData.paginationData);
    fixture.detectChanges();
    expect(component.onChangePageEvent).toHaveBeenCalled();
  });
  it('should call onSearchKeyUp', () => {
    component.onSearchKeyUp('test');
    fixture.detectChanges();
    expect(component.onSearchKeyUp).toHaveBeenCalled();
  });
  it('should call onCheckAll', () => {
    component.onCheckAll(true);
    fixture.detectChanges();
    expect(component.onCheckAll).toHaveBeenCalled();
  });
  it('should call onCheck', () => {
    component.onCheck(true, testData.selectedUsers[0]);
    fixture.detectChanges();
    expect(component.onCheck).toHaveBeenCalled();
  });
});
