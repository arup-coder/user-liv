export interface UserPostRequest {
  userId: string;
  email: string;
  alternateEmail: string;
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
  countryCode: string;
  postalCode: string;
  mobilePhone: string;
  workPhone: string;
  isActive: boolean;
}
