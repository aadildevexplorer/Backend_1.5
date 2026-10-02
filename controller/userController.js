const expressAsyncHandler = require("express-async-handler");
const User = require("../model/userModel");

const createUser = expressAsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({
      error: "Please fill all details",
    });
  }
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(409).json({
      error: "User Already Exist",
    });
  }

  const user = await User.create({
    name,
    email,
    password,
      expiresAt: new Date(Date.now() + 60 * 1000),

  });

  res.status(201).json({
    success: true,
    message: "User Created Successfully",
    data: {
      id: user._id,
      name: user.name,
      email: user.email,
      password: user.password,
    },
  });
});

const updateUser = expressAsyncHandler(async (req, res) => {
  const { name, email } = req.body;
  const user = await User.findById(req.params.id);

  user.name = name;
  user.email = email;

  const updatedUser = await user.save();

  res.status(200).json({
    success: true,
    message: "User Updated Successfully",
    data: {
      id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
    },
  });
});

const getUsers = expressAsyncHandler(async (req, res) => {
  const All_Users = await User.find();
  res.status(200).json({
    success: true,
    count: All_Users.length,
    data: All_Users,
  });
});

const deleteUser = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404).json({ error: "User not found" });
  }

  await user?.deleteOne();

  res.status(200).json({
    success: true,
    message: "User deleted Successfully",
  });
});

module.exports = {
  createUser,
  updateUser,
  getUsers,
  deleteUser,
};
