// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)
const xlsx = require("node-xlsx").default;
const fs = require("fs");
const path = require("path");
const sqlServer = require("cypress-sql-server");
const dbConfig = require("../../cypress.json");
const mysql = require("mysql");

const makeEmailAccount = require("./email-account");

function queryTestDb(query, config) {
  // creates a new mysql connection using credentials from cypress.json env's
  const connection = mysql.createConnection(dbConfig.dbmysql);
  // start connection to db
  connection.connect();
  // exec query + disconnect to db as a Promise
  return new Promise((resolve, reject) => {
    connection.query(query, (error, results) => {
      if (error) reject(error);
      else {
        connection.end();
        // console.log(results)
        return resolve(results);
      }
    });
  });
}

module.exports = async (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  tasks = sqlServer.loadDBPlugin(dbConfig.db);
  on("task", tasks);
  on("task", {
    queryDb: (query) => {
      return queryTestDb(query, config);
    },
  });

  on("task", {
    parseXlsx({ filePath }) {
      return new Promise((resolve, reject) => {
        try {
          const jsonData = xlsx.parse(fs.readFileSync(filePath));
          resolve(jsonData);
        } catch (e) {
          reject(e);
        }
      });
    },
  });

  const emailAccount = await makeEmailAccount();

  on("task", {
    getUserEmail() {
      return emailAccount.email;
    },
    getPass() {
      return emailAccount.pass;
    },

    getLastEmail() {
      return emailAccount.getLastEmail();
    },
  });

  // important: return the changed config
  return config;
};

// module.exports = async (on, config) => {
//   const emailAccount = await makeEmailAccount();

//   on("task", {
//     getUserEmail() {
//       return emailAccount.email;
//     },

//     getLastEmail() {
//       return emailAccount.getLastEmail();
//     },
//   });

//   // important: return the changed config
//   return config;
// };
