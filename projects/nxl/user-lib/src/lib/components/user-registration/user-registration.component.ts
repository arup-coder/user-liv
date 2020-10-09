import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup, AbstractControl } from '@angular/forms';
import { User } from '../../models/user.model';
import { RegistrationFields } from '../../models/user-registration-fields-names.model';
import { Country } from '../../models/user-country.model';
import { State } from '../../models/user-state.model';
import { UserValidators } from '../../validators/user-companyCode.validators';
@Component({
  selector: 'lib-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss'],
})
export class UserRegistrationComponent implements OnInit {
  @Output() onCreateUser = new EventEmitter<User>();
  @Output() onUpdateUser = new EventEmitter<{ User; tenantId }>();
  @Output() onSelectUserCountry = new EventEmitter<string>();
  @Input() companyCodeValidator: any;
  @Input() userDetail: User[];
  @Input() userEmailAddress: String;
  @Input() fieldList: RegistrationFields[];
  @Input() countryList: Country[];
  @Input() stateList: State[];
  userTenantId: string;
  isReadOnly: boolean;

  isShowFirstName: boolean;
  isShowLastName: boolean;
  isShowExternalId: boolean;
  isShowEmail: boolean;
  isShowAlternateEmail: boolean;
  isShowJobTitle: boolean;
  isShowDepartment: boolean;
  isShowOrganization: boolean;
  isShowMobilePhone: boolean;
  isShowWorkPhone: boolean;
  isShowAddress1: boolean;
  isShowAddress2: boolean;
  isShowAddress3: boolean;
  isShowAddress4: boolean;
  isShowCity: boolean;
  isShowStateCode: boolean;
  isShowCountryCode: boolean;
  isShowPostalCode: boolean;

  isRequiredFirstName: boolean;
  isRequiredLastName: boolean;
  isRequiredExternalId: boolean;
  isRequiredEmail: boolean;
  isRequiredAlternateEmail: boolean;
  isRequiredJobTitle: boolean;
  isRequiredDepartment: boolean;
  isRequiredOrganization: boolean;
  isRequiredMobilePhone: boolean;
  isRequiredWorkPhone: boolean;
  isRequiredAddress1: boolean;
  isRequiredAddress2: boolean;
  isRequiredAddress3: boolean;
  isRequiredAddress4: boolean;
  isRequiredCity: boolean;
  isRequiredStateCode: boolean;
  isRequiredCountryCode: boolean;
  isRequiredPostalCode: boolean;

  placeholderFirstName: string;
  placeholderLastName: string;
  placeholderExternalId: string;
  placeholderEmail: string;
  placeholderAlternateEmail: string;
  placeholderJobTitle: string;
  placeholderDepartment: string;
  placeholderOrganization: string;
  placeholderMobilePhone: string;
  placeholderWorkPhone: string;
  placeholderAddress1: string;
  placeholderAddress2: string;
  placeholderAddress3: string;
  placeholderAddress4: string;
  placeholderCity: string;
  placeholderStateCode: string;
  placeholderCountryCode: string;
  placeholderPostalCode: string;

  registrationForm = this.fb.group({
    firstName: ['', Validators.pattern('[A-Za-z ]*')],
    lastName: ['', Validators.pattern('[A-Za-z ]*')],
    externalId: ['', [Validators.pattern('[A-Za-z0-9]*')]],
    email: ['', [Validators.email]],
    alternateEmail: ['', [Validators.email]],
    jobTitle: ['', Validators.pattern('[A-Za-z0-9. ]*')],
    department: ['', Validators.pattern('[A-Za-z0-9. ()]*')],
    organization: ['', Validators.pattern('[A-Za-z0-9. ]*')],
    mobilePhone: [
      '',
      [
        Validators.pattern('^([0-9()/+ -]*)$'),
        //  Validators.minLength(14),
        Validators.maxLength(20),
      ],
    ],
    workPhone: [
      '',
      [
        Validators.pattern('^([0-9()/+ -]*)$'),
        // Validators.minLength(14),
        Validators.maxLength(20),
      ],
    ],
    address1: ['', Validators.pattern('[A-Za-z0-9, ]*')],
    address2: ['', Validators.pattern('[A-Za-z0-9, ]*')],
    address3: ['', Validators.pattern('[A-Za-z0-9, ]*')],
    address4: ['', Validators.pattern('[A-Za-z0-9, ]*')],
    city: ['', Validators.pattern('[A-Za-z0-9 ]*')],
    stateCode: [''],
    countryCode: [''],
    postalCode: ['', [Validators.pattern('[A-Za-z0-9 ]*')]],
    isActive: true,
    companyCode: [''],
  });

