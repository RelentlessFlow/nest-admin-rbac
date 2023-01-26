import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query, UsePipes, ValidationPipe
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { RbacService } from "./rbac.service";
import { CreateRoleDto, UpdateRoleDto, QueryRoleDto, DeleteRoleDto } from "./dto/role.dto";
import { CreateResourceDto, DeleteResourceDto, QueryResourceDto, UpdateResourceDto } from "./dto/resource.dto";
import { CreateMenuDto, DeleteMenuDto, QueryMenuDto, UpdateMenuDto } from "./dto/menu.dto";
import { HttpResponse } from "../common/decorator/http.decorator";

@ApiTags("RBAC接口")
@Controller("rbac")
export class RbacController {
  constructor(
    private readonly rbacService: RbacService
  ) {
  }

  @ApiOperation({ summary: "添加角色" })
  @HttpResponse({ message: '添加角色成功' })
  @Post("role")
  createRole(@Body() dto: CreateRoleDto) {
    return this.rbacService.createRole(dto);
  }

  @ApiOperation({ summary: "更新角色" })
  @HttpResponse({ message: '更新角色成功' })
  @Patch("role")
  updateRole(@Body() dto: UpdateRoleDto) {
    return this.rbacService.updateRole(dto);
  }

  @ApiOperation({ summary: "删除角色" })
  @HttpResponse({ message: '删除角色成功' })
  @Delete("role")
  deleteRole(@Body() dto: DeleteRoleDto) {
    return this.rbacService.deleteRole(dto.id);
  }

  @ApiOperation({ summary: "查询角色" })
  @HttpResponse({ message: '查询角色成功' })
  @Get("role")
  @UsePipes(new ValidationPipe({ transform: true }))
  getRole(@Query() q: QueryRoleDto) {
    return this.rbacService.findRole(q);
  }

  @ApiOperation({ summary: "查询角色" })
  @HttpResponse({ message: '查询角色成功' })
  @Post("role/query")
  @UsePipes(new ValidationPipe({ transform: true }))
  getRoleQuery(@Body() q: QueryRoleDto) {
    return this.rbacService.findRole(q);
  }

  @ApiOperation({ summary: "添加接口资源" })
  @HttpResponse({ message: '更新接口资源成功' })
  @Post("resource")
  createResource(@Body() dto: CreateResourceDto) {
    return this.rbacService.createResource(dto);
  }

  @ApiOperation({ summary: "更新接口资源" })
  @HttpResponse({ message: '更新接口资源成功' })
  @Patch("resource")
  updateResource(@Body() dto: UpdateResourceDto) {
    return this.rbacService.updateResource(dto);
  }

  @ApiOperation({ summary: "删除接口资源" })
  @HttpResponse({ message: '删除接口资源成功' })
  @Delete("resource")
  deleteResource(@Body() dto: DeleteResourceDto) {
    return this.rbacService.deleteResource(dto.id);
  }

  @ApiOperation({ summary: "查询接口资源" })
  @HttpResponse({ message: '查询接口资源成功' })
  @Get("resource")
  getResource(@Query() q: QueryResourceDto) {
    return this.rbacService.findResource(q);
  }

  @ApiOperation({ summary: "查询接口资源" })
  @HttpResponse({ message: '查询接口资源成功' })

  @Post("resource/query")
  getResourceQuery(@Body() q: QueryResourceDto) {
    return this.rbacService.findResource(q);
  }

  @ApiOperation({ summary: "添加菜单" })
  @HttpResponse({ message: '添加菜单成功' })
  @Post("menu")
  createMenu(@Body() dto: CreateMenuDto) {
    return this.rbacService.createMenu(dto);
  }

  @ApiOperation({ summary: "更新菜单" })
  @HttpResponse({ message: '更新菜单成功' })
  @Patch("menu")
  updateMenu(@Body() dto: UpdateMenuDto) {
    return this.rbacService.updateMenu(dto);
  }

  @ApiOperation({ summary: "删除接口资源" })
  @HttpResponse({ message: '删除接口资源成功' })
  @Delete("menu")
  deleteMenu(@Body() dto: DeleteMenuDto) {
    return this.rbacService.deleteMenu(dto.id);
  }

  @ApiOperation({ summary: "查询接口资源" })
  @HttpResponse({ message: '查询接口资源成功' })
  @Get("menu")
  getMenu(@Query() q: QueryMenuDto) {
    return this.rbacService.findMenu(q);
  }

  @ApiOperation({ summary: "查询接口资源" })
  @HttpResponse({ message: '查询接口资源成功' })
  @Post("menu/query")
  getMenuQuery(@Body() q: QueryMenuDto) {
    return this.rbacService.findMenu(q);
  }

}