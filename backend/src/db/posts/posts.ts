import { connection } from "../connection";
import {
  selectPostsTemplate,
  selectPostByIdTemplate,
  deletePostTemplate,
  insertPostTemplate,
  checkUserExistsTemplate,
} from "./query-templates";
import { Post } from "./types";
import crypto from "crypto";

export const getPosts = (userId: string): Promise<Post[]> =>
  new Promise((resolve, reject) => {
    if (!userId) {
      reject(new Error("userId is required"));
      return;
    }

    connection.all(selectPostsTemplate, [userId], (error, results) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(results as Post[]);
    });
  });

export const deletePost = (postId: string): Promise<boolean> =>
  new Promise((resolve, reject) => {
    if (!postId) {
      reject(new Error("postId is required"));
      return;
    }

    connection.run(deletePostTemplate, [postId], function (error) {
      if (error) {
        reject(error);
        return;
      }
      resolve(this.changes > 0);
    });
  });

export const createPost = (
  userId: string,
  title: string,
  body: string
): Promise<Post> =>
  new Promise((resolve, reject) => {
    const postId = crypto.randomUUID();
    const createdAt = new Date().toISOString();

    connection.run(
      insertPostTemplate,
      [postId, userId, title, body, createdAt],
      function (error) {
        if (error) {
          reject(error);
          return;
        }

        connection.get<Post>(
          selectPostByIdTemplate,
          [postId],
          (error, result) => {
            if (error) {
              reject(error);
              return;
            }
            resolve(result as Post);
          }
        );
      }
    );
  });

export const userExists = (userId: string): Promise<boolean> =>
  new Promise((resolve, reject) => {
    connection.get<{ count: number }>(
      checkUserExistsTemplate,
      [userId],
      (error, result) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(result!.count > 0);
      }
    );
  });