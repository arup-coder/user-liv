import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRegistrationComponent } from './user-registration.component';

import { MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { MaterialLibModule } from '@nxl/material-lib';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HAMMER_LOADER } from '@angular/platform-browser';

import * as testData from '../../data/test/user-test-data';
import { PhoneNumberPipe } from '../../pipes/user.pipe';
import { DisableIfUnauthorizedDirective } from '@nxl/authorization-lib';
import { provideMockStore } from '@ngrx/store/testing';

describe('UserRegistrationComponent', () => {
  let component: UserRegistrationComponent;
  let fixture: ComponentFixture<UserRegistrationComponent>;

  const firstName = 'firstName';
  const lastName = 'lastName';
  const externalId = 'externalId';
  const alternateEmail = 'alternateEmail';
  const email = 'email';
  const jobTitle = 'jobTitle';
  const department = 'department';
  const organization = 'organization';
  const countryCode = 'countryCode';
  const address1 = 'address1';
  const address2 = 'address2';
  const address3 = 'address3';
  const address4 = 'address4';
  const city = 'city';
  const stateCode = 'stateCode';
  const postalCode = 'postalCode';
  const workPhone = 'workPhone';
  const mobilePhone = 'mobilePhone';
  const pattern = 'pattern';
  const isActive = 'isActive';
  const initialState = {
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
      declarations: [UserRegistrationComponent, PhoneNumberPipe, DisableIfUnauthorizedDirective],
      imports: [
        MaterialLibModule,
        ReactiveFormsModule,
        MatDatepickerModule,
        MatNativeDateModule,
        BrowserAnimationsModule,
      ],
      providers: [
        provideMockStore({ initialState }),
        {
          provide: HAMMER_LOADER,
          useValue: () => new Promise(() => { }),
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRegistrationComponent);
    component = fixture.componentInstance;
    component.userDetail = [];
    component.isReadOnly = false;
    component.fieldList = testData.registerFormValue.registrationFields;
    component.ngOnInit();
    fixture.detectChanges();
    spyOn(component, 'ngOnInit').and.callThrough();
    spyOn(component, 'onContinueClick').and.callThrough();
    spyOn(component, 'onVerifyClick').and.callThrough();
    spyOn(component, 'getFieldsDetails').and.callThrough();
    spyOn(component, 'onSelectCountry').and.callThrough();
    spyOn(component.onCreateUser, 'emit');
    spyOn(component.onUpdateUser, 'emit');
    spyOn(component.onSelectUserCountry, 'emit');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call init function with user details', () => {
    component.userDetail[0] = testData.usersList[0];
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.userDetail).toEqual([testData.usersList[0]]);
  });

  it('should call init function with user details', () => {
    const testUser = testData.userDetail;
    component.ngOnInit();
    fixture.detectChanges();

    component.userDetail = [testUser];
    component.userEmailAddress = 'test@gmail.com';
    fixture.detectChanges();
    expect(component.userDetail).toEqual([testUser]);
  });

  it('should call get registration fields details', () => {
    component.fieldList = testData.registrationFieldsList.registrationFields;
    component.getFieldsDetails();
    fixture.detectChanges();
    expect(component.isShowFirstName).toBeTruthy();
  });

  it('should form pattern validation validate', () => {
    component.registrationForm.controls[firstName].setValue(123);
    component.registrationForm.controls[lastName].setValue(123);
    component.registrationForm.controls[externalId].setValue('abc');
    component.registrationForm.controls[alternateEmail].setValue('abc');
    component.registrationForm.controls[jobTitle].setValue('@@@@@');
    component.registrationForm.controls[department].setValue('@@');

    let errors = component.registrationForm.controls[firstName].errors;
    fixture.detectChanges();
    expect(errors[pattern]).toBeTruthy();

    errors = component.registrationForm.controls[externalId].errors;
    expect(errors[pattern]).toBeTruthy();

    errors = component.registrationForm.controls[jobTitle].errors;
    expect(errors[pattern]).toBeTruthy();

    errors = component.registrationForm.controls[department].errors;
    expect(errors[pattern]).toBeTruthy();

  });

  it('should call add on register user method when form is valid', () => {
    const registrationForm = component.registrationForm;

    component.registrationForm.controls[firstName].setValue('newUser');
    component.registrationForm.controls[lastName].setValue('Adthi');
    component.registrationForm.controls[externalId].setValue('1241');
    component.registrationForm.controls[alternateEmail].setValue('asd@dsdf.com');
    component.registrationForm.controls[email].setValue('asd@dsdf.com');
    component.registrationForm.controls[jobTitle].setValue('sdsd');
    component.registrationForm.controls[department].setValue('Department1');
    component.registrationForm.controls[organization].setValue('Company1');
    component.registrationForm.controls[countryCode].setValue('IN');
    component.registrationForm.controls[address1].setValue('add1');
    component.registrationForm.controls[address2].setValue('add2');
    component.registrationForm.controls[address3].setValue('');
    component.registrationForm.controls[address4].setValue('');
    component.registrationForm.controls[city].setValue('city');
    component.registrationForm.controls[stateCode].setValue('');
    component.registrationForm.controls[postalCode].setValue('380014');
    component.registrationForm.controls[workPhone].setValue('(232)-132-1323');
    component.registrationForm.controls[mobilePhone].setValue('(232)-132-1323');
    component.registrationForm.controls[isActive].setValue(true);
    expect(registrationForm.valid).toBeTruthy();
    component.onContinueClick(registrationForm);
    fixture.detectChanges();
    component.onCreateUser.emit(registrationForm.value);

    expect(component.onCreateUser.emit).toHaveBeenCalledWith(testData.registerFormValue);
  });

  it('should call update on register user method when form is valid', () => {
    const registrationForm = component.registrationForm;
    component.isReadOnly = true;
    component.registrationForm.controls[firstName].setValue('newUser');
    component.registrationForm.controls[lastName].setValue('Adthi');
    component.registrationForm.controls[externalId].setValue('1241');
    component.registrationForm.controls[alternateEmail].setValue('asd@dsdf.com');
    component.registrationForm.controls[email].setValue('asd@dsdf.com');
    component.registrationForm.controls[jobTitle].setValue('sdsd');
    component.registrationForm.controls[department].setValue('Department1');
    component.registrationForm.controls[organization].setValue('Company1');
    component.registrationForm.controls[countryCode].setValue('IN');
    component.registrationForm.controls[address1].setValue('add1');
    component.registrationForm.controls[address2].setValue('add2');
    component.registrationForm.controls[address3].setValue('');
    component.registrationForm.controls[address4].setValue('');
    component.registrationForm.controls[city].setValue('city');
    component.registrationForm.controls[stateCode].setValue('');
    component.registrationForm.controls[postalCode].setValue('380014');
    component.registrationForm.controls[workPhone].setValue('(232)-132-1323');
    component.registrationForm.controls[mobilePhone].setValue('(232)-132-1323');
    component.registrationForm.controls[isActive].setValue(true);
    expect(registrationForm.valid).toBeTruthy();
    component.onVerifyClick(registrationForm);
    fixture.detectChanges();
    component.onUpdateUser.emit(registrationForm.value);

    expect(component.onUpdateUser.emit).toHaveBeenCalledWith(testData.registerFormValue);
  });
  it('should Click on Select Country', () => {
    component.onSelectCountry();
    fixture.detectChanges();
    expect(component.onSelectCountry).toHaveBeenCalled();
  });

  it('should emit on Select User Country', () => {
    component.onSelectCountry();
    expect(component.onSelectUserCountry.emit).toHaveBeenCalled();
  });
});
