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
    new Format("csv", "Comma-Separated Values"),
    new Format("json", "JSON"),
    new Format("xml", "XML"),
    new Format("kmz", "Keyhole Markup language Zipped"),
    new Format("kml", "Keyhole Markup language"),
    new Format("gpx", "GPS Exchange Format"),

    // OTVORENI, TEŽE ČITLJIVI
    new Format("xlsx", "Microsoft Excel Open XML Spreadsheet"),
    new Format("ods", "OpenOffice spreadsheet"),
    new Format("shp", "Shapefile shape"),
    new Format("shx", "Shapefile index"),
    new Format("dbf", "Shapefile attribute"),

    // OTVORENI, NEČITLJIVI
    new Format("zip", "ZIP archive"),
    new Format("xlsm", "Microsoft Excel Open XML Macro-Enabled Spreadsheet"),

    // ZATVORENI
    new Format("xls", "Microsoft Excel Spreadsheet"),

    // NESTRUKTUIRANI FORMATI
    new Format("txt", "Text file"),
    new Format("docx", "Microsoft Word Open XML Document"),
    new Format("html", "HTML"),

  ].forEach(f => db.formats[f.id] = f);

}

/**
 * Load licenses.
 */
function loadLicenses(db) {
  [
    // RECOMMENDED
    new License("CC0", "Creative Commons CCZero"),
    new License("PDDL", "Open Data Commons Public Domain Dedication and Licence"),
    new License("CC-BY-4.0", "Creative Commons Attribution 4.0"),
    new License("ODC-BY", "Open Data Commons Attribution License"),
    new License("CC-BY-SA-4.0", "Creative Commons Attribution Share-Alike 4.0"),
    new License("ODbL", "Open Data Commons Open Database License"),

    // CONFORMANT, BUT NOT RECOMMENDED
    new License("PD", "Public domain"),

    // CLOSED LICENSES
    new License("N/A", "No license"),

  ].forEach(l => db.licenses[l.id] = l);
}

/**
 * Load organizations.
 */
function loadOrgs(db) {
  [
    new Org( "gov", "Government"),

    new Org( "ngo", "Non-government organization"),

    new Org( "user", "Individual user")

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
