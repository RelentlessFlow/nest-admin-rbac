import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

/**
 * 自定义class-validator验证规则
 */

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
