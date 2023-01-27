/**
 * 用于生成后端的排序查询参数，返回{ order: { key: 'ASC'|'DESC' } } || { order: {} }
 * @param obj 
 * @returns 
 */
export const orderMap = ( obj: Record<string, any> ) => {
  let order: Record<string, any> = {}
  Object.entries(obj || {}).forEach(([key,value], index) => {
    if(value === "ascend") { order[key] = 'ASC' }
    if(value === "descend") { order[key] = 'DESC' }
  })
  return { order }
}