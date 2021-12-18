const jwt = require("jsonwebtoken");

const authToken = (req, res, next) => {
  // İsteğin header'ından authorizationdaki Bearer Token'i alıp verify ettiğimiz yer:
  const authHeader = req.headers["authorization"];
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    if (token) {
      // Token'ın kontrolünün sağlandığı yer
      jwt.verify(token, "tokensecretkey", (err, user) => {
        if (err) {
          return res.status(403).send("JWT hatalı");
        } else {
          req.user = user.user;
          next();
        }
      });
    } else {
      res.sendStatus(403);
    }
  } else {
    res.status(403).send("Token gerekli.");
  }
};

module.exports = { authToken };
