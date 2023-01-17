import { Body, Controller, Delete, Get, Inject, Patch, Post, Query, Req, Res } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { RbacService } from "./rbac.service";
import { CreateRoleDto, QueryRoleDto, UpdateRoleDto } from "./dto/role.dto";
import { IdType } from "../common/entity/entity";
@ApiTags("RBAC接口")
@Controller("rbac")
export class RbacController {
  constructor(
    private readonly rbacService: RbacService
  ) {
  }

  @ApiOperation({ summary: "添加角色" })
  @Post("role")
  createRole(@Body() role: CreateRoleDto) {
    return this.rbacService.createRole(role);
  }

  @ApiOperation({ summary: "更新角色" })
  @Patch("role")
  updateRole(@Body() role: UpdateRoleDto) {
    return this.rbacService.updateRole(role);
  }

  @ApiOperation({ summary: "删除角色" })
  @Delete("role")
  deleteRole(@Query("id") id: IdType) {
    return this.rbacService.deleteRole(id);
  }

  @ApiOperation({ summary: "查询角色" })
  @Get("role")
  getRole(@Query() q: QueryRoleDto) {
    return this.rbacService.findRolePage(q);
  }

  @ApiOperation({ summary: "查询角色" })
  @Post("role/query")
  async getRolePage(@Body() q: QueryRoleDto) {
    return await this.rbacService.findRolePage(q);
  }
}