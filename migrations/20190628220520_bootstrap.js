exports.up = function(knex) {
  return knex.schema.createTable("students", tbl => {
    tbl.increments();
    tbl.string("name", 128).notNullable();
    tbl.string("favColor", 128);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("students");
};
