import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromStore from '../../store/index';
import { UserMappingFields } from '../../models/user-mapping-fields.model';
import { Router, ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs/operators';
import {
  funGetPreviewData,
  funParsePreviewList,
  funGetUserActiveTenantId,
  funGetCSVFields,
} from '../../functions';
import { UserPostRequest } from '../../models/user-post-request.model';
import * as fromPermissions from '../../enums/user-permission-values-enums';

@Component({
  selector: 'lib-user-import-page',
  templateUrl: './user-import-page.component.html',
  styleUrls: ['./user-import-page.component.scss'],
})
export class UserImportPageComponent implements OnInit {
  title: string;
  mappingValues: UserMappingFields;
  previewData: any[];
  previewDataHeader: string[];
  previewDataValue: any[];
  irsFields: string[];
  csvFields: string;
  parsedIrsValues: string[];
  mappedValues: UserMappingFields[];
  isShowPreview: boolean;
  previewList: UserPostRequest[];
  selectedPreviewUsers: any[];
  isSelectAll: boolean;
  isIntermediateSelect: boolean;
  fileName: string;
  event = { selectedIndex: 0 };
  fileReader: FileReader = new FileReader();
  moduleName: any;
  permissions: any;
  groupId: string;
  isValid: boolean;
  constructor(
    private store: Store<fromStore.UserState>,
    private route: ActivatedRoute,
    public router: Router,
  ) {
    this.moduleName = fromPermissions.ModuleName;
    this.permissions = fromPermissions.Permissions;
  }

  ngOnInit() {
    this.isValid = false;
    this.title = 'Import Users';
    this.isShowPreview = false;
    this.previewList = [];
    this.isSelectAll = false;
    this.isIntermediateSelect = false;
    this.previewDataHeader = [];
    this.route.params
      .pipe(
        tap(params => {
          this.groupId = params.groupId;
        }),
      )
      .subscribe();
    this.onNavigationChange(this.event);
  }

  onNavigationChange(event) {
    if (event.selectedIndex === 0) {
      this.groupId
        ? this.router.navigate(['/user/user-group-import', this.groupId])
        : this.router.navigate(['/user/user-import']);
    } else if (event.selectedIndex === 1) {
      this.groupId
        ? this.router.navigate(['/user/user-group-import', this.groupId, 'bulk-fields-map'])
        : this.router.navigate(['/user/user-import/', 'bulk-fields-map']);
      this.previewList = [];
      this.previewDataHeader = [];
      this.isShowPreview = false;
    }
  }

  getMappingValues() {
    this.csvFields =
      'First Name*,Last Name*,Employee Id*,AlternateEmail*,Email*,Job Title,Department,Organization,Country*,Address1,Address2,Address3,Address4,City,State,PostalCode,Work Phone,Mobile Phone*';
    this.mappingValues = {
      csvFields: this.csvFields ? this.csvFields.split(',') : [],
      irsFields: this.irsFields,
      fieldIndex: null,
    };
  }

  onClickTemplateDownload() {
    funGetCSVFields();
  }

  onFileUpload(file: File) {
    if (file) {
      const fileExtension = file.name.split('.').pop();
      if (fileExtension === 'csv') {
        this.fileName = file.name;
        this.fileReader.onload = e => {
          const result = this.fileReader.result.toString();
          this.parsedIrsValues = result.split('\n');
          this.irsFields = result
            .split('\n')[0]
            .split(',')
            .filter(v => v);
          this.irsFields.splice(0, 0, '-- None --');
          this.getMappingValues();
        };
        this.fileReader.readAsText(file);
      }
    }
  }

  fileUploadCancel() {
    this.fileName = '';
    this.irsFields = [];
    this.parsedIrsValues = [];
    this.mappingValues = {
      csvFields: this.csvFields ? this.csvFields.split(',') : [],
      irsFields: [],
      fieldIndex: null,
    };
  }

  onSelectMapValue(event) {
    this.isValid = event.formValid === 'VALID' ? true : false;
    this.store.dispatch(fromStore.mappingValueChange({ payload: { mappingFields: event } }));
  }

  onPreviewClick() {
    this.previewData = [];

    this.store
      .pipe(select(fromStore.getSelectedMappedValues))
      .pipe(tap(selectedMappedValues => (this.mappedValues = selectedMappedValues)))
      .subscribe();

    this.parsedIrsValues.forEach(irsValues => {
      if (irsValues && irsValues !== '') {
        const irsValue = irsValues.split(',');
        this.previewData.push(irsValue);
      }
    });

    this.mappedValues.forEach(element => {
      this.previewDataHeader.push(element.csvFields.toString().replace('*', ''));
    });

    this.previewData.shift();
    this.previewList = funGetPreviewData(this.previewData, this.mappedValues);

    this.isShowPreview = true;
    this.store.dispatch(fromStore.getPreviewList({ payload: { previewList: this.previewList } }));
    this.onClickImport();
  }

  onClickImport() {
    funParsePreviewList(this.previewList);
    this.store.dispatch(
      fromStore.loadPreviewUsers({
        payload: {
          previewList: this.previewList,
          tenantId: funGetUserActiveTenantId(),
        },
      }),
    );
    // if (this.groupId) {
    //   this.store.dispatch(
    //     fromStore.addUsersToGroup({
    //       payload: {
    //         selectedUsers: this.previewList,
    //         groupId: this.groupId,
    //       },
    //     }),
    //   );
    // }
  }
}
