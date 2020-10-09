import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';
import { UserResponse, PaginationHeaders, FilterValues } from '../models/user-response.model';
import { UserPutRequest } from '../models/user-put-request.model';
import { UserPostRequest } from '../models/user-post-request.model';
import { GroupResponse, UnmappedUserResponse } from '../models/group-response.model';
import { GroupList } from '../models/group.model';
import { GroupPostRequest } from '../models/group-post-request.model';
import { GroupPutRequest } from '../models/group-put-request.model';
import { UserGroupPostRequest, GroupedUsersListResponse } from '../models/userGroupPostRequest';
import { UserRequest } from '../models/user-request.model';
import { Country } from '../models/user-country.model';
import { State } from '../models/user-state.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, @Inject('env') private env) {}
  baseStubUrl = this.env.uri.userStubServiceUriV1;
  tenantStubUrl = this.env.uri.tenantServiceUriV1;
  baseUrl = this.env.uri.userServiceUriV1;
  authUrl = this.env.uri.authServiceUriV1;
  sharedUrl = this.env.uri.sharedServiceUriV1;



  getUsersList(
    paginationHeaders: PaginationHeaders,
    sort: string,
    filter: FilterValues[],
    searchText: string,
    tenantId: string,
  ): Observable<UserResponse> {
    let params = new HttpParams()
      .set('Page', `${paginationHeaders.page}`)
      .set('PageSize', `${paginationHeaders.pageSize}`)
      .set('Sort', `${sort}`)
      .set('Q', `${searchText}`);
    if (filter) {
      filter.forEach(filterValues => {
        params = filterValues.title
          ? params.append(filterValues.title, filterValues.value.value.toString())
          : params;
      });
    }
    const url = `${this.baseUrl}/tenants/${tenantId}/user/users/paged`;
    return this.http
      .get<any>(encodeURI(url), { observe: 'response', params })
      .pipe(
        map(users => {
          const payload: UserResponse = {
            body: users.body,
            headers: JSON.parse(users.headers.get('x-pagination')),
            sort: sort,
            filter: filter,
            searchText,
          };
          return payload;
        }),
      );
  }

  updateUser(userdetail: UserPutRequest, userId: string, tenantId: string) {
    const url = `${this.baseUrl}/tenants/${tenantId}/user/users/${userId}`;
    return this.http.put(encodeURI(url), userdetail, httpOptions);
  }

  activateUsers(userIds: string[], tenantId: string) {
    const url = `${this.baseUrl}/tenants/${tenantId}/user/users/bulk-activation`;
    return this.http.put(encodeURI(url), userIds, httpOptions);
  }
  deActivateUsers(userIds: string[], tenantId: string) {
    const url = `${this.baseUrl}/tenants/${tenantId}/user/users/bulk-deactivation`;
    const deleteHttpOptions = {
      headers: httpOptions.headers,
      body: userIds,
    };
    return this.http.delete(encodeURI(url), deleteHttpOptions);
  }
  registerUser(userId: string, tenantId: string) {
    const url = `${this.baseUrl}/tenants/${tenantId}/user/users/${userId}/registration`;
    return this.http.put(encodeURI(url), httpOptions);
  }

  getAllUsers(sort: string, tenantId: string): Observable<User[]> {
    const params = new HttpParams().set('Sort', `${sort}`);
    const url = `${this.baseUrl}/tenants/${tenantId}/user/users`;
    return this.http
      .get<any>(encodeURI(url), { observe: 'response', params })
      .pipe(map(users => users.body));
  }

  getFilteredUsers(
    filter: FilterValues[],
    searchText: string,
    sort: string,
    tenantId: string,
  ): Observable<User[]> {
    let params = new HttpParams().set('Sort', `${sort}`).set('Q', `${searchText}`);
    if (filter) {
      filter.forEach(filterValues => {
        params = filterValues.title
          ? params.append(filterValues.title, filterValues.value.value.toString())
          : params;
      });
    }
    const url = `${this.baseUrl}/tenants/${tenantId}/user/users`;
    return this.http
      .get<any>(encodeURI(url), { observe: 'response', params })
      .pipe(map(users => users.body));
  }

  getUserById(userId: string, tenantId: string): Observable<User> {
    const url = `${this.baseUrl}/tenants/${tenantId}/user/users/${userId}?suppressNotFoundError=true`;
    return this.http.get<User>(encodeURI(url), httpOptions);
  }

  //load preview users and create user
  createUsers(users: UserPostRequest[], tenantId: string): Observable<User[]> {
    const url = `${this.baseUrl}/tenants/${tenantId}/user/users/bulk-create`;
    return this.http.post<User[]>(encodeURI(url), users, httpOptions);
  }

  // create user in db
  createUser(users: UserPostRequest[], tenantId: string): Observable<User[]> {
    const url = `${this.baseUrl}/tenants/${tenantId}/user/users/bulk-create`;
    return this.http.post<User[]>(encodeURI(url), users, httpOptions);
  }

  // create user in AD and db
  createAuthUser(users: UserRequest, tenantId: string): Observable<User> {
    const url = `${this.authUrl}/auth/users`;
    return this.http.post<User>(encodeURI(url), users, httpOptions);
  }



  // user group
  getGroupsList(
    paginationHeaders: PaginationHeaders,
    sort: string,
    filter: FilterValues[],
    searchText: string,
    tenantId: string,
  ): Observable<GroupResponse> {
    let params = new HttpParams()
      .set('Page', `${paginationHeaders.page}`)
      .set('PageSize', `${paginationHeaders.pageSize}`)
      .set('Sort', `${sort}`)
      .set('Q', `${searchText}`);
    if (filter) {
      filter.forEach(filterValues => {
        params = filterValues.title
          ? params.append(filterValues.title, filterValues.value.value.toString())
          : params;
      });
    }
    const url = `${this.baseStubUrl}/groups/${tenantId}`;
    return this.http
      .get<any>(encodeURI(url), { observe: 'response', params })
      .pipe(
        map(groups => {
          const payload: GroupResponse = {
            body: groups.body,
            headers: JSON.parse(groups.headers.get('x-pagination')),
            sort: sort,
            filter: filter,
            searchText,
          };
          return payload;
        }),
      );
  }

  updateGroupStatus(groupIds: string[], status: boolean): Observable<any> {
    const url = status
      ? `${this.baseStubUrl}/group/activate`
      : `${this.baseStubUrl}/group/deactivate`;
    return this.http.put<GroupList>(encodeURI(url), groupIds, httpOptions);
  }

  // load preview groups and create group
  createGroups(groups: GroupPostRequest, tenantId: string): Observable<GroupList> {
    const url = `${this.baseStubUrl}/groups/${tenantId}`;
    return this.http.post<GroupList>(encodeURI(url), groups, httpOptions);
  }

  // update group
  updateGroup(groupDetail: GroupPutRequest): Observable<GroupList[]> {
    const url = `${this.baseStubUrl}/groups/${groupDetail.tenantId}`;
    return this.http.put<GroupList[]>(encodeURI(url), groupDetail, httpOptions);
  }

  // load preview users and create user
  addUsersToGroup(usersList: UserPostRequest[], groupId: string): Observable<any> {
    const userIds = [];
    usersList.forEach(element => {
      userIds.push(element.userId);
    });
    const addUsers = { groupId: groupId, userIds: userIds };
    const url = `${this.baseStubUrl}/groups/addusers`;
    return this.http.post<UserGroupPostRequest>(encodeURI(url), addUsers, httpOptions);
  }

  getUsersListByGroupId(
    paginationHeaders: PaginationHeaders,
    sort: string,
    filter: FilterValues[],
    searchText: string,
    groupId: string,
  ): Observable<UserResponse> {
    let params = new HttpParams()
      .set('Page', `${paginationHeaders.page}`)
      .set('PageSize', `${paginationHeaders.pageSize}`)
      .set('Sort', `${sort}`)
      .set('Q', `${searchText}`);
    if (filter) {
      filter.forEach(filterValues => {
        params = filterValues.title
          ? params.append(filterValues.title, filterValues.value.value.toString())
          : params;
      });
    }
    const url = `${this.baseStubUrl}/user/groups/${groupId}`;
    return this.http
      .get<any>(encodeURI(url), { observe: 'response', params })
      .pipe(
        map(users => {
          const payload: UserResponse = {
            body: users.body,
            headers: JSON.parse(users.headers.get('x-pagination')),
            sort: sort,
            filter: filter,
            searchText,
          };
          return payload;
        }),
      );
  }

  //get user TeantIds
  getUserTenantIds(userId: string): Observable<string[]> {
    const url = `${this.baseStubUrl}/user/tenant-ids/${userId}`;
    return this.http.get<string[]>(encodeURI(url), httpOptions);
  }
  // remove user from a group
  removeUser(selectedUser: GroupedUsersListResponse[], groupId: string): Observable<any> {
    const userIds = [];
    selectedUser.forEach(element => {
      userIds.push(element.userId);
    });
    const url = `${this.baseStubUrl}/groups/deleteusers?groupId=${groupId}`;
    return this.http.put<GroupedUsersListResponse>(encodeURI(url), userIds, httpOptions);
  }

  getAllGroupedUsers(sort: string, groupId: string): Observable<GroupedUsersListResponse[]> {
    const params = new HttpParams().set('Sort', `${sort}`);
    const url = `${this.baseStubUrl}/user/groups/${groupId}/all`;
    return this.http
      .get<any>(encodeURI(url), { observe: 'response', params })
      .pipe(map(users => users.body));
  }

  getAllGroupedUsersList(groupId: string): Observable<any> {
    const url = `${this.baseStubUrl}/user/groups/${groupId}/all`;
    return this.http.get<any>(encodeURI(url), httpOptions);
  }

  // getUnmappedUsersList(
  //   paginationHeaders: PaginationHeaders,
  //   searchText: string,
  //   groupId: string,
  // ): Observable<UnmappedUserResponse> {
  //   let params = new HttpParams()
  //     .set('Page', `${paginationHeaders.page}`)
  //     .set('PageSize', `${paginationHeaders.pageSize}`)
  //     .set('Q', `${searchText}`);

  //   const url = `${this.baseUrl}/user/groups/${groupId}/unmapped`;
  //   return this.http
  //     .get<any>(encodeURI(url), { observe: 'response', params })
  //     .pipe(
  //       map(users => {
  //         const payload: any = {
  //           body: users.body,
  //           headers: JSON.parse(users.headers.get('x-pagination')),
  //           searchText,
  //         };
  //         return payload;
  //       }),
  //     );
  // }

  getCountryList(): Observable<Country[]> {
    const url = `${this.sharedUrl}/shared/countries`;
    return this.http.get<Country[]>(encodeURI(url), httpOptions);
  }

  getStateList(countryCode: string): Observable<State[]> {
    const url = `${this.sharedUrl}/shared/states?countryCode=${countryCode}`;
    return this.http.get<State[]>(encodeURI(url), httpOptions);
  }

  verifyCompanyCode(companyCode: string): Observable<string> {
    const url = `${this.baseStubUrl}/users/${companyCode}/validate`;
    return this.http.get<any>(encodeURI(url), httpOptions).pipe(map(tenantId => tenantId.tenantId));
  }

  getDomainTenant(domainName: string): Observable<string> {
    const url = `${this.tenantStubUrl}/tenant/url/${domainName}`;
    return this.http.get<any>(encodeURI(url), httpOptions).pipe(map(tenant => tenant.tenantId));
  }
}
