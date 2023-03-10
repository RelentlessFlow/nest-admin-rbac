import { ApiProperty, PartialType } from "@nestjs/swagger";
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Validate,
  ValidateNested
} from "class-validator";
import { PageOptionsDto } from "../../common/pagination/page.dto";
import { IsQueryProperty } from "../../common/class-validator/role";
import { BaseDeleteDto } from "../../common/base/dto";

export class CreateMenuDto implements CreateMenuDtoType {
  @ApiProperty({ description: "菜单名称", required: true, minLength: 2, maximum: 20 })
  @IsNotEmpty() @IsString() @Length(2, 20)
  name: string;
  @ApiProperty({ description: "是否为根节点", required: true, type: Boolean })
  @IsNotEmpty() @IsBoolean()
  isRoot: boolean;
  @ApiProperty({ description: "上一节点", required: true, type: Number })
  @IsNotEmpty() @IsNumber()
  last: number;
  @ApiProperty({ description: "菜单描述", required: false, minLength: 2, maximum: 100 })
  @IsOptional() @IsString() @Length(2, 100)
  description?: string;
}

export class DeleteMenuDto extends BaseDeleteDto implements DeleteMenuDtoType {}

export class UpdateMenuDto extends  PartialType(CreateMenuDto) implements UpdateMenuDtoType {
  @ApiProperty({ description: "唯一主键", required: true })
  @IsNotEmpty() @IsNumber()
  id: number;
}

export class QueryMenuDto extends PageOptionsDto implements QueryMenuDtoType {
  @ApiProperty({ description: "唯一主键", required: false, type: 'number' })
  @IsOptional() @Validate(IsQueryProperty)
  id?: number | { equals: boolean; value: number; };
  @ApiProperty({ description: "菜单名称", required: false, type: 'string' })
  @IsOptional() @Validate(IsQueryProperty)
  name?: string | { equals: boolean; value: string; };
  @ApiProperty({ description: "是否为根节点", required: false, type: 'string' })
  @IsOptional() @Validate(IsQueryProperty)
  isRoot?: boolean | { equals: boolean; value: boolean; };
  @ApiProperty({ description: "上一节点", required: false, type: 'string' })
  @IsOptional() @Validate(IsQueryProperty)
  last?: number | { equals: boolean; value: number; };
  @ApiProperty({ description: "菜单描述", required: false, type: 'string' })
  @IsOptional() @Validate(IsQueryProperty)
  description?: string | { equals: boolean; value: string; };
}
