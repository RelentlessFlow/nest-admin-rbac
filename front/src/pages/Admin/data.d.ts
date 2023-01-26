declare module AdminApi {
  type RoleItem = {
    id: number,
    name: string;
    description?: string;
    createTime: string,
    updateTime: string,
  }

  type RoleAddResult = {
    message: string,
    success: boolean,
    data: any
  }

  type RoleQueryResult = {
    message: string,
    success: boolean,
    data: any
  }
}
