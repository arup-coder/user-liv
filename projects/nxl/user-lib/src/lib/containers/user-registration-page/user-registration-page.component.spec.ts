import {  ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialLibModule } from '@nxl/material-lib';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { UserRegistrationPageComponent } from './user-registration-page.component';
import { UserRegistrationComponent } from '../../components/user-registration/user-registration.component';

import { HAMMER_LOADER } from '@angular/platform-browser';
import { UserSecondTopBarComponent } from '../../components';
import { PhoneNumberPipe } from '../../pipes/user.pipe';

import { StoreModule } from '@ngrx/store';
import * as fromRoot from '../../store/reducers';
import { provideMockStore } from '@ngrx/store/testing';

import * as testData from '../../data/test/user-test-data';
import { DisableIfUnauthorizedDirective } from '@nxl/authorization-lib';

describe('UserRegistrationPageComponent', () => {
  let component: UserRegistrationPageComponent;
  let fixture: ComponentFixture<UserRegistrationPageComponent>;


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
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        UserRegistrationPageComponent,
        UserRegistrationComponent,
        UserSecondTopBarComponent,
        PhoneNumberPipe,
        DisableIfUnauthorizedDirective
      ],
      imports: [
        RouterTestingModule,
        MaterialLibModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        StoreModule.forRoot({ user: fromRoot.reducers.user }),
      ],
      providers: [
        {
          provide: HAMMER_LOADER,
          useValue: () => new Promise(() => {}),
        },
        provideMockStore({ initialState}),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserRegistrationPageComponent);
    component = fixture.componentInstance;
    component.userDetail = [testData.userRegisterDetail]
    fixture.detectChanges();
    spyOn(component, 'onCreateUser').and.callThrough();
    spyOn(component, 'onUpdateUser').and.callThrough();
    spyOn(component, 'onSelectCountry').and.callThrough();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create component',() => {
    expect(component).toBeTruthy();
  });

   it('should call on registered user', () => {
     component.onCreateUser(testData.createUser);
     fixture.detectChanges();
     expect(component.onCreateUser).toHaveBeenCalled();
   });

  it('should call on registered user', () => {
    component.onUpdateUser(testData.updateUser);
    fixture.detectChanges();
    expect(component.onUpdateUser).toHaveBeenCalled();
  });

  it('should call on select country', () => {
    component.onSelectCountry('IN');
    expect(component.onSelectCountry).toHaveBeenCalled();
  });
});
