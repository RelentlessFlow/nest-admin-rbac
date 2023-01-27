enum OrderEnum {
  DESC = 'DESC',
  ASC = 'ASC'
}

export type OrderByType = Record<string, OrderEnum.DESC | OrderEnum.ASC>

export type PageOptionsDtoType = {
  readonly pageSize?: number;
  readonly current?: number;
  readonly order?: OrderByType;
}

export type PageResponseDtoType<T> = {
  data: T;
  total: number,
  current: number,
  pageSize: number
}