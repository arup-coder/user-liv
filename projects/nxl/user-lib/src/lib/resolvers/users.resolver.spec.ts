import { ActivatedRouteSnapshot } from '@angular/router';
import { Store, StoreModule } from '@ngrx/store';
import * as fromResolvers from "./index";
import { TestBed } from '@angular/core/testing';
import * as fromRoot from '../store/reducers';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { UserListResolver } from './index';
import * as testData from '../data/test/user-test-data';

describe('UserListResolver', () => {
    let resolver: fromResolvers.UserListResolver;
    let route: ActivatedRouteSnapshot;
    let store: MockStore<any>;

    const initialState = {
        user: {
            user: {
                users: null,
                usersTablePage: null,
                usersTableSort: null,
                usersTableFilter: null,
                userTableSearch: null,
                isLoaded: false,
                isLoading: false,
                errorMessage: null
            }
        }
    };

    beforeEach(() => {
        route = new ActivatedRouteSnapshot();
        TestBed.configureTestingModule({
            imports: [StoreModule.forRoot({ 'user': fromRoot.reducers.user })],
            providers: [UserListResolver,
                provideMockStore({ initialState })
            ]
        });
        store = TestBed.get(Store);
        resolver = TestBed.get(UserListResolver);
    });

    it('it should return false if users are not loaded in state', () => {
        const storeSpy = spyOn(store, 'dispatch');
        resolver.resolve(null, null).subscribe(result => {
            expect(result).toBe(false);
        });
        expect(storeSpy).toHaveBeenCalled();
    });

    it('it should return true if users are loaded in state', () => {
        const states = {
            user: {
                user: {
                    users: testData.usersList,
                    usersTablePage: {
                        page: 1,
                        pageSize: 1,
                        pageCount: 1,
                        recordCount: 1
                    },
                    usersTableSort: null,
                    usersTableFilter: null,
                    userTableSearch: null,
                    isLoaded: true,
                    isLoading: false,
                    errorMessage: null,
                }
            }
        };
        store.setState(states);
        resolver.resolve(null, null).subscribe(result => {
            expect(result).toBe(true);
        });
    });
});
