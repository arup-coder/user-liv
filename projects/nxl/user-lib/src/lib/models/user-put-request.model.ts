export interface UserPutRequest {
  email: string;
  externalId: string;
  firstName: string;
  lastName: string;
  jobTitle: string;
  department: string;
  organization: string;
  address1: string;
  address2: string;
  address3: string;
  address4: string;
  city: string;
  stateCode: string;
  postalCode: string;
  countryCode: string;
  mobilePhone: string;
  workPhone: string;
  alternateEmail: string;
  isActive: boolean;
}
