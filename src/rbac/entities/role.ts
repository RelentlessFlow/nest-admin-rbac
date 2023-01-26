import { Column, Entity, Index, JoinTable, ManyToMany } from "typeorm";
import { EntityBase } from "../../common/base/entity";
import { Resource, ResourceType } from "./resource";
import { Menu, MenuType } from "./memu";

export interface RoleType extends EntityType {
  name: string;
  description?: string;
  resource?: ResourceType[];
  menu?: MenuType[];
}

@Entity("ROLE")
export class Role extends EntityBase implements RoleType {
  @Column({
    name: "NAME",
    comment: "角色名称",
    length: 10
  })
  @Index()
  name: string = '';

  @Column({
    name: "DES",
    comment: "角色描述",
    length: 100,
    nullable: true
  })
  description?: string = undefined;

  @ManyToMany(() => Resource, (resource) => resource.role, {
    createForeignKeyConstraints: true,
    nullable: true,
    cascade: true,
    onDelete: "NO ACTION"
  })
  @JoinTable({
    name: "ROLE_RESOURCE",
    joinColumn: {
      name: "ROLE_ID",
      referencedColumnName: "id"
    },
    inverseJoinColumn: {
      name: "RESOURCE_ID",
      referencedColumnName: "id"
    }
  })
  resource?: Resource[] = undefined;

  @ManyToMany(() => Menu, (menu) => menu.role, {
    createForeignKeyConstraints: true,
    nullable: true,
    cascade: true,
    onDelete: "NO ACTION"
  })
  @JoinTable({
    name: "ROLE_MENU",
    joinColumn: {
      name: "ROLE_ID",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "MENU_ID",
      referencedColumnName: "id"
    }
  })
  menu?: Menu[] = undefined;
}
