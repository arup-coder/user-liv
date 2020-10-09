import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAddEditComponent } from './user-add-edit.component';

import { MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { MaterialLibModule } from '@nxl/material-lib';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HAMMER_LOADER } from '@angular/platform-browser';

import * as testData from '../../data/test/user-test-data';
import { PhoneNumberPipe } from '../../pipes/user.pipe';
import { provideMockStore } from '@ngrx/store/testing';

describe('UserAddEditComponent', () => {
  let component: UserAddEditComponent;
  let fixture: ComponentFixture<UserAddEditComponent>;
  const initialState = {
    user: {
      user: {
        users: null,
        usersTablePage: null,
        usersTableSort: null,
        usersTableFilter: null,
        isLoaded: false,
        isLoading: false,
        errorMessage: null,
        country: {
          isLoaded: true,
          isLoading: false,
          countryList: testData.countryList,
          errorMessage: ''
        },
        state: {
          isLoaded: true,
          isLoading: false,
          stateList: testData.stateList,
          errorMessage: ''
        }
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
  const firstName = 'firstName';
  const lastName = 'lastName';
  const externalId = 'externalId';
  const email = 'email';
  const alternateEmail = 'alternateEmail';
  const jobTitle = 'jobTitle';
  const department = 'department';
  const organization = 'organization';
  const countryCode = 'countryCode';
  const isActive = 'isActive';
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

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserAddEditComponent, PhoneNumberPipe],
      imports: [
        MaterialLibModule,
        ReactiveFormsModule,
        MatDatepickerModule,
        MatNativeDateModule,
        BrowserAnimationsModule,
      ],
      providers: [
        {
          provide: HAMMER_LOADER,
          useValue: () => new Promise(() => { }),
        },
        provideMockStore({ initialState }),
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAddEditComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();

    spyOn(component, 'ngOnInit').and.callThrough();
    spyOn(component, 'onClickAddUser').and.callThrough();
    spyOn(component, 'onClickCancel').and.callThrough();
    spyOn(component, 'onClickUpdateUser').and.callThrough();
    spyOn(component, 'onSelectCountry').and.callThrough();
    spyOn(component.onAddUser, 'emit');
    spyOn(component.onUpdateUser, 'emit');
    spyOn(component.onCancel, 'emit');
    spyOn(component.onSelectUserCountry, 'emit');

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should form invalid when empty', () => {
    expect(component.userForm.valid).toBeFalsy();
  });

  it('should call init function with user details', () => {
    component.userDetail = testData.usersList[0];
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.userDetail).toEqual(testData.usersList[0]);
  });

  it('should form pattern validation validate', () => {
    component.userForm.controls[firstName].setValue(123);
    component.userForm.controls[lastName].setValue(123);
    component.userForm.controls[externalId].setValue('abc');
    component.userForm.controls[email].setValue('abc');
    component.userForm.controls[organization].setValue('1@@2');
    component.userForm.controls[jobTitle].setValue('1@@@22');
    component.userForm.controls[department].setValue('@@');


    let errors = component.userForm.controls[firstName].errors;
    fixture.detectChanges();
    expect(errors[pattern]).toBeTruthy();

    errors = component.userForm.controls[externalId].errors;
    expect(errors[pattern]).toBeTruthy();

    errors = component.userForm.controls[email].errors;
    expect(errors[email]).toBeTruthy();

    errors = component.userForm.controls[jobTitle].errors;
    expect(errors[pattern]).toBeTruthy();

    errors = component.userForm.controls[organization].errors;
    expect(errors[pattern]).toBeTruthy();

    errors = component.userForm.controls[department].errors;
    expect(errors[pattern]).toBeTruthy();

    // errors = component.userForm.controls[mobilePhone].errors;
    // expect(errors[pattern]).toBeTruthy();
  });

  it('should call add on user method when form is valid', () => {
    const userForm = component.userForm;
   
    component.userForm.controls[firstName].setValue('Anu');
    component.userForm.controls[lastName].setValue('Adthi');
    component.userForm.controls[externalId].setValue("1233");
    component.userForm.controls[email].setValue('asd@dsdf.com');
    component.userForm.controls[alternateEmail].setValue('asd@dsdf.com');
    component.userForm.controls[jobTitle].setValue('sdsd');
    component.userForm.controls[department].setValue('Department1');
    component.userForm.controls[organization].setValue('Company1');
    component.userForm.controls[countryCode].setValue('IN');
    component.userForm.controls[isActive].setValue(true);
    component.userForm.controls[address1].setValue('add1');
    component.userForm.controls[address2].setValue('add2');
    component.userForm.controls[address3].setValue('add3');
    component.userForm.controls[address4].setValue('add4');
    component.userForm.controls[city].setValue('city');
    component.userForm.controls[stateCode].setValue('GJ');
    component.userForm.controls[postalCode].setValue("380028");
    component.userForm.controls[workPhone].setValue('(232)-132-1323');
    component.userForm.controls[mobilePhone].setValue('(232)-132-1323');

    component.onClickAddUser(userForm);
    expect(userForm.valid).toBeTruthy();

    fixture.detectChanges();

    expect(component.onAddUser.emit).toHaveBeenCalledWith(
      testData.userFormValue
    );
  });

  it('should call update on user method when form is valid', () => {
    const userForm = component.userForm;
    component.userDetail = testData.userDetail;
    component.userForm.controls[firstName].setValue('Anu');
    component.userForm.controls[lastName].setValue('Adthi');
    component.userForm.controls[externalId].setValue("1233");
    component.userForm.controls[email].setValue('asd@dsdf.com');
    component.userForm.controls[alternateEmail].setValue('asd@dsdf.com');
    component.userForm.controls[jobTitle].setValue('sdsd');
    component.userForm.controls[department].setValue('Department1');
    component.userForm.controls[organization].setValue('Company1');
    component.userForm.controls[countryCode].setValue('IN');
    component.userForm.controls[isActive].setValue(true);
    component.userForm.controls[address1].setValue('add1');
    component.userForm.controls[address2].setValue('add2');
    component.userForm.controls[address3].setValue('add3');
    component.userForm.controls[address4].setValue('add4');
    component.userForm.controls[city].setValue('city');
    component.userForm.controls[stateCode].setValue('GJ');
    component.userForm.controls[postalCode].setValue("380028");
    component.userForm.controls[workPhone].setValue('(232)-132-1323');
    component.userForm.controls[mobilePhone].setValue('(232)-132-1323');

    component.onClickUpdateUser(userForm);
    expect(userForm.valid).toBeTruthy();

    fixture.detectChanges();

    expect(component.onUpdateUser.emit).toHaveBeenCalledWith(
      {
        User: testData.userupdateFormValue,
        isRegistered: false
      }
    );
  });

  it('should call on cancel emit', () => {
    component.onClickCancel();
    fixture.detectChanges();
    expect(component.onCancel.emit).toHaveBeenCalled();
  });

  it('should Click Update User', () => {
    const userForm = component.userForm;
    component.onClickUpdateUser(userForm);
    expect(component.onClickUpdateUser).toHaveBeenCalled();
  });

  it('should Click Add User', () => {
    const userForm = component.userForm;
    component.onClickAddUser(userForm);
    expect(component.onClickAddUser).toHaveBeenCalled();
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
