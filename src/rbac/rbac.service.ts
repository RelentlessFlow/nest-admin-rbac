import { Injectable } from "@nestjs/common";
import { InjectEntityManager, InjectRepository } from "@nestjs/typeorm";
import { EntityManager, Repository } from "typeorm";
import { Role } from "./entities/role";
import { Resource } from "./entities/resource";
import { Menu } from "./entities/memu";
import { CreateRoleDtoType, QueryRoleDtoType, UpdateRoleDtoType } from "./dto/role.dto";
import { IdExist, UniqueColumn } from "../common/decorator/typeorm.decorator";
import { OrderByType } from "../common/pagination/page.dto";
import { CreateResourceDtoType, QueryResourceDto, UpdateResourceDtoType } from "./dto/resource.dto";

@Injectable()
export class RbacService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(Resource)
    private readonly resourceRepository: Repository<Resource>,
    @InjectRepository(Menu)
    private readonly menuRepository: Repository<Menu>,
    @InjectEntityManager() private entityManager: EntityManager
  ) {
  }

  @UniqueColumn({ table: Role, column: ["name"] })
  async createRole(role: CreateRoleDtoType) {
    await this.roleRepository.insert(role);
  }

  @IdExist(Role)
  async deleteRole(id: number) {
    await this.roleRepository.delete(id);
  }

  @IdExist(Role)
  @UniqueColumn({ table: Role, column: ["name"], excludeCurrent: true })
  async updateRole(role: UpdateRoleDtoType) {
    await this.roleRepository.update(role.id, role);
  }

  async findRole(query: QueryRoleDtoType) {
    let queryBuilder = this.roleRepository.createQueryBuilder("role");
    // 模糊查询、精确查询
    for (const [key, value] of Object.entries(query || {})) {
      if (value && !key.startsWith("_")) {
        let op = "=";
        let val = value;
        if (typeof value === "object") {
          op = value.exact ? "=" : "like";
          val = value.value;
        }
        queryBuilder = queryBuilder.andWhere(`role.${key} ${op} :${key}`, { [key]: op === "=" ? val : `%${val}%` });
      }
    }
    // 排序
    const { _order } = query;
    if (_order !== undefined && !Object.is(_order, {})) {
      queryBuilder.orderBy(_order as OrderByType);
    }
    // 分页处理
    const { _page = 1, _limit = 10 } = query || {};
    queryBuilder.offset((_page - 1) * _limit).limit(_limit);
    return queryBuilder.getManyAndCount();
  }

  @UniqueColumn({ table: Resource, column: ["name"] })
  async createResource(resource: CreateResourceDtoType) {
    await this.resourceRepository.insert(resource);
  }

  @IdExist(Resource)
  async deleteResource(id: number) {
    await this.resourceRepository.delete(id);
  }

  @IdExist(Resource)
  @UniqueColumn({ table: Role, column: ["name"], excludeCurrent: true })
  async updateResource(resource: UpdateResourceDtoType) {
    await this.resourceRepository.update(resource.id, resource);
  }

  async findResource(query: QueryResourceDto) {
    let queryBuilder = this.resourceRepository.createQueryBuilder("resource");
    // 模糊查询、精确查询
    for (const [key, value] of Object.entries(query || {})) {
      if (value && !key.startsWith("_")) {
        let op = "=";
        let val = value;
        if (typeof value === "object") {
          op = value.exact ? "=" : "like";
          val = value.value;
        }
        queryBuilder = queryBuilder.andWhere(`role.${key} ${op} :${key}`, { [key]: op === "=" ? val : `%${val}%` });
      }
    }
    // 排序
    const { _order } = query;
    if (_order !== undefined && !Object.is(_order, {})) {
      queryBuilder.orderBy(_order as OrderByType);
    }
    // 分页处理
    const { _page = 1, _limit = 10 } = query || {};
    queryBuilder.offset((_page - 1) * _limit).limit(_limit);
    return queryBuilder.getManyAndCount();
  }

}
