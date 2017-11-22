const path = require('path');

const app = require('../src/app');

const env = process.env.NODE_ENV || 'development',
    dialect = 'sqlite';

let url = app.get(dialect);

if (dialect === 'sqlite') {
  // Change url to absolute path
  url = 'sqlite://' + path.resolve( url.replace('sqlite://', '') );
}

module.exports = {
  [env]: {
    dialect,
    url,
    migrationStorageTableName: '_migrations'
  }
};