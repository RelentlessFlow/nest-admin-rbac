import { BaseDeleteDtoType, CreateType, QueryDtoType, UpdateType } from "../../common/type/dto";
import { ActionPossessType, ResourceType } from "../entities/resource";
import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString, Length, Validate, ValidateNested } from "class-validator";
import { PageOptionsDto, PageOptionsDtoType } from "../../common/pagination/page.dto";
import { IsQueryProperty } from "../../common/class-validator/role";
import { BaseDeleteDto } from "../../common/base/dto";

export interface CreateResourceDtoType extends CreateType<ResourceType>  {
  action: ActionPossessType[]
}

export class CreateResourceDto implements CreateResourceDtoType {
  @ApiProperty({ description: "接口名称", required: true, minLength: 2, maximum: 20 })
  @IsNotEmpty() @IsString() @Length(2, 20)
  name: string;
  @ApiProperty({ description: "接口地址", required: true, minLength: 2, maximum: 100 })
  @IsNotEmpty() @IsString() @Length(2, 100)
  api: string;
  @ApiProperty({ description: "接口请求方式（JSON）", required: true })
  @IsNotEmpty() @ValidateNested()
  action: ActionPossessType[];
  @ApiProperty({ description: "接口描述", required: false, minLength: 2, maximum: 100 })
  @IsOptional() @IsString() @Length(2, 100)
  description?: string;
}

export interface UpdateResourceDtoType extends UpdateType<ResourceType> {
  action?: ActionPossessType[]
}

export class UpdateResourceDto extends PartialType(CreateResourceDto) implements UpdateResourceDtoType {
  @ApiProperty({ description: "id", required: true })
  @IsNotEmpty() @IsNumber()
  id: number;
}

export interface QueryResourceDtoType extends QueryDtoType<ResourceType> {}

export class QueryResourceDto extends PageOptionsDto implements QueryResourceDtoType {
  @ApiProperty({ description: "唯一主键", required: false, type: 'number' })
  @IsOptional() @Validate(IsQueryProperty)
  id?: number | { equals: boolean; value: number; };
  @ApiProperty({ description: "接口名称", required: false, type: 'string' })
  @IsOptional() @Validate(IsQueryProperty)
  name?: string | { equals: boolean; value: string; };
  @ApiProperty({ description: "接口描述", required: false, type: 'string' })
  @IsOptional() @Validate(IsQueryProperty)
  description?: string | { equals: boolean; value: string; };
  @ApiProperty({ description: "接口地址", required: false, type: 'string' })
  @IsOptional() @Validate(IsQueryProperty)
  api?: string | { equals: boolean; value: string; };
}


export interface DeleteResourceDtoType extends BaseDeleteDtoType {}
export class DeleteResourceDto extends BaseDeleteDto implements DeleteResourceDtoType {}
