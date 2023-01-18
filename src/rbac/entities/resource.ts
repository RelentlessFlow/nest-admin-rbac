import { Column, Entity, ManyToMany } from "typeorm";
import { EntityBase, EntityType } from "../../common/entity/entity";
import { Role, RoleType } from "./role";

export type ActionType = "get" | "post" | "delete" | "put" | "patch" | "head";
export type PossessionType = "any" | "own";

export interface ActionPossessType {
  action: ActionType;
  possession: PossessionType;
}

export interface ResourceType extends EntityType {
  name: string;
  api: string;
  action: ActionPossessType[];
  description?: string;
  role: RoleType[];
}

@Entity("T_RESOURCE")
export class Resource extends EntityBase implements ResourceType {

  @Column({
    name: "NAME",
    comment: "接口名称",
    length: 20
  })
  name: string;

  @Column({
    name: "API",
    comment: "接口地址",
    length: 100
  })
  api: string;

  @Column({
    name: "ACTION",
    comment: "接口请求方式（JSON）",
    type: "simple-json"
  })
  action: ActionPossessType[];

  @Column({
    name: "DESC",
    comment: "接口描述",
    length: 100,
    nullable: true
  })
  description?: string;

  @ManyToMany(() => Role, (role) => role.menu, {})
  role: Role[];
}
