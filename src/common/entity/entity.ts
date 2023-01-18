import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { MapQueryFormat } from "../type/type.enhance";

/**
 * TypeORM 基础实体类
 */

export interface EntityType {
  id: number;
  createTime: Date;
  updateTime: Date;
}

export class EntityBase {
  @PrimaryGeneratedColumn({ name: "ID" })
  id: number;

  @CreateDateColumn({
    name: "CREATE_TIME",
    type: "timestamp"
  })
  createTime: Date;

  @UpdateDateColumn({
    name: "UPDATE_TIME",
    type: "timestamp"
  })
  updateTime: Date;
}