import { Injectable } from "@nestjs/common";
import { InjectEntityManager, InjectRepository } from "@nestjs/typeorm";
import { EntityManager, Repository } from "typeorm";
import { Role } from "./entities/role";
import { Resource } from "./entities/resource";
import { Menu } from "./entities/memu";
import { IdExist, UniqueColumn } from "../common/decorator/typeorm.decorator";
import { QueryMenuDto } from "./dto/menu.dto";
import { createComplexQuery, createDeleteQuery } from "../common/utils/db";
import {ResourceType, RoleType} from "typelibrary/entity";
import {
  CreateResourceDtoType,
  CreateRoleDtoType,
  QueryResourceDtoType,
  QueryRoleDtoType,
  UpdateResourceDtoType,
  UpdateRoleDtoType
} from "typelibrary/dto/common";
import {PageResponseDtoType} from "typelibrary/dto/pagination";


@Injectable()
export class RbacService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(Resource)
    private readonly resourceRepository: Repository<Resource>,
    @InjectRepository(Menu)
    private readonly menuRepository: Repository<Menu>,
    @InjectEntityManager()
    private entityManager: EntityManager
  ) {
  }

  @UniqueColumn({ table: Role, column: ["name"] })
  async createRole(role: CreateRoleDtoType) {
    return await this.roleRepository.insert(role);
  }

  deleteRole(id: number | number[]) {
    return createDeleteQuery<RoleType>(id, this.roleRepository);
  }

  @IdExist(Role)
  @UniqueColumn({ table: Role, column: ["name"], excludeCurrent: true })
  async updateRole(role: UpdateRoleDtoType) {
    return await this.roleRepository.update(role.id, role);
  }

  async findRole(query: QueryRoleDtoType): Promise<PageResponseDtoType<Role[]>> {
    const [data, total] = await createComplexQuery(this.roleRepository, query)
      .getManyAndCount();
    return { data, total, current: query.current, pageSize: query.pageSize }
  }

  @UniqueColumn({ table: Resource, column: ["name"] })
  async createResource(resource: CreateResourceDtoType) {
    return await this.resourceRepository.insert(resource);
  }

  @IdExist(Resource)
  async deleteResource(id: number | number[]) {
    return createDeleteQuery<ResourceType>(id, this.resourceRepository);
  }

  @IdExist(Resource)
  @UniqueColumn({ table: Role, column: ["name"], excludeCurrent: true })
  async updateResource(resource: UpdateResourceDtoType) {
    return await this.resourceRepository.update(resource.id, resource);
  }

  async findResource(query: QueryResourceDtoType): Promise<PageResponseDtoType<Resource[]>> {
    const [data, total] = await createComplexQuery(this.resourceRepository, query)
      .getManyAndCount();
    return { data, total, current: query.current, pageSize: query.pageSize }
  }

  @UniqueColumn({ table: Menu, column: ["name"] })
  async createMenu(role: CreateRoleDtoType) {
    return await this.menuRepository.insert(role);
  }

  @IdExist(Menu)
  async deleteMenu(id: number | number[]) {
    return createDeleteQuery<Menu>(id, this.menuRepository);
  }

  @IdExist(Menu)
  @UniqueColumn({ table: Menu, column: ["name"], excludeCurrent: true })
  async updateMenu(role: UpdateRoleDtoType) {
    return await this.menuRepository.update(role.id, role);
  }

  async findMenu(query: QueryMenuDto): Promise<PageResponseDtoType<Menu[]>> {
    const [data, total] = await createComplexQuery(this.menuRepository, query)
      .getManyAndCount();
    return { data, total, current: query.current, pageSize: query.pageSize }
  }

}
