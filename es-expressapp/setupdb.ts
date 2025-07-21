import db from "./db.js";

async function setupDb() {
  await db.none(`
        DROP TABLE IF EXISTS planets;

        CREATE TABLE planets (
            id SERIAL NOT NULL PRIMARY KEY,
            name TEXT NOT NULL
        )
    `);

  await db.none("INSERT INTO planets (name) VALUES ('Earth'), ('Mars')");
  console.log("Setup DB completato");
}

export default setupDb;
