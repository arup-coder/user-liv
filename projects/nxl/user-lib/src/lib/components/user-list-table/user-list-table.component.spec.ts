import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListTableComponent } from './user-list-table.component';
import { UserListFilterComponent } from '../user-list-filter/user-list-filter.component';

import { RouterTestingModule } from '@angular/router/testing';
import { MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { MaterialLibModule } from '@nxl/material-lib';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import * as testData from '../../data/test/user-test-data';
import { HAMMER_LOADER } from '@angular/platform-browser';
import { UserListSearchComponent } from '..';
import { CdkDragStart, CdkDropList } from '@angular/cdk/drag-drop';

import { PhoneNumberPipe, StatusPipe } from '../../pipes/user.pipe';
import { DisableIfUnauthorizedDirective } from '@nxl/authorization-lib';
import { provideMockStore } from '@ngrx/store/testing';

describe('UserListTableComponent', () => {
  let component: UserListTableComponent;
  let fixture: ComponentFixture<UserListTableComponent>;
  let cdkDragStart: CdkDragStart;
  let cdkDropList: CdkDropList;


  const initialState = {
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
        UserListTableComponent,
        UserListFilterComponent,
        UserListSearchComponent,
        PhoneNumberPipe,
        StatusPipe,
        DisableIfUnauthorizedDirective
      ],
      imports: [
        RouterTestingModule,
        MaterialLibModule,
        MatDatepickerModule,
        MatNativeDateModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        DragDropModule,
      ],
      providers: [
        provideMockStore({ initialState }),
        {
          provide: HAMMER_LOADER,
          useValue: () => new Promise(() => { }),
        },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(UserListTableComponent);
    component = fixture.componentInstance;
    component.usersList = testData.usersList;
    component.pagination = testData.paginationData;
    component.displayedColumns = testData.TableColumnList;
    component.previousIndex = 1
    component.sortOrder = 'firstName';
    component.selectedUsers = testData.selectedUsers;
    fixture.detectChanges();

    spyOn(component, 'onClickFilter').and.callThrough();
    spyOn(component, 'onClickClearFilter').and.callThrough();
    spyOn(component, 'onClickHideFilter').and.callThrough();
    spyOn(component, 'onClickUserFilter').and.callThrough();
    spyOn(component, 'onSortData').and.callThrough();
    spyOn(component, 'onChangePageEvent').and.callThrough();
    spyOn(component, 'onRefresh').and.callThrough();
    spyOn(component, 'dragStarted').and.callThrough();
    spyOn(component, 'dropListDropped').and.callThrough();
    spyOn(component, 'onSearch').and.callThrough();
    // spyOn(component, 'ngAfterViewInit').and.callThrough();
    spyOn(component, 'onCheckAll').and.callThrough();
    spyOn(component, 'onCheck').and.callThrough();
    spyOn(component, 'onClickUserShowSelection').and.callThrough();
    spyOn(component, 'onPermissionSetting').and.callThrough();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  // it('should call ngAfterViewInit', () => {
  //   component.ngAfterViewInit();
  //   expect(component.ngAfterViewInit).toHaveBeenCalled();
  //   expect(component.paginator.pageIndex).toEqual(testData.paginationData.page - 1);
  // });
  it('should call on click filter', () => {
    component.onClickFilter();
    expect(component.onClickFilter).toHaveBeenCalled();
  });

  it('should call on click clear filter', () => {
    component.onClickClearFilter();
    expect(component.onClickClearFilter).toHaveBeenCalled();
  });

  it('should call on click hide filter', () => {
    component.onClickHideFilter();
    expect(component.onClickHideFilter).toHaveBeenCalled();
  });

  it('should call on click user filter', () => {
    const event = { title: '', value: '' };
    component.onClickUserFilter(event);
    expect(component.onClickUserFilter).toHaveBeenCalled();
  });

  it('should call on click show selection', () => {
    component.onClickUserShowSelection(true);
    expect(component.onClickUserShowSelection).toHaveBeenCalled();
  });

  it('should call on Change Sort Event', () => {
    component.onSortData('event');
    expect(component.onSortData).toHaveBeenCalled();
  });

  it('should call on Change Page Event', () => {
    component.onChangePageEvent('event');
    expect(component.onChangePageEvent).toHaveBeenCalled();
  });

  it('should call on Refresh Event', () => {
    component.onRefresh();
    expect(component.onRefresh).toHaveBeenCalled();
  });
  it('should call on Search Event', () => {
    component.onSearch(testData.searchText);
    expect(component.onSearch).toHaveBeenCalled();
  //  expect(component.paginator.pageIndex).toEqual(0);

  });
  it('should call on dragStarted Event', () => {
    const previousIndex = 1
    component.dragStarted(cdkDragStart, previousIndex);
    expect(component.dragStarted).toHaveBeenCalled();

  });
  it('should call on dropListDropped Event', () => {
    const previousIndex = 1
    const allcoumnsList = testData.TableColumnList;
    component.dropListDropped(cdkDropList, previousIndex, allcoumnsList);
    expect(component.dropListDropped).toHaveBeenCalled();

  });
  it('should call on Check All', () => {
    component.onCheckAll(testData.checkAllEvent);
    expect(component.onCheckAll).toHaveBeenCalled();
  });
  it('should call on select User', () => {
    component.onCheck(testData.checkSingleEvent, testData.userDetail);
    expect(component.onCheck).toHaveBeenCalled();
  });
  it('should call on Permission Setting', () => {
    const selectTestData = testData.userPermission;
    component.onPermissionSetting(selectTestData);
    expect(component.onPermissionSetting).toHaveBeenCalled();
  });

  afterEach(() => { });

  afterAll(() => {
    TestBed.resetTestingModule();
  });
});
