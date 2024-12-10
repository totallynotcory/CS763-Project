
const csrfTokenRoute = (req, res) => {
  const csrfToken = generateToken(req, res);
  res.json({ csrfToken });
};


module.exports = csrfTokenRoute;