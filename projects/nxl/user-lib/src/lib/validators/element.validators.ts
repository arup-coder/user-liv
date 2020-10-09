import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

function isEmptyInputValue(value: any): boolean {
  // we don't check for string here so it also works with arrays
  return value == null || value.length === 0;
}

export class ElementValidators {
  static oneUpperCase(control: AbstractControl) {
    if (isEmptyInputValue(control.value)) {
      return {
        oneUpperCase: {
          valid: true,
        },
      };
    }
    const regexp = new RegExp('[A-Z]');

    if (!regexp.test(control.value)) {
      return {
        oneUpperCase: {
          valid: true,
        },
      };
    }
    return null;
  }

  static minLength(minLength: number): ValidatorFn {
    function fn(control: AbstractControl): ValidationErrors | null {
      if (isEmptyInputValue(control.value)) {
        return {
          minlength: {
            requiredLength: minLength,
            actualLength: 0,
          },
        };
      }
      const length: number = control.value ? control.value.length : 0;
      return length < minLength
        ? { minlength: { requiredLength: minLength, actualLength: length } }
        : null;
    }
    return fn;
  }

  static lowerCase(count: number): ValidatorFn {
    function fn(control: AbstractControl): ValidationErrors | null {
      if (isEmptyInputValue(control.value)) {
        return {
          oneLowerCase: {
            valid: true,
          },
        };
      }
      const regexp = new RegExp('[a-z]');
      if (!regexp.test(control.value)) {
        return {
          oneLowerCase: {
            valid: true,
          },
        };
      }
      return null;
    }
    return fn;
  }

  static oneLowerCase(control: AbstractControl) {
    if (isEmptyInputValue(control.value)) {
      return {
        oneLowerCase: {
          valid: true,
        },
      };
    }
    const regexp = new RegExp('[a-z]');
    if (!regexp.test(control.value)) {
      return {
        oneLowerCase: {
          valid: true,
        },
      };
    }
    return null;
  }

  static upperCase(count: number): ValidatorFn {
    function fn(control: AbstractControl): ValidationErrors | null {
      if (isEmptyInputValue(control.value)) {
        return {
          upperCase: {
            valid: true,
          },
        };
      }
      const regexp = new RegExp('[A-Z]');
      if (!regexp.test(control.value)) {
        return {
          upperCase: {
            valid: true,
          },
        };
      }
      return null;
    }

    return fn;
  }

  static oneNumber(control: AbstractControl) {
    if (isEmptyInputValue(control.value)) {
      return {
        oneNumber: {
          valid: true,
        },
      };
    }
    const regexp = new RegExp('[0-9]');
    if (!regexp.test(control.value)) {
      return {
        oneNumber: {
          valid: true,
        },
      };
    }
    return null;
  }

  static oneSepcialCharacter(control: AbstractControl) {
    if (isEmptyInputValue(control.value)) {
      return {
        oneSepcialCharacter: {
          valid: true,
        },
      };
    }
    const regexp = /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/;
    if (!regexp.test(control.value)) {
      return { oneSepcialCharacter: { valid: true } };
    }
    return null;
  }

  static validatePattern(control: AbstractControl, pattern: string, errorKey: string) {
    if (isEmptyInputValue(control.value)) {
      return {
        errorKey: {
          valid: true,
        },
      };
    }
    const regexp = new RegExp('pattern');
    if (!regexp.test(control.value)) {
      return {
        errorKey: {
          valid: true,
        },
      };
    }
    return null;
  }

  static fieldMatch(fieldName1, fieldName2): ValidatorFn {
    function fn(control: AbstractControl): ValidationErrors | null {
      if (control.get(fieldName1).value !== control.get(fieldName2).value) {
        return {
          fieldMatch: {
            valid: true,
          },
        };
      }
      return null;
    }
    return fn;
  }

  static email(c: AbstractControl) {
    // tslint:disable-next-line:max-line-length
    const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return EMAIL_REGEX.test(c.value)
      ? null
      : {
          email: {
            valid: false,
          },
        };
  }

  static elementWeightThreshold(control: AbstractControl) {
    if (control.value > 100) {
      return { thresholdExceeded: { valid: false } };
    }
    return null;
  }
}

