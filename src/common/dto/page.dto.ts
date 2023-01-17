import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsOptional, Min } from "class-validator";

export interface PageOptionsDtoType {
  readonly _limit?: number;
  readonly _page?: number;
}

export class PageOptionsDto implements PageOptionsDtoType{
  @ApiProperty({
    description: "每页包含数量",
    required: false,
    default: 10
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  readonly _limit?: number;

  @ApiProperty({
    description: "当前页数",
    required: false,
    default: 1
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  readonly _page?: number;
}

export type OrderByType = Record<string, "DESC" | "ASC">