"use strict";

const OpenData = require('../db/OpenData');
const source = require('./source');
const datasets = require('./datasets.json');
const chalk = require('chalk');

//
// RESOLVE
//

/**
 * Resolves organization from it's class.
 */
function resolveOrgClass(db, orgClass) {
  switch (orgClass.toLowerCase()) {
    case 'organization':
      return db.orgs['gov'];
    case 'user':
      return db.orgs['user'];
    default:
      throw new Error(`Unknown org class: ${orgClass}`);
  }
}

/**
 * Resolves a license.
 */
function resolveLicense(db, license) {
  switch (license.toLowerCase()) {
    case 'public_domain':
      return db.licenses['PD'];
    case 'notspecified':
      return db.licenses['N/A'];
    default:
      throw new Error(`Unknown license: ${license}`);
  }
}

/**
 * Resolves a format.
 */
function resolveFormat(db, format) {
  if (format === '-godinu.xlsx') {
    format = 'xlsx';
  }
  if (format === '-godina-po-nedeljama.xlsx') {
    format = 'xlsx';
  }


  switch (format.toLowerCase()) {
    case 'csv':
      return db.formats['csv'];
    case 'json':
    case 'geojson':
    case 'геојсон':
      return db.formats['json'];
    case 'xml':
      return db.formats['xml'];
    case 'zip':
      return db.formats['zip'];
    case 'xls':
      return db.formats['xls'];
    case 'xlsx':
      return db.formats['xlsx'];
    case 'ods':
      return db.formats['ods'];
    case 'txt':
      return db.formats['txt'];
    case 'docx':
      return db.formats['docx'];
    case 'xlsm':
      return db.formats['xlsm'];
    case 'html':
    case 'htm':
      return db.formats['html'];
    case 'shp':
      return db.formats['shp'];
    case 'shx':
      return db.formats['shx'];
    case 'dbf':
      return db.formats['dbf'];
    case 'kmz':
      return db.formats['kmz'];
    case 'kml':
      return db.formats['kml'];
    case 'gpx':
      return db.formats['gpx'];
    default:
      throw new Error(`Unknown format: ${format}`);
  }
}

//
// MAKE & COLLECT
//

/**
 * Creates a Owner object.
 */
function makeOwner(db, organization) {
  const org = resolveOrgClass(db, organization.class);

  return new OpenData.Owner(
      source.prefix + organization.id,
      organization.name,
      organization.acronym,
      org.id);
}

/**
 * Creates a data set.
 */
function collectDataSets(db, owner, data) {
  const license = resolveLicense(db, data.license);

  const dataSet = new OpenData.DataSet(
      source.prefix + data.id,
      data.title,
      data.description);

  db.datasets[dataSet.id] = dataSet;

  for (const r of data.resources) {
    const format = resolveFormat(db, r.format);

    const resource = new OpenData.Resource(
        source.prefix + r.id,
        r.url,
        r.title,
        r.description,
        format.id,
        license.id,
        dataSet.id,
        owner.id,
        source.id,
        r.created_at,
        r.last_modified);

    db.resources.push(resource);
  }

  return dataSet;
}

/**
 * Collects all owners and add a source.
 */
function collectOwners() {
  const db = new OpenData.Database();

  console.log(chalk.green(source.id));

  for (const d of datasets.data) {

    let owner;
    if (d.organization !== null) {
      // owner is an `organization`
      const ownerId = source.prefix + d.organization.id;

      owner = db.owners[ownerId];
      if (!owner) {
        owner = makeOwner(db, d.organization);

        db.owners[ownerId] = owner;
      }
    }
    else {
      // owner is an `owner`
      const ownerId = source.prefix + d.owner.id;

      owner = db.owners[ownerId];
      if (!owner) {
        owner = makeOwner(db, d.owner);

        db.owners[ownerId] = owner;
      }
    }

    collectDataSets(db, owner, d);
  }

  db.sources[source.id] = source;

  return db;
}

module.exports = collectOwners;
