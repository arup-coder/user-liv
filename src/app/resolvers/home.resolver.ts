import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class HomeResolver implements Resolve<boolean> {
    constructor() { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        return combineLatest(
           // this.tenantResolver.resolve(route, state),
            //this.themeResolver.resolve(route, state)
        ).pipe(map(([tenants]) => ({ tenants })))
    }
}
