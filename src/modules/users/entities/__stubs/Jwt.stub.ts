import { IDType } from "../../../shared/entities/types";
import { IJwt } from "../IJwt";

export class JwtStub implements IJwt {

  create(userId: IDType): string {
    return JSON.stringify({ userId, });
  }
  decode(token: string): { userId: IDType; } {
    const decoded = JSON.parse(token);
    return {
      userId: decoded.userId,
    };
  }
}