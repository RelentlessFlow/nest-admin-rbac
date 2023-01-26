import { Injectable } from "@nestjs/common";
import { InjectEntityManager, InjectRepository } from "@nestjs/typeorm";
import { EntityManager, Repository } from "typeorm";
import { Role, RoleType } from "./entities/role";
import { Resource, ResourceType } from "./entities/resource";
import { Menu } from "./entities/memu";
import { IdExist, UniqueColumn } from "../common/decorator/typeorm.decorator";
import { QueryMenuDto } from "./dto/menu.dto";
import { createComplexQuery, createDeleteQuery } from "../common/utils/db";

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
    await this.roleRepository.insert(role);
  }

  deleteRole(id: number | number[]) {
    return createDeleteQuery<RoleType>(id, this.roleRepository);
  }

  @IdExist(Role)
  @UniqueColumn({ table: Role, column: ["name"], excludeCurrent: true })
  async updateRole(role: UpdateRoleDtoType) {
    await this.roleRepository.update(role.id, role);
  }

  async findRole(query: QueryRoleDtoType): Promise<PageResponseDtoType> {
    const [data, total] = await createComplexQuery(this.roleRepository, query)
      .getManyAndCount();
    return { data, total, current: query.current, pageSize: query.pageSize }
  }

  @UniqueColumn({ table: Resource, column: ["name"] })
  async createResource(resource: CreateResourceDtoType) {
    await this.resourceRepository.insert(resource);
  }

  @IdExist(Resource)
  async deleteResource(id: number | number[]) {
    return createDeleteQuery<ResourceType>(id, this.resourceRepository);
  }

  @IdExist(Resource)
  @UniqueColumn({ table: Role, column: ["name"], excludeCurrent: true })
  async updateResource(resource: UpdateResourceDtoType) {
    await this.resourceRepository.update(resource.id, resource);
  }

  async findResource(query: QueryResourceDtoType) {
    return createComplexQuery(this.resourceRepository, query)
      .getManyAndCount();
  }

  @UniqueColumn({ table: Menu, column: ["name"] })
  async createMenu(role: CreateRoleDtoType) {
    await this.menuRepository.insert(role);
  }

  @IdExist(Menu)
  async deleteMenu(id: number | number[]) {
    return createDeleteQuery<Menu>(id, this.menuRepository);
  }

  @IdExist(Menu)
  @UniqueColumn({ table: Menu, column: ["name"], excludeCurrent: true })
  async updateMenu(role: UpdateRoleDtoType) {
    await this.menuRepository.update(role.id, role);
  }

  async findMenu(query: QueryMenuDto) {
    return createComplexQuery(this.menuRepository, query)
      .getManyAndCount();
  }

}
