"use strict";

const chalk = require('chalk');
const fs = require('fs');
const OpenData = require('./db/OpenData');

const db = new OpenData.Database();

console.log(chalk.yellow('Building OpenData database'));

[
  require('./data.gov.rs/main')(),
  require('./startit.rs/main')()
].forEach(sourceDb => db.merge(sourceDb));


// save

const dbJson = JSON.stringify(db);

console.log(chalk.cyan('Writing opendata.json'));

fs.writeFileSync("./out/opendata.json", dbJson);
//console.log(dbJson);

console.log(chalk.white('Done.'));
