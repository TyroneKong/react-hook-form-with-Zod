const express = require("express");
const app = express();
const cors = require("cors");
const todoRoute = require("./routes/todoRoute");

app.use(cors());
app.use(express.json());

app.use("/", todoRoute);

app.listen(8001, () => {
  console.log("listening on port 8001");
});
