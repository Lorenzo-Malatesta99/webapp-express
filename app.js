const express = require("express");
const app = express();
const port = 3000;
const notFound = require("./middlewares/notFound");
const errorsHandler = require("./middlewares/errorsHandler");
const filmRouter = require("./routers/filmrouter");
const path = require("path");
const cors = require("cors");

app.use(cors()); //cors
app.use(express.json()); //body parser

app.use(express.static("public")); //static files
app.use(express.static(path.join(__dirname, "public"))); //static files

app.get("/", (_, res) => {
  res.send("Hello World");  //send
});

app.use("/api/films", filmRouter);

app.use(notFound);

app.use(errorsHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
