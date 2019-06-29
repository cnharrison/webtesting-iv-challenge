const request = require("supertest");

const server = require("./server.js");
const db = require("../data/dbConfig.js");

describe("server.js", () => {
  it("should set the test env", () => {
    expect(process.env.DB_ENV).toBe("testing");
  });
});

describe("GET /", () => {
  it("should return 200", async () => {
    const res = await request(server).get("/");
    expect(res.status).toBe(200);
  });
  it("should return json", async () => {
    const res = await request(server).get("/");
    expect(res.type).toBe("application/json");
  });
  it("should return api:up", async () => {
    const res = await request(server).get("/");
    expect(res.body).toEqual({ api: "up" });
  });
});

describe("GET /students", () => {
  afterEach(async () => {
    await db("students").truncate();
  });
  it("should return students", async () => {
    const res = await request(server).get("/students");
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });
  it("should return all of the students", async () => {
    const students = [
      { id: 1, name: "fuckwad", favColor: "cerulean" },
      { id: 2, name: "buggo", favColor: "blood" },
      { id: 3, name: "skitty", favColor: "crimson" }
    ];

    await db("students").insert(students);
    const res = await request(server).get("/students");
    expect(res.status).toBe(200);
    expect(res.body).toEqual(students);
  });
});
