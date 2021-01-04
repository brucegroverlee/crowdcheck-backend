import mysql from "mysql2";

import { IDType } from "../../entities/types";
import { db } from "../../../../frameworks/mysql/mysql";

export class MySqlBaseRepository{
  readonly tableName: string;

  /**
   * Returns the new entity's id.
   */
  _create(payload: any): Promise<IDType> {
    return new Promise((resolve, reject) => {
      let columns: string[] = [];
      let placeholders: string[] = [];
      let values = Object.values(payload);

      function parseColumns() {
        Object.keys(payload).forEach(key => {
          columns.push(`\`${key}\``);
          placeholders.push("?");
        });
      }

      function addDefaultColumns() {
        const now = new Date();
        columns = columns.concat(["\`createdAt\`", "\`updatedAt\`"]);
        placeholders = placeholders.concat(["?", "?"]);
        values = values.concat([now, now]);
      }

      parseColumns();
      addDefaultColumns();
      const query = `INSERT INTO \`${this.tableName}\` ( ${columns.join(",")} ) VALUES ( ${placeholders.join(",")} );`;
      db.connection.execute(query, values, (err: mysql.QueryError, result: mysql.ResultSetHeader, fields: mysql.FieldPacket[]) => {
          if (err) reject(err);
          resolve(result.insertId);
        }
      );
    });
  }

  findOne(payload: any): Promise<any|null> {
    return new Promise((resolve, reject) => {
      const columns: string[] = [];
      const values = Object.values(payload);

      function parseColumns() {
        Object.keys(payload).forEach(key => {
          columns.push(`\`${key}\` = ?`);
        });
      }

      parseColumns();
      const query = `SELECT * FROM \`${this.tableName}\` WHERE ${columns.join(" AND ")} LIMIT 1`;
      db.connection.execute(query, values, (err: mysql.QueryError, results: mysql.RowDataPacket[], fields: mysql.FieldPacket[]) => {
        if (err) reject(err);
        if (results.length > 0) {
          resolve(results[0]);
        } else {
          resolve(null);
        }
      });
    });
  }

  findById(id: IDType): Promise<any|null> {
    return this.findOne({ id, });
  }
}