import { UserListResolver } from './users.resolver';
import { UserResolver } from './user-profile.resolver';
import { UserCountryResolver } from './user-country.resolver';
export const resolvers: any[] = [UserListResolver, UserResolver,
    UserCountryResolver];

export * from './users.resolver';
export * from './user-profile.resolver';
export * from './user-country.resolver';