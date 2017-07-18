let input = process.argv.slice(2);

const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

function resultOutput(result){
  console.log("Found " + result.rowCount + " person(s) by the name '" + input[0] +"'");
  let resultRows = result.rows;
  resultRows.forEach((rows) => {
    console.log(`${rows.id} :  ${rows.first_name} ${rows.last_name}, born ${rows.birthdate}`);
  });
}

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query("SELECT first_name, last_name, birthdate, id FROM famous_people WHERE last_name = $1", [input[0]], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    console.log("Searching ...");
    resultOutput(result);
    client.end();
  });
});
