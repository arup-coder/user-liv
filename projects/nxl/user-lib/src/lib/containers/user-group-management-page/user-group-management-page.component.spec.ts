import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialLibModule } from '@nxl/material-lib';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { UserGroupManagementPageComponent } from './user-group-management-page.component';
import { UserGroupManagementComponent } from '../../components/user-group-management/user-group-management.component';
import { UserGroupListFilterComponent } from '../../components';
import { UserSecondTopBarComponent, UserGroupListSearchComponent } from '../../components';
import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { HAMMER_LOADER } from '@angular/platform-browser';
import { PhoneNumberPipe, StatusPipe } from '../../pipes/user.pipe';
import { StoreModule } from '@ngrx/store';
import * as fromRoot from '../../store/reducers';
import { DisableIfUnauthorizedDirective } from '@nxl/authorization-lib';
import * as testData from '../../data/test/user-test-data';
import * as groupTestData from '../../data/test/group-test-data';
import { MatDatepickerModule, MatNativeDateModule } from '@angular/material';

describe('UserGroupManagementPageComponent', () => {
  let component: UserGroupManagementPageComponent;
  let fixture: ComponentFixture<UserGroupManagementPageComponent>;
  const initialState = {
    user: {
      user: {
        groupList: testData.usersList,
        groupsTablePage: testData.paginationData,
        groupsTableSort: 'name',
        groupsTableFilter: null,
        groupsTableSearch: '',
        selectedGroups: groupTestData.groupList,
        isLoaded: false,
        isLoading: false,
        errorMessage: null,
        displayColumnList: testData.TableColumnList.map(x => Object.assign({}, x)),
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
        UserGroupManagementPageComponent,
        UserGroupManagementComponent,
        UserGroupListFilterComponent,
        UserSecondTopBarComponent,
        UserGroupListSearchComponent,
        PhoneNumberPipe,
        StatusPipe,
        DisableIfUnauthorizedDirective,
      ],
      imports: [
        RouterTestingModule,
        MaterialLibModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatDatepickerModule,
        MatNativeDateModule,
        StoreModule.forRoot({ user: fromRoot.reducers.user }),
      ],
      providers: [
        MatDatepickerModule,
        MatNativeDateModule,
        {
          provide: HAMMER_LOADER,
          useValue: () => new Promise(() => {}),
        },
        provideMockStore({ initialState }),
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserGroupManagementPageComponent);
    component = fixture.componentInstance;

    component.showFilters = false;
    component.pagination = testData.paginationData;
    component.groupList$ = of(groupTestData.groupList);
    component.latestSortingOrder = '';
    component.latestSearch = '';
    component.selectedGroups = groupTestData.groupList;
    component.filterValues = testData.filterData;
    component.filterProperties = testData.filterProperties;



    fixture.detectChanges();

    spyOn(component, 'onClickFilter').and.callThrough();
    spyOn(component, 'onClickClearFilter').and.callThrough();
    spyOn(component, 'onSelectFilterValues').and.callThrough();
    spyOn(component, 'onClickHideFilter').and.callThrough();
    spyOn(component, 'onClickRefreshEvent').and.callThrough();
    spyOn(component, 'onClickSearchGroupUser').and.callThrough();
     spyOn(component, 'onCheckAllGroups').and.callThrough();
    spyOn(component, 'onCheckGroup').and.callThrough();
    spyOn(component, 'onClickUpdateGroupStatus').and.callThrough();
    spyOn(component, 'onClickPageEvent').and.callThrough();
    spyOn(component, 'onSortGroupData').and.callThrough();
    spyOn(component, 'onClickGroupShowSelection').and.callThrough();

  });

   afterEach(() => {
     fixture.destroy();
   });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call on click filter', () => {
    component.onClickFilter();
    fixture.detectChanges();
    expect(component.onClickFilter).toHaveBeenCalled();
  });

  it('should call on click clear filter', () => {
    component.onClickClearFilter();
    fixture.detectChanges();
    expect(component.onClickClearFilter).toHaveBeenCalled();
  });

  it('should call on click hide filter', () => {
    component.onClickHideFilter();
    fixture.detectChanges();
    expect(component.onClickHideFilter).toHaveBeenCalled();
  });

  it('should call on check active user', () => {
    const value = {
      title: 'ActiveUser',

      value: { value: 'true', displayValue: 'Active' },
    };
    component.onSelectFilterValues(value);
    fixture.detectChanges();
    expect(component.onSelectFilterValues).toHaveBeenCalledWith(value);
  });

  it('should call on filter value as undefined', () => {
    component.filterValues = [];
    const value = {
      title: 'ActiveUser',

      value: { value: 'true', displayValue: 'Active' },
    };
    component.onSelectFilterValues(value);
    fixture.detectChanges();
    expect(component.onSelectFilterValues).toHaveBeenCalledWith(value);
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

  it('should call on Click Sort Event ', () => {
    const event = {
      active: 'asc',
      direction: 'groupName',
    };
    component.onSortGroupData(event);
    fixture.detectChanges();
    expect(component.onSortGroupData).toHaveBeenCalled();
  });

   it('should call Refresh Event ', () => {
     const event = {};
     component.onClickRefreshEvent(event);
     fixture.detectChanges();
     expect(component.onClickRefreshEvent).toHaveBeenCalled();
   });

  it('should call on check group ', () => {
    testData.checkSingleEvent.listedUserLength = testData.usersList;
    testData.checkSingleEvent.selectedUser = testData.userDetail;
    component.onCheckGroup(testData.checkSingleEvent);
    fixture.detectChanges();
    expect(component.onCheckGroup).toHaveBeenCalled();
  });

  it('should call on check all group ', () => {
    testData.checkAllEvent.totalUsersList = testData.usersList;
    component.onCheckAllGroups(testData.checkAllEvent);
    fixture.detectChanges();
    expect(component.onCheckAllGroups).toHaveBeenCalled();
  });

  it('should call on Click Update Group Status ', () => {
    component.onClickUpdateGroupStatus({ status: false, groupId: testData.userDetail.userId });
    fixture.detectChanges();
    expect(component.onClickUpdateGroupStatus).toHaveBeenCalled();
  });

  it('should call on Click Update Group Status with GroupId Empty', () => {
    component.onClickUpdateGroupStatus({ status: false, groupId: '' });
    fixture.detectChanges();
    expect(component.onClickUpdateGroupStatus).toHaveBeenCalled();
  });

  it('should call Search Event ', () => {
    component.onClickSearchGroupUser(component.latestSearch);
    fixture.detectChanges();
    expect(component.onClickSearchGroupUser).toHaveBeenCalled();
  });

  it('should call Search Event ', () => {
    const event = {
      show: true
    };
    component.onClickGroupShowSelection(event);
    fixture.detectChanges();
    expect(component.onClickGroupShowSelection).toHaveBeenCalled();
  });

});
