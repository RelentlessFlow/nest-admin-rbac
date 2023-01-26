import { Module } from '@nestjs/common';
import { RbacService } from './rbac.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from "./entities/role";
import { Resource } from "./entities/resource";
import { Menu } from "./entities/memu";
import { RbacController } from "./rbac.controller";

@Module({
  imports: [
    TypeOrmModule.forFeature([Role, Resource, Menu])
  ],
  controllers: [RbacController],
  providers: [RbacService],
})
export class RbacModule {}
