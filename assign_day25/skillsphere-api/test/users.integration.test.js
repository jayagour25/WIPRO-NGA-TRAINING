const request = require("supertest");
const { expect } = require("chai");
const app = require("../src/app");

describe("Users API (Integration Tests)", () => {
  it("GET /api/users should return list of users", async () => {
    const res = await request(app).get("/api/users");

    expect(res.status).to.equal(200);
    expect(res.body).to.be.an("array");
  });

  it("POST /api/users should create a user", async () => {
    const res = await request(app)
      .post("/api/users")
      .send({ name: "Charlie", email: "charlie@example.com" });

    expect(res.status).to.equal(201);
    expect(res.body).to.have.property("name", "Charlie");
  });

  it("POST /api/users invalid should return 400", async () => {
    const res = await request(app).post("/api/users").send({ name: "" });

    expect(res.status).to.equal(400);
  });
});
