import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialLibModule } from '@nxl/material-lib';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { UserGroupDetailsPageComponent } from './user-group-details-page.component';
import { UserGroupDetailsComponent } from '../../components/user-group-details/user-group-details.component';
import { UserListTableComponent } from '../../components/user-list-table/user-list-table.component';
import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { HAMMER_LOADER } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import * as fromRoot from '../../store/reducers';
import {
  UserSecondTopBarComponent,
  UserListFilterComponent,
  UserListSearchComponent,
} from '../../components';
import { DisableIfUnauthorizedDirective } from '@nxl/authorization-lib';
import * as testData from '../../data/test/user-test-data';
import * as groupTestData from '../../data/test/group-test-data';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PhoneNumberPipe, StatusPipe } from '../../pipes/user.pipe';

describe('UserGroupDetailsPageComponent', () => {
  let component: UserGroupDetailsPageComponent;
  let fixture: ComponentFixture<UserGroupDetailsPageComponent>;

  const initialState = {
    user: {
      user: {
        users: testData.usersList,
        usersTablePage: testData.paginationData,
        usersTableSort: 'name',
        usersTableFilter: null,
        selectedUsersList: [],
        isLoaded: false,
        isLoading: false,
        errorMessage: null,
        displayColumnList: groupTestData.groupedUsersTableColumnList.map(x => Object.assign({}, x)),
        selectedUserPermissions: testData.userPermission,
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
        UserGroupDetailsPageComponent,
        UserGroupDetailsComponent,
        UserListTableComponent,
        UserSecondTopBarComponent,
        DisableIfUnauthorizedDirective,
        UserListFilterComponent,
        UserListSearchComponent,
        PhoneNumberPipe,
        StatusPipe,
      ],
      imports: [
        RouterTestingModule,
        MaterialLibModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        DragDropModule,
        StoreModule.forRoot({ user: fromRoot.reducers.user }),
      ],
      providers: [
        {
          provide: HAMMER_LOADER,
          useValue: () => new Promise(() => {}),
        },
        provideMockStore({ initialState }),
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserGroupDetailsPageComponent);
    component = fixture.componentInstance;
    component.isGroupManagement = true;
    component.pagination = testData.paginationData;
    component.usersList$ = of(testData.usersList);
    component.displayedColumns$ = of(groupTestData.groupedUsersTableColumnList);
    component.latestSortingOrder = testData.sortingData;
    component.latestSearch = testData.searchText;
    component.selectedUsers = testData.selectedUsers;
    component.filterValues = testData.filterData;
    component.groupDetail = groupTestData.groupList[0];
    component.groupId = '1';
    component.isSelectAll = true;
    component.isIntermediateSelect = true;

    fixture.detectChanges();

    spyOn(component, 'activateRoute').and.callThrough();
    spyOn(component, 'deactivateRoute').and.callThrough();
    spyOn(component, 'onAddUserClick').and.callThrough();
    spyOn(component, 'onClickSearchUser').and.callThrough();
    spyOn(component, 'onSortGroupedUserData').and.callThrough();
    spyOn(component, 'onClickPageEvent').and.callThrough();
    spyOn(component, 'onClickRefreshEvent').and.callThrough();
    spyOn(component, 'onCheckAll').and.callThrough();
    spyOn(component, 'onCheck').and.callThrough();
    spyOn(component, 'onClickRemoveUsers').and.callThrough();
    spyOn(component, 'onClickUserShowSelection').and.callThrough();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call activate route', () => {
    component.activateRoute();
    fixture.detectChanges();
    expect(component.activateRoute).toHaveBeenCalled();
    expect(component.opened).toBe(true);
  });

  it('should call deactivate route', () => {
    component.deactivateRoute();
    fixture.detectChanges();
    expect(component.deactivateRoute).toHaveBeenCalled();
    expect(component.opened).toBe(false);
  });

  it('should call add user click Event ', () => {
    component.onAddUserClick();
    fixture.detectChanges();
    expect(component.onAddUserClick).toHaveBeenCalled();
  });

  it('should call Search Event ', () => {
    component.onClickSearchUser(component.latestSearch);
    fixture.detectChanges();
    expect(component.onClickSearchUser).toHaveBeenCalled();
  });

  it('should call on Click Sort Event ', () => {
    const event = {
      active: 'asc',
      direction: 'name',
    };
    component.onSortGroupedUserData(event);
    fixture.detectChanges();
    expect(component.onSortGroupedUserData).toHaveBeenCalled();
  });

  it('should call Refresh Event ', () => {
    const event = {};
    component.onClickRefreshEvent(event);
    fixture.detectChanges();
    expect(component.onClickRefreshEvent).toHaveBeenCalled();
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
    component.onClickPageEvent(value);
    fixture.detectChanges();
    expect(component.onClickPageEvent).toHaveBeenCalled();
  });

  it('should call on check User ', () => {
    testData.checkSingleEvent.listedUserLength = testData.usersList;
    testData.checkSingleEvent.selectedUser = testData.userDetail;
    component.onCheck(testData.checkSingleEvent);
    fixture.detectChanges();
    expect(component.onCheck).toHaveBeenCalled();
  });

  it('should call on check All Users ', () => {
    testData.checkAllEvent.totalUsersList = testData.usersList;
    component.onCheckAll(testData.checkAllEvent);
    fixture.detectChanges();
    expect(component.onCheckAll).toHaveBeenCalled();
  });

  it('should call on click remove user', () => {
    component.onClickRemoveUsers(testData.selectedUsers);
    fixture.detectChanges();
    expect(component.onClickRemoveUsers).toHaveBeenCalled();
  });

  it('should call on click remove user checking the selectAll acondition', () => {
    const event = {
      selectedUsers: testData.selectedUsers,
    };
    component.users = testData.selectedUsers;
    component.selectedUsers = testData.selectedUsers;
    component.pagination.page = 1;
    component.pagination.pageSize = 5;
    component.onClickRemoveUsers(event);
    fixture.detectChanges();
    expect(component.onClickRemoveUsers).toHaveBeenCalled();
  });

  it('should call on click remove user', () => {
    const event = {
      show: true,
    };
    component.onClickUserShowSelection(event);
    fixture.detectChanges();
    expect(component.onClickUserShowSelection).toHaveBeenCalled();
  });
});
