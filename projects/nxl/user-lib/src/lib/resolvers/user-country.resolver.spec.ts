import { ActivatedRouteSnapshot } from '@angular/router';
import { Store, StoreModule } from '@ngrx/store';
import * as fromResolvers from "./index";
import { TestBed } from '@angular/core/testing';
import * as fromRoot from '../store/reducers';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { UserCountryResolver } from './index';
import * as testData from '../data/test/user-test-data';

describe('UserCountryResolver', () => {
    let resolver: fromResolvers.UserCountryResolver;
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
                errorMessage: null,
                userProfile: null,
                country: {
                    isLoaded: false,
                    isLoading: false,
                    errorMessage: null,
                    countryList: null
                }
            }
        }
    };
    beforeEach(() => {
        route = new ActivatedRouteSnapshot();
        TestBed.configureTestingModule({
            imports: [StoreModule.forRoot({ 'user': fromRoot.reducers.user })],
            providers: [UserCountryResolver,
                provideMockStore({ initialState })
            ]
        });
        store = TestBed.get(Store);
        resolver = TestBed.get(UserCountryResolver);
    });
    it('it should return false if user country not loaded in state', () => {
        const storeSpy = spyOn(store, 'dispatch');
        resolver.resolve(null, null).subscribe(result => {
            expect(result).toBe(false);
        });
        expect(storeSpy).toHaveBeenCalled();
    });

    it('it should return true if  user country are loaded in state', () => {
        const states = {
            user: {
                user: {
                    isLoaded: true,
                    isLoading: false,
                    userProfile: testData.usersList[0],
                    errorMessage: null,
                    country: {
                        isLoaded: true,
                        isLoading: false,
                        errorMessage: testData.countryList,
                        countryList: null
                    }
                }
            }
        };
        store.setState(states);
        resolver.resolve(null, null).subscribe(result => {
            expect(result).toBe(true);
        });
    });

});
