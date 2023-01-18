import { Column, Entity, Index, ManyToMany } from "typeorm";
import { EntityBase, EntityType } from "../../common/entity/entity";
import { Role, RoleType } from "./role";

export interface MenuType extends EntityType {
  name: string;
  isRoot?: boolean;
  last?: number;
  description?: string;
  role: RoleType[];
}

@Entity("T_MENU")
export class Menu extends EntityBase implements MenuType {
  @Column({
    name: "NAME",
    comment: "菜单名称",
    length: 20
  })
  @Index()
  name: string;

  @Column({
    name: "IS_ROOT",
    comment: "是否为根节点",
    nullable: true
  })
  isRoot?: boolean;

  @Column({
    name: "LAST",
    comment: "上一节点",
    nullable: true
  })
  last?: number;

  @Column({
    name: "DESC",
    comment: "菜单描述",
    length: 100,
    nullable: true
  })
  description?: string;

  @ManyToMany(() => Role, (role) => role.menu)
  role: Role[];
}
