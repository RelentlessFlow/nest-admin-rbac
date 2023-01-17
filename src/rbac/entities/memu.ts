import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";
import { Exclude } from 'class-transformer';
import { EntityType, IdType, EntityBase } from "../../common/entity/entity";
import { Role, RoleType } from './role';
import { ManyToMany } from 'typeorm';

export interface MenuType extends EntityType {
  name: string;
  isRoot?: boolean;
  last?: IdType;
  description?: string;
  role: RoleType[];
}

@Entity('T_MENU')
export class Menu extends EntityBase implements MenuType {
  @Column({
    name: 'NAME',
    comment: '名称',
    length: 20,
  })
  @Index()
  name: string;

  @Column({
    name: 'IS_ROOT',
    comment: '是否为根节点',
    nullable: true,
  })
  isRoot?: boolean;

  @Column({
    name: 'LAST',
    comment: '上一节点',
    nullable: true,
  })
  last?: IdType;

  @Column({
    name: 'DESC',
    comment: '描述',
    length: 100,
    nullable: true,
  })
  description?: string;

  @ManyToMany(() => Role, (role) => role.menu)
  role: Role[];
}