  constructor(private fb: FormBuilder, private userValidators: UserValidators) {}

  ngOnInit() {
    this.getFieldsDetails();
    this.isReadOnly = false;
    this.registrationForm.patchValue({
      email: this.userEmailAddress,
    });
    if (this.userDetail && this.userDetail.length > 0  && this.userDetail[0] && this.userDetail[0].firstName) {
      this.isReadOnly = true;
      this.userTenantId = this.userDetail[0].tenantId;
      this.onSelectUserCountry.emit(this.userDetail[0].countryCode);
      this.registrationForm.patchValue({
        firstName: this.userDetail[0].firstName,
        lastName: this.userDetail[0].lastName,
        externalId: this.userDetail[0].externalId,
        alternateEmail: this.userDetail[0].alternateEmail,
        jobTitle: this.userDetail[0].jobTitle,
        department: this.userDetail[0].department,
        organization: this.userDetail[0].organization,
        countryCode: this.userDetail[0].countryCode,
        address1: this.userDetail[0].address1,
        address2: this.userDetail[0].address2,
        address3: this.userDetail[0].address3,
        address4: this.userDetail[0].address4,
        city: this.userDetail[0].city,
        stateCode: this.userDetail[0].stateCode,
        postalCode: this.userDetail[0].postalCode,
        workPhone: this.userDetail[0].workPhone,
        mobilePhone: this.userDetail[0].mobilePhone,
        isActive: this.userDetail[0].isActive,
      });
    }

    if (!this.isReadOnly) {
      this.companyCodeControl.setValidators([Validators.required]);
      this.companyCodeControl.setAsyncValidators([this.userValidators.CompanyCode()]);
    }
  }

