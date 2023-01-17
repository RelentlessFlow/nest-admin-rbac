import { RoleType } from "../entities/role";
import { CreateType, QueryDtoType, UpdateType } from "../../common/type/type.enhance";
import { IsNotEmpty, IsNumber, IsOptional, IsString, Length, Validate } from "class-validator";
import { ApiProperty, PartialType } from "@nestjs/swagger";
import { PageOptionsDto, PageOptionsDtoType } from "../../common/pagination/page.dto";
import { IsQueryProperty } from "../../common/class-validator/role";

export type CreateRoleDtoType = CreateType<RoleType>;

export class CreateRoleDto implements CreateRoleDtoType {
  @ApiProperty({ description: "名称", required: true, minLength: 2, maximum: 10 })
  @IsNotEmpty() @IsString() @Length(2, 10)
  name: string;

  @ApiProperty({ description: "介绍", required: false, minLength: 4, maximum: 100 })
  @IsOptional() @IsString() @Length(4, 100)
  description?: string;
}

export type UpdateRoleDtoType = UpdateType<RoleType>;

export class UpdateRoleDto extends PartialType(CreateRoleDto) implements UpdateRoleDtoType {
  @ApiProperty({ description: "ID", required: true })
  @IsNotEmpty() @IsNumber()
  id: number;
}

export interface QueryRoleDtoType extends Partial<QueryDtoType<RoleType>>, PageOptionsDtoType {
}

export default class QueryRoleDto extends PageOptionsDto implements QueryRoleDtoType {
  @ApiProperty({ description: "id", required: false })
  @IsOptional() @Validate(IsQueryProperty)
  id?: number | { equals: boolean; value: number; };
  @ApiProperty({ description: "name", required: false })
  @IsOptional() @Validate(IsQueryProperty)
  name?: string | { equals: boolean; value: string; };
  @ApiProperty({ description: "description", required: false })
  @IsOptional() @Validate(IsQueryProperty)
  description?: string | { equals: boolean; value: string; };
}