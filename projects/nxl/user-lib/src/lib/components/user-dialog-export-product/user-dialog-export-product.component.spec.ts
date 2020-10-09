import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { MaterialLibModule } from '@nxl/material-lib';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HAMMER_LOADER } from '@angular/platform-browser';
import { UserDialogExportProductComponent } from './user-dialog-export-product.component';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA, MatSort, MatTableDataSource } from '@angular/material';
 
describe('UserDialogExportProductComponent', () => {
  let component: UserDialogExportProductComponent;
  let fixture: ComponentFixture<UserDialogExportProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserDialogExportProductComponent],
      imports: [
        MaterialLibModule,
        ReactiveFormsModule,
        MatDatepickerModule,
        MatNativeDateModule,
        BrowserAnimationsModule,
        BrowserDynamicTestingModule
      ],
      providers: [
        {
          provide: HAMMER_LOADER,
          useValue: () => new Promise(() => { })
        },
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: [] },
        {
          provide: HAMMER_LOADER,
          useValue: () => new Promise(() => { }),
        },
      ]

    })
      .compileComponents();
    
    
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDialogExportProductComponent);
    component = fixture.componentInstance;
    component.exportUsersOption = {
      'list': [
        { 'name': 'Current Page', 'value': 'currentpage', 'checked': true },
        { 'name': 'All User', 'value': 'alluser', 'checked': false },
        { 'name': 'Selected User', 'value': 'selecteduser', 'checked': false },
        { 'name': 'Current Search', 'value': 'currentsearch', 'checked': false },
      ]
    };
    component.selectedExportType = 'currentpage';
    fixture.detectChanges();
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
  it('should call on Click Cancel', () => {
    component.onClickCancel();
    expect(component.onClickCancel).toHaveBeenCalled();
  });

  it('should call on ClickExport', () => {
    component.onClickExport(component.selectedExportType);
    expect(component.onClickExport).toHaveBeenCalled();
  });
  it('should call exportCurrentPageUsers', () => {
    component.exportCurrentPageUsers();
    expect(component.exportCurrentPageUsers).toHaveBeenCalled();
  });
  it('should call  exportAllUsers', () => {
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
