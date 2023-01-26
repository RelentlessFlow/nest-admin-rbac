// 分页查询DTO
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsOptional, Min, ValidateNested } from "class-validator";
import {OrderByType, PageOptionsDtoType} from "../../../type/dto/pagination";

export class PageOptionsDto implements PageOptionsDtoType{
  @ApiProperty({ description: "每页包含数量", required: false, default: 10 })
  @IsOptional() @Type(() => Number) @IsInt() @Min(1)
  readonly pageSize: number = 10;

  @ApiProperty({ description: "当前页数", required: false, default: 1 })
  @IsOptional() @Type(() => Number) @IsInt() @Min(1)
  readonly current: number = 1;
  @ApiProperty({ description: "排序依据", required: false })
  @IsOptional() @ValidateNested()
  readonly order: OrderByType = {};
}