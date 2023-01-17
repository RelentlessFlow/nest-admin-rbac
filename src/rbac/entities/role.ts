import { Column, Entity, Index, JoinTable, ManyToMany } from "typeorm";
import { EntityBase, EntityType } from "../../common/entity/entity";
import { Resource, ResourceType } from "./resource";
import { Menu, MenuType } from "./memu";

export interface RoleType extends EntityType {
  name: string;
  description?: string;
  resource: ResourceType[];
  menu: MenuType[];
}

@Entity("T_ROLE")
export class Role extends EntityBase implements RoleType {
  @Column({
    name: "NAME",
    comment: "名称",
    length: 10
  })
  @Index()
  name: string;

  @Column({
    name: "DESC",
    comment: "描述",
    length: 100,
    nullable: true
  })
  description?: string;

  @ManyToMany(() => Resource, (resource) => resource.role, {
    createForeignKeyConstraints: true,
    nullable: true,
    cascade: true,
    onDelete: "NO ACTION"
  })
  @JoinTable({
    name: "T_ROLE_RESOURCE",
    joinColumn: {
      name: "ROLE_ID",
      referencedColumnName: "id"
    },
    inverseJoinColumn: {
      name: "RESOURCE_ID",
      referencedColumnName: "id"
    }
  })
  resource: Resource[];

  @ManyToMany(() => Menu, (menu) => menu.role, {
    createForeignKeyConstraints: true,
    nullable: true,
    cascade: true,
    onDelete: "NO ACTION"
  })
  @JoinTable({
    name: "T_ROLE_MENU",
    joinColumn: {
      name: "ROLE_ID",
      referencedColumnName: "id"
    },
    inverseJoinColumn: {
      name: "MENU_ID",
      referencedColumnName: "id"
    }
  })
  menu: Menu[];
}
