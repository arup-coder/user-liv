import { UserService } from './user.service';
import { UserExportProductService } from './user.export-product.service';
import { UserPermissionService } from './user.permission.service';

export const services: any[] = [UserService, UserExportProductService, UserPermissionService];

export * from './user.service';
export * from './user.export-product.service';
export * from './user.permission.service';