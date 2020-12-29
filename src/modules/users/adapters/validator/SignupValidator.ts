import Joi from "joi";

import { IValidator } from "../../useCases/signup/secondaryPorts/IValidator";

export class SignupValidator implements IValidator {
  validateData(data: any): { errors?: any[], data?: { name: string; email: string; password: string; }} {
    const schema = Joi.object({
      name: Joi.string()
        .min(2)
        .max(50)
        .required(),
      email: Joi.string()
        .email()
        .min(2)
        .max(50)
        .required(),
      password: Joi.string()
        .min(4)
        .max(50)
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