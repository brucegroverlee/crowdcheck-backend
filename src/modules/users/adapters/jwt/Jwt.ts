import jwt from "jsonwebtoken";

import { IJwt } from "../../useCases/secondaryPorts/IJwt";
import config from "../../../../frameworks/config";

export class Jwt implements IJwt {
  readonly JWT_SECRET: string = config.jwt.JWT_SECRET;
  readonly JWT_EXPIRES_IN: string = config.jwt.JWT_EXPIRES_IN;

  create(userId: number): string {
    const token = jwt.sign({
      userId,
    }, this.JWT_SECRET, { expiresIn: this.JWT_EXPIRES_IN });
    return token;
  }

  decode(token: string): { userId: number; } {
    try {
      const decodedToken = jwt.verify(token, this.JWT_SECRET) as { userId: number; };
      return decodedToken;
    } catch (error) {
      throw error;
    }
  }
}