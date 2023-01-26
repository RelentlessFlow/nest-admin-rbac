/**
 * 用于TS类型增强，主要是类型映射函数
 */

/**
 * 过滤掉所有的复杂类型，只保留number | string | boolean类型的字段
 */
declare type FilterComplex<T> = Pick<T, { [K in keyof T]: T[K] extends number | string | boolean ? K : never }[keyof T]>;


/**
 * 过滤基础实体字段
 */
declare type FilterBaseEntity<T> = { [P in keyof T as Exclude<P, keyof EntityType>]: T[P]; };