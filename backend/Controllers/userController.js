const userModel = require("../Models/userModel");

const registerUser = async (req, res) => {
  const { fullName, userName, email, password, avatar } = req.body;
  try {
    const existingUser = await userModel.findOne({ email: email });
    if (existingUser) {
      return res
        .status(200)
        .send({ success: false, message: "User Already Exist Please Login" });
    }

    const salt = 10;
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new userModel({
      fullName,
      userName,
      email,
      password: hashedPassword,
      avatar,
    });
    await user.save();
    return res
      .status(200)
      .send({ success: true, message: "User Register Successful", user });
  } catch (error) {
    return res
      .status(500)
      .send({ success: false, message: "Error in Registaration", error });
  }
};
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: "User Not Found" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).send({ message: "Invalid Email or Password" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return res.status(200).send({
      message: "User Login Success",
      user: {
        fullName: user.fullName,
        userName: user.userName,
        email: user.email,
        _id: user._id,
      },
      token,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Login Failed You are getting Error",
      error,
    });
  }
};
const forgotPassword = async (req, res) => {};
const updateUser = async (req, res) => {};
const deleteUser = async (req, res) => {};

module.exports = {
  registerUser,
  loginUser,
  forgotPassword,
  updateUser,
  deleteUser,
};