  getFieldsDetails() {
    if (this.fieldList) {
      this.fieldList.forEach(field => {
        if (field.formControlName === 'firstName') {
          this.isShowFirstName = field.visible;
          this.placeholderFirstName = field.placeHolder;
          this.isRequiredFirstName = field.required;
          field.required
            ? this.firstNameControl.setValidators([
                Validators.required,
                Validators.pattern('[A-Za-z ]*'),
              ])
            : this.firstNameControl.setValidators([Validators.pattern('[A-Za-z ]*')]);
        } else if (field.formControlName === 'lastName') {
          this.isShowLastName = field.visible;
          this.placeholderLastName = field.placeHolder;
          this.isRequiredLastName = field.required;
          field.required
            ? this.lastNameControl.setValidators([
                Validators.required,
                Validators.pattern('[A-Za-z ]*'),
              ])
            : this.lastNameControl.setValidators([Validators.pattern('[A-Za-z ]*')]);
        } else if (field.formControlName === 'externalId') {
          this.isShowExternalId = field.visible;
          this.placeholderExternalId = field.placeHolder;
          this.isRequiredExternalId = field.required;
          field.required
            ? this.externalIdControl.setValidators([
                Validators.required,
                Validators.pattern('[A-Za-z0-9]*'),
              ])
            : this.externalIdControl.setValidators([Validators.pattern('[A-Za-z-9]*')]);
        } else if (field.formControlName === 'email') {
          this.isShowEmail = field.visible;
          this.isRequiredEmail = field.required;
          this.placeholderEmail = field.placeHolder;
        } else if (field.formControlName === 'alternateEmail') {
          this.isShowAlternateEmail = field.visible;
          this.isRequiredAlternateEmail = field.required;
          this.placeholderAlternateEmail = field.placeHolder;
          field.required
            ? this.alternateEmailControl.setValidators([Validators.required, Validators.email])
            : this.alternateEmailControl.setValidators([Validators.email]);
        } else if (field.formControlName === 'jobTitle') {
          this.isShowJobTitle = field.visible;
          this.isRequiredJobTitle = field.required;
          this.placeholderJobTitle = field.placeHolder;
          field.required
            ? this.jobTitleControl.setValidators([
                Validators.required,
                Validators.pattern('[A-Za-z0-9. ]*'),
              ])
            : this.jobTitleControl.setValidators([Validators.pattern('[A-Za-z0-9. ]*')]);
        } else if (field.formControlName === 'department') {
          this.isShowDepartment = field.visible;
          this.isRequiredDepartment = field.required;
          this.placeholderDepartment = field.placeHolder;
          field.required
            ? this.departmentControl.setValidators([
                Validators.required,
                Validators.pattern('[A-Za-z0-9. ()]*'),
              ])
            : this.departmentControl.setValidators([Validators.pattern('[A-Za-z0-9. ()]*')]);
        } else if (field.formControlName === 'organization') {
          this.isShowOrganization = field.visible;
          this.isRequiredOrganization = field.required;
          this.placeholderOrganization = field.placeHolder;
          field.required
            ? this.companyControl.setValidators([
                Validators.required,
                Validators.pattern('[A-Za-z0-9. ]*'),
              ])
            : this.companyControl.setValidators([Validators.pattern('[A-Za-z0-9. ]*')]);
        } else if (field.formControlName === 'countryCode') {
          this.isShowCountryCode = field.visible;
          this.isRequiredCountryCode = field.required;
          this.placeholderCountryCode = field.placeHolder;
          field.required
            ? this.countryCodeControl.setValidators([
                Validators.required,
                Validators.pattern('[a-zA-Z ]*'),
              ])
            : this.countryCodeControl.setValidators([Validators.pattern('[a-zA-Z ]*')]);
        } else if (field.formControlName === 'address1') {
          this.isShowAddress1 = field.visible;
          this.isRequiredAddress1 = field.required;
          this.placeholderAddress1 = field.placeHolder;
          field.required
            ? this.address1Control.setValidators([
                Validators.required,
                Validators.pattern('[A-Za-z0-9, ]*'),
              ])
            : this.address1Control.setValidators([Validators.pattern('[A-Za-z0-9, ]*')]);
        } else if (field.formControlName === 'address2') {
          this.isShowAddress2 = field.visible;
          this.isRequiredAddress2 = field.required;
          this.placeholderAddress2 = field.placeHolder;
          field.required
            ? this.address2Control.setValidators([
                Validators.required,
                Validators.pattern('[A-Za-z0-9, ]*'),
              ])
            : this.address2Control.setValidators([Validators.pattern('[A-Za-z0-9, ]*')]);
        } else if (field.formControlName === 'address3') {
          this.isShowAddress3 = field.visible;
          this.isRequiredAddress3 = field.required;
          this.placeholderAddress3 = field.placeHolder;
          field.required
            ? this.address3Control.setValidators([
                Validators.required,
                Validators.pattern('[A-Za-z0-9, ]*'),
              ])
            : this.address3Control.setValidators([Validators.pattern('[A-Za-z0-9, ]*')]);
        } else if (field.formControlName === 'address4') {
          this.isShowAddress4 = field.visible;
          this.isRequiredAddress4 = field.required;
          this.placeholderAddress4 = field.placeHolder;
          field.required
            ? this.address4Control.setValidators([
                Validators.required,
                Validators.pattern('[A-Za-z0-9, ]*'),
              ])
            : this.address4Control.setValidators([Validators.pattern('[A-Za-z0-9, ]*')]);
        } else if (field.formControlName === 'city') {
          this.isShowCity = field.visible;
          this.isRequiredCity = field.required;
          this.placeholderCity = field.placeHolder;
          field.required
            ? this.cityControl.setValidators([
                Validators.required,
                Validators.pattern('[A-Za-z0-9 ]*'),
              ])
            : this.cityControl.setValidators([Validators.pattern('[A-Za-z0-9 ]*')]);
        } else if (field.formControlName === 'stateCode') {
          this.isShowStateCode = field.visible;
          this.isRequiredStateCode = field.required;
          this.placeholderStateCode = field.placeHolder;
          field.required ? this.stateCodeControl.setValidators([Validators.required]) : null;
        } else if (field.formControlName === 'workPhone') {
          this.isShowWorkPhone = field.visible;
          this.isRequiredWorkPhone = field.required;
          this.placeholderWorkPhone = field.placeHolder;
          field.required
            ? this.workPhoneControl.setValidators([
                Validators.required,
                Validators.pattern('^([0-9()/+ -]*)$'),
                // Validators.minLength(14),
                Validators.maxLength(20),
              ])
            : this.workPhoneControl.setValidators([
                Validators.pattern('^([0-9()/+ -]*)$'),
                // Validators.minLength(14),
                Validators.maxLength(20),
              ]);
        } else if (field.formControlName === 'mobilePhone' && field.required === true) {
          this.isShowMobilePhone = field.visible;
          this.isRequiredMobilePhone = field.required;
          this.placeholderMobilePhone = field.placeHolder;
          field.required
            ? this.mobilePhoneControl.setValidators([
                Validators.required,
                Validators.pattern('^([0-9()/+ -]*)$'),
                // Validators.minLength(14),
                Validators.maxLength(20),
              ])
            : this.mobilePhoneControl.setValidators([
                Validators.pattern('^([0-9()/+ -]*)$'),
                //  Validators.minLength(14),
                Validators.maxLength(20),
              ]);
        } else if (field.formControlName === 'mobilePhone' && field.required === false) {
          this.isShowMobilePhone = field.visible;
          this.isRequiredMobilePhone = field.required;
          this.placeholderMobilePhone = field.placeHolder;
          field.required
            ? this.mobilePhoneControl.setValidators([
                Validators.required,
                Validators.pattern('^([0-9()/+ -]*)$'),
                //  Validators.minLength(14),
                Validators.maxLength(20),
              ])
            : this.mobilePhoneControl.setValidators([
                Validators.pattern('^([0-9()/+ -]*)$'),
                //  Validators.minLength(14),
                Validators.maxLength(20),
              ]);
        } else if (field.formControlName === 'postalCode') {
          this.isShowPostalCode = field.visible;
          this.isRequiredPostalCode = field.required;
          this.placeholderPostalCode = field.placeHolder;
          field.required
            ? this.postalCodeControl.setValidators([
                Validators.required,
                Validators.pattern('[A-Za-z0-9 ]*'),
              ])
            : this.postalCodeControl.setValidators([Validators.pattern('[A-Za-z0-9 ]*')]);
        }
      });
    }
  }

