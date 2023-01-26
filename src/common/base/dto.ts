// 基础DTO类
import { BaseDeleteDtoType } from "../type/dto";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, Validate } from "class-validator";
import { IsDeleteDtoProperty } from "../class-validator/role";




/**
 * 基本删除DTO类
 */
export class BaseDeleteDto implements BaseDeleteDtoType {
  @ApiProperty({ description: "唯一主键（值或数组）", required: false, type: 'number' })
  @IsNotEmpty() @Validate(IsDeleteDtoProperty)
  id: number[] | number;
}