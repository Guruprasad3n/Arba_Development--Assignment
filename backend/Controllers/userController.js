const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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

    const defaultAvatar =
      "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Image.png";
    const userAvatar = avatar || defaultAvatar;

    const user = new userModel({
      fullName,
      userName,
      email,
      password: hashedPassword,
      avatar: userAvatar,
    });
    await user.save();
    return res.status(200).send({
      success: true,
      message: "User Register Successful",
      user: {
        fullName: user.fullName,
        userName: user.userName,
        email: user.email,
        userId: user._id,
      },
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: "Error in Registration", error });
  }
};
const loginUser = async (req, res) => {
  const { userName, password } = req.body;
  try {
    const user = await userModel.findOne({ userName });
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
      success: true,
      message: "User Login Success",
      user: {
        fullName: user.fullName,
        userName: user.userName,
        email: user.email,
        avatar: user.avatar,
        _id: user._id,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Login Failed You are getting Error",
      error,
    });
  }
};
const forgotPassword = async (req, res) => {
  const { email, userName, newPassword } = req.body;
  try {
    const user = await userModel.findOne({ email, userName });
    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: "User Not Found" });
    }

    const salt = 10;
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    await user.save();

    return res.status(200).send({
      success: true,
      message: "Password reset successful",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Failed to reset password",
      error,
    });
  }
};
const updateUser = async (req, res) => {
  const userId = req.params.userId;
  const { fullName, avatar, newPassword } = req.body;

  try {
    const user = await userModel.findById(userId);
    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: "User not found" });
    }
    if (fullName) {
      user.fullName = fullName;
    }
    if (avatar) {
      user.avatar = avatar;
    }

    if (newPassword) {
      const salt = 10;
      const hashedPassword = await bcrypt.hash(newPassword, salt);
      user.password = hashedPassword;
    }

    await user.save();

    const updatedUser = {
      fullName: user.fullName,
      email: user.email,
      avatar: user.avatar,
      userName: user.userName,
      _id: user._id,
    };

    return res.status(200).send({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: "Failed to update profile", error });
  }
};

const getUserById = async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await userModel.findById(userId);
    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: "User not found" });
    }

    const userData = {
      fullName: user.fullName,
      userName: user.userName,
      email: user.email,
      avatar: user.avatar,
      _id: user._id,
    };

    return res.status(200).send({
      success: true,
      message: "User found successfully",
      user: userData,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: "Failed to fetch user", error });
  }
};

const deleteUser = async (req, res) => {
  const userId = req.user.userId;
  try {
    const deletedUser = await userModel.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res
        .status(404)
        .send({ success: false, message: "User Not Found" });
    }
    return res.status(200).send({
      success: true,
      message: "User Deleted successfully",
      deletedUser,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: "Failed to Delete User", error });
  }
};

module.exports = {
  registerUser,
  loginUser,
  forgotPassword,
  updateUser,
  getUserById,
  deleteUser,
};
