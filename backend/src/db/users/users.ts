import { connection } from "../connection";
import {
  selectCountOfUsersTemplate,
  selectUsersTemplate,
} from "./query-templates";
import { User } from "./types";

export const getUsersCount = (): Promise<number> =>
  new Promise((resolve, reject) => {
    connection.get<{ count: number }>(
      selectCountOfUsersTemplate,
      (error, results) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(results?.count || 0);
      }
    );
  });

export const getUsers = (
  pageNumber: number,
  pageSize: number
): Promise<User[]> =>
  new Promise((resolve, reject) => {
    const offset = pageNumber * pageSize;

    connection.all<any>(
      selectUsersTemplate,
      [offset, pageSize],
      (error, results) => {
        if (error) {
          reject(error);
          return;
        }

        const usersMap = new Map<string, User>();

        results.forEach((row: any) => {
          if (!usersMap.has(row.id)) {
            usersMap.set(row.id, {
              id: row.id,
              name: row.name,
              username: row.username,
              email: row.email,
              phone: row.phone,
              addresses: [],
            });
          }

          if (row.address_id) {
            const user = usersMap.get(row.id)!;
            user.addresses!.push({
              id: row.address_id,
              user_id: row.user_id,
              street: row.street,
              state: row.state,
              city: row.city,
              zipcode: row.zipcode,
            });
          }
        });

        resolve(Array.from(usersMap.values()));
      }
    );
  });