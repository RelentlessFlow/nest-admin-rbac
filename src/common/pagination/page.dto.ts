import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsOptional, Min, ValidateNested } from "class-validator";

/**
 * 分页查询DTO
 */

export type OrderByType = Record<string, "DESC" | "ASC">

export interface PageOptionsDtoType {
  readonly _limit?: number;
  readonly _page?: number;
  readonly _order?: OrderByType;
}

export class PageOptionsDto implements PageOptionsDtoType{
  @ApiProperty({ description: "每页包含数量", required: false, default: 10 })
  @IsOptional() @Type(() => Number) @IsInt() @Min(1)
  readonly _limit?: number;

  @ApiProperty({ description: "当前页数", required: false, default: 1 })
  @IsOptional() @Type(() => Number) @IsInt() @Min(1)
  readonly _page?: number;
  @ApiProperty({ description: "排序依据", required: false })
  @IsOptional() @ValidateNested()
  readonly _order?: OrderByType;
}
