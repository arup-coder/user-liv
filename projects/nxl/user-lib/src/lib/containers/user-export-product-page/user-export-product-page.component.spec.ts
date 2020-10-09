import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialLibModule } from '@nxl/material-lib';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import * as fromRoot from '../../store/reducers';
import { provideMockStore } from '@ngrx/store/testing';

import * as testData from '../../data/test/user-test-data';
import { UserExportProductService } from '../../services';
import { HAMMER_LOADER } from '@angular/platform-browser';
import { UserExportProductPageComponent } from './user-export-product-page.component';
import { UserDialogExportProductComponent } from '../../components/user-dialog-export-product/user-dialog-export-product.component';

describe('UserExportProductPageComponent', () => {
  let component: UserExportProductPageComponent;
  let fixture: ComponentFixture<UserExportProductPageComponent>;
  const initialState = {
    user: {
      user: {
        users: testData.usersList,
        usersTablePage: testData.paginationData,
        usersTableSort: 'firstName',
        usersTableFilter: testData.filterData,
        selectedUsersList: testData.selectedUsers,
        usersTableSearch: testData.searchText,
        isLoaded: false,
        isLoading: false,
        errorMessage: null,
        displayColumnList: testData.TableColumnList
      },
    },
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserExportProductPageComponent, UserDialogExportProductComponent],
      imports: [MaterialLibModule, ReactiveFormsModule, RouterTestingModule,
        BrowserAnimationsModule, BrowserDynamicTestingModule,
        RouterTestingModule,
        MaterialLibModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        FormsModule,
        StoreModule.forRoot({ user: fromRoot.reducers.user }),],
      providers: [
        UserExportProductService,
        { provide: HAMMER_LOADER, useValue: () => new Promise(() => { }) },
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: [] },
        provideMockStore({ initialState }),
      ]
    })
      .overrideModule(BrowserDynamicTestingModule, {
        set: {
          entryComponents:
            [UserDialogExportProductComponent]
        }
      });

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserExportProductPageComponent);
    component = fixture.componentInstance;
    component.selectedExportType = 'currentpage';
    fixture.detectChanges();

    spyOn(component, 'openDialog').and.callThrough();
    spyOn(component, 'onClickCancel').and.callThrough();
    spyOn(component, 'onClickExport').and.callThrough();
    spyOn(component, 'exportCurrentPageUsers').and.callThrough();
    spyOn(component, 'exportAllUsers').and.callThrough();
    spyOn(component, 'exportSelectedUsers').and.callThrough();
    spyOn(component, 'exportFilteredUsers').and.callThrough();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call openDialog', () => {
    component.openDialog();
    expect(component.openDialog).toHaveBeenCalled();
  });

  it('should call onClickCancel', () => {
    component.onClickCancel();
    expect(component.onClickCancel).toHaveBeenCalled();
  });

  it('should call onClickExport', () => {
    component.onClickExport(component.selectedExportType);
    expect(component.onClickExport).toHaveBeenCalled();
  });

  it('should call exportCurrentPageUsers', () => {
    component.exportCurrentPageUsers();
    expect(component.exportCurrentPageUsers).toHaveBeenCalled();
  });

  it('should call exportAllUsers', () => {
    component.exportAllUsers();
    expect(component.exportAllUsers).toHaveBeenCalled();
  });
  it('should call exportSelectedUsers', () => {
    component.exportSelectedUsers();
    expect(component.exportSelectedUsers).toHaveBeenCalled();
  });
  it('should call exportFilteredUsers', () => {
    component.exportFilteredUsers();
    expect(component.exportFilteredUsers).toHaveBeenCalled();
  });
});
