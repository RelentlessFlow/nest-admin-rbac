declare type OrderByType = Record<string, "DESC" | "ASC">

declare type PageOptionsDtoType = {
  readonly pageSize?: number;
  readonly current?: number;
  readonly order?: OrderByType;
}

declare type PageResponseDtoType = {
  data: any;
  total: number,
  current: number,
  pageSize: number
}