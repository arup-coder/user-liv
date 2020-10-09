import { ElementValidators } from '../validators/element.validators';
import { FormControl, FormGroup } from '@angular/forms';
import { UserElementTestData } from '../data/test/user-element-testdata';

describe('ElementValidators :', () => {
    const control = new FormControl('input');

    describe('oneUpperCase : ', () => {

        it('should return oneUpperCase valid true if control value is empty', () => {
            control.setValue('');
            expect(ElementValidators.oneUpperCase(control)).toEqual({ oneUpperCase: { valid: true } });
        });
        it('should return oneUpperCase valid true if control value has all lowercase', () => {
            control.setValue(UserElementTestData.oneUpperCase.invalidInput);
            expect(ElementValidators.oneUpperCase(control)).toEqual({ oneUpperCase: { valid: true } });
        });
        it('should return null if control value has uppercase', () => {
            control.setValue(UserElementTestData.oneUpperCase.validInput);
            expect(ElementValidators.oneUpperCase(control)).toBeNull();
        });
    });

    describe('minLength : ', () => {

        const minLengthValidator = ElementValidators.minLength(UserElementTestData.minlength.value);

        it('should return required lenght as minlength and actual length as 0 if invalid input value', () => {
            control.setValue('');
            expect(minLengthValidator(control)).toEqual(
                { minlength: { requiredLength: UserElementTestData.minlength.value, actualLength: length } });
        });

        it('should return null if valid input value', () => {
            control.setValue(UserElementTestData.minlength.validInput);
            const result = minLengthValidator(control);
            expect(result).toBeNull();
        });
    });

    describe('lowerCase : ', () => {
        const lowercaseValidator = ElementValidators.lowerCase(0);

        it('should return oneLowerCase valid true if control value is empty', () => {
            control.setValue('');
            expect(lowercaseValidator(control)).toEqual({ oneLowerCase: { valid: true } });
        });
        it('should return null if control value has lowercase', () => {
            control.setValue(UserElementTestData.lowerCase.validInput);
            expect(lowercaseValidator(control)).toBeNull();
        });
        it('should return oneLowerCase valid true if control value has no lowercase', () => {
            control.setValue(UserElementTestData.lowerCase.invalidInput);
            expect(lowercaseValidator(control)).toEqual({ oneLowerCase: { valid: true } });
        });
    });


    describe('onelowerCase : ', () => {

        it('should return oneLowerCase valid true if control value is empty', () => {
            control.setValue('');
            expect(ElementValidators.oneLowerCase(control)).toEqual({ oneLowerCase: { valid: true } });
        });
        it('should return null if control value has lowercase', () => {
            control.setValue(UserElementTestData.oneLowerCase.validInput);
            expect(ElementValidators.oneLowerCase(control)).toBeNull();
        });
        it('should return oneLowerCase valid true if control value has no lowercase', () => {
            control.setValue(UserElementTestData.oneLowerCase.invalidInput);
            expect(ElementValidators.oneLowerCase(control)).toEqual({ oneLowerCase: { valid: true } });
        });
    });

    describe('upperCase : ', () => {
        const uppercaseValidator = ElementValidators.upperCase(0);

        it('should return upperCase valid true if control value is empty', () => {
            control.setValue('');
            expect(uppercaseValidator(control)).toEqual({ upperCase: { valid: true } });
        });
        it('should return null if control value has uppercase', () => {
            control.setValue(UserElementTestData.upperCase.validInput);
            expect(uppercaseValidator(control)).toBeNull();
        });
        it('should return upperCase valid true if control value has no uppercase', () => {
            control.setValue(UserElementTestData.upperCase.invalidInput);
            expect(uppercaseValidator(control)).toEqual({ upperCase: { valid: true } });
        });
    });

    describe('oneNumber : ', () => {
        it('should return oneNumber valid true if control value is empty', () => {
            control.setValue('');
            expect(ElementValidators.oneNumber(control)).toEqual({ oneNumber: { valid: true } });
        });
        it('should return null if control value has numbers', () => {
            control.setValue(UserElementTestData.oneNumber.validInput);
            expect(ElementValidators.oneNumber(control)).toBeNull();
        });
        it('should return oneNumber valid true if control value has no number', () => {
            control.setValue(UserElementTestData.oneNumber.invalidInput);
            expect(ElementValidators.oneNumber(control)).toEqual({ oneNumber: { valid: true } });
        });
    });

    describe('oneSepcialCharacter : ', () => {

        it('should return oneSepcialCharacter valid true if control value is empty', () => {
            control.setValue('');
            expect(ElementValidators.oneSepcialCharacter(control)).toEqual({ oneSepcialCharacter: { valid: true } });
        });
        it('should return null if control value has special characters', () => {
            control.setValue(UserElementTestData.oneSepcialCharacter.validInput);
            expect(ElementValidators.oneSepcialCharacter(control)).toBeNull();
        });
        it('should return oneSepcialCharacter valid true if control value has no special characters', () => {
            control.setValue(UserElementTestData.oneSepcialCharacter.invalidInput);
            expect(ElementValidators.oneSepcialCharacter(control)).toEqual({ oneSepcialCharacter: { valid: true } });
        });
    });

    describe('validatePattern : ', () => {
        it('should return errorKey valid true if control value is empty', () => {
            control.setValue('');
            expect(ElementValidators.validatePattern(control, '', '')).toEqual(
                { errorKey: { valid: true } });
        });
    });

    describe('fieldMatch : ', () => {
        const form = new FormGroup({});
        const field1Control = new FormControl('input');
        const field2Control = new FormControl('input');
        form.addControl('Field1', field1Control);
        form.addControl('Field2', field2Control);

        it('should return null if control value Field1 value matches with Field2 value', () => {
            field1Control.setValue(UserElementTestData.fieldMatch.validInput.field1Value);
            field2Control.setValue(UserElementTestData.fieldMatch.validInput.field2Value);
            const fieldMatchValidator = ElementValidators.fieldMatch('Field1', 'Field2');
            expect(fieldMatchValidator(form)).toBeNull();
        });

        it('should return fieldMatch true if control value Field1 value do not matches with Field2 value', () => {
            field1Control.setValue(UserElementTestData.fieldMatch.invalidInput.field1Value);
            field2Control.setValue(UserElementTestData.fieldMatch.invalidInput.field2Value);
            const fieldMatchValidator = ElementValidators.fieldMatch('Field1', 'Field2');
            expect(fieldMatchValidator(form)).toEqual({
                fieldMatch: {
                    valid: true
                }
            });
        });
    });

    describe('email : ', () => {

        it('should return null  if control has valid email input', () => {
            control.setValue(UserElementTestData.email.validInput);
            expect(ElementValidators.email(control)).toBeNull();
        });

        it('should return email valid false if control has invalid email input', () => {
            control.setValue(UserElementTestData.email.invalidInput);
            expect(ElementValidators.email(control)).toEqual({ email: { valid: false } });
        });
    });

    describe('elementWeightThreshold : ', () => {

        it('should return null  if control has value > 100', () => {
            control.setValue(UserElementTestData.elementWeightThreshold.validInput);
            expect(ElementValidators.elementWeightThreshold(control)).toBeNull();
        });

        it('should return thresholdExceeded valid false if control has value < = 100', () => {
            control.setValue(UserElementTestData.elementWeightThreshold.invalidInput);
            expect(ElementValidators.elementWeightThreshold(control)).toEqual({ thresholdExceeded: { valid: false } });
        });
    });
});
