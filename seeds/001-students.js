exports.seed = function(knex) {
  return knex("students")
    .del()
    .then(function() {
      return knex("students").insert([
        { id: 1, name: "shitbird", favColor: "red" },
        { id: 2, name: "mcgillicutty", favColor: "blue" },
        { id: 3, name: "skeezy", favColor: "green" }
      ]);
    });
};
