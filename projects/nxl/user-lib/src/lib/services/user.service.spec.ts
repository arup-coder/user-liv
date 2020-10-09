import { UserService } from '.';
import { TestBed, fakeAsync } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as testData from '../data/test/user-test-data';
import * as groupTestData from '../data/test/group-test-data';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  const tenantId = testData.tenantId;

  const mockURI = {
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
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService, { provide: 'env', useValue: mockURI }],
    });

    service = TestBed.get(UserService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
    expect(service).toBeDefined();
  });

  describe('getUsersList', () => {
    let filters = '';
    if (testData.filterData) {
      testData.filterData.forEach(filterValues => {
        filters += `&${filterValues.title}=${filterValues.value.value}`;
      });
    }
    it('should send UserList correctly if response status is 200', fakeAsync(() => {
      const mockurl =
        `${service.baseUrl}/tenants/${tenantId}/user/users/paged?Page=${testData.paginationData.page}` +
        `&PageSize=${testData.paginationData.pageSize}` +
        `&Sort=${testData.sortingData}` +
        `&Q=${testData.searchText}` +
        filters;
      service
        .getUsersList(
          testData.paginationData,
          testData.sortingData,
          testData.filterData,
          testData.searchText,
          testData.tenantId,
        )
        .subscribe(
          (response: any) => {
            expect(response.body.body).toEqual(testData.usersList);
            expect(response.body.header).toEqual(testData.paginationData);
          },
          (error: any) => {},
        );
      const requestWrapper = httpMock.expectOne(mockurl);

      expect(requestWrapper.request.method).toEqual('GET');
      requestWrapper.flush({ body: testData.usersList, header: testData.paginationData });
    }));
    it('should send server error if any', fakeAsync(() => {
      const mockurl =
        `${service.baseUrl}/tenants/${tenantId}/user/users/paged?Page=${testData.paginationData.page}` +
        `&PageSize=${testData.paginationData.pageSize}` +
        `&Sort=${testData.sortingData}` +
        `&Q=${testData.searchText}` +
        filters;

      service
        .getUsersList(
          testData.paginationData,
          testData.sortingData,
          testData.filterData,
          testData.searchText,
          testData.tenantId,
        )
        .subscribe(
          (response: any) => {
            expect(response.status).toBe(testData.mockHttpError.status);
          },
          (error: any) => {},
        );
      const requestWrapper = httpMock.expectOne(mockurl);
      expect(requestWrapper.request.method).toEqual('GET');
      requestWrapper.flush(
        { body: testData.usersList, header: testData.paginationData },
        testData.mockHttpError,
      );
    }));
  });

  describe('updateUser', () => {
    it('should send updated user detail if response status is 200', fakeAsync(() => {
      const mockurl = `${service.baseUrl}/tenants/${tenantId}/user/users/${testData.userDetail.userId}`;
      service
        .updateUser(testData.updateUser, testData.userDetail.userId, testData.tenantId)
        .subscribe(
          (response: any) => {
            expect(response.body).toEqual(testData.userDetail);
          },
          (error: any) => {},
        );
      const requestWrapper = httpMock.expectOne(mockurl);
      expect(requestWrapper.request.method).toEqual('PUT');
      requestWrapper.flush({ status: 200, body: testData.userDetail });
    }));

    it('should send server error if any', fakeAsync(() => {
      const mockurl = `${service.baseUrl}/tenants/${tenantId}/user/users/${testData.userDetail.userId}`;

      service
        .updateUser(testData.updateUser, testData.userDetail.userId, testData.tenantId)
        .subscribe(
          (response: any) => {
            expect(response.status).toEqual(testData.mockHttpError.status);
            expect(response.statusText).toEqual(testData.mockHttpError.statusText);
          },
          (error: any) => {},
        );
      const requestWrapper = httpMock.expectOne(mockurl);
      expect(requestWrapper.request.method).toEqual('PUT');
      requestWrapper.flush(testData.userDetail, testData.mockHttpError);
    }));
  });

  describe('getAllUsers', () => {
    it('should get all users', fakeAsync(() => {
      const url =
        `${service.baseUrl}/tenants/${tenantId}/user/users` + `?Sort=${testData.sortingData}`;
      service.getAllUsers(testData.sortingData, testData.tenantId).subscribe(
        (response: any) => {
          expect(response).toEqual(testData.usersList);
        },
        (error: any) => {},
      );
      const requestWrapper = httpMock.expectOne({ url });
      expect(requestWrapper.request.method).toEqual('GET');
      requestWrapper.flush(testData.usersList);
    }));
    it('should send server error if any', fakeAsync(() => {
      const url =
        `${service.baseUrl}/tenants/${tenantId}/user/users` + `?Sort=${testData.sortingData}`;
      service.getAllUsers(testData.sortingData, testData.tenantId).subscribe(
        (response: any) => {
          expect(response.status).toEqual(testData.mockHttpError.status);
          expect(response.statusText).toEqual(testData.mockHttpError.statusText);
        },
        (error: any) => {},
      );
      const requestWrapper = httpMock.expectOne({ url });
      expect(requestWrapper.request.method).toEqual('GET');
      requestWrapper.flush(testData.usersList, testData.mockHttpError);
    }));
  });
  describe('getFilteredUsers', () => {
    let filters = '';
    if (testData.filterData) {
      testData.filterData.forEach(filterValues => {
        filters += `&${filterValues.title}=${filterValues.value.value}`;
      });
    }

    it('should get filtered users', fakeAsync(() => {
      const url =
        `${service.baseUrl}/tenants/${tenantId}/user/users` +
        `?Sort=${testData.sortingData}` +
        `&Q=${testData.searchText}` +
        filters;
      service
        .getFilteredUsers(
          testData.filterData,
          testData.searchText,
          testData.sortingData,
          testData.tenantId,
        )
        .subscribe(
          (response: any) => {
            expect(response).toEqual(testData.usersList);
          },
          (error: any) => {},
        );
      const requestWrapper = httpMock.expectOne({ url });
      expect(requestWrapper.request.method).toEqual('GET');
      requestWrapper.flush(testData.usersList);
    }));
    it('should send server error if any', fakeAsync(() => {
      const url =
        `${service.baseUrl}/tenants/${tenantId}/user/users` +
        `?Sort=${testData.sortingData}` +
        `&Q=${testData.searchText}` +
        filters;
      service
        .getFilteredUsers(
          testData.filterData,
          testData.searchText,
          testData.sortingData,
          testData.tenantId,
        )
        .subscribe((response: any) => {
          expect(response.status).toEqual(testData.mockHttpError.status);
          expect(response.statusText).toEqual(testData.mockHttpError.statusText);
        });
    }));
  });
  describe('getUserById', () => {
    const userId = '4ddcbd40-b86d-463d-a5ab-4bb70282f340';

    it('should get User By Id', fakeAsync(() => {
      const url = `${service.baseUrl}/tenants/${tenantId}/user/users/${userId}?suppressNotFoundError=true`;
      service.getUserById(userId, testData.tenantId).subscribe(
        (response: any) => {
          expect(response.body).toEqual(testData.selectedUsers[0]);
        },
        (error: any) => {},
      );
      const requestWrapper = httpMock.expectOne(url);
      expect(requestWrapper.request.method).toEqual('GET');
      requestWrapper.flush({ body: testData.selectedUsers[0] });
    }));
    it('should send server error if any', fakeAsync(() => {
      const url = `${service.baseUrl}/tenants/${tenantId}/user/users/${userId}?suppressNotFoundError=true`;
      service.getUserById(userId, testData.tenantId).subscribe(
        (response: any) => {
          expect(response.status).toBe(testData.mockHttpError.status);
        },
        (error: any) => {},
      );
      const requestWrapper = httpMock.expectOne(url);
      expect(requestWrapper.request.method).toEqual('GET');
      requestWrapper.flush({ body: testData.selectedUsers[0] }, testData.mockHttpError);
    }));
  });

  describe('createUsers', () => {
    it('should return newly created users if response status is 200', fakeAsync(() => {
      const url = `${service.baseUrl}/tenants/${tenantId}/user/users/bulk-create`;
      service.createUsers([testData.createUser], testData.tenantId).subscribe(
        (response: any) => {
          expect(response.body).toEqual(testData.usersList);
        },

        (error: any) => {},
      );
      const requestWrapper = httpMock.expectOne(url);
      expect(requestWrapper.request.method).toEqual('POST');
      requestWrapper.flush({ status: 200, body: testData.usersList });
    }));

    it('should send server error if any', fakeAsync(() => {
      const url = `${service.baseUrl}/tenants/${tenantId}/user/users/bulk-create`;
      service.createUsers([testData.createUser], testData.tenantId).subscribe(
        (response: any) => {
          expect(response.status).toEqual(testData.mockHttpError.status);
          expect(response.statusText).toEqual(testData.mockHttpError.statusText);
        },
        (error: any) => {},
      );
      const requestWrapper = httpMock.expectOne(url);
      expect(requestWrapper.request.method).toEqual('POST');
      requestWrapper.flush(testData.usersList, testData.mockHttpError);
    }));
  });

  describe('getCountryList', () => {
    it('should return list of countries if response status is 200', fakeAsync(() => {
      const mockurl = `${service.sharedUrl}/shared/countries`;
      service.getCountryList().subscribe(
        (response: any) => {
          expect(response.body).toEqual(testData.countryList);
        },
        (error: any) => {},
      );
      const requestWrapper = httpMock.expectOne(mockurl);
      expect(requestWrapper.request.method).toEqual('GET');
      requestWrapper.flush({ status: 200, body: testData.countryList });
    }));

    it('should send server error if any', fakeAsync(() => {
      const mockurl = `${service.sharedUrl}/shared/countries`;
      service.getCountryList().subscribe(
        (response: any) => {
          expect(response.status).toEqual(testData.mockHttpError.status);
          expect(response.statusText).toEqual(testData.mockHttpError.statusText);
        },
        (error: any) => {},
      );
      const requestWrapper = httpMock.expectOne(mockurl);
      expect(requestWrapper.request.method).toEqual('GET');
      requestWrapper.flush(testData.countryList, testData.mockHttpError);
    }));
  });

  describe('getStateList', () => {
    it('should return list of state if response status is 200', fakeAsync(() => {
      const countryCode = 'IN';
      const mockurl = `${service.sharedUrl}/shared/states?countryCode=${countryCode}`;
      service.getStateList(countryCode).subscribe(
        (response: any) => {
          expect(response.body).toEqual(testData.stateList);
        },
        (error: any) => {},
      );
      const requestWrapper = httpMock.expectOne(mockurl);
      expect(requestWrapper.request.method).toEqual('GET');
      requestWrapper.flush({ status: 200, body: testData.stateList });
    }));

    it('should send server error if any', fakeAsync(() => {
      const countryCode = 'IN';
      const mockurl = `${service.sharedUrl}/shared/states?countryCode=${countryCode}`;
      service.getStateList(countryCode).subscribe(
        (response: any) => {
          expect(response.status).toEqual(testData.mockHttpError.status);
          expect(response.statusText).toEqual(testData.mockHttpError.statusText);
        },
        (error: any) => {},
      );
      const requestWrapper = httpMock.expectOne(mockurl);
      expect(requestWrapper.request.method).toEqual('GET');
      requestWrapper.flush(testData.stateList, testData.mockHttpError);
    }));
  });

  describe('getGroupsList', () => {
    it('should get GroupList correctly if response status is 200', fakeAsync(() => {
      let filters = '';
      if (groupTestData.filter) {
        groupTestData.filter.forEach(filterValues => {
          filters += `&${filterValues.title}=${filterValues.value.value}`;
        });
      }

      const mockurl =
        `${service.baseStubUrl}/groups/${tenantId}?Page=${testData.paginationData.page}` +
        `&PageSize=${testData.paginationData.pageSize}` +
        `&Sort=` +
        `&Q=${groupTestData.searchText}` +
        filters;
      service
        .getGroupsList(
          testData.paginationData,
          groupTestData.sortingData,
          groupTestData.filter,
          groupTestData.searchText,
          testData.tenantId,
        )
        .subscribe(
          (response: any) => {
            expect(response.body.body).toEqual(groupTestData.groupList);
            expect(response.body.header).toEqual(testData.paginationData);
          },
          (error: any) => {},
        );
      const requestWrapper = httpMock.expectOne(mockurl);

      expect(requestWrapper.request.method).toEqual('GET');
      requestWrapper.flush({ body: groupTestData.groupList, header: testData.paginationData });
    }));
    it('should send server error if any', fakeAsync(() => {
      let filters = '';
      if (groupTestData.filter) {
        groupTestData.filter.forEach(filterValues => {
          filters += `&${filterValues.title}=${filterValues.value.value}`;
        });
      }

      const mockurl =
        `${service.baseStubUrl}/groups/${tenantId}?Page=${testData.paginationData.page}` +
        `&PageSize=${testData.paginationData.pageSize}` +
        `&Sort=` +
        `&Q=${groupTestData.searchText}` +
        filters;
      service
        .getGroupsList(
          testData.paginationData,
          groupTestData.sortingData,
          groupTestData.filter,
          testData.searchText,
          testData.tenantId,
        )
        .subscribe(
          (response: any) => {
            expect(response.status).toBe(testData.mockHttpError.status);
            // expect(response.statusText).toEqual(testData.mockHttpError.statusText);
          },
          (error: any) => {},
        );
      const requestWrapper = httpMock.expectOne(mockurl);
      expect(requestWrapper.request.method).toEqual('GET');
      requestWrapper.flush(
        { body: groupTestData.groupList, header: testData.paginationData },
        testData.mockHttpError,
      );
    }));
  });

  describe('updateGroupStatus', () => {
    const status = false;
    const groupIds = testData.selectedUsers.map(users => users.userId);
    it('should update group activeUser to True', fakeAsync(() => {
      const url = status
        ? `${service.baseStubUrl}/group/activate`
        : `${service.baseStubUrl}/group/deactivate`;

      service.updateGroupStatus(groupIds, status).subscribe(
        (response: any) => {
          expect(response).toEqual(groupIds);
        },
        (error: any) => {},
      );
      const requestWrapper = httpMock.expectOne({ url });
      expect(requestWrapper.request.method).toEqual('PUT');
      requestWrapper.flush(groupIds);
    }));
    it('should send server error if any', fakeAsync(() => {
      const url = status
        ? `${service.baseStubUrl}/group/activate`
        : `${service.baseStubUrl}/group/deactivate`;
      service.updateGroupStatus(groupIds, status).subscribe(
        (response: any) => {
          expect(response.status).toEqual(testData.mockHttpError.status);
          expect(response.statusText).toEqual(testData.mockHttpError.statusText);
        },
        (error: any) => {},
      );
      const requestWrapper = httpMock.expectOne({ url });
      expect(requestWrapper.request.method).toEqual('PUT');
      requestWrapper.flush(groupIds, testData.mockHttpError);
    }));
  });

  describe('createGroups', () => {
    it('should return newly created groups if response status is 200', fakeAsync(() => {
      const mockurl = `${service.baseStubUrl}/groups/${tenantId}`;
      service.createGroups(groupTestData.addGroup, testData.tenantId).subscribe(
        (response: any) => {
          expect(response.body).toEqual(groupTestData.groupList);
        },
        (error: any) => {},
      );
      const requestWrapper = httpMock.expectOne(mockurl);
      expect(requestWrapper.request.method).toEqual('POST');
      requestWrapper.flush({ status: 200, body: groupTestData.groupList });
    }));

    it('should send server error if any', fakeAsync(() => {
      const mockurl = `${service.baseStubUrl}/groups/${tenantId}`;
      service.createGroups(groupTestData.addGroup, testData.tenantId).subscribe(
        (response: any) => {
          expect(response.status).toEqual(testData.mockHttpError.status);
          expect(response.statusText).toEqual(testData.mockHttpError.statusText);
        },
        (error: any) => {},
      );
      const requestWrapper = httpMock.expectOne(mockurl);
      expect(requestWrapper.request.method).toEqual('POST');
      requestWrapper.flush(groupTestData.groupList, testData.mockHttpError);
    }));
  });

  describe('updateGroup', () => {
    it('should send updated user detail if response status is 200', fakeAsync(() => {
      const mockurl = `${service.baseStubUrl}/groups/${groupTestData.updateGroup.tenantId}`;

      service.updateGroup(groupTestData.updateGroup).subscribe(
        (response: any) => {
          expect(response.body).toEqual(groupTestData.updateGroup);
        },
        (error: any) => {},
      );
      const requestWrapper = httpMock.expectOne(mockurl);
      expect(requestWrapper.request.method).toEqual('PUT');
      requestWrapper.flush({ status: 200, body: groupTestData.updateGroup });
    }));

    it('should send server error if any', fakeAsync(() => {
      const mockurl = `${service.baseStubUrl}/groups/${groupTestData.updateGroup.groupId}`;
      service.updateGroup(groupTestData.updateGroup).subscribe(
        (response: any) => {
          expect(response.status).toEqual(testData.mockHttpError.status);
          expect(response.statusText).toEqual(testData.mockHttpError.statusText);
        },
        (error: any) => {},
      );
      const requestWrapper = httpMock.expectOne(mockurl);
      expect(requestWrapper.request.method).toEqual('PUT');
      requestWrapper.flush(groupTestData.updateGroup, testData.mockHttpError);
    }));
  });

  describe('addUsersToGroup', () => {
    it('should return newly created users if response status is 200', fakeAsync(() => {
      const mockurl = `${service.baseStubUrl}/groups/addusers`;
      service.addUsersToGroup(testData.usersList, '1').subscribe(
        (response: any) => {
          expect(response.body).toEqual(testData.usersList);
        },
        (error: any) => {},
      );
      const requestWrapper = httpMock.expectOne(mockurl);
      expect(requestWrapper.request.method).toEqual('POST');
      requestWrapper.flush({ status: 200, body: testData.usersList });
    }));

    it('should send server error if any', fakeAsync(() => {
      const mockurl = `${service.baseStubUrl}/groups/addusers`;
      service.addUsersToGroup(testData.usersList, '1').subscribe(
        (response: any) => {
          expect(response.status).toEqual(testData.mockHttpError.status);
          expect(response.statusText).toEqual(testData.mockHttpError.statusText);
        },
        (error: any) => {},
      );
      const requestWrapper = httpMock.expectOne(mockurl);
      expect(requestWrapper.request.method).toEqual('POST');
      requestWrapper.flush(testData.usersList, testData.mockHttpError);
    }));
  });

  describe('getUsersListByGroupId', () => {
    let filters = '';
    if (groupTestData.filter) {
      groupTestData.filter.forEach(filterValues => {
        filters += `&${filterValues.title}=${filterValues.value.value}`;
      });
    }

    it('should get filtered users', fakeAsync(() => {
      const url =
        `${service.baseStubUrl}/user/groups/1?Page=${testData.paginationData.page}` +
        `&PageSize=${testData.paginationData.pageSize}` +
        `?Sort=${groupTestData.sortingData}` +
        `&Q=${testData.searchText}` +
        filters;
      service
        .getUsersListByGroupId(
          testData.paginationData,
          groupTestData.sortingData,
          groupTestData.filter,
          testData.searchText,
          '1',
        )
        .subscribe(
          (response: any) => {
            expect(response).toEqual(testData.usersList);
          },
          (error: any) => {},
        );
      const requestWrapper = httpMock.expectOne({ url });
      expect(requestWrapper.request.method).toEqual('GET');
      requestWrapper.flush(testData.usersList);
    }));
    it('should send server error if any', fakeAsync(() => {
      const url =
        `${service.baseStubUrl}/user/groups/1?Page=${testData.paginationData.page}` +
        `&PageSize=${testData.paginationData.pageSize}` +
        `?Sort=${groupTestData.sortingData}` +
        `&Q=${testData.searchText}` +
        filters;
      service
        .getUsersListByGroupId(
          testData.paginationData,
          groupTestData.sortingData,
          groupTestData.filter,
          testData.searchText,
          '1',
        )
        .subscribe((response: any) => {
          expect(response.status).toEqual(testData.mockHttpError.status);
          expect(response.statusText).toEqual(testData.mockHttpError.statusText);
        });
      const requestWrapper = httpMock.expectOne({ url });
      expect(requestWrapper.request.method).toEqual('GET');
      requestWrapper.flush(testData.usersList);
    }));
  });

  describe('removeUsers', () => {
    it('should return newly created users if response status is 200', fakeAsync(() => {
      const mockurl = `${service.baseStubUrl}/groups/deleteusers?groupId=1`;
      service.removeUser(groupTestData.removeUser, '1').subscribe(
        (response: any) => {
          expect(response.body).toEqual(testData.usersList);
        },
        (error: any) => {},
      );
      const requestWrapper = httpMock.expectOne(mockurl);
      expect(requestWrapper.request.method).toEqual('PUT');
      requestWrapper.flush({ status: 200, body: testData.usersList });
    }));

    it('should send server error if any', fakeAsync(() => {
      const mockurl = `${service.baseStubUrl}/groups/deleteusers?groupId=1`;
      service.removeUser(groupTestData.removeUser, '1').subscribe(
        (response: any) => {
          expect(response.status).toEqual(testData.mockHttpError.status);
          expect(response.statusText).toEqual(testData.mockHttpError.statusText);
        },
        (error: any) => {},
      );
      const requestWrapper = httpMock.expectOne(mockurl);
      expect(requestWrapper.request.method).toEqual('PUT');
      requestWrapper.flush(testData.usersList, testData.mockHttpError);
    }));
  });

  describe('getAllGroupedUsers', () => {
    it('should return list of grouped users if response status is 200', fakeAsync(() => {
      const groupId = '1';
      const mockurl = `${service.baseStubUrl}/user/groups/${groupId}/all?Sort=`;
      service.getAllGroupedUsers('', '1').subscribe(
        (response: any) => {
          expect(response.body).toEqual(testData.usersList);
        },
        (error: any) => {},
      );
      const requestWrapper = httpMock.expectOne(mockurl);
      expect(requestWrapper.request.method).toEqual('GET');
      requestWrapper.flush({ status: 200, body: testData.usersList });
    }));

    it('should send server error if any', fakeAsync(() => {
      const groupId = '1';
      const mockurl = `${service.baseStubUrl}/user/groups/${groupId}/all?Sort=`;
      service.getAllGroupedUsers('', '1').subscribe(
        (response: any) => {
          expect(response.status).toEqual(testData.mockHttpError.status);
          expect(response.statusText).toEqual(testData.mockHttpError.statusText);
        },
        (error: any) => {},
      );
      const requestWrapper = httpMock.expectOne(mockurl);
      expect(requestWrapper.request.method).toEqual('GET');
      requestWrapper.flush(testData.usersList, testData.mockHttpError);
    }));
  });

  describe('getAllGroupedUsersList', () => {
    it('should return list of grouped users if response status is 200', fakeAsync(() => {
      const groupId = '1';
      const mockurl = `${service.baseStubUrl}/user/groups/${groupId}/all`;
      service.getAllGroupedUsersList('1').subscribe(
        (response: any) => {
          expect(response.body).toEqual(testData.usersList);
        },
        (error: any) => {},
      );
      const requestWrapper = httpMock.expectOne(mockurl);
      expect(requestWrapper.request.method).toEqual('GET');
      requestWrapper.flush({ status: 200, body: testData.usersList });
    }));

    it('should send server error if any', fakeAsync(() => {
      const groupId = '1';
      const mockurl = `${service.baseStubUrl}/user/groups/${groupId}/all`;
      service.getAllGroupedUsersList('1').subscribe(
        (response: any) => {
          expect(response.status).toEqual(testData.mockHttpError.status);
          expect(response.statusText).toEqual(testData.mockHttpError.statusText);
        },
        (error: any) => {},
      );
      const requestWrapper = httpMock.expectOne(mockurl);
      expect(requestWrapper.request.method).toEqual('GET');
      requestWrapper.flush(testData.usersList, testData.mockHttpError);
    }));
  });
});
