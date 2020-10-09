import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialLibModule } from '@nxl/material-lib';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { UserImportPageComponent } from './user-import-page.component';
import { UserUploadTemplateComponent } from '../../components/user-template-upload/user-template-upload.component';
import { UserDownloadTemplateComponent } from '../../components/user-template-download/user-template-download.component';
import { UserBulkFieldsMapComponent } from '../../components/user-bulk-fields-map/user-bulk-fields-map.component';
import { UserSecondTopBarComponent } from '../../components/user-second-top-bar/user-second-top-bar.component';
import { StatusPipe } from '../../pipes/user.pipe';
import * as testData from '../../data/test/user-test-data';

import { provideMockStore } from '@ngrx/store/testing';
import { HAMMER_LOADER } from '@angular/platform-browser';
import { usersList } from '../../data/test/user-test-data';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';

import { StoreModule } from '@ngrx/store';
import * as fromRoot from '../../store/reducers';
import { DisableIfUnauthorizedDirective } from '@nxl/authorization-lib';

describe('UserImportPageComponent', () => {
  let component: UserImportPageComponent;
  let fixture: ComponentFixture<UserImportPageComponent>;
  let router: Router;
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
        UserImportPageComponent,
        UserUploadTemplateComponent,
        UserDownloadTemplateComponent,
        UserBulkFieldsMapComponent,
        UserSecondTopBarComponent,
        StatusPipe,
        DisableIfUnauthorizedDirective
      ],
      imports: [
        RouterTestingModule.withRoutes([]),
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialLibModule,
        StoreModule.forRoot({ user: fromRoot.reducers.user }),
      ],
      providers: [
        provideMockStore({ initialState }),
        {
          provide: HAMMER_LOADER,
          useValue: () => new Promise(() => {}),
        },
      ],
    }).compileComponents();
    router = TestBed.get(Router);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserImportPageComponent);
    component = fixture.componentInstance;
    component.previewData = usersList;
    component.event = { selectedIndex: 0 };
    component.csvFields = '*First Name,*Last Name,Country';
    component.mappingValues = {
      csvFields: ['*First Name', '*Last Name', 'Country'],
      irsFields: [],
      fieldIndex: null,
    };
    component.previewDataHeader = [];
    fixture.detectChanges();

    spyOn(component, 'onNavigationChange').and.callThrough();
    spyOn(component, 'onClickTemplateDownload').and.callThrough();
    spyOn(component, 'onFileUpload').and.callThrough();
    spyOn(component, 'onSelectMapValue').and.callThrough();
    spyOn(component, 'getMappingValues').and.callThrough();
    spyOn(component, 'fileUploadCancel').and.callThrough();
    spyOn(component, 'onPreviewClick').and.callThrough();
    spyOn(component, 'onClickImport').and.callThrough();
    spyOn(component.router, 'navigate');
    spyOn(component.fileReader, 'onload').and.callThrough();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call on  navigation change called for import user screen', () => {
    const event = {
      selectedIndex: 0,
    };
    component.onNavigationChange(event);
    expect(component.router.navigate).toHaveBeenCalledWith(['/user/user-import']);
  });

  it('should call on  navigation change called for bulk mapping fields', () => {
    const event = {
      selectedIndex: 1,
    };
    component.onNavigationChange(event);
    expect(component.router.navigate).toHaveBeenCalledWith([
      '/user/user-import/',
      'bulk-fields-map',
    ]);
  });

  it('should call on template download', () => {
    component.onClickTemplateDownload();
    expect(component.onClickTemplateDownload).toHaveBeenCalled();
  });

  it('should call on template file upload', () => {
    spyOn(component.fileReader, 'readAsText').and.callThrough();
    const blob = new File([], '', { type: 'csv' });
    component.onFileUpload(blob);
    component.fileName = 'ImportCSV';
    fixture.detectChanges();
    component.fileReader.readAsText(blob);
    expect(component.fileReader.readAsText).toHaveBeenCalled();
    expect(component.onFileUpload).toHaveBeenCalled();
  });

  it('should call on get mapping values', () => {
    component.csvFields = '*First Name,*Last Name,Country';
    fixture.detectChanges();
    component.getMappingValues();
    expect(component.getMappingValues).toHaveBeenCalled();
  });

  it('should call on cancel file upload', () => {
    component.fileUploadCancel();
    expect(component.fileUploadCancel).toHaveBeenCalled();
  });

  it('should call on select map value', () => {
    const event = { checked: true };
    component.onSelectMapValue(event);
    expect(component.onSelectMapValue).toHaveBeenCalled();
  });

  it('should call on preview click', () => {
    component.parsedIrsValues = ["Name,Last Name,Sur Name,Division,Company,EmpId,Email,Phone,Mobile,Country",
      "Aaa,Raj,Smith,Department1,Company1,101,smith@gmail.com,12212221111,12212221111,United States",
      "Bbb,Raj,Smith,Department2,Company2,102,smith@gmail.com,12212221111,12212221111,United State",
      "Ccc,Raj,Smith,Department3,Company3,103,smith@gmail.com,12212221111,12212221111,United States",]
    component.mappedValues = [{
      csvFields: ["First Name*"],
      fieldIndex: 0,
      irsFields: ["Name"],
    }]
     component.onPreviewClick();
     expect(component.onPreviewClick).toHaveBeenCalled();
   });

   it('should call on click import', () => {
     component.onClickImport();
     expect(component.onClickImport).toHaveBeenCalled();
   });

  afterEach(() => {
    fixture.destroy();
  });
});
