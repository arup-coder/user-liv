import { PhoneNumberPipe, StatusPipe } from './user.pipe';

describe('PhoneNumberPipe', () => {
  it('create an instance', () => {
    const pipe = new PhoneNumberPipe();
    expect(pipe).toBeTruthy();
  });

  it('should display in phone format', () => {
    const phoneNumber = '3333333333';

    const pipe = new PhoneNumberPipe();

    const result = pipe.transform(phoneNumber);

    expect(result).toBe('(333) 333-3333');
  });

});


describe('StatusPipe', () => {
  it('create an instance', () => {
    const pipe = new StatusPipe();
    expect(pipe).toBeTruthy();
  });

  it('should convert to Active if True ', () => {
    const userActive = true;
    const pipe = new StatusPipe();
    const result = pipe.transform(userActive);
    expect(result).toBe('Active');
  });
  it('should convert to Inactive if false ', () => {
    const userActive = false;
    const pipe = new StatusPipe();
    const result = pipe.transform(userActive);
    expect(result).toBe('Inactive');
  });

});
