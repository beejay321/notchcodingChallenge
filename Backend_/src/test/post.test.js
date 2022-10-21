const request = require("supertest");

import { createNewPost } from "../services/posts/handlers";

describe("post test", () => {
  it("should test for a post", async () => {
    const response = {
      title: "to test",
      description: "to describe",
    };
    expect(
      await createNewPost({
        response,
        res,
        next,
      })
    ).toEqual(201);
    expect(response.body).toHaveproperty("post");
  });
});
