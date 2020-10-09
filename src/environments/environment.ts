import { environmment as defaultEnvironment } from './environment.defaults';
// import { environmment as defaultEnvironment } from '@envDefaults';

export const environment = {
  ...defaultEnvironment,
  tenantConfig: {
    tenant: 'devcorebtcnxl.onmicrosoft.com',
    b2cURL: 'https://devcorebtcnxl.b2clogin.com/tfp/',
    clientID: 'ff78e241-67dd-4562-80b1-04002a114222',
    signInUpPolicy: 'B2C_1__signupsignin1',
    signInPolicy: 'B2C_1_sign_in_dev_v2',
    signUpPolicy: 'B2C_1_sign_up_dev_v2',
    passwordResetPolicy: 'B2C_1_password_reset_dev_v2',
    redirectUri: 'http://localhost:4200/auth/',
    b2cScopes: [
      'https://devcorebtcnxl.onmicrosoft.com/test/demo.read',
      'https://devcorebtcnxl.onmicrosoft.com/test/demo.write',
      'https://devcorebtcnxl.onmicrosoft.com/test/user_impersonation',
    ],
  },
  uri: {
    userStubServiceUriV1: 'https://dev-core-apim-nxl.azure-api.net/user-stub-service/api/v1',
    userServiceUriV1: 'https://dev-core-apim-nxl.azure-api.net/user-service/api/v1',
    authorizationServiceUriV1:
      'https://dev-core-apim-nxl.azure-api.net/authorization-stub-service/api/v1',
    configurationServiceUriV1:
      'https://dev-core-apim-nxl.azure-api.net/configuration-stub-service/api/v1',
    tenantServiceUriV1: 'https://dev-core-apim-nxl.azure-api.net/tenant-stub-service/api/v1',
    pointServiceUriV1: 'https://dev-core-apim-nxl.azure-api.net/point-stub-service/api/v1',
    authServiceUriV1: 'https://dev-core-apim-nxl.azure-api.net/Auth-service/api/v1',
    sharedServiceUriV1: 'https://dev-core-apim-nxl.azure-api.net/shared-service/api/v1',
  },
  application: {
    name: 'amplify',
  },
};
