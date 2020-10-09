import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialLibModule } from '@nxl/material-lib';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HAMMER_LOADER } from '@angular/platform-browser';
import { UserResetPasswordComponent } from './user-password-reset.component';
import { DisableIfUnauthorizedDirective } from '@nxl/authorization-lib';
import { provideMockStore } from '@ngrx/store/testing';

import * as testData from '../../data/test/user-test-data';
describe('UserResetPasswordComponent', () => {
  let component: UserResetPasswordComponent;
  let fixture: ComponentFixture<UserResetPasswordComponent>;
  const curPassword = 'curentPassword';
  const newPassword = 'newPassword';
  const confNewpassword = 'confNewpassword'; 
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
      declarations: [UserResetPasswordComponent, DisableIfUnauthorizedDirective],
      imports: [
        MaterialLibModule,
        ReactiveFormsModule,       
        BrowserAnimationsModule,
      ],
      providers: [
        provideMockStore({ initialState }),
        {
          provide: HAMMER_LOADER,
          useValue: () => new Promise(() => {}),
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserResetPasswordComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();

    
    spyOn(component, 'onClickResetPassword').and.callThrough();
    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should form invalid when empty', () => {
    expect(component.resetPassword.valid).toBeFalsy();
  });
  it('should Click onClickResetPassword', () => {
    const resetPassword = component.resetPassword;
    component.onClickResetPassword(resetPassword);
    expect(component.onClickResetPassword).toHaveBeenCalled();
  });
  
});
