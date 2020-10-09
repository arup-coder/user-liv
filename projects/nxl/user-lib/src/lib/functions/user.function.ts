import { SortingProperties } from '../models/user-response.model';
import { User } from '../models/user.model';
import * as mockUser from '../data/mock/bulkUserList';
import { GroupList } from '../models/group.model';
import { initialUserPaginationParams } from '../data/defaults/user-default-values';

export function funSortingOrder(event: SortingProperties, selectorValues: any) {
  selectorValues = selectorValues ? selectorValues.split(',') : [];
  const sortValue = event.direction === 'asc' ? event.active : '-' + event.active;
  selectorValues.push(sortValue);
  selectorValues = [...new Set(selectorValues)];
  selectorValues.filter((columnName: string, index: number) => {
    columnName = columnName.replace('-', '');
    if (columnName === event.active) {
      event.direction !== ''
        ? (selectorValues[index] = sortValue)
        : selectorValues.splice(index, 1);
    }
  });
  return [...new Set(selectorValues)].toString();
}
export function funLastSortingOrder(latestSortOrder: string) {
  let sortColumn = '';
  if (latestSortOrder.indexOf(',') > 0) {
    const sortColumns = latestSortOrder.split(',');
    sortColumn = sortColumns[sortColumns.length - 1];
  } else {
    sortColumn = latestSortOrder;
  }
  return sortColumn;
}

export function funCheck(event, selectedUsers: User[]) {
  return event.event.checked
    ? [...selectedUsers, event.selectedUser]
    : selectedUsers.filter(user => user.userId !== event.selectedUser.userId);
}

export function funGroupCheck(event, selectedGroups: GroupList[]) {
  return event.event.checked
    ? [...selectedGroups, event.selectedGroup]
    : selectedGroups.filter(group => group.groupId !== event.selectedGroup.groupId);
}

export function funCheckAll(event, usersList: User[]) {
  event.event.checked
    ? (usersList = [
        ...new Set([
          ...usersList.map(obj => ({ ...obj, isSelected: true })),
          ...event.users.map(obj => ({ ...obj, isSelected: true })),
        ]),
      ])
    : (usersList = usersList.filter(
        ({ userId: id1 }) => !event.users.some(({ userId: id2 }) => id2 === id1),
      ));
  return (usersList = [...new Map(usersList.map(item => [item.userId, item])).values()]);
}

export function funGroupCheckAll(event, groupList: GroupList[]) {
  event.event.checked
    ? (groupList = [
        ...new Set([
          ...groupList.map(obj => ({ ...obj, isSelected: true })),
          ...event.groups.map(obj => ({ ...obj, isSelected: true })),
        ]),
      ])
    : (groupList = groupList.filter(
        ({ groupId: id1 }) => !event.groups.some(({ groupId: id2 }) => id2 === id1),
      ));
  return (groupList = [...new Map(groupList.map(item => [item.groupId, item])).values()]);
}

export function funSetIsSelect(usersList: User[], selectedUsers: User[]) {
  const refreshUsersList = usersList.map(({ isSelected, ...users }) => users);
  const selectedUsersList = selectedUsers ? selectedUsers : refreshUsersList;

  const unSelectedList = usersList.filter(
    ({ userId: id1 }) => !selectedUsersList.some(({ userId: id2 }) => id2 === id1),
  );

  const setIsSelect = selectedUsersList.map(obj => ({ ...obj, isSelected: true }));
  const removeIsSelect = unSelectedList.map(({ isSelected, ...users }) => users);

  const totalUsersList = [...new Set([...setIsSelect, ...removeIsSelect])];
  const updateUsersList = [];
  refreshUsersList.forEach((element, i) => {
    updateUsersList.push({
      ...refreshUsersList[i],
      ...totalUsersList.find(user => user.userId === refreshUsersList[i].userId),
    });
  });
  return updateUsersList;
}

export function funGetGroupedUsers(groupedUsers, removedUser, selectedUsers) {
  // compare two array of objs and retrun which are not match based on userId
  const users = groupedUsers.filter(o1 => !removedUser.some(o2 => o1.userId === o2.userId));
  return funSetIsSelect(users, selectedUsers);
}

export function funConstructPayload(usersList, allGroupedUsers) {
  const addUsers = [];
  usersList.forEach((element: User) => {
    addUsers.push({
      userId: element.userId,
      userName: element.email,
      employeeId: element.externalId,
      name: element.firstName,
    });
  });
  return funSetIsSelect(addUsers, allGroupedUsers);
}

export function funConcatList(groupedUsers, newUsers) {
  const pageSize = initialUserPaginationParams.pageSize;
  newUsers.forEach(function(e) {
    delete e.isSelected;
  });
  newUsers.forEach(element => {
    element.dateAdded = new Date();
  });
  if (groupedUsers.length === pageSize) {
    return groupedUsers;
  } else {
    let users = [];
    users = [...groupedUsers, ...newUsers];
    users = users.length > pageSize ? users.slice(0, 5) : users;
    return users;
  }
}

