import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

@ValidatorConstraint({ name: 'is-query-property', async: false })
export class IsQueryProperty implements ValidatorConstraintInterface {
  validate(pp: any, args: ValidationArguments) {
    return typeof pp === 'string' || (pp?.equals !== undefined && pp?.value !== undefined)
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} must be {equals: boolean, value: T} or string`;
  }
}
