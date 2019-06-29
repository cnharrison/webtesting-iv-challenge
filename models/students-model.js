const db = require("../data/dbConfig.js");

module.exports = {
  find,
  findById,
  insert,
  update,
  remove
};

async function insert(student) {
  const [id] = await db("students").insert(student);
  return findById(id);
}

async function update(id, changes) {
  return null;
}

function remove(id) {
  return null;
}

function find() {
  return db("students");
}

function findById(id) {
  return db("students")
    .where({ id })
    .first();
}
