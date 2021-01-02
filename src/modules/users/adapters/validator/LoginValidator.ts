import Joi from "joi";

import { IValidator } from "../../useCases/login/secondaryPorts/IValidator";

export class LoginValidator implements IValidator {
  validateData(data: any): { errors?: any[], data?: { email: string; password: string; }} {
    const schema = Joi.object({
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