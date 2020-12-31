import mysql from "mysql2";

import config from "../config";

class MySQL {
  public connection: mysql.Connection;
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;

  constructor() {
    this.host = config.mysql.HOST;
    this.port = config.mysql.PORT as number;
    this.user = config.mysql.USER;
    this.password = config.mysql.PASSWORD;
    this.database = config.mysql.DATABASE;
  }

  async connect() {
    try {
      this.connection = await mysql.createConnection({
        host: this.host,
        port: this.port,
        user: this.user,
        password: this.password,
        database: this.database,
      });
    } catch (error) {
      throw error;
    }
  }
}

export const db = new MySQL();