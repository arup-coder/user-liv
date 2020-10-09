import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import * as fromPermissions from '../../enums/user-permission-values-enums';
@Component({
  selector: 'lib-user-password-reset',
  templateUrl: './user-password-reset.component.html',
  styleUrls: ['./user-password-reset.component.scss'],
})
export class UserResetPasswordComponent implements OnInit {
  @Output() onResetPassword = new EventEmitter<any>();
  moduleName: any;
  permissions: any;
  resetPassword = this.fb.group({
    curPassword: ['', [Validators.required, Validators.pattern('[A-Za-z0-9]*')]],
   // newPassword: ['', [Validators.minLength(6), Validators.pattern('^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,10}$')]],
    newPassword: ['', [Validators.required, Validators.pattern('[A-Za-z0-9]*')]],
   // newPassword: ['', [Validators.minLength(6), Validators.pattern('[A-Za-z0-9@$!%*?&]*')]],
      confNewpassword: ['', [Validators.required, Validators.pattern('[A-Za-z0-9]*')]],
  
  });

  constructor(private fb: FormBuilder) {
    this.moduleName = fromPermissions.ModuleName;
    this.permissions = fromPermissions.Permissions; 
  }

  ngOnInit() { 

    this.resetPassword.patchValue({
      curPassword: null,
      newPassword: null,
      confNewpassword: null
    })

  }
  get curPasswordControl() {
    return this.resetPassword.get('curPassword') as FormControl;
  }
  get newPasswordControl() {
    return this.resetPassword.get('newPassword') as FormControl;
  }
  get confNewpasswordControl() {
    return this.resetPassword.get('confNewpassword') as FormControl;
  }

  // Error message declarations
  get curPasswordControlRequired() {
    return this.curPasswordControl.hasError('required') && this.curPasswordControl.touched;
  }
  get newPasswordControlRequired() {
    return this.newPasswordControl.hasError('required') && this.newPasswordControl.touched;
  }
  get confNewpasswordControlRequired() {
    return this.confNewpasswordControl.hasError('required') && this.confNewpasswordControl.touched;
  }
  get newPasswordControlMinLength() {
    return this.newPasswordControl.hasError('minlength') && this.newPasswordControl.touched;
  } 
  get newPasswordControlInvalid() {
    return this.newPasswordControl.hasError('pattern') && this.newPasswordControl.touched;
  } 

  onClickResetPassword(resetPassword: FormGroup) {
   
    const { value, valid } = resetPassword;
    if (valid) {
      this.onResetPassword.emit(value);
    }
  }
}
