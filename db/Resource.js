"use strict";

class Resource {

  constructor(id, url, title, description, format, license, datasetId, ownerId, sourceId, createdAt, lastModified) {
    this.id = id;
    this.url = url;
    this.title = title;
    this.description = description;
    this.format = format;
    this.license = license;
    this.datasetId = datasetId;
    this.ownerId = ownerId;
    this.sourceId = sourceId;
    this.createdAt = createdAt;
    this.lastModified = lastModified;
  }
}

module.exports = Resource;
