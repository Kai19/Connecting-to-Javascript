let input = process.argv.slice(2);

let firstName = input[0];
let lastName = input[1];
let birthDate = input[2];

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



knex('famous_people').insert({first_name: firstName, last_name: lastName, birthdate: birthDate}).asCallback((err, result) => {
    knex.destroy();
});
