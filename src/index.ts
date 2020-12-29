import { ExpressApp } from "./frameworks/express/ExpressApp";
import { BaseController } from "./modules/shared/adapters/controllers/BaseController"

import UsersController from "./modules/users/adapters/controllers/UsersController";

const controllers: BaseController[] = [UsersController];

const app = new ExpressApp(controllers);

app.Start();