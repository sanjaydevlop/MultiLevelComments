import request from 'supertest';
import app from '../app.js';

describe("POST /api/auth/register", () => {
  describe("given a username, password, and email", () => {

    test("should respond with a 200 status code", async () => {
      const response = await request(app).post("/api/auth/register").send({
        email: "sanjaysur@gmail.com",
        password: "password",
        username: "sanjaysur"
      });
      expect(response.statusCode).toBe(200);
    });

    test("should specify JSON in the content type header", async () => {
      const response = await request(app).post("/api/auth/register").send({
        email: "sanjaysur@gmail.com",
        password: "password",
        username: "sanjaysur"
      });
      expect(response.headers['content-type']).toEqual(expect.stringContaining("json"));
    });

    test("response has a token", async () => {
      const response = await request(app).post("/api/auth/register").send({
        email: "sanjaysur@gmail.com",
        password: "password",
        username: "sanjaysur"
      });
      expect(response.body.token).toBeDefined();
    });
  });
});