export function funGroupSetIsSelect(groupsList: GroupList[], selectedGroups: GroupList[]) {
  const refreshGroupsList = groupsList.map(({ isSelected, ...groups }) => groups);
  const selectedGroupsList = selectedGroups ? selectedGroups : refreshGroupsList;

  const unSelectedList = groupsList.filter(
    ({ groupId: id1 }) => !selectedGroupsList.some(({ groupId: id2 }) => id2 === id1),
  );

  const setIsSelect = selectedGroupsList.map(obj => ({ ...obj, isSelected: true }));
  const removeIsSelect = unSelectedList.map(({ isSelected, ...groups }) => groups);

  const totalGroupsList = [...new Set([...setIsSelect, ...removeIsSelect])];
  const updateGroupsList = [];
  refreshGroupsList.forEach((element, i) => {
    updateGroupsList.push({
      ...refreshGroupsList[i],
      ...totalGroupsList.find(user => user.groupId === refreshGroupsList[i].groupId),
    });
  });
  return updateGroupsList;
}

export function funGetCSVFields() {
  const response =
    'First Name*,Last Name*,Employee Id*,AlternateEmail*,Email*,Job Title,Department,Organization,Country*,Address1,Address2,Address3,Address4,City,State,PostalCode,Work Phone,Mobile Phone*';
  const blob = new Blob([response], {
    type: 'text/plain',
  });
  const downloadUrl = URL.createObjectURL(blob);
  const anchorElement = document.createElement('a');
  anchorElement.href = downloadUrl;
  anchorElement.download = 'ImportUserTemplate.csv';
  anchorElement.click();
}

function addMapping(mappedValues, currentValues) {
  if (mappedValues.length === 0) {
    mappedValues.push({
      csvFields: currentValues.mappingValue,
      irsFields: currentValues.event.value ? currentValues.event.value : [],
      // fieldsValue: currentValues.event.checked ? currentValues.event.checked : true,
      fieldIndex: currentValues.event.index >= 0 ? currentValues.event.index : '',
    });
  } else {
    const index = mappedValues.findIndex(
      mappingField => mappingField.csvFields === currentValues.mappingValue,
    );
    if (index === -1) {
      mappedValues.push({
        csvFields: currentValues.mappingValue,
        irsFields: currentValues.event.value ? currentValues.event.value : [],
        // fieldsValue: currentValues.event.checked ? currentValues.event.checked : true,
        fieldIndex: currentValues.event.index >= 0 ? currentValues.event.index : '',
      });
    } else {
      currentValues.event.value
        ? ((mappedValues[index].irsFields = currentValues.event.value),
          (mappedValues[index].fieldIndex = currentValues.event.index))
        : '';
    }
  }
  return mappedValues;
}

export function funGetMappingValues(mappedValues, currentValues) {
  mappedValues = addMapping(mappedValues, currentValues);
  return mappedValues;
}

export function funGetPreviewData(previewData, mappedValues) {
  let previewUser = {};
  const previewList = [];
  previewData.forEach((previewValue, index) => {
    mappedValues.forEach(mappedValue => {
      // if (mappedValue.fieldsValue !== false) {
      const columnName = mappedValue.csvFields.toString().replace('*', '');
      previewUser[columnName] = previewValue[mappedValue.fieldIndex];
      // }
    });
    previewList[index] = previewUser;
    previewUser = {};
  });
  return previewList;
}

export function funParsePreviewList(previewList) {
  previewList.forEach(obj => {
    Object.keys(obj).forEach(key => {
      const newKey = (key.substring(0, 1).toLowerCase() + key.slice(1)).replace(' ', '');
      obj[newKey] = obj[key];
      delete obj[key];
    });
    return obj;
  });

  previewList.forEach(element => {
    element.externalId = element.employeeId;
    delete element.employeeId;
    element.countryCode = element.country;
    delete element.country;
  });
  previewList.forEach(element => {
    element.userId = create_UUID();
    const mockObj = mockUser.mockUser;
    Object.keys(mockObj).forEach(key => {
      if (mockObj[key] !== element[key]) {
        element[key] = mockObj[key];
      }
      return element;
    });
  });
}

export function funGetUserId() {
  return localStorage.getItem('nxl_user_id');
}

export function funGetUserEmail() {
  return localStorage.getItem('nxl_user_email');
}

export function funGetUserActiveTenantId() {
  return localStorage.getItem('nxl_active_tenantId');
}

// temporary function for generate dynamic UserId-GUID
// Need to remove once we get it from auth service

export function create_UUID() {
  let dt = new Date().getTime();
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = (dt + Math.random() * 16) % 16 | 0;
    dt = Math.floor(dt / 16);
    return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
  return uuid;
}
