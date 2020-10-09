import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UserPermissionResponse } from '../models/user-permission-response.model';
import { UserPermissionsPostRequest } from '../models/user-permission-post-request.model';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    }),
};

@Injectable({
    providedIn: 'root'
})
export class UserPermissionService {
    constructor(private http: HttpClient, @Inject('env') private env) { }
    baseUrl = this.env.uri.authServiceUriV1;
    getUserPermissions(userId: string): Observable<UserPermissionResponse[]> {
        const url = `${this.baseUrl}/auth/user/permissions/${userId}`;
        return this.http.get<UserPermissionResponse[]>(encodeURI(url), httpOptions);
    }
    updateUserPermissions(settingsdetails: UserPermissionsPostRequest[], userId: string): Observable<UserPermissionsPostRequest> {
        const url = `${this.baseUrl}/auth/user/permissions/${userId}`;
        return this.http.put<UserPermissionsPostRequest>(encodeURI(url), settingsdetails, httpOptions);    }
}
