import { FilterComplex, MapQueryFormat } from "../enhance";
import { PageOptionsDtoType } from "./pagination";
/**
 * 创建DTO类型映射， 过滤复杂类型和ID字段
 */
export type CreateType<T> = Omit<FilterComplex<T>, 'id'>;
/**
 * 用于生成删除DTO类型
 */
export type DeleteBaseDtoType = {
    id: number | number[];
};
/**
 * 更新DTO类型映射， 过滤复杂数据类型，包含id
 */
export type UpdateType<T> = Partial<CreateType<T>> & {
    id: number;
};
/**
 * 用于生成查询DTO类型，过滤复杂类型
 */
export type QueryDtoType<T> = Partial<MapQueryFormat<FilterComplex<T>>> & PageOptionsDtoType;
