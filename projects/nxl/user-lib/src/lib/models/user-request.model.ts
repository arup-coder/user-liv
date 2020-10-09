import { UserPostRequest } from './user-post-request.model';
import { AuthUserPostRequestModel } from './user-auth-post-request.model';

export interface UserRequest {
    userPostRequest: UserPostRequest,
    authUserRequest: AuthUserPostRequestModel
}
