import { Component, DebugElement } from '@angular/core';
import {  ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { By, HAMMER_LOADER } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Store, StoreModule } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { MaterialLibModule } from '@nxl/material-lib';
import * as fromRoot from '../store/reducers';
import { UserValidators } from './user-companyCode.validators';

@Component({
  selector: 'lib-user-validation-test-component',
  template:
    '  <form [formGroup]="registrationForm"> <input   matInput  type="text"  formControlName="companyCode" /> </form>',
})
class UserValidatorTestComponent {
  constructor(private fb: FormBuilder, private userValidators: UserValidators) {}

  registrationForm = this.fb.group({
    companyCode: ['', [Validators.required], [this.userValidators.CompanyCode()]],
  });

  get companyCodeControl() {
    return this.registrationForm.get('companyCode') as FormControl;
  }
}

const initialState = {
  user: {
    user: {
      userVerifyCompanyCodeTenantId: 'Test',
    },
  },
};

describe('UserValidators', () => {
  let store;
  let fixture: ComponentFixture<UserValidatorTestComponent>;
  let component: UserValidatorTestComponent;
  let inputEl: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserValidatorTestComponent],
      imports: [
        MaterialLibModule,
        ReactiveFormsModule,
        MatDatepickerModule,
        MatNativeDateModule,
        BrowserAnimationsModule,
        StoreModule.forRoot({ user: fromRoot.reducers.user }),
      ],
      providers: [
        {
          provide: HAMMER_LOADER,
          useValue: () => new Promise(() => {}),
        },
        provideMockStore({ initialState }),
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(UserValidatorTestComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
  });

  it('should return error if company code is invalid', fakeAsync(() => {
    const userState = {
      user: {
        user: {
          userVerifyCompanyCodeTenantId: null,
        },
      },
    };
    store.setState(userState);
    fixture.detectChanges();
    component.companyCodeControl.setValue('Test123');
    tick(1000);
    let result = component.companyCodeControl.hasError('inValidCompanyCode');
    expect(result).toBe(true);
 
    expect(component.companyCodeControl.errors['inValidCompanyCode']).toBe('Test123');
  }));


   it('should return null in error if company code is valid', fakeAsync(() => {
     const userState = {
       user: {
         user: {
           userVerifyCompanyCodeTenantId: 'EASTNXL1256',
         },
       },
     };
     store.setState(userState);
     fixture.detectChanges();
     component.companyCodeControl.setValue('EASTNXL1256');
     tick(1000);
     let result = component.companyCodeControl.hasError('inValidCompanyCode');
     expect(result).toBe(false);
     expect(component.companyCodeControl.errors).toBe(null);
   }));
});
