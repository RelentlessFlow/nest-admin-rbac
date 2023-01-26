// 公共工具类
export const validNum = (val: string) => {
  // @ts-ignore
  return val / 1 === parseInt(val)
}