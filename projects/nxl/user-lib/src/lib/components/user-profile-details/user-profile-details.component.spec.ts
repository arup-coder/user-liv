import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileDetailsComponent } from './user-profile-details.component';
import { MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { MaterialLibModule } from '@nxl/material-lib';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HAMMER_LOADER } from '@angular/platform-browser';

import * as testData from '../../data/test/user-test-data';
import { PhoneNumberPipe } from '../../pipes/user.pipe';
import { DisableIfUnauthorizedDirective } from '@nxl/authorization-lib';
import { provideMockStore } from '@ngrx/store/testing';

describe('UserProfileDetailsComponent', () => {
  let component: UserProfileDetailsComponent;
  let fixture: ComponentFixture<UserProfileDetailsComponent>;
  const firstName = 'firstName';
  const lastName = 'lastName';
  const externalId = 'externalId';
  const email = 'email';
  const alternateEmail = 'alternateEmail';

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
      declarations: [UserProfileDetailsComponent, PhoneNumberPipe, DisableIfUnauthorizedDirective],
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
    fixture = TestBed.createComponent(UserProfileDetailsComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();

    spyOn(component, 'onClickSaveUser').and.callThrough();

    spyOn(component, 'onClickBasicDetails').and.callThrough();
    spyOn(component, 'onClickAddressDetail').and.callThrough();
    spyOn(component, 'onClickphone').and.callThrough();
    spyOn(component, 'onSelectCountry').and.callThrough();
    spyOn(component.onUpdateUserData, 'emit');
    spyOn(component.onSelectUserCountry, 'emit');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should form invalid when empty', () => {
    expect(component.profileForm.valid).toBeFalsy();
  });
  it('should call init function with user details', () => {
    component.userDetail = [testData.usersList[0]];
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.userDetail).toEqual([testData.usersList[0]]);
  });
  it('should form pattern validation validate', () => {
    component.profileForm.controls[firstName].setValue(123);
    component.profileForm.controls[lastName].setValue(123);
    component.profileForm.controls[externalId].setValue('abc');
    component.profileForm.controls[alternateEmail].setValue('abc');
     
    component.profileForm.controls[jobTitle].setValue('12@@@2');
    component.profileForm.controls[department].setValue('@@');
    // component.profileForm.controls[mobilePhone].setValue('abc');
    // component.profileForm.controls[workPhone].setValue(1233323234);

    let errors = component.profileForm.controls[firstName].errors;
    fixture.detectChanges();
    expect(errors[pattern]).toBeTruthy();

    errors = component.profileForm.controls[externalId].errors;
    expect(errors[pattern]).toBeTruthy(); 

    errors = component.profileForm.controls[jobTitle].errors;
    expect(errors[pattern]).toBeTruthy();

    errors = component.profileForm.controls[department].errors;
    expect(errors[pattern]).toBeTruthy();
 
  });
  it('should call update on userProfile method when form is valid', () => {
    const profileForm = component.profileForm;
    component.profileForm.controls[firstName].setValue('Anu');
    component.profileForm.controls[lastName].setValue('Adthi');
    component.profileForm.controls[externalId].setValue("1233");
    component.profileForm.controls[email].setValue('asd@dsdf.com');
    component.profileForm.controls[alternateEmail].setValue('asd@dsdf.com');
    component.profileForm.controls[jobTitle].setValue('sdsd');
    component.profileForm.controls[department].setValue('Department1');
    component.profileForm.controls[organization].setValue('Company1');
    component.profileForm.controls[countryCode].setValue('Afghanistan');
    component.profileForm.controls[address1].setValue('add1');
    component.profileForm.controls[address2].setValue('add2');
    component.profileForm.controls[address3].setValue('');
    component.profileForm.controls[address4].setValue('');
    component.profileForm.controls[city].setValue('city');
    component.profileForm.controls[stateCode].setValue('state');
    component.profileForm.controls[postalCode].setValue("123233");
    component.profileForm.controls[workPhone].setValue('(232)-132-1323');
    component.profileForm.controls[mobilePhone].setValue('(232)-132-1323');


    component.onClickSaveUser(profileForm);
    expect(profileForm.valid).toBeTruthy();

    fixture.detectChanges();

    // expect(component.onUpdateUserData.emit).toHaveBeenCalledWith(
    //   testData.profileFormValue
    // );
  });
  it('should Click onClickSaveUser ', () => {
    const profileForm = component.profileForm;
    component.onClickSaveUser(profileForm);
    expect(component.onClickSaveUser).toHaveBeenCalled();
  });
  it('should Click on onClickBasicDetails', () => {
    component.onClickBasicDetails();
    fixture.detectChanges();
    expect(component.onClickBasicDetails).toHaveBeenCalled();
  });
  it('should Click on onClickAddressDetail', () => {
    component.onClickAddressDetail();
    fixture.detectChanges();
    expect(component.onClickAddressDetail).toHaveBeenCalled();
  });
  it('should Click on onClickphone', () => {
    component.onClickphone();
    fixture.detectChanges();
    expect(component.onClickphone).toHaveBeenCalled();
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
