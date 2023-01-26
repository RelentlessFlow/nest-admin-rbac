import {ActionPossessType, MenuType, ResourceType, RoleType} from "../entity";
import {CreateType, DeleteBaseDtoType, QueryDtoType, UpdateType} from "./map";

export type CreateMenuDtoType = CreateType<MenuType>;
export type DeleteMenuDtoType = DeleteBaseDtoType;
export type UpdateMenuDtoType = UpdateType<MenuType>;
export type QueryMenuDtoType = QueryDtoType<MenuType>;

export type CreateResourceDtoType = CreateType<ResourceType> & { action: ActionPossessType[] };
export type UpdateResourceDtoType = UpdateType<ResourceType> & { action?: ActionPossessType[] };
export type QueryResourceDtoType = QueryDtoType<ResourceType>;
export type DeleteResourceDtoType = DeleteBaseDtoType;

export type CreateRoleDtoType = CreateType<RoleType>;
export type UpdateRoleDtoType = UpdateType<RoleType>;
export type QueryRoleDtoType = QueryDtoType<RoleType>;
export type DeleteRoleDtoType = DeleteBaseDtoType;