const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: "No autorizado. Por favor, inicia sesión." });
};

module.exports = { isAuthenticated };