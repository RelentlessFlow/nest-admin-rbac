// 自定义class-validator验证规则
import { isArray, ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { validNum } from "../utils/tools";


// 用于查询字段的验证规则
@ValidatorConstraint({ name: 'is-query-property', async: false })
export class IsQueryProperty implements ValidatorConstraintInterface {
  validate(pp: any, args: ValidationArguments) {
    return typeof pp === 'string' || (pp?.value !== undefined && typeof (pp?.equals || true) === 'boolean')
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} must be {equals: boolean, value: T} or string`;
  }
}

// 用户删除DTO的字段验证规则
@ValidatorConstraint({ name: 'is-query-property', async: false })
export class IsDeleteDtoProperty implements ValidatorConstraintInterface {
  validate(pp: any, args: ValidationArguments) {
    return validNum(pp) || (isArray(pp) && pp.every(item => validNum(item)))
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} must be number or number[]`;
  }
}