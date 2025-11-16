// events.js
import EventEmitter from "events";

const eventSystem = new EventEmitter();

// Register listeners
eventSystem.on("userLoggedIn", (user) => {
  console.log(`User ${user} logged in.`);
});

eventSystem.on("userLoggedOut", (user) => {
  console.log(`User ${user} logged out.`);
});

// Bonus – sessionExpired
eventSystem.on("sessionExpired", (user) => {
  console.log(`Session expired for ${user}.`);
});

// Emit events
eventSystem.emit("userLoggedIn", "John");

setTimeout(() => {
  eventSystem.emit("userLoggedOut", "John");
}, 2000);

setTimeout(() => {
  eventSystem.emit("sessionExpired", "John");
}, 5000);
