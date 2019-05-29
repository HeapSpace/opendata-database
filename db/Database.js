"use strict";

const util = require('./util');
const Format = require('./Format');
const License = require('./License');
const Org = require('./Org');

/**
 * Load all formats.
 */
function loadFormats(db) {
  [

    // OTVORENI FORMATI
    new Format( "csv", "Comma-Separated Values"),
    new Format( "json", "JSON"),
    new Format( "xml", "XML"),

    // OTVORENI, TEŽE ČITLJIVI
    new Format( "xlsx", "Microsoft Excel Open XML Spreadsheet"),
    new Format( "ods", "OpenOffice spreadsheet"),

    // OTVORENI, NEČITLJIVI
    new Format( "zip", "ZIP archive"),
    new Format( "xlsm", "Microsoft Excel Open XML Macro-Enabled Spreadsheet"),

    // ZATVORENI
    new Format( "xls", "Microsoft Excel Spreadsheet"),

    // NESTRUKTUIRANI FORMATI
    new Format( "txt", "Text file"),
    new Format( "docx", "Microsoft Word Open XML Document"),

  ].forEach(f => db.formats[f.id] = f);

}

/**
 * Load licenses.
 */
function loadLicenses(db) {
  [
    // OPEN LICENSES, BUT NOT RECOMMENDED
    new License( "pd", "Public domain"),

    // CLOSED LICENSES
    new License( "n/a", "No license"),

  ].forEach(l => db.licenses[l.id] = l);
}

/**
 * Load organizations.
 */
function loadOrgs(db) {
  [
    new Org( "gov", "Government"),

    new Org( "ngo", "Non-government organization")

  ].forEach(o => db.orgs[o.id] = o);
}

/**
 * Database.
 */
class Database {

  constructor() {
    this.resources = [];
    this.datasets = {};
    this.owners = {};

    this.licenses = {};
    this.formats = {};
    this.orgs = {};

    this.sources = {};

    this.date = util.toDateTimeString(new Date());

    loadFormats(this);
    loadLicenses(this);
    loadOrgs(this);
  }

  merge(db) {
    this.resources = [...this.resources, ...db.resources];
    this.datasets = {...this.datasets, ...db.datasets};
    this.owners = {...this.owners, ...db.owners};
    this.sources = {...this.sources, ...db.sources};
  }

}

module.exports = Database;
