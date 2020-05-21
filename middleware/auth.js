const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if no token
  if (!token) {
    return res.status(400).json({ msg: 'No token, authorization denied.' });
  }

  // verify token
  try {
    // decodes the token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedToken.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: 'Token is not valid.' });
  }
};
