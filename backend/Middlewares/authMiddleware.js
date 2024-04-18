const jwt = require("jsonwebtoken");

const requireSignIn = async (req, res, next) => {
  try {
    const decode = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.user = decode;
    next();
  } catch (e) {
    console.log(e, "Expaired");
    return res
      .status(500)
      .send({
        success: false,
        message: "Error in Signin Or JWT Expaired",
      });
  }
};
module.exports = requireSignIn;
