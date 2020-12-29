export { Request, Response, NextFunction, } from "../../../../frameworks/express/CoreModules";
import { Router, Response, RouterType } from "../../../../frameworks/express/CoreModules";

export class BaseController {
  router: RouterType;

  constructor() {
    this.router = Router();
  }
}
