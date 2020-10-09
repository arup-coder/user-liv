import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialLibModule } from '@nxl/material-lib';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDatepickerModule, MatNativeDateModule } from '@angular/material';

import { UserMainPageComponent } from './user-list-table-page.component';
import { UserListTableComponent } from '../../components/user-list-table/user-list-table.component';
import { UserListFilterComponent } from '../../components/user-list-filter/user-list-filter.component';
import { UserSecondTopBarComponent, UserListSearchComponent } from '../../components';
import * as testData from '../../data/test/user-test-data';
import { provideMockStore } from '@ngrx/store/testing';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { of } from 'rxjs';
import { HAMMER_LOADER } from '@angular/platform-browser';
import { PhoneNumberPipe, StatusPipe } from '../../pipes/user.pipe';
import { StoreModule } from '@ngrx/store';
import * as fromRoot from '../../store/reducers';
import { DisableIfUnauthorizedDirective } from '@nxl/authorization-lib';


describe('UserMainPageComponent', () => {
  let component: UserMainPageComponent;
  let fixture: ComponentFixture<UserMainPageComponent>;
  const initialState = {
    user: {
      user: {
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
        country: {
          isLoaded: true,
          isLoading: false,
          errorMessage: null,
          countryList: testData.countryList
         }
      },
    },
    authorization: {
      authorization: {
        isLoaded: false,
        isLoading: false,
        errorMessage: '',
        permissions: testData.userPermission
      },
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        UserMainPageComponent,
        UserListTableComponent,
        UserListFilterComponent,
        UserSecondTopBarComponent,
        UserListSearchComponent,
        PhoneNumberPipe,
        StatusPipe,
        DisableIfUnauthorizedDirective
      ],
      imports: [
        RouterTestingModule,
        MaterialLibModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatDatepickerModule,
        MatNativeDateModule,
        StoreModule.forRoot({ user: fromRoot.reducers.user }),
        DragDropModule,
      ],
      providers: [
        MatDatepickerModule,
        MatNativeDateModule,
        {
          provide: HAMMER_LOADER,
          useValue: () => new Promise(() => { }),
        },
        provideMockStore({ initialState }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserMainPageComponent);
    component = fixture.componentInstance;
    component.showFilters = false;
    component.pagination = testData.paginationData;
    component.usersList$ = of(testData.usersList);
    component.displayedColumns$ = of(testData.TableColumnList);
    component.latestSortingOrder = testData.sortingData;
    component.latestSearch = testData.searchText;
    component.selectedUsers = testData.selectedUsers;
    component.filterValues = testData.filterData;
    component.filterProperties = testData.filterProperties;
    component.setPermissions$ = testData.userPermission;
    fixture.detectChanges();

    spyOn(component, 'activateRoute').and.callThrough();
    spyOn(component, 'deactivateRoute').and.callThrough();
    spyOn(component, 'onClickFilter').and.callThrough();
    spyOn(component, 'onClickClearFilter').and.callThrough();
    spyOn(component, 'onSelectFilterValues').and.callThrough();
    spyOn(component, 'onSortUserData').and.callThrough();
    spyOn(component, 'onClickPageEvent').and.callThrough();
    spyOn(component, 'onClickHideFilter').and.callThrough();
    spyOn(component, 'onClickRefreshEvent').and.callThrough();

    spyOn(component, 'onClickSearchUser').and.callThrough();
    spyOn(component, 'onCheckAll').and.callThrough();
    spyOn(component, 'onCheck').and.callThrough();
    
    spyOn(component, 'onSelectPermissions').and.callThrough();

  }));

  afterEach(() => {
    fixture.destroy();
  });

  it('should create component', () => {
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
    component.filterCountries = ['Afghanistan'];

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
      direction: 'firstName',
    };
    component.onSortUserData(event);
    fixture.detectChanges();
    expect(component.onSortUserData).toHaveBeenCalled();
  });

  it('should call Refresh Event ', () => {
    const event = {};
    component.onClickRefreshEvent(event);
    fixture.detectChanges();
    expect(component.onClickRefreshEvent).toHaveBeenCalled();
  });

  it('should call Search Event ', () => {
    component.onClickSearchUser(component.latestSearch);
    fixture.detectChanges();
    expect(component.onClickSearchUser).toHaveBeenCalled();
  });



  it('should call on Select User ', () => {
    testData.checkSingleEvent.listedUserLength = testData.usersList;
    testData.checkSingleEvent.selectedUser = testData.userDetail;
    component.onCheck(testData.checkSingleEvent);
    fixture.detectChanges();
    expect(component.onCheck).toHaveBeenCalled();
  });

  it('should call on SelectAll Users ', () => {
    testData.checkAllEvent.totalUsersList = testData.usersList;
    component.onCheckAll(testData.checkAllEvent);
    fixture.detectChanges();
    expect(component.onCheckAll).toHaveBeenCalled();
  });
  it('should call on Click onSelectPermissions ', () => {
    const event = { selectedUser: { userId: '4ddcbd40-b86d-463d-a5ab-4bb70282f340' } };
    component.onSelectPermissions(event);
    fixture.detectChanges();
    expect(component.onSelectPermissions).toHaveBeenCalled();
  });
});
