export interface UserGroupPostRequest {
  groupId: string;
  userIds: string[];
}

export interface UserGroupResponse {
  groupId: string;
  userId: string;
}

export interface GroupedUsersListResponse {
  userId: string;
  name: string;
  employeeId: string;
  userName: string;
  dateAdded: string;
}
