// Middleware per gestire gli errori che vengono lanciati nell'applicazione.
// Controlla se l'errore ha un codice di stato e un messaggio, se li ha,
// invia il messaggio di errore con il codice di stato.
function errorsHandler(err, _, res, _) {
  if (err && err.statusCode && err.message) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  return res.status(500).json({ message: "Internal server error" });
}

module.exports = errorsHandler;
