const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("STORELUCK API ONLINE");
});

app.use("/check", require("./routes/check"));

app.listen(3000, () => console.log("API ON"));