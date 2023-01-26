// DTO类型处理
import { FilterComplex } from "./enhance";
import { PageOptionsDtoType } from "../pagination/page.dto";

/**
 * 用于生成复杂查询的查询格式。其格式为
 * { equals: boolean; value: T[P] };
 */
export type MapQueryFormat<T> = {
  [P in keyof T]: ({ equals: boolean, value: T[P] }) | T[P];
}

/**
 * 创建DTO类型映射， 过滤复杂类型和ID字段
 */
export type CreateType<T> = Omit<FilterComplex<T>, 'id'>

/**
 * 更新DTO类型映射， 过滤复杂数据类型，包含id
 */
export type UpdateType<T> = Partial<CreateType<T>> & { id: number }


/**
 * 用于生成查询DTO类型，过滤复杂类型
 */
export type QueryDtoType<T> = Partial<MapQueryFormat<FilterComplex<T>>> & PageOptionsDtoType;
// export type QueryDtoType<T> = MapQueryFormat<FilterComplex<T>> & PageOptionsDtoType;


export type BaseDeleteDtoType = { id: number | number[] }