// TypeORM 基础实体类
import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export class EntityBase implements EntityType{
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