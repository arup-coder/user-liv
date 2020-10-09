import { UserPermissionService } from '.';
import { TestBed, fakeAsync, flush } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as testData from '../data/test/user-test-data';
import { of } from 'rxjs';


describe('UserPermissionService', () => {
    let service: UserPermissionService;
    let httpMock: HttpTestingController;

    const userId = 'e970ddb9-d5fe-4e0f-8248-5771e7df679c';

    const mockURI = {
        uri: { authServiceUriV1: 'http://localhost:5007/api/v1'}
    };
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [UserPermissionService, { provide: 'env', useValue: mockURI }],
        });

        service = TestBed.get(UserPermissionService);
        httpMock = TestBed.get(HttpTestingController);
    });
    it('should be created', () => {
        expect(service).toBeTruthy();
        expect(service).toBeDefined();
    });

    describe('getPermissionsSettingList', () => {
        it('should send permissionSetting List correctly if response status is 200', fakeAsync(() => {
            const url = `${service.baseUrl}/auth/user/permissions/${userId}`;
            console.log('get' + url);
            service.getUserPermissions(userId).subscribe(
                (response: any) => {
                    expect(response.body).toEqual(testData.userPermission);
                },
                (error: any) => { },
            );
            const requestWrapper = httpMock.expectOne(url);
            expect(requestWrapper.request.method).toEqual('GET');
            requestWrapper.flush({ body: testData.userPermission });
        }));
        it('should send server error if any', fakeAsync(() => {

            const url = `${service.baseUrl}/auth/user/permissions/${userId}`;
            service.getUserPermissions(userId).subscribe(
                (response: any) => {
                    expect(response.status).toBe(testData.mockHttpError.status);
                },
                (error: any) => { },
            );
            const requestWrapper = httpMock.expectOne(url);
            expect(requestWrapper.request.method).toEqual('GET');
            requestWrapper.flush({ body: testData.userPermission }, testData.mockHttpError);
        }));
    });
    describe('updatePermissionsSettings', () => {
        it('should send updated permission detail if response status is 200', fakeAsync(() => {
            const url = `${service.baseUrl}/auth/user/permissions/${testData.userPermission[0].userId}`;

            service.updateUserPermissions(testData.userPermission[0], testData.userPermission[0].userId).subscribe(
                (response: any) => {
                    expect(response.body).toEqual(testData.userPermission[0]);
                },
                (error: any) => { },
            );
            const requestWrapper = httpMock.expectOne(url);
            expect(requestWrapper.request.method).toEqual('PUT');
            requestWrapper.flush({ status: 200, body: testData.userPermission[0] });
        }));

        it('should send server error if any', fakeAsync(() => {
            const url = `${service.baseUrl}/auth/user/permissions/${testData.userPermission[0].userId}`;
            service.updateUserPermissions(testData.userPermission[0], testData.userPermission[0].userId).subscribe(
                (response: any) => {
                    expect(response.status).toEqual(testData.mockHttpError.status);
                    expect(response.statusText).toEqual(testData.mockHttpError.statusText);
                },
                (error: any) => { },
            );
            const requestWrapper = httpMock.expectOne(url);
            expect(requestWrapper.request.method).toEqual('PUT');
            requestWrapper.flush(testData.userPermission[0], testData.mockHttpError);
        }));
    });
});