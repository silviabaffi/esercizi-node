import db from "./db.js";

async function setupDb() {
  await db.none(`
        DROP TABLE IF EXISTS planets;

        CREATE TABLE planets (
            id SERIAL NOT NULL PRIMARY KEY,
            name TEXT NOT NULL,
            image TEXT
        );

        DROP TABLE IF EXISTS users;

        CREATE TABLE users (
          id SERIAL NOT NULL PRIMARY KEY,
          username TEXT NOT NULL,
          password TEXT NOT NULL,
          token TEXT
        )
    `);

  await db.none("INSERT INTO planets (name) VALUES ('Earth'), ('Mars')");
  await db.none(
    "INSERT INTO users (username, password) VALUES ('Silvia', 'ciao123')"
  );
  console.log("Setup DB completato");
}

export default setupDb;
