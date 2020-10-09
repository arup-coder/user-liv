export interface SignInName {
    type: string;
    value: string;
}

export interface PasswordProfile {
    password: string;
    forceChangePasswordNextLogin: boolean; //true
}

export interface AuthUserPostRequestModel {
    accountEnabled: boolean;
    signInNames: SignInName[];
    creationType: string;
    displayName: string;
    mailNickname: string; //tenantID
    passwordProfile: PasswordProfile;
    passwordPolicies: string;
}