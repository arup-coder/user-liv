import * as fromEnums from '../enums/index';
export function funGetAppRoute(application: any, routeName: string): string {
    let route = '';
    if (application) {
        switch (application.name) {
            case 'amplify':
                route = this.funGetAmplifyRoutes(routeName);
                break;
            default:
                route = this.funGetDefaultRoutes(routeName);
                break;
        }
    } else {
        route = this.funGetDefaultRoutes(routeName);
    }
    return route;
}

export function funGetAmplifyRoutes(routeName: string): string {
    let route = '';
    switch (routeName) {
      case 'landing':
        route = fromEnums.AmplifyRoutes.landing;
        break;
      case 'home':
        route = fromEnums.AmplifyRoutes.home;
        break;
     
      case 'gpdr':
        route = fromEnums.AmplifyRoutes.gpdr;
        break;
      case 'contact':
        route = fromEnums.AmplifyRoutes.contact;
        break;
      case 'privacy':
        route = fromEnums.AmplifyRoutes.privacy;
        break;
      case 'terms':
        route = fromEnums.AmplifyRoutes.terms;
        break;
      default:
        route = fromEnums.AmplifyRoutes.home;
        break;
    }
    return route;
}

export function funGetDefaultRoutes(routeName: string): string {
    let route = '';
    switch (routeName) {
      case 'landing':
        route = fromEnums.DefaultRoutes.landing;
        break;
      case 'home':
        route = fromEnums.DefaultRoutes.home;
        break;
     
      case 'gpdr':
        route = fromEnums.DefaultRoutes.gpdr;
        break;
      case 'contact':
        route = fromEnums.AmplifyRoutes.contact;
        break;
      case 'privacy':
        route = fromEnums.AmplifyRoutes.privacy;
        break;
      case 'terms':
        route = fromEnums.AmplifyRoutes.terms;
        break;
      default:
        route = fromEnums.DefaultRoutes.home;
        break;
    }
    return route;
}
