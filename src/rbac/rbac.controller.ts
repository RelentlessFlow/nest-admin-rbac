import { Body, Controller, Delete, Get, Patch, Post, Query } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { RbacService } from "./rbac.service";
import QueryRoleDto, { CreateRoleDto, UpdateRoleDto } from "./dto/role.dto";
import { CreateResourceDto, QueryResourceDto, UpdateResourceDto } from "./dto/resource.dto";
import { CreateMenuDto, QueryMenuDto, UpdateMenuDto } from "./dto/menu.dto";

@ApiTags("RBAC接口")
@Controller("rbac")
export class RbacController {
  constructor(
    private readonly rbacService: RbacService
  ) {
  }

  @ApiOperation({ summary: "添加角色" })
  @Post("role")
  createRole(@Body() dto: CreateRoleDto) {
    return this.rbacService.createRole(dto);
  }

  @ApiOperation({ summary: "更新角色" })
  @Patch("role")
  updateRole(@Body() dto: UpdateRoleDto) {
    return this.rbacService.updateRole(dto);
  }

  @ApiOperation({ summary: "删除角色" })
  @Delete("role")
  deleteRole(@Query("id") id: number) {
    return this.rbacService.deleteRole(id);
  }

  @ApiOperation({ summary: "查询角色" })
  @Get("role")
  getRole(@Query() q: QueryRoleDto) {
    return this.rbacService.findRole(q);
  }

  @ApiOperation({ summary: "查询角色" })
  @Post("role.ts/query")
  getRoleQuery(@Body() q: QueryRoleDto) {
    return this.rbacService.findRole(q);
  }

  @ApiOperation({ summary: "添加接口资源" })
  @Post("resource")
  createResource(@Body() dto: CreateResourceDto) {
    return this.rbacService.createResource(dto);
  }

  @ApiOperation({ summary: "更新接口资源" })
  @Patch("resource")
  updateResource(@Body() dto: UpdateResourceDto) {
    return this.rbacService.updateResource(dto);
  }

  @ApiOperation({ summary: "删除接口资源" })
  @Delete("resource")
  deleteResource(@Query("id") id: number) {
    return this.rbacService.deleteResource(id);
  }

  @ApiOperation({ summary: "查询接口资源" })
  @Get("resource")
  getResource(@Query() q: QueryResourceDto) {
    return this.rbacService.findResource(q);
  }

  @ApiOperation({ summary: "查询接口资源" })
  @Post("resource/query")
  getResourceQuery(@Body() q: QueryResourceDto) {
    return this.rbacService.findResource(q);
  }

  @ApiOperation({ summary: "添加菜单" })
  @Post("menu")
  createMenu(@Body() dto: CreateMenuDto) {
    return this.rbacService.createMenu(dto);
  }

  @ApiOperation({ summary: "更新菜单" })
  @Patch("menu")
  updateMenu(@Body() dto: UpdateMenuDto) {
    return this.rbacService.updateMenu(dto);
  }

  @ApiOperation({ summary: "删除接口资源" })
  @Delete("menu")
  deleteMenu(@Query("id") id: number) {
    return this.rbacService.deleteMenu(id);
  }

  @ApiOperation({ summary: "查询接口资源" })
  @Get("menu")
  getMenu(@Query() q: QueryMenuDto) {
    return this.rbacService.findMenu(q);
  }

  @ApiOperation({ summary: "查询接口资源" })
  @Post("menu/query")
  getMenuQuery(@Body() q: QueryMenuDto) {
    return this.rbacService.findMenu(q);
  }

}