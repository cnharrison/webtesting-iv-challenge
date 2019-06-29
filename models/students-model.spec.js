const db = require("../data/dbConfig.js");
const Students = require("./students-model.js");

describe("the students model", () => {
  afterEach(async () => {
    await db("students").truncate();
  });
  it("should insert students into the db", async () => {
    await Students.insert({ name: "fuck", favColor: "pink" });
    await Students.insert({ name: "shit", favColor: "orange" });

    const students = await db("students");
    expect(students).toHaveLength(2);
    expect(students[0].name).toBe("fuck");
  });
  it("should return the new student on insert", async () => {
    const student = await Students.insert({
      name: "bruh",
      favColor: "magenta"
    });
    expect(student).toEqual({ name: "bruh", id: 1, favColor: "magenta" });
  });
});

describe("findByID()", () => {
  afterEach(async () => {
    await db("students").truncate();
  });
  it("finds a student by id", async () => {
    await db("students").insert([
      { name: "fuckwad", favColor: "cerulean" },
      { name: "buggo", favColor: "blood" },
      { name: "skitty", favColor: "crimson" }
    ]);
    const student = await Students.findById(2);
    expect(student.name).toBe("buggo");
  });
  it("returns null on an invalid id", async () => {
    const student = await Students.findById(69);
    expect(student).toBeUndefined();
  });
});
