"use strict";

const OpenData = require('../db/OpenData');
const source = require('./source');
const chalk = require('chalk');
const cheerio = require('cheerio');
const fs = require('fs');


function createOwner(db) {
  const owner = new OpenData.Owner(
    source.prefix + "1",
    "Министарство просвете, науке и технолошког развоја",
    "MPN", db.orgs['gov'].id);
  db.owners[owner.id] = owner;

  return owner;
}

function createDataSets(db) {
  // dataset
  let dataset = new OpenData.DataSet(
    source.prefix + "ds-1",
    "Акциони план - образовање 2020",
    "");
  db.datasets[dataset.id] = dataset;

  dataset = new OpenData.DataSet(
    source.prefix + "ds-2",
    "Национални оквир квалификација Србије (НОКС)",
    "");
  db.datasets[dataset.id] = dataset;

  dataset = new OpenData.DataSet(
    source.prefix + "ds-3",
    "eCENUS",
    "");
  db.datasets[dataset.id] = dataset;

  dataset = new OpenData.DataSet(
    source.prefix + "ds-4",
    "Dositej",
    "");
  db.datasets[dataset.id] = dataset;

  dataset = new OpenData.DataSet(
    source.prefix + "ds-5",
    "Високошколске установе 2016",
    "");
  db.datasets[dataset.id] = dataset;

  dataset = new OpenData.DataSet(
    source.prefix + "ds-6",
    "Научноистраживачка делатност",
    "");
  db.datasets[dataset.id] = dataset;
}

/**
 * Resolve data set.
 */
function resolveDataSet(db, name) {
  for (const key in db.datasets) {
    if (db.datasets[key].title === name) {
      return db.datasets[key];
    }
  }
  throw new Error("Unknown dataset: " + name);
}

function parse() {
  const db = new OpenData.Database();
  console.log(chalk.green(source.id));

  const owner = createOwner(db);
  createDataSets(db);

  const html = fs.readFileSync(source.id + '/datasets.html');
  const $ = cheerio.load(html);
  $('tr').each((i, elem) => {
    if (i === 0) {
      return;
    }
    const rows = $(elem).find('td');

    const title = $(rows[0]).text();
    const description = $(rows[1]).text();
    const setname = $(rows[3]).text();
    const url = "http://opendata.mpn.gov.rs/" + $($(rows[4]).find('a')[1]).attr("href");

    const dataset = resolveDataSet(db, setname);

    const resource = new OpenData.Resource(
        source.prefix + 'r' + i,
        url,
        title,
        description,
        "json",
        "PD",
        dataset.id,
        owner.id,
        source.id,
        new Date('2019-06-23'),
        new Date('2019-06-23')
    );

    db.resources.push(resource);
  });

  db.sources[source.id] = source;

  return db;
}

module.exports = parse;
