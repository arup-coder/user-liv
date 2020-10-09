import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserMappingFields } from '../../models/user-mapping-fields.model';
import { FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'lib-user-bulk-fields-map',
  templateUrl: './user-bulk-fields-map.component.html',
  styleUrls: ['./user-bulk-fields-map.component.scss'],
})
export class UserBulkFieldsMapComponent implements OnInit {
  @Input() mappingValues: UserMappingFields;
  @Input() parsedIrsValues: string[];

  @Output() onSelectMapValue = new EventEmitter<{ event; mappingValue; formValid }>();
  mapForm = this.fb.group({});
  tempValue: any[];
  mobilePhoneControlInvalid: any;

  constructor(public fb: FormBuilder) {}

  ngOnInit() {
    this.mapForm = this.createGroup();
  }

  createGroup() {
    const group = this.fb.group({});
    this.mappingValues.csvFields.forEach(csvField => {
      if (csvField.includes('*') && csvField !== 'Mobile Phone*' && csvField !== 'Work Phone') {
        group.addControl(csvField, this.fb.control('', [Validators.required]));
      } else if (csvField === 'Mobile Phone*') {
        group.addControl(csvField, this.fb.control('', [Validators.required]));
      } else if (csvField === 'Work Phone') {
        group.addControl(csvField, this.fb.control('', []));
      }
    });
    return group;
  }

  onSelection(fieldValue, mappingValue, index?: number) {
    const event = fieldValue.source
      ? fieldValue
      : {
          value: fieldValue,
          index: index,
        };
    const formValid = this.mapForm.status;
    this.onSelectMapValue.emit({ event, mappingValue, formValid });
  }

  onSelectValue(event) {
    this.tempValue = [];
    let value: number;
    this.parsedIrsValues.forEach((previewValue, index) => {
      const previewArray = previewValue.split(',');
      previewArray.forEach((element, i) => {
        if (event.value === element) {
          value = i;
        }
      });
      this.tempValue.push(previewArray[value]);
    });
    this.tempValue.forEach((mobileValue, index) => {
      if (index !== 0) {
        if (/^([0-9]*)$/.test(mobileValue) && mobileValue.length === 10) {
        } else {
          // this.mobilePhoneControl.setErrors({
          //   invalid: true,
          // });
        }
      }
    });
  }

  onSelectWorkPhone(event) {
    this.tempValue = [];
    let value: number;
    this.parsedIrsValues.forEach((previewValue, index) => {
      const previewArray = previewValue.split(',');
      previewArray.forEach((element, i) => {
        if (event.value === element) {
          value = i;
        }
      });
      this.tempValue.push(previewArray[value]);
    });
    this.tempValue.forEach((mobileValue, index) => {
      if (index !== 0) {
        if (/^([0-9]*)$/.test(mobileValue) && mobileValue.length === 10) {
        } else {
          // this.workPhoneControl.setErrors({
          //   invalid: true,
          // });
        }
      }
    });
  }

  get mobilePhoneControl() {
    return this.mapForm.get('Mobile Phone*') as FormControl;
  }

  get mobilePhoneControlRequired() {
    return this.mobilePhoneControl.hasError('required') && this.mobilePhoneControl.touched;
  }

  get workPhoneControl() {
    return this.mapForm.get('Work Phone') as FormControl;
  }
}
