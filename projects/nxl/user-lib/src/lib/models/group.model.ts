export interface GroupList {
  groupId: string;
  groupName: string;
  groupDescription: string;
  totalUsers: number;
  createdDate: string;
  isActive: boolean;
  isSelected?: boolean;
}
