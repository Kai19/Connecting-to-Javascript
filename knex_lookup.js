let input = process.argv.slice(2);

const pg = require("pg");

const settings = require("./settings"); // settings.json

const knex = require('knex')({
  client: 'pg',
  version: '7.2',
  connection: {
    host : settings.hostname,
    user : settings.user,
    password : settings.password,
    database : settings.database,
    port     : settings.port,
    ssl      : settings.ssl
  }
});

function resultOutput(result){
  console.log("Found " + result.length + " person(s) by the name '" + input[0] + "'");
  result.forEach((rows) => {
    console.log(`${rows.id} :  ${rows.first_name} ${rows.last_name}, born ${rows.birthdate.toLocaleDateString()}`);
  });
}

knex.select('first_name', 'last_name', 'birthdate', 'id' ).from('famous_people')
  .where("last_name", input[0]).asCallback((err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    console.log("Searching ...");
    resultOutput(result);
    knex.destroy();
});
