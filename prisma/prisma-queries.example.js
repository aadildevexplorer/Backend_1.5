const prisma = require("../config/prisma");

// 1. CREATE — User create karna
const newUser = await prisma.user.create({
  data: {
    name: "Aadil",
    email: "aadil@gmail.com",
    password: "123456",
  },
});

// 2. FIND MANY — Saare users lana
const users = await prisma.user.findMany();

// 3. FIND UNIQUE — Unique field se user find karna
const user = await prisma.user.findUnique({
  where: { email: "aadil@gmail.com" },
});

// 4. FIND FIRST — Pehla matching user
const firstUser = await prisma.user.findFirst({
  where: { name: "Aadil" },
});

// 5. UPDATE — User update karna
const updatedUser = await prisma.user.update({
  where: { email: "aadil@gmail.com" },
  data: { name: "Mohammad Aadil" },
});

// 6. DELETE — Ek user delete karna
const deletedUser = await prisma.user.delete({
  where: { email: "aadil@gmail.com" },
});

// 7. UPSERT — Exist kare to update, warna create
const upsertUser = await prisma.user.upsert({
  where: { email: "aadil@gmail.com" },
  update: { name: "Aadil Khan" },
  create: {
    name: "Aadil Khan",
    email: "aadil@gmail.com",
    password: "123456",
  },
});

// 8. SELECT — Specific fields lana
const selectedUsers = await prisma.user.findMany({
  select: {
    id: true,
    name: true,
    email: true,
  },
});

// 9. WHERE — Condition ke saath search
const filteredUsers = await prisma.user.findMany({
  where: { name: { contains: "Aad" } },
});

// 10. ORDER BY — Sorting
const sortedUsers = await prisma.user.findMany({
  orderBy: { name: "asc" }, // "desc" = reverse order
});

// 11. TAKE & SKIP — Pagination
const paginatedUsers = await prisma.user.findMany({
  skip: 0,
  take: 10,
});

// 12. COUNT — Total users count
const totalUsers = await prisma.user.count();

// 13. UPDATE MANY — Multiple users update
const updatedMany = await prisma.user.updateMany({
  where: { name: "Aadil" },
  data: { name: "Aadil Khan" },
});

// 14. DELETE MANY — Multiple users delete
const deletedMany = await prisma.user.deleteMany({
  where: { name: "Aadil" },
});
