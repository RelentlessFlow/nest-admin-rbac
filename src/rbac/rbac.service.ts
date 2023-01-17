import { Injectable } from "@nestjs/common";
import { InjectEntityManager, InjectRepository } from "@nestjs/typeorm";
import { EntityManager, Repository } from "typeorm";
import { Role } from "./entities/role";
import { Resource } from "./entities/resource";
import { Menu } from "./entities/memu";
import { CreateRoleDto, QueryRoleDto, QueryRoleDtoType, UpdateRoleDto } from "./dto/role.dto";
import { IdExist, UniqueColumn } from "../common/decorator/typeorm.decorator";
import { IdType } from "../common/entity/entity";
import { PageOptionsDto, PageOptionsDtoType } from "../common/dto/page.dto";

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
  async createRole(role: CreateRoleDto) {
    await this.roleRepository.insert(role);
  }

  @IdExist(Role)
  async deleteRole(id: IdType) {
    await this.roleRepository.delete(id);
  }

  @IdExist(Role)
  @UniqueColumn({ table: Role, column: ["name"], excludeCurrent: true })
  async updateRole(role: UpdateRoleDto) {
    await this.roleRepository.update(role.id, role);
  }

  async findRolePage(query: QueryRoleDtoType ) {
    let queryBuilder = this.roleRepository.createQueryBuilder("role");
    // 模糊查询、精确查询
    for (const [key, value] of Object.entries(query || {})) {
      if (value && !key.startsWith('_')) {
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
    queryBuilder.orderBy(query._order)
    // 分页处理
    const { _page = 1, _limit = 10 } = query || {};
    queryBuilder.offset((_page - 1) * _limit).limit(_limit);
    return queryBuilder.getManyAndCount();
  }
}
