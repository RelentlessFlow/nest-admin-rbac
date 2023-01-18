import { CreateType, QueryDtoType, UpdateType } from "../../common/type/type.enhance";
import { ActionPossessType, ResourceType } from "../entities/resource";
import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString, Length, Validate, ValidateNested } from "class-validator";
import { PageOptionsDto, PageOptionsDtoType } from "../../common/pagination/page.dto";
import { IsQueryProperty } from "../../common/class-validator/role";

export type CreateResourceDtoType = CreateType<ResourceType> & { action: ActionPossessType[] }

export class CreateResourceDto implements CreateResourceDtoType {
  @ApiProperty({ description: "接口名称", required: true, minLength: 2, maximum: 20 })
  @IsNotEmpty() @IsString() @Length(2, 20)
  name: string;
  @ApiProperty({ description: "接口地址", required: true, minLength: 2, maximum: 100 })
  @IsNotEmpty() @IsString() @Length(2, 100)
  api: string;
  @ApiProperty({ description: "请求方式（JSON）", required: true })
  @IsNotEmpty() @ValidateNested()
  action: ActionPossessType[];
  @ApiProperty({ description: "描述", required: true, minLength: 2, maximum: 100 })
  @IsOptional() @IsString() @Length(2, 100)
  description?: string;
}

export type UpdateResourceDtoType = UpdateType<ResourceType> & { action?: ActionPossessType[] }

export class UpdateResourceDto extends PartialType(CreateResourceDto) implements UpdateResourceDtoType {
  @ApiProperty({ description: "id", required: true })
  @IsNotEmpty() @IsNumber()
  id: number;
  @ApiProperty({ description: "action", required: true })
  @IsOptional() @ValidateNested()
  action?: ActionPossessType[];
}

export interface QueryResourceDtoType extends Partial<QueryDtoType<ResourceType>>, PageOptionsDtoType {
}

export class QueryResourceDto extends PageOptionsDto implements QueryResourceDtoType {
  @ApiProperty({ description: "id", required: false, type: 'number' })
  @IsOptional() @Validate(IsQueryProperty)
  id?: number | { equals: boolean; value: number; };
  @ApiProperty({ description: "name", required: false, type: 'string' })
  @IsOptional() @Validate(IsQueryProperty)
  name?: string | { equals: boolean; value: string; };
  @ApiProperty({ description: "description", required: false, type: 'string' })
  @IsOptional() @Validate(IsQueryProperty)
  description?: string | { equals: boolean; value: string; };
  @ApiProperty({ description: "api", required: false, type: 'string' })
  @IsOptional() @Validate(IsQueryProperty)
  api?: string | { equals: boolean; value: string; };
}