  get firstNameControl() {
    return this.registrationForm.get('firstName') as FormControl;
  }

  get lastNameControl() {
    return this.registrationForm.get('lastName') as FormControl;
  }

  get externalIdControl() {
    return this.registrationForm.get('externalId') as FormControl;
  }

  get alternateEmailControl() {
    return this.registrationForm.get('alternateEmail') as FormControl;
  }

  get jobTitleControl() {
    return this.registrationForm.get('jobTitle') as FormControl;
  }

  get departmentControl() {
    return this.registrationForm.get('department') as FormControl;
  }

  get countryCodeControl() {
    return this.registrationForm.get('countryCode') as FormControl;
  }

  get stateCodeControl() {
    return this.registrationForm.get('stateCode') as FormControl;
  }

  get mobilePhoneControl() {
    return this.registrationForm.get('mobilePhone') as FormControl;
  }

  get workPhoneControl() {
    return this.registrationForm.get('workPhone') as FormControl;
  }

  get companyControl() {
    return this.registrationForm.get('organization') as FormControl;
  }

  get address1Control() {
    return this.registrationForm.get('address1') as FormControl;
  }

  get address2Control() {
    return this.registrationForm.get('address2') as FormControl;
  }
  get address3Control() {
    return this.registrationForm.get('address3') as FormControl;
  }
  get address4Control() {
    return this.registrationForm.get('address4') as FormControl;
  }
  get cityControl() {
    return this.registrationForm.get('city') as FormControl;
  }
  get postalCodeControl() {
    return this.registrationForm.get('postalCode') as FormControl;
  }
  get companyCodeControl() {
    return this.registrationForm.get('companyCode') as FormControl;
  }
  // Error message declarations

