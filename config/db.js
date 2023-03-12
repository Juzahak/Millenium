const mysql = require("serverless-mysql")();
mysql.config({
  host: "rex.serverbr11.com",
  database: "papoula_site",
  user: "papoula_site",
  password: "as_07as14z9",
});

const executeQuery = (query, arraParms) => {
  return new Promise((resolve, reject) => {
    try {
      mysql.query(query, arraParms, (err, data) => {
        if (err) {
          console.log("error in executing the query");
          reject(err);
        }
        resolve(data);
      });
    } catch (err) {
      console.log("error on log database");
      reject(err);
    }
  });
};

module.exports = { executeQuery };