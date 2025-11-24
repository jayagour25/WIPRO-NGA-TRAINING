const { expect } = require("chai");
const courses = require("../src/data/coursesData");
const {
  getAllCourses,
  getCourseById
} = require("../src/controllers/coursesController");

function createMockRes() {
  const res = {};
  res.statusCode = 200;
  res.body = null;
  res.status = function (code) {
    this.statusCode = code;
    return this;
  };
  res.json = function (payload) {
    this.body = payload;
    return this;
  };
  return res;
}

describe("Courses Controller (Unit Tests)", () => {
  it("should return all courses", () => {
    const req = {};
    const res = createMockRes();

    getAllCourses(req, res);

    expect(res.statusCode).to.equal(200);
    expect(res.body).to.be.an("array");
    expect(res.body.length).to.equal(courses.length);
  });

  it("should return a single course", () => {
    const req = { params: { id: "1" } };
    const res = createMockRes();

    getCourseById(req, res);

    expect(res.statusCode).to.equal(200);
    expect(res.body).to.have.property("id", 1);
  });

  it("should return 404 if not found", () => {
    const req = { params: { id: "999" } };
    const res = createMockRes();

    getCourseById(req, res);

    expect(res.statusCode).to.equal(404);
    expect(res.body).to.have.property("error");
  });
});
