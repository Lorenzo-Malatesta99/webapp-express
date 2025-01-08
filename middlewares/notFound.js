function notFound(_, res) {
  res.json({
    error: "Not Found",
    message: "pagina non trovata",
  });
}

module.exports = notFound;
