import { RoleType } from "../entities/role";
import {
  BaseDeleteDtoType,
  CreateType,
  QueryDtoType,
  UpdateType
} from "../../common/type/dto";
import { IsNotEmpty, IsNumber, IsOptional, IsString, Length, Validate, ValidateNested } from "class-validator";
import { ApiProperty, PartialType } from "@nestjs/swagger";
import { PageOptionsDto, PageOptionsDtoType } from "../../common/pagination/page.dto";
import { IsQueryProperty } from "../../common/class-validator/role";
import { BaseDeleteDto } from "../../common/base/dto";

export type CreateRoleDtoType = CreateType<RoleType>;

export class CreateRoleDto implements CreateRoleDtoType {
  @ApiProperty({ description: "角色名称", required: true, minLength: 2, maximum: 10 })
  @IsNotEmpty() @IsString() @Length(2, 10)
  name: string;

  @ApiProperty({ description: "角色介绍", required: false, minLength: 4, maximum: 100 })
  @IsOptional() @IsString() @Length(4, 100)
  description?: string;
}

export type UpdateRoleDtoType = UpdateType<RoleType>;

export class UpdateRoleDto extends PartialType(CreateRoleDto) implements UpdateRoleDtoType {
  @ApiProperty({ description: "唯一主键", required: true })
  @IsNotEmpty() @IsNumber()
  id: number;
}

export interface QueryRoleDtoType extends QueryDtoType<RoleType> {} {}

export class QueryRoleDto extends PageOptionsDto implements QueryRoleDtoType {
  @ApiProperty({ description: "唯一主键", required: false, type: 'number' })
  @IsOptional() @Validate(IsQueryProperty)
  id?: number | { equals: boolean; value: number; };
  @ApiProperty({ description: "角色名称", required: false, type: 'string' })
  @IsOptional() @Validate(IsQueryProperty)
  name?: string | { equals: boolean; value: string; };
  @ApiProperty({ description: "角色介绍", required: false, type: 'string' })
  @IsOptional() @Validate(IsQueryProperty)
  description?: string | { equals: boolean; value: string; };
}

export interface DeleteRoleDtoType extends BaseDeleteDtoType {}
export class DeleteRoleDto extends BaseDeleteDto implements DeleteRoleDtoType {}
