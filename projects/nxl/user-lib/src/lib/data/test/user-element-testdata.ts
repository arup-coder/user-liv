export const UserElementTestData = {
    oneUpperCase: {
        validInput: 'testValue',
        invalidInput: 'testvalue',
        uppercaseInput: 'TESTVALUE'
    },
    minlength: {
        value: 10,
        invalidInput: 'Test Data',
        validInput: 'Min Length Test Data '
    },
    lowerCase: {
        validInput: 'testValue',
        invalidInput: 'TESTVALUE'
    },
    upperCase: {
        validInput: 'TESTVALUE',
        invalidInput: 'testvalue'
    },
    oneLowerCase: {
        validInput: 'tESTVALUE',
        invalidInput: 'TESTVALUE'
    },
    oneNumber: {
        validInput: '01Test',
        invalidInput: 'Test'
    },
    oneSepcialCharacter: {
        validInput: 'test#@data',
        invalidInput: 'TestData'
    },
    fieldMatch: {
        validInput: {
            field1Value: 'Test Data',
            field2Value: 'Test Data'
        },
        invalidInput: {
            field1Value: 'Test Data',
            field2Value: 'Real Data'
        }
    },
    email: {
        validInput: 'abc@gmail.com',
        invalidInput: 'abc 01@gmail.com'
    },
    elementWeightThreshold: {
        validInput: 98,
        invalidInput: 115
    },
};
