import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { Express, BodyParser, Application } from "./CoreModules";
import { BaseController } from "../../modules/shared/adapters/controllers/BaseController";
import { errorHandler } from "./middlewares/errorHandler";
import { NotFoundError } from "../../modules/shared/errors/NotFoundError";
import config from "../config";
import { db } from "../mysql/mysql";

export class ExpressApp {
  public app: Application;

  constructor(controllers: BaseController[]) {
    this.app = Express();
    this.LoadMiddleware();
    this.LoadControllers(controllers);
    this.LoadNotFoundError();
    this.LoadHandleError();
  }

  public LoadMiddleware(): void {
    this.app.use(cors());
    this.app.use(helmet());
    this.app.use(BodyParser.json());
    // don"t show the log when it is test
    if (config.env !== "test" && config.env !== "test.local") {
      // use morgan to log at command line
      this.app.use(morgan("combined")); // "combined" outputs the Apache style LOGs
    }
  }

  private LoadControllers(controllers: BaseController[]): void {
    controllers.forEach((controller) => {
      this.app.use(config.server.root, controller.router);
    });
  }

  private LoadNotFoundError(): void {
    this.app.all('*', (req, res) => {
      throw new NotFoundError();
    });
  }

  private LoadHandleError(): void {
    this.app.use(errorHandler);
  }

  public Listen(): void {
    this.app.listen(config.server.port, () => {
      console.log(
        `Server running on ${config.server.host}:${config.server.port}${config.server.root}`,
      );
    });
  }

  private async RunServices(): Promise<void> {
    try {
      await db.connect();
      this.Listen();
    } catch (error) {
      throw error;
    }
  }

  public Start(): void {
    this.RunServices();
  }
}
