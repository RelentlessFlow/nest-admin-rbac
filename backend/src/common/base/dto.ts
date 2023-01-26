// 基础DTO类
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, Validate } from "class-validator";
import { IsDeleteDtoProperty } from "../class-validator/role";
import { DeleteRoleDtoType } from "type";

/**
 * 基本删除DTO类
 */
export class BaseDeleteDto implements DeleteRoleDtoType {
  @ApiProperty({ description: "唯一主键（值或数组）", required: false, type: 'number' })
  @IsNotEmpty() @Validate(IsDeleteDtoProperty)
  id: number[] | number;
}