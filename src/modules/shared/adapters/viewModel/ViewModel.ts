import { Response } from "../../../../frameworks/express/CoreModules";
import { BadRequestError } from "../../errors/BadRequestError";
import { UnauthorizedError } from "../../errors/UnauthorizedError";
import { ForbiddenError } from "../../errors/ForbiddenError";
import { NotFoundError } from "../../errors/NotFoundError";
import { NotAcceptableError } from "../../errors/NotAcceptableError";
import { ConflictError } from "../../errors/ConflictError";

export class ViewModel {
  constructor(private response: Response) {}

  resolve(statusCode: number, payload: any) {
    this.response.status(statusCode).json(payload);
  }

  rejectBadRequest400(message: string = "Bad Request") {
    throw new BadRequestError(message);
  }

  rejectUnauthorized401(message: string = "Unauthorized") {
    throw new UnauthorizedError(message);
  }

  rejectForbidden403(message: string = "Forbidden") {
    throw new ForbiddenError(message);
  }

  rejectNotFound404(message: string = "Not Found") {
    throw new NotFoundError(message);
  }

  rejectNotAcceptable406(error: any[]) {
    throw new NotAcceptableError(error);
  }

  rejectConflict409(message: string = "Conflict") {
    throw new ConflictError(message);
  }
}