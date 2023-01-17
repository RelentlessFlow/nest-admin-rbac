import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export type IdType = number;

export interface EntityType {
  id: IdType;
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
