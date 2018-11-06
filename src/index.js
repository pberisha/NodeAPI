const express = require("express");
const mongoose = require("mongoose");
const PORT = 8080;
const HOST = "0.0.0.0";

const app = express();

app.get("/", (req, res) => {
  const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    autoIndex: false, // Don't build indexes
    reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0,
    connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4 // Use IPv4, skip trying IPv6
  };

  mongoose.connect(
    "mongodb://root:example@mongo:27017/local",
    options
  );

  const Cat = mongoose.model("Cat", { name: String });

  const kitty = new Cat({ name: "Zildjian" });
  kitty.save().then(() => console.log("meow"));

  res.send("Hello world, How its Going?\n");
});

app.listen(PORT);
console.log(`Running on http://${HOST}:${PORT}`);
