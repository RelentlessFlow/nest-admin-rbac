// 数据库工具类
import { Repository } from "typeorm";

export function createComplexQuery(repository: Repository<any>, query: QueryDtoType<any>) {
  let queryBuilder = repository.createQueryBuilder('query')
  // 模糊查询、精确查询
  const {tableName, columns} = repository.metadata
  for (let [key, value] of Object.entries(query || {})) {
    const column = columns.find(item => item.propertyName === key);
    if(column && value) {
      key = column.givenDatabaseName;
      let op = "like";
      let val = value;
      if (typeof value === "object") {
        op = value['exact'] ? "=" : "like";
        val = value['value'];
      }
      queryBuilder = queryBuilder.andWhere(`${key} ${op} :${key}`, { [key]: op === "=" ? val : `%${val}%` });
    }
  }
  // 排序
  let orderMapper = {}
  Object.entries(query.order ?? {}).forEach(([key, value], index) => {
    orderMapper[columns.find(item => item.propertyName === key).givenDatabaseName] = value
  })
  if (Object.keys(orderMapper).length > 0) { queryBuilder.orderBy(orderMapper); }
  // 分页处理
  const { current, pageSize } = query;
  queryBuilder.offset((current - 1) * pageSize).limit(pageSize);
  return queryBuilder;
}

export async function createDeleteQuery<T>(id: number | number[], repo: Repository<T>) {
  let result = null;
  try {
    result = await repo.delete(id);
    const length = typeof id === 'number' ? 1 : id.length;
    if(result.affected !== length) { throw new Error('删除数据库条目不正确，删除失败') }
    return result;
  } catch (e) {
    return {
      data: result,
      message: e.message,
      success: false,
    } as HttpResponseType
  }
}