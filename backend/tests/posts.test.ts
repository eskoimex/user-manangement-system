// import request from "supertest";
// import express from "express";
// import postsRouter from "../src/routes/posts";

// const app = express();
// app.use(express.json());
// app.use("/posts", postsRouter);

// describe("Posts API", () => {
//   describe("DELETE /posts/:id", () => {
//     it("should return 404 for non-existent post", async () => {
//       const response = await request(app)
//         .delete("/posts/non-existent-id")
//         .expect(404);

//       expect(response.body.error).toBe("Post not found");
//     });

//     it("should return 400 for missing post ID", async () => {
//       const response = await request(app).delete("/posts/").expect(404); 
//     });
//   });

//   describe("POST /posts", () => {
//     it("should return 400 for missing required fields", async () => {
//       const response = await request(app)
//         .post("/posts")
//         .send({ title: "Only title" })
//         .expect(400);

//       expect(response.body.error).toContain("required");
//     });

//     it("should return 400 for empty title", async () => {
//       const response = await request(app)
//         .post("/posts")
//         .send({
//           userId: "test-user",
//           title: "",
//           body: "Valid body",
//         })
//         .expect(400);

//     expect(response.body.error).toContain(
//       "userId, title, and body are required"
//     );

//     });

//     it("should return 404 for non-existent user", async () => {
//       const response = await request(app)
//         .post("/posts")
//         .send({
//           userId: "non-existent-user",
//           title: "Test Post",
//           body: "Test content",
//         })
//         .expect(404);

//       expect(response.body.error).toBe("User not found");
//     });
//   });

//   describe("GET /posts", () => {
//     it("should return 400 for missing userId", async () => {
//       const response = await request(app).get("/posts").expect(400);

//       expect(response.body.error).toBe("userId is required");
//     });
//   });
// });
// tests/posts/createPost.test.ts
import request from 'supertest';
import app from '../src/app';

describe('POST /posts', () => {
  it('should create a post successfully with valid data', async () => {
    const postData = {
      userId: '1',
      title: 'Test Post',
      body: 'This is a test post content'
    };

    const response = await request(app)
      .post('/posts')
      .send(postData)
      .expect(201);

    expect(response.body).toEqual({
      success: true,
      data: expect.objectContaining({
        id: expect.any(String),
        userId: '1',
        title: 'Test Post',
        body: 'This is a test post content'
      }),
      message: 'Post created successfully'
    });
  });

  it('should return 400 when required fields are missing', async () => {
    const response = await request(app)
      .post('/posts')
      .send({})
      .expect(400);

    expect(response.body).toEqual({
      success: false,
      error: expect.objectContaining({
        type: 'ValidationError',
        message: expect.stringContaining('is required'),
        timestamp: expect.any(String),
        path: '/posts'
      })
    });
  });

  it('should return 400 when userId is not numeric', async () => {
    const postData = {
      userId: 'abc123', // Invalid non-numeric ID
      title: 'Test Post',
      body: 'This is a test post content'
    };

    const response = await request(app)
      .post('/posts')
      .send(postData)
      .expect(400);

    expect(response.body.error.message).toContain('User ID must be a valid numeric ID');
  });

  it('should return 400 when title is empty', async () => {
    const postData = {
      userId: '1',
      title: '   ', // Only whitespace
      body: 'This is a test post content'
    };

    const response = await request(app)
      .post('/posts')
      .send(postData)
      .expect(400);

    expect(response.body.error.message).toContain('Title is required');
  });

  it('should return 400 when title exceeds max length', async () => {
    const longTitle = 'a'.repeat(256); // Exceeds 255 characters

    const response = await request(app)
      .post('/posts')
      .send({
        userId: '1',
        title: longTitle,
        body: 'Test body'
      })
      .expect(400);

    expect(response.body.error.message).toContain('Title must be less than 255 characters');
  });

  it('should return 404 when user does not exist', async () => {
    const postData = {
      userId: '9999', // Non-existent user
      title: 'Test Post',
      body: 'This is a test post content'
    };

    const response = await request(app)
      .post('/posts')
      .send(postData)
      .expect(404);

    expect(response.body.error.type).toBe('NotFoundError');
    expect(response.body.error.message).toContain('User with ID 9999 not found');
  });

  it('should trim whitespace from title and body', async () => {
    const postData = {
      userId: '1',
      title: '  Test Post  ', // Extra whitespace
      body: '  This is a test post content  ' // Extra whitespace
    };

    const response = await request(app)
      .post('/posts')
      .send(postData)
      .expect(201);

    // Joi should trim the values before they reach the controller
    expect(response.body.data.title).toBe('Test Post');
    expect(response.body.data.body).toBe('This is a test post content');
  });
});