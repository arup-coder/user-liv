import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserColumnSelectorDialogComponent } from './user-dialog-column-selector.component';
import { MaterialLibModule } from '@nxl/material-lib';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { HAMMER_LOADER } from '@angular/platform-browser';
import * as tableColumnTestData from '../../data/test/user-test-data';
import { DragDropModule } from '@angular/cdk/drag-drop';


import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA, MatSort, MatTableDataSource } from '@angular/material';

describe('UserColumnSelectorDialogComponent', () => {
  let component: UserColumnSelectorDialogComponent;
  let fixture: ComponentFixture<UserColumnSelectorDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserColumnSelectorDialogComponent],
      imports: [MaterialLibModule, ReactiveFormsModule,
        BrowserAnimationsModule, DragDropModule,
        MatDialogModule, BrowserAnimationsModule,
        BrowserDynamicTestingModule],
      providers: [
        {
          provide: HAMMER_LOADER,
          useValue: () => new Promise(() => { })
        },
        // workaround: why I can't inject MatDialogRef in the unit test?
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: [] }
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserColumnSelectorDialogComponent);
    component = fixture.componentInstance;
    //component.data.userColumnList = { userColumnList: tableColumnTestData.TableColumnList };
    component.data.userColumnList = tableColumnTestData.TableColumnList;
    component.userColumnList = tableColumnTestData.TableColumnList;
    component.userDragandDropColumnList = tableColumnTestData.TableColumnList;
    component.UserSelectColumnList = tableColumnTestData.TableColumnList;
    fixture.detectChanges();

    spyOn(component, 'drop').and.callThrough();
    spyOn(component, 'onColumnVisableChange').and.callThrough();
    spyOn(component, 'onClickApply').and.callThrough();
    spyOn(component, 'onClickDeleteItem').and.callThrough();
    spyOn(component, 'onClickReset').and.callThrough();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call onColumnVisableChange', () => {
    const allcoumnsList = tableColumnTestData.TableColumnList;
    const selectcloumn = tableColumnTestData.selectTableColumn;
    component.onColumnVisableChange({checked : true}, selectcloumn, allcoumnsList);
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
  // it('should call onClickDeleteItem', () => {
  //   const allcoumnsList = tableColumnTestData.TableColumnList;
  //   const selectcloumn = tableColumnTestData.selectTableColumn;
  //   component.onClickDeleteItem('event', selectcloumn, allcoumnsList);
  //   expect(component.onClickDeleteItem).toHaveBeenCalled();
  // });
});
