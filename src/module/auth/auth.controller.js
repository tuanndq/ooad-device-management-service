const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../../database");

const SECRET_STRING = process.env.SECRET_STRING;
const GEN_SAIL = process.env.GEN_SAIL;

const AuthController = {
  login: async (req, res) => {
    const { username, password } = req.body;
    try {
      const user = await User.findOne({
        where: {
          username,
        },
      });
      if (!user) {
        throw new Error(`User with username = ${username} not exists.`);
      }

      const checkPassword = await bcrypt.compare(password, user.password);

      if (!checkPassword) {
        throw new Error("Password incorrect.");
      }

      const accessToken = this.genarateToken(user.id);

      return res.status(200).json({
        ...user,
        token: accessToken,
      });
    } catch (err) {
      console.log(err);
      return res.status(401).json({ message: `Login error.` });
    }
  },

  register: async (req, res) => {
    const { username, password } = req.body;
    try {
      const checkUser = await User.findOne({
        where: { username },
      });

      if (checkUser) {
        throw new Error("Username exists.");
      }

      const hashPassword = await bcrypt.hash(password, GEN_SAIL);

      const user = new User({
        username,
        password: hashPassword,
      });

      await user.save();

      return res.status(200).json(user);
    } catch (err) {
      console.log(err);
      return res.status(401).json({ message: `Register error.` });
    }
  },

  genarateToken: (userId) => {
    return jwt.sign(userId, SECRET_STRING);
  },
};

module.exports = AuthController;
