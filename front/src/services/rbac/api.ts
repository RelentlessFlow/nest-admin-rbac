import { request } from "@umijs/max";
import {CreateRoleDtoType, QueryRoleDtoType, UpdateRoleDtoType} from "typelibrary/dto/common";
import {HttpResponseType} from "typelibrary/dto/res";
import {PageResponseDtoType} from "typelibrary/dto/pagination";
import {RoleType} from "typelibrary/entity";

export const baseurl = 'http://localhost:9080/api/rbac'

/** 获取规则列表 GET /api/rule */
export async function role(
  data?: QueryRoleDtoType,
  options?: { [key: string]: any },
) {
  return request<ResponseType & PageResponseDtoType<RoleType[]>>(`${baseurl}/role/query`, {
    method: 'POST', data,
    ...(options || {}),
  });
}

export async function addRole( data: CreateRoleDtoType ) {
  return request<HttpResponseType>(`${baseurl}/role`, {
    method: 'POST', data
  })
}

export async function editRole( data: UpdateRoleDtoType ) {
  return request<HttpResponseType>(`${baseurl}/role`, {
    method: 'PATCH', data
  })
}
