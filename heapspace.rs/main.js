"use strict";

const OpenData = require('../db/OpenData');
const source = require('./source');
const chalk = require('chalk');

function makeStartitDatabase() {
  const db = new OpenData.Database();

  console.log(chalk.green(source.id));

  // owner
  const owner = new OpenData.Owner(source.prefix + "hq-1", "Heapspace udruženje građana", "Heapspace", db.orgs['ngo'].id);
  db.owners[owner.id] = owner;

  // dataset
  const dataset = new OpenData.DataSet(
    source.prefix + "ds-1",
    "OpenData", "Podaci u vezi kataloga https://opendata.rs");
  db.datasets[dataset.id] = dataset;

  // resource
  const id = source.prefix + "1";
  const resource = new OpenData.Resource(
    id,
    `https://opendata.rs/d/${id}/opendata_scores.json`,
    "Matapodaci resursa",
    "Metapodaci resursa iz katalog resursa otvorenih podataka (https://opendata.rs). Oni uključuju validaciju " +
    "resursa po više pitanja: online prisutnosti, podršci za HTTPS protokol itd, " +
    "kao i podatke o veličini resursa i vremenu njegovog preuzimanja.",
    db.formats['json'].id,
    db.licenses['CC-BY-4.0'].id,
    dataset.id, owner.id, source.id,
    new Date('2019-06-03'),
    new Date('2019-06-03')
  );
  db.resources.push(resource);

  // source
  db.sources[source.id] = source;

  return db;
}

module.exports = makeStartitDatabase;
