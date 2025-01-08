const express = require("express");
const app = express();
const port = 3000;
const notFound = require("./middlewares/notFound");
const errorsHandler = require("./middlewares/errorsHandler");
const filmRouter = require("./routers/filmrouter");



app.use(express.static("public"));

app.get("/", (_, res) => {
  res.send("Hello World");
});

app.use("/api/films", filmRouter);

app.use(errorsHandler);

app.use(notFound);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
