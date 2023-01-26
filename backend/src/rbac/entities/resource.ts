import { Column, Entity, ManyToMany } from "typeorm";
import { EntityBase } from "../../common/base/entity";
import { Role } from "./role";
import {ActionPossessType, ResourceType} from "../../../type";

@Entity("RESOURCE")
export class Resource extends EntityBase implements ResourceType {

  @Column({
    name: "NAME",
    comment: "接口名称",
    length: 20
  })
  name: string = '';

  @Column({
    name: "API",
    comment: "接口地址",
    length: 100
  })
  api: string = '';

  @Column({
    name: "ACTION",
    comment: "接口请求方式（JSON）",
    type: "simple-json"
  })
  action: ActionPossessType[] = [];

  @Column({
    name: "DESCRIPTION",
    comment: "接口描述",
    length: 100,
    nullable: true
  })
  description?: string;

  @ManyToMany(() => Role, (role) => role.menu, {})
  role: Role[] = undefined;
}
