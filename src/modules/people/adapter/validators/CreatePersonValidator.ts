/* tslint:disable:max-classes-per-file */
import Joi from "joi";

import { ICreatePersonValidator } from "../../useCases/createPerson/ports/ICreatePersonValidator";

export class CreatePersonValidator implements ICreatePersonValidator {
  validateData(data: { name: string; }): { errors?: any[], data?: { name: string; }} {
    const schema = Joi.object({
      name: Joi.string()
        .min(2)
        .required(),
    });
    const { error, value } = schema.validate(data);
    if (error) {
      return {
        errors: error.details,
      };
    } else {
      return {
        data: value,
      };
    }
  }
}

export class CreatePersonValidatorFactory {
  static getValidator() {
    return new CreatePersonValidator();
  }
}