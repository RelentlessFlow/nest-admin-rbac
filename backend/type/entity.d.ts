export type ActionType = "get" | "post" | "delete" | "put" | "patch" | "head";
export type PossessionType = "any" | "own";
export type EntityType = {
    id: number;
    createTime: Date;
    updateTime: Date;
};
export type MenuType = {
    name: string;
    isRoot?: boolean;
    last?: number;
    description?: string;
    role?: RoleType[];
} & EntityType;
export type ActionPossessType = {
    action: ActionType;
    possession: PossessionType;
};
export type ResourceType = {
    name: string;
    api: string;
    action: ActionPossessType[];
    description?: string;
    role?: RoleType[];
} & EntityType;
export type RoleType = {
    name: string;
    description?: string;
    resource?: ResourceType[];
    menu?: MenuType[];
} & EntityType;
