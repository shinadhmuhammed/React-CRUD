const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  let token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: Missing token' });
  }

 
  if (token.startsWith('Bearer ')) {
    token = token.slice(7);
  } else {
    return res.status(401).json({ message: 'Unauthorized: Invalid token format' });
  }

  jwt.verify(token, 'shinadhmk', (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }

    req.user = decoded;
    next();
  });
};

module.exports = { verifyToken };
