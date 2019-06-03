"use strict";

const OpenData = require('../db/OpenData');
const source = require('./source');
const chalk = require('chalk');

function makeStartitDatabase() {
  const db = new OpenData.Database();

  console.log(chalk.green(source.id));

  // owner
  const owner = new OpenData.Owner(source.prefix + "bgd-1", "StartIt Centar", "StartIt", db.orgs['ngo'].id);
  db.owners[owner.id] = owner;

  // dataset
  const dataset = new OpenData.DataSet(source.prefix + "ds-1", "Istraživanje programera u Srbiji", "Istraživanja domaće programerske scene koju sprovodi Startit. Pitanja o uslovima u kojima se radi, obrazovanju, iskustvima i planovima, iz kojih mesta najčešće dolaze, koje programske jezike najviše koriste, kako ocenjuju svoje zadovoljstvo poslom.");
  db.datasets[dataset.id] = dataset;

  // resource
  const resource = new OpenData.Resource(
    source.prefix + "3",
    "https://opendata.rs/d/startit-1/istrazivanje-programera-u-srbiji-3.csv",
    "Istraživanje programera #3 (2018)",
    "Rezultati trećeg istraživanja domaće programerske scene koju sprovodi Startit. 1.108 srpskih programerki i programera odgovaralo na niz pitanja o uslovima u kojima rade, obrazovanju, iskustvima i planovima.",
    db.formats['csv'].id,
    db.licenses['CC-BY-4.0'].id,
    dataset.id, owner.id, source.id,
    new Date('2019-01-22'),
    new Date('2019-01-22')
  );
  db.resources.push(resource);

  // source
  db.sources[source.id] = source;

  return db;
}

module.exports = makeStartitDatabase;
