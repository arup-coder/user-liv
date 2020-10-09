import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UserGroupManagementComponent } from './user-group-management.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialLibModule } from '@nxl/material-lib';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HAMMER_LOADER } from '@angular/platform-browser';
import { UserGroupListSearchComponent, UserGroupListFilterComponent } from '..';
import { provideMockStore } from '@ngrx/store/testing';
import { DisableIfUnauthorizedDirective } from '@nxl/authorization-lib';
import * as testData from '../../data/test/user-test-data';
import * as groupTestData from '../../data/test/group-test-data';
import { PhoneNumberPipe, StatusPipe } from '../../pipes/user.pipe';

describe('UserGroupManagementComponent', () => {
  let component: UserGroupManagementComponent;
  let fixture: ComponentFixture<UserGroupManagementComponent>;
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
      declarations: [
        UserGroupManagementComponent,
        UserGroupListFilterComponent,
        UserGroupListSearchComponent,
        DisableIfUnauthorizedDirective,
        StatusPipe,
      ],
      imports: [
        RouterTestingModule,
        MaterialLibModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
      ],
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
    fixture = TestBed.createComponent(UserGroupManagementComponent);
    component = fixture.componentInstance;

    component.groupList = groupTestData.groupList;
    component.pagination = testData.paginationData;
    component.displayedColumns = [
      'checkbox',
      'groupName',
      'groupDescription',
      'totalUsers',
      'createdDate',
      'isActive',
      'menu',
    ];
    component.sortOrder = 'groupName';

    fixture.detectChanges();
    spyOn(component, 'onClickFilter').and.callThrough();
    spyOn(component, 'onClickClearFilter').and.callThrough();
    spyOn(component, 'onClickHideFilter').and.callThrough();
    spyOn(component, 'onClickGroupFilter').and.callThrough();
    spyOn(component, 'onRefresh').and.callThrough();
    spyOn(component, 'onSearch').and.callThrough();
    spyOn(component, 'onCheckAll').and.callThrough();
    spyOn(component, 'onCheck').and.callThrough();
    spyOn(component, 'onUpdateStatus').and.callThrough();
    spyOn(component, 'onClickGroupShowSelection').and.callThrough();
    spyOn(component, 'onChangePageEvent').and.callThrough();
    spyOn(component, 'onSortData').and.callThrough();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

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
  it('should call on click group filter', () => {
    const event = { title: '', value: '' };
    component.onClickGroupFilter(event);
    expect(component.onClickGroupFilter).toHaveBeenCalled();
  });

  it('should call on Refresh Event', () => {
    component.onRefresh();
    expect(component.onRefresh).toHaveBeenCalled();
  });

  it('should call on Search Event', () => {
    component.onSearch(testData.searchText);
    expect(component.onSearch).toHaveBeenCalled();
  });

  it('should call on Update Status', () => {
    component.onUpdateStatus(false, groupTestData.groupList[0].groupId);
    expect(component.onUpdateStatus).toHaveBeenCalled();
  });

  it('should call on Check All', () => {
    component.onCheckAll(testData.checkAllEvent);
    expect(component.onCheckAll).toHaveBeenCalled();
  });

  it('should call on select Group', () => {
    component.onCheck(testData.checkSingleEvent, groupTestData.groupList[0]);
    expect(component.onCheck).toHaveBeenCalled();
  });

   it('should call on click show selection', () => {
     component.onClickGroupShowSelection(true);
     expect(component.onClickGroupShowSelection).toHaveBeenCalled();
   });

  it('should call on Change Sort Event', () => {
    component.onSortData('event');
    expect(component.onSortData).toHaveBeenCalled();
  });

  it('should call on Change Page Event', () => {
    component.onChangePageEvent('event');
    expect(component.onChangePageEvent).toHaveBeenCalled();
  });
});
