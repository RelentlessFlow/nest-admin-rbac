import { Column, Entity, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { EntityType, EntityBase } from "../../common/entity/entity";
import { ManyToMany } from 'typeorm';
import { Role, RoleType } from './role';

export type ResType = 'REST' | 'MENU';
export type ActionType = 'get' | 'post' | 'delete' | 'put' | 'patch' | 'head';
export type PossessionType = 'any' | 'own';
interface ActionPossessType {
  action: ActionType;
  possession: PossessionType;
}

export interface ResourceType extends EntityType {
  name: string;
  type: ResType;
  api: string;
  action: ActionPossessType[];
  description?: string;
  role: RoleType[];
}

@Entity('T_RESOURCE')
export class Resource extends EntityBase implements ResourceType {

  @Column({
    name: 'NAME',
    comment: '名称',
    length: 20,
  })
  name: string;

  @Column({
    name: 'RES_TYPE',
    comment: '资源类型',
    length: 20,
  })
  type: ResType;

  @Column({
    name: 'API',
    comment: '接口',
    length: 100,
  })
  api: string;

  @Column({
    name: 'ACTION',
    comment: '接口请求方式',
    type: 'simple-json',
  })
  action: ActionPossessType[];

  @Column({
    name: 'DESC',
    comment: '描述',
    length: 100,
    nullable: true,
  })
  description?: string;

  @ManyToMany(() => Role, (role) => role.menu, {})
  role: Role[];
}
