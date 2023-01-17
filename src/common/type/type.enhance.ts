import { EntityType, IdType } from "../entity/entity";

/**
 * 过滤掉所有的复杂类型，只保留number | string | boolean类型的字段
 */
export type FilterComplex<T> = Pick<T, {[K in keyof T]: T[K] extends number | string | boolean ? K : never}[keyof T]>;

/**
 * 创建DTO类型映射， 过滤复杂类型和ID字段
 */
export type CreateType<T> = Omit<FilterComplex<T>, 'id'>

/**
 * 更新DTO类型映射， 过滤复杂数据类型，包含id
 */
export type UpdateType<T> = Partial<CreateType<T>> & { id: IdType }

/**
 * 过滤基础实体字段
 */
export type FilterBaseEntity<T> = {
  [P in keyof T as Exclude<P, keyof EntityType>]: T[P];
};

/**
 * 用于生成复杂查询的查询格式。其格式为
 * { equals: boolean; value: T[P] };
 */
export type QueryFormat<T> = {
  [P in keyof T]: ( { equals: boolean, value: T[P] } | T[P] )
}

/**
 * 用于生成查询DTO类型，过滤复杂类型
 */
export type QueryDtoType<T> = Partial<QueryFormat<FilterComplex<T>>>

// export type CreateType<T> = { [P in keyof T as Extract<P, T[P] extends number | string | boolean ? T[P] : never>]: T[P]; };