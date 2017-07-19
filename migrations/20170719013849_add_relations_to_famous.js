
exports.up = function(knex) {
  return knex.schema.table("milestones", function (table){
    table.integer("famous_person_id");
    table.foreign("famous_person_id").references("id").inTable("famous_people");
  });
};

exports.down = function(knex) {
  return knex.schema.table("milestones", function (table){
    table.dropForeign("famous_person_id", "milestones_famous_person_id_foreign");
    table.dropColumn("famous_person_id");
  });
};
