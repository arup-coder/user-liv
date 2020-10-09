export interface User {
  userId: string;
  tenantId?: string;
  firstName: string;
  lastName: string;
  email: string;
  alternateEmail: string;
  jobTitle: string;
  department: string;
  organization: string;
  countryCode: string;
  address1: string;
  address2: string;
  address3: string;
  address4: string;
  city: string;
  stateCode: string;
  postalCode: string;
  workPhone: string;
  mobilePhone: string;
  externalId: string;
  isRegistered: boolean;
  isActive: boolean;
  createdOn?: string;
  isSelected?: boolean; // used for select check box on user list grid
}
