export type OrderByType = Record<string, "DESC" | "ASC">;
export type PageOptionsDtoType = {
    readonly pageSize?: number;
    readonly current?: number;
    readonly order?: OrderByType;
};
export type PageResponseDtoType = {
    data: any;
    total: number;
    current: number;
    pageSize: number;
};
