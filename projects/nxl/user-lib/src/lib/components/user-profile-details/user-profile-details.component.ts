import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { User } from '../../models/user.model';
import * as fromPermissions from '../../enums/user-permission-values-enums';
import { Country } from '../../models/user-country.model';
import { State } from '../../models/user-state.model';
@Component({
  selector: 'lib-user-profile-details',
  templateUrl: './user-profile-details.component.html',
  styleUrls: ['./user-profile-details.component.scss'],
})
export class UserProfileDetailsComponent implements OnInit {
  readonly: boolean;
  readonlyaddress: boolean;
  readonlyPhone: boolean;
  moduleName: any;
  permissions: any;
  userTenantId: string;
  @Input() userDetail: User[];
  @Input() countryList: Country[];
  @Input() stateList: State[];
  @Output() onSelectUserCountry = new EventEmitter<string>();

  @Output() onUpdateUserData = new EventEmitter<{ User, tenantId }>();
  profileForm = this.fb.group({
    firstName: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
    lastName: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
    externalId: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]],
    email: ['', []],
    isActive: false,
    alternateEmail: ['', [Validators.required, Validators.email]],
    jobTitle: ['', [Validators.pattern('[A-Za-z0-9. ]*')]],
    department: ['', [Validators.pattern('[A-Za-z0-9. ()]*')]],
    organization: ['', [Validators.pattern('[A-Za-z0-9. ]*')]],
    countryCode: ['', [Validators.required]],
    address1: ['', [Validators.pattern('[A-Za-z0-9, ]*')]],
    address2: ['', [Validators.pattern('[A-Za-z0-9, ]*')]],
    address3: ['', [Validators.pattern('[A-Za-z0-9, ]*')]],
    address4: ['', [Validators.pattern('[A-Za-z0-9, ]*')]],
    city: ['', [Validators.pattern('[A-Za-z0-9 ]*')]],
    stateCode: [''],
    postalCode: ['', [Validators.pattern('[A-Za-z0-9 ]*')]],
    mobilePhone: [
      '',
      [
        Validators.required,
         Validators.pattern('^([0-9()/+ -]*)$'),
        // Validators.minLength(14),
         Validators.maxLength(20),
      ],
    ],
    workPhone: [
      '',
      [
         Validators.pattern('^([0-9()/+ -]*)$'), 
        // Validators.minLength(14),
        Validators.maxLength(20)
      ],
      ],
  });
  constructor(private fb: FormBuilder) {
    this.moduleName = fromPermissions.ModuleName;
    this.permissions = fromPermissions.Permissions;
  }

  ngOnInit() {
    this.readonly = true;
    this.readonlyaddress = true;
    this.readonlyaddress = true;
    if (this.userDetail != null) {
       this.userTenantId = this.userDetail[0].tenantId;
      this.onSelectUserCountry.emit(this.userDetail[0].countryCode);
      this.profileForm.patchValue({
        firstName: this.userDetail[0].firstName,
        lastName: this.userDetail[0].lastName,
        externalId: this.userDetail[0].externalId,
        alternateEmail: this.userDetail[0].alternateEmail,
        email: this.userDetail[0].email,
        jobTitle: this.userDetail[0].jobTitle,
        department: this.userDetail[0].department,
        organization: this.userDetail[0].organization,
        countryCode: this.userDetail[0].countryCode,
        // receivedDate: new Date(this.userDetail.receivedDate),
        address1: this.userDetail[0].address1,
        address2: this.userDetail[0].address2,
        address3: this.userDetail[0].address3,
        address4: this.userDetail[0].address4,
        city: this.userDetail[0].city,
        stateCode: this.userDetail[0].stateCode,
        postalCode: this.userDetail[0].postalCode,
        workPhone: this.userDetail[0].workPhone,
        mobilePhone: this.userDetail[0].mobilePhone,
        isActive: this.userDetail[0].isActive
      });
    }
  }

  get firstNameControl() {
    return this.profileForm.get('firstName') as FormControl;
  }
  get lastNameControl() {
    return this.profileForm.get('lastName') as FormControl;
  }
  get externalIdControl() {
    return this.profileForm.get('externalId') as FormControl;
  }
  get alternateEmailControl() {
    return this.profileForm.get('alternateEmail') as FormControl;
  }
  get jobTitleControl() {
    return this.profileForm.get('jobTitle') as FormControl;
  }

  get countryCodeControl() {
    return this.profileForm.get('countryCode') as FormControl;
  }

  get mobilePhoneControl() {
    return this.profileForm.get('mobilePhone') as FormControl;
  }
  get workPhoneControl() {
    return this.profileForm.get('workPhone') as FormControl;
  }

  get departmentControl() {
    return this.profileForm.get('department') as FormControl;
  }
  // Error message declarations

  get firstNameControlRequired() {
    return this.firstNameControl.hasError('required') && this.firstNameControl.touched;
  }
  get firstNameControlInvalid() {
    return this.firstNameControl.hasError('pattern') && this.firstNameControl.touched;
  }
  get lastNameControlRequired() {
    return this.lastNameControl.hasError('required') && this.lastNameControl.touched;
  }
  get lastNameControlInvalid() {
    return this.lastNameControl.hasError('pattern') && this.lastNameControl.touched;
  }

  get departmentControlInvalid() {
    return this.departmentControl.hasError('pattern') && this.departmentControl.touched;
  }

  get externalIdControlRequired() {
    return this.externalIdControl.hasError('required') && this.externalIdControl.touched;
  }
  get externalIdControlInvalid() {
    return this.externalIdControl.hasError('pattern') && this.externalIdControl.touched;
  }

  get alternateEmailControlRequired() {
    return this.alternateEmailControl.hasError('required') && this.alternateEmailControl.touched;
  }
  get alternateEmailControlInvalid() {
    return this.alternateEmailControl.hasError('email') && this.alternateEmailControl.touched;
  }
  get jobTitleControlInvalid() {
    return this.jobTitleControl.hasError('pattern') && this.jobTitleControl.touched;
  }
  get countryCodeControlRequired() {
    return this.countryCodeControl.hasError('required') && this.countryCodeControl.touched;
  }
  get countryCodeControlInvalid() {
    return this.countryCodeControl.hasError('pattern') && this.countryCodeControl.touched;
  }

  // Error message declarations
  get mobilePhoneControlRequired() {
    return this.mobilePhoneControl.hasError('required') && this.mobilePhoneControl.touched;
  }

  get mobilePhoneControlInvalid() {
    return (
      (this.mobilePhoneControl.hasError('pattern') ||
        this.mobilePhoneControl.hasError('minlength')) &&
      this.mobilePhoneControl.touched
    );
  }

  get workPhoneControlInvalid() {
    return (
      (this.workPhoneControl.hasError('pattern') || this.workPhoneControl.hasError('minlength')) &&
      this.workPhoneControl.touched
    );
  }

  onClickBasicDetails() {
    this.readonly = false;
  }
  onClickphone() {
    this.readonlyPhone = false;
  }
  onClickAddressDetail() {
    this.readonlyaddress = false;
  }
  onSelectCountry() {
    this.onSelectUserCountry.emit(this.countryCodeControl.value);
  }
  onClickSaveUser(profileForm: FormGroup) {
    const { value, valid } = profileForm;
    if (valid) {
      this.onUpdateUserData.emit({ User: value, tenantId: this.userTenantId });
    }
  }
}