  get firstNameControlInvalid() {
    return this.firstNameControl.hasError('pattern') && this.firstNameControl.touched;
  }
  get firstNameControlRequired() {
    return this.firstNameControl.hasError('required') && this.firstNameControl.touched;
  }

  get lastNameControlInvalid() {
    return this.lastNameControl.hasError('pattern') && this.lastNameControl.touched;
  }
  get lastNameControlRequired() {
    return this.lastNameControl.hasError('required') && this.lastNameControl.touched;
  }

  get externalIdControlInvalid() {
    return this.externalIdControl.hasError('pattern') && this.externalIdControl.touched;
  }

  get externalIdControlRequired() {
    return this.externalIdControl.hasError('required') && this.externalIdControl.touched;
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

  get stateCodeControlRequired() {
    return this.stateCodeControl.hasError('required') && this.stateCodeControl.touched;
  }

  get companyControlInvalid() {
    return this.companyControl.hasError('pattern') && this.companyControl.touched;
  }

  get jobTitleControlInvalid() {
    return this.jobTitleControl.hasError('pattern') && this.jobTitleControl.touched;
  }

  get jobTitleControlRequired() {
    return this.jobTitleControl.hasError('required') && this.jobTitleControl.touched;
  }

  get address1ControlRequired() {
    return this.address1Control.hasError('required') && this.address1Control.touched;
  }

  get address2ControlRequired() {
    return this.address2Control.hasError('required') && this.address2Control.touched;
  }
  get departmentControlInvalid() {
    return this.departmentControl.hasError('pattern') && this.departmentControl.touched;
  }
  get departmentControlRequired() {
    return this.departmentControl.hasError('required') && this.departmentControl.touched;
  }

  get companyControlRequired() {
    return this.companyControl.hasError('required') && this.companyControl.touched;
  }

  get address3ControlRequired() {
    return this.address3Control.hasError('required') && this.address3Control.touched;
  }
  get address4ControlRequired() {
    return this.address4Control.hasError('required') && this.address4Control.touched;
  }

  get cityControlRequired() {
    return this.cityControl.hasError('required') && this.cityControl.touched;
  }

  get postalCodeControlRequired() {
    return this.postalCodeControl.hasError('required') && this.postalCodeControl.touched;
  }

  get postalCodeControlInvalid() {
    return this.postalCodeControl.hasError('pattern') && this.postalCodeControl.touched;
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

  get workPhoneControlRequired() {
    return this.workPhoneControl.hasError('required') && this.workPhoneControl.touched;
  }

  get mobilePhoneControlRequired() {
    return this.mobilePhoneControl.hasError('required') && this.mobilePhoneControl.touched;
  }
  get companyCodeInvalidRequired() {
    return this.companyCodeControl.hasError('required') && this.mobilePhoneControl.touched;
  }
  get companyCodeInvalid() {
    return (
      this.companyCodeControl.hasError('inValidCompanyCode') && this.companyCodeControl.touched
    );
  }
  onContinueClick(registrationForm: FormGroup) {
    const { value, valid } = registrationForm;
    if (valid) {
      this.onCreateUser.emit(value);
    }
  }
  onSelectCountry() {
    this.onSelectUserCountry.emit(this.countryCodeControl.value);
  }

  onVerifyClick(registrationForm: FormGroup) {
    const { value, valid } = registrationForm;
    if (valid) {
      this.onUpdateUser.emit({ User: value, tenantId: this.userTenantId });
    }
  }
}
