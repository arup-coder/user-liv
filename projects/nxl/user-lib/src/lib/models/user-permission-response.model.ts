export interface UserPermissionResponse {
    moduleName: string;
    create: boolean;
    read: boolean;
    update: boolean;
    delete: boolean;
}