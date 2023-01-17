import { RoleType } from "../entities/role";
import { CreateType, FilterComplex, QueryDtoType, QueryFormat, UpdateType } from "../../common/type/type.enhance";
import { IsNotEmpty, IsNumber, IsOptional, IsString, Length } from "class-validator";
import { ApiProperty, PartialType } from "@nestjs/swagger";
import { EntityType, IdType } from "../../common/entity/entity";
import { OrderByType, PageOptionsDto, PageOptionsDtoType } from "../../common/dto/page.dto";

export type CreateRoleDtoType = CreateType<RoleType>;
export class CreateRoleDto implements CreateRoleDtoType {
  @ApiProperty({ description: "名称", required: true })
  @IsNotEmpty()
  @IsString()
  @Length(2, 10)
  name: string;

  @ApiProperty({ description: "介绍", required: false })
  @IsOptional()
  @IsString()
  @Length(4, 100)
  description?: string;
}

export type UpdateRoleDtoType = UpdateType<RoleType>;
export class UpdateRoleDto extends PartialType(CreateRoleDto) implements UpdateRoleDtoType  {
  @ApiProperty({ description: "ID", required: true })
  @IsNumber()
  id: IdType;
}

export interface QueryRoleDtoType extends QueryDtoType<RoleType>, PageOptionsDtoType {
  _order: OrderByType
}

export class QueryRoleDto extends PageOptionsDto implements QueryRoleDtoType{
  @ApiProperty({ description: "order", required: false, type: String, default: {} })
  _order: OrderByType;

  @ApiProperty({ description: "id", required: false, type: String })
  id: { equals: boolean; value: FilterComplex<RoleType>["id"] } | FilterComplex<RoleType>["id"];

  @ApiProperty({ description: "name", required: false, type: String })
  name: { equals: boolean; value: FilterComplex<RoleType>["name"] } | FilterComplex<RoleType>["name"];

  @ApiProperty({ description: "description", required: false, type: String })
  description: { equals: boolean; value: FilterComplex<RoleType>["description"] } | FilterComplex<RoleType>["description"];
}