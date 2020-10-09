import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { User } from '../../models/user.model';
import { UserRequest } from '../../models/user-request.model';
import { UserCreationTypes } from '../../enums/user-request.enums';
import { funGetUserActiveTenantId } from '../../functions/user.function';
import { Country } from '../../models/user-country.model';
import { State } from '../../models/user-state.model';
@Component({
  selector: 'lib-user-add-edit',
  templateUrl: './user-add-edit.component.html',
  styleUrls: ['./user-add-edit.component.scss'],
})
export class UserAddEditComponent implements OnInit {
  @Input() userDetail: User;
  @Output() onAddUser = new EventEmitter<UserRequest>();
  @Output() onSelectUserCountry = new EventEmitter<string>();
  @Output() onUpdateUser = new EventEmitter<{ User; isRegistered; tenantId }>();
  @Output() onCancel = new EventEmitter();
  @Input() countryList: Country[];
  @Input() stateList: State[];
  today = new Date();
  userTenantId: string;
  userForm = this.fb.group({
    firstName: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
    lastName: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
    externalId: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]],
    email: ['', [Validators.required, Validators.email]],
    alternateEmail: ['', [Validators.required, Validators.email]],
    jobTitle: ['', [Validators.pattern('[A-Za-z0-9. ]*')]],
    department: ['', [Validators.pattern('[A-Za-z0-9. ()]*')]],
    organization: ['', [Validators.pattern('[A-Za-z0-9. ]*')]],
    countryCode: ['', [Validators.required]],
    isActive: false,
    address1: ['', Validators.pattern('[A-Za-z0-9, ]*')],
    address2: ['', Validators.pattern('[A-Za-z0-9, ]*')],
    address3: ['', Validators.pattern('[A-Za-z0-9, ]*')],
    address4: ['', Validators.pattern('[A-Za-z0-9, ]*')],
    city: ['', Validators.pattern('[A-Za-z0-9 ]*')],
    stateCode: [''],
    postalCode: ['', Validators.pattern('[A-Za-z0-9 ]*')],
    mobilePhone: [
      '',
      [
        Validators.required,
        Validators.pattern('^([0-9()/+ -]*)$'),
        // Validators.minLength(20),
        Validators.maxLength(20),
      ],
    ],
    workPhone: [
      '',
      [
        Validators.pattern('^([0-9()/+ -]*)$'),
        //  Validators.minLength(20),
        Validators.maxLength(20),
      ],
    ],
  });

  constructor(private fb: FormBuilder) {}
  ngOnInit() {
    if (this.userDetail) {
      this.onSelectUserCountry.emit(this.userDetail.countryCode);
      this.userTenantId = this.userDetail.tenantId;
      this.userForm.patchValue({
        firstName: this.userDetail.firstName,
        lastName: this.userDetail.lastName,
        externalId: this.userDetail.externalId,
        email: this.userDetail.email,
        alternateEmail: this.userDetail.alternateEmail,
        jobTitle: this.userDetail.jobTitle,
        department: this.userDetail.department,
        organization: this.userDetail.organization,
        countryCode: this.userDetail.countryCode,
        isActive: this.userDetail.isActive,
        address1: this.userDetail.address1,
        address2: this.userDetail.address2,
        address3: this.userDetail.address3,
        address4: this.userDetail.address4,
        city: this.userDetail.city,
        stateCode: this.userDetail.stateCode,
        postalCode: this.userDetail.postalCode,
        workPhone: this.userDetail.workPhone,
        mobilePhone: this.userDetail.mobilePhone,
      });
    }
  }

  get firstNameControl() {
    return this.userForm.get('firstName') as FormControl;
  }

  get lastNameControl() {
    return this.userForm.get('lastName') as FormControl;
  }

  get externalIdControl() {
    return this.userForm.get('externalId') as FormControl;
  }

  get emailControl() {
    return this.userForm.get('email') as FormControl;
  }

  get alternateEmailControl() {
    return this.userForm.get('alternateEmail') as FormControl;
  }

  get jobTitleControl() {
    return this.userForm.get('jobTitle') as FormControl;
  }

  get departmentControl() {
    return this.userForm.get('department') as FormControl;
  }

  get countryCodeControl() {
    return this.userForm.get('countryCode') as FormControl;
  }

  get stateCodeControl() {
    return this.userForm.get('stateCode') as FormControl;
  }
  get mobilePhoneControl() {
    return this.userForm.get('mobilePhone') as FormControl;
  }

  get workPhoneControl() {
    return this.userForm.get('workPhone') as FormControl;
  }

  get organizationControl() {
    return this.userForm.get('organization') as FormControl;
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

  get externalIdControlInvalid() {
    return this.externalIdControl.hasError('pattern') && this.externalIdControl.touched;
  }

  get externalIdControlRequired() {
    return this.externalIdControl.hasError('required') && this.externalIdControl.touched;
  }

  get emailControlInvalid() {
    return this.emailControl.hasError('email') && this.emailControl.touched;
  }

  get emailControlRequired() {
    return this.emailControl.hasError('required') && this.emailControl.touched;
  }

  get alternateEmailControlInvalid() {
    return this.alternateEmailControl.hasError('email') && this.alternateEmailControl.touched;
  }

  get alternateEmailControlRequired() {
    return this.alternateEmailControl.hasError('required') && this.alternateEmailControl.touched;
  }

  get countryCodeControlInvalid() {
    return this.countryCodeControl.hasError('pattern') && this.countryCodeControl.touched;
  }

  get countryCodeControlRequired() {
    return this.countryCodeControl.hasError('required') && this.countryCodeControl.touched;
  }

  get organizationControlInvalid() {
    return this.organizationControl.hasError('pattern') && this.organizationControl.touched;
  }

  get jobTitleControlInvalid() {
    return this.jobTitleControl.hasError('pattern') && this.jobTitleControl.touched;
  }

  get departmentControlInvalid() {
    return this.departmentControl.hasError('pattern') && this.departmentControl.touched;
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

  get mobilePhoneControlRequired() {
    return this.mobilePhoneControl.hasError('required') && this.mobilePhoneControl.touched;
  }

  onClickAddUser(userForm: FormGroup) {
    const { value, valid } = userForm;
    if (valid) {
      const userPostRequest = value;
      const authRequest = {
        accountEnabled: userPostRequest.isActive,
        signInNames: [
          {
            type: 'emailAddress',
            value: userPostRequest.email,
          },
        ],
        creationType: UserCreationTypes.localAccount,
        displayName: userPostRequest.firstName + ' ' + userPostRequest.lastName,
        mailNickname: funGetUserActiveTenantId(),
        passwordProfile: {
          password: 'Password1',
          forceChangePasswordNextLogin: true,
        },
        passwordPolicies: 'DisablePasswordExpiration',
      };
      const userRequest: UserRequest = {
        authUserRequest: authRequest,
        userPostRequest: userPostRequest,
      };
      this.onAddUser.emit(userRequest);
    }
  }

  onClickUpdateUser(userForm: FormGroup) {
    const { value, valid } = userForm;
    if (valid) {
      this.onUpdateUser.emit({
        User: value,
        isRegistered: this.userDetail.isRegistered,
        tenantId: this.userTenantId,
      });
    }
  }
  onClickCancel() {
    this.onCancel.emit();
  }
  onSelectCountry() {
    this.onSelectUserCountry.emit(this.countryCodeControl.value);
  }
  parsePhoneNumber(value: string) {}
}
