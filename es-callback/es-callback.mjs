import { writeFile } from "node:fs";

const encoding = { encoding: "utf8" };

const callback = (err) => {
  if (err) {
    console.log("Errore: ", err);
    return null;
  } else {
    console.log("File letto con successo");
  }
};

writeFile("./cb-data.txt", "Hello!", encoding, callback)
