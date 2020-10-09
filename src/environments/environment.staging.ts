import { environmment as defaultEnvironment } from './environment.defaults';
// import { environmment as defaultEnvironment } from '@envDefaults';

export const environment = {
  ...defaultEnvironment,
  tenantConfig: {
    tenant: '#{tenantConfig.tenant}#',
    clientID: '#{tenantConfig.clientID}#',
    signInUpPolicy: '#{tenantConfig.signInUpPolicy}#',
    signUpPolicy: '#{tenantConfig.signUpPolicy}#',
    passwordResetPolicy: '#{tenantConfig.passwordResetPolicy}#',
    redirectUri: '#{tenantConfig.redirectUri}#',
    b2cScopes: [
      '#{tenantConfig.redirectUri}#'
    ]
  },
  production: false
};

