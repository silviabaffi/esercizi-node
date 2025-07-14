// The newsEvent object continuously emits three different events: newsEvent, breakingNews and error
// Attach event listeners for each event and log out their data.

import { EventEmitter } from "node:events";

function createNewsFeed() {
  const emitter = new EventEmitter();

  setInterval(() => {
    emitter.emit("newsEvent", "News: A thing happened in a place.");
  }, 1000);

  setInterval(() => {
    emitter.emit("breakingNews", "Breaking news! A BIG thing happened.");
  }, 4000);

  setTimeout(() => {
    emitter.emit("error", new Error("News feed connection error"));
  }, 5000);

  return emitter;
}

newsFeed.on("newsEvent", (value) => {
  console.log("Received: ", value);
});

newsFeed.on("breakingNews", (value) => {
  console.log("Received: ", value);
});

newsFeed.on("error", (value) => {
  console.log("Received: ", value);
});

const newsFeed = createNewsFeed();
