// TypeORM 自定义装饰器
import { BadRequestException } from "@nestjs/common";
import {EntityManager, Not} from "typeorm";

/**
 * 检测字段的数据是否重复 例子：@UniqueColumn(table: User, column: [name, idCard])
 * @param { table:数据表, column：字段名, excludeCurrent 是否排除当前项 默认为false, idProp 当前表唯一主键的字段名 默认为id }
 * @constructor
 */
export function UniqueColumn({table, column, excludeCurrent = false, idProp = 'id'}: {table: any, column: string[], excludeCurrent?: boolean, idProp?: string}) {
  return function (target: any, propertyName: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = async function (...args: any[]) {
      const { [idProp]: id, ...role } = args[0]
      for (const col of column) {
        if(!role[col]) continue;
        let query = { where: { [col]: role[col] } }
        if (excludeCurrent && id) {
          query = {...query, where: {...query.where, [idProp]: Not(id)}}
        }
        const existingRole = await this.entityManager.findOne(table, query);
        if (existingRole) {
          throw new BadRequestException(`${col}已存在！`);
        }
      }
      return originalMethod.apply(this, args);
    };
    return descriptor;
  }
}

/**
 * 检测某个字段的数据不存在，可用于ID检测，例子：@ExistColumn(table: User, column: 'id')
 * @param options { table:数据表 column：字段名 }
 * @constructor
 */
export function ExistColumn({ table, column }) {
  return function(target: any, propertyName: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = async function(...args: any[]) {
      const value = args[0];
      if(value[column]) {
        const exist = await (this.entityManager as EntityManager).getRepository(table).findOneBy({
          [column]: value[column]
        })
        if (!exist) { throw new BadRequestException(`${column}不存在！`); }
      }
      return originalMethod.apply(this, args);
    };
    return descriptor;
  };
}

/**
 * 根据ID，判断数据是否存在
 * @param table:数据表
 * @param options
 * @constructor
 */
export function IdExist(table, options: { column: string } = { column: "id" }) {
  return ExistColumn({ table, column: options.column });
}