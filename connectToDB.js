const DB_CONNECT = process.env.DB_CONNECT;
const mongoose = require("mongoose");

mongoose.connect(DB_CONNECT);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "conection error:"));
db.once("open", () => {
  console.log("Database conected");
});
