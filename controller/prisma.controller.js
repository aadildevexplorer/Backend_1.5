const expressAsyncHandler = require("express-async-handler");
const prisma = require("../config/prisma");

const createUser = expressAsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(404);
    throw new Error("Please fill details");
  }

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password,
    },
  });

  res.status(201).json({
    msg: "User created from prisma",
    name: user.name,
    email: user.email,
    password: user.password,
    id: user._id,
  });
});

const getUsers = expressAsyncHandler(async (req, res) => {
  const All_User = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
    },
  });
  res.status(201).json({
    success: true,
    count: All_User.length,
    data: All_User,
  });
});

module.exports = {
  createUser,
  getUsers,
};
