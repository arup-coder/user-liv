import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';
import { MaterialLibModule } from '@nxl/material-lib';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { HAMMER_LOADER } from '@angular/platform-browser';

import { UserColumnSelectorPageComponent } from './user-column-selector-page.component';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { UserColumnSelectorDialogComponent } from '../../components';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { StoreModule } from '@ngrx/store';
import * as fromRoot from '../../store/reducers';
import * as tableColumnTestData from '../../data/test/user-test-data';
import { provideMockStore } from '@ngrx/store/testing';
describe('UserColumnSelectorPageComponent', () => {
  let component: UserColumnSelectorPageComponent;
  let fixture: ComponentFixture<UserColumnSelectorPageComponent>;
  const initialState = {
    user: {
      user: {
        users: null,
        usersTablePage: null,
        usersTableSort: 'firstName',
        usersTableFilter: null,
        isLoaded: false,
        isLoading: false,
        errorMessage: null,
        displayColumnList: []
      },
    },
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserColumnSelectorPageComponent, UserColumnSelectorDialogComponent],
      imports: [
        RouterTestingModule,
        MaterialLibModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        DragDropModule,
        StoreModule.forRoot({ user: fromRoot.reducers.user }),
      ],
      providers: [

        { provide: HAMMER_LOADER, useValue: () => new Promise(() => { }) },
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        provideMockStore({ initialState }),
      ],
    })
      .overrideModule(BrowserDynamicTestingModule, {
        set: { entryComponents: [UserColumnSelectorDialogComponent] },
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserColumnSelectorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    spyOn(component, 'onColumnVisableChange').and.callThrough();
    spyOn(component, 'onClickApply').and.callThrough();
    spyOn(component, 'onClickDeleteItem').and.callThrough();
    spyOn(component, 'onClickReset').and.callThrough();
    spyOn(component, 'drop').and.callThrough();
    spyOn(component, 'openColumnSelectorDialog').and.callThrough();


  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call onColumnVisableChange', () => {
    const allcoumnsList = tableColumnTestData.TableColumnList;
    const selectcloumn = tableColumnTestData.selectTableColumn;
    component.onColumnVisableChange({ checked: true }, selectcloumn, allcoumnsList);
    fixture.detectChanges();
    expect(component.onColumnVisableChange).toHaveBeenCalled();
  });
  it('should call onClickApply', () => {
    component.onClickApply();

    expect(component.onClickApply).toHaveBeenCalled();
  });
  it('should call onClickReset', () => {
    const allcoumnsList = tableColumnTestData.TableColumnList;
    component.onClickReset(allcoumnsList);
    expect(component.onClickReset).toHaveBeenCalled();
  });
  it('should call on drop', () => {
    const mockCDKData = {
      previousIndex: 1,
      currentIndex: 1,
      previousContainer: { data: [] },
      container: { data: [] },
      item: {},
      isPointerOverContainer: false,
      distance: { x: 0, y: -47 },
    };
    component.drop(mockCDKData);
    expect(component.drop).toHaveBeenCalled();
  });
  it('should call openColumnSelectorDialog', () => {
    component.openColumnSelectorDialog();
    expect(component.openColumnSelectorDialog).toHaveBeenCalled();
  });
});
