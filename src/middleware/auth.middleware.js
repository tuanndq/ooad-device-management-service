const jwt = require("jsonwebtoken");
const { User } = require("../database");
const SECRET_STRING = process.env.SECRET_STRING;

const AuthMiddleware = async (req, res, next) => {
  const { authorization } = req.headers;
  try {
    const token = authorization.replace("Bearer ", "");
    const decoded = jwt.decode(token, SECRET_STRING);
    const user = await User.findOne({
      where: { id: decoded.id },
      attributes: ["id", "username", "status"],
    });
    req.user = user;
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ message: "Unauthorization." });
  }
};

module.exports = AuthMiddleware;
