// DTO类型处理

/**
 * 用于生成复杂查询的查询格式。其格式为
 * { equals: boolean; value: T[P] };
 */
declare type MapQueryFormat<T> = {
  [P in keyof T]: ({ equals: boolean, value: T[P] }) | T[P];
}

/**
 * 创建DTO类型映射， 过滤复杂类型和ID字段
 */
declare type CreateType<T> = Omit<Enhance.FilterComplex<T>, 'id'>;

/**
 * 更新DTO类型映射， 过滤复杂数据类型，包含id
 */
declare type UpdateType<T> = Partial<CreateType<T>> & { id: number };


/**
 * 用于生成查询DTO类型，过滤复杂类型
 */
declare type QueryDtoType<T> = Partial<MapQueryFormat<Enhance.FilterComplex<T>>> & Pagination.PageOptionsDtoType;
// export type QueryDtoType<T> = MapQueryFormat<FilterComplex<T>> & PageOptionsDtoType;

/**
 * 用于生成删除DTO类型
 */
declare type DeleteBaseDtoType = { id: number | number[] };

declare type CreateMenuDtoType = CreateType<MenuType>;
declare type DeleteMenuDtoType = DeleteBaseDtoType;
declare type UpdateMenuDtoType = UpdateType<MenuType>;
declare type QueryMenuDtoType = QueryDtoType<MenuType>;

declare type CreateResourceDtoType = CreateType<ResourceType> & { action: ActionPossessType[] };
declare type UpdateResourceDtoType = UpdateType<ResourceType> & { action?: ActionPossessType[] };
declare type QueryResourceDtoType = QueryDtoType<ResourceType>;
declare type DeleteResourceDtoType = BaseDeleteDtoType;

declare type CreateRoleDtoType = CreateType<RoleType>;
declare type UpdateRoleDtoType = UpdateType<RoleType>;
declare type QueryRoleDtoType = QueryDtoType<RoleType>;
declare type DeleteRoleDtoType = BaseDeleteDtoType;
