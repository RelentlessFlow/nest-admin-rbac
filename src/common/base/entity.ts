// TypeORM 基础实体类
import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";



export interface EntityType {
  id: number;
  createTime: Date;
  updateTime: Date;
}

export class EntityBase {
  @PrimaryGeneratedColumn({ name: "ID" })
  id: number = 0;

  @CreateDateColumn({
    name: "CREATE_TIME",
    type: "timestamp"
  })
  createTime: Date = null;

  @UpdateDateColumn({
    name: "UPDATE_TIME",
    type: "timestamp"
  })
  updateTime: Date = null;
}