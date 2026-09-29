const cron = require("node-cron");
const User = require("../model/userModel");

cron.schedule("* * * * *", async () => {
  try {
    console.log("Checking expired users...");
    const result = await User.deleteMany({
      expiresAt: { $lt: new Date() },
    });

    console.log(`${result.deletedCount} expired users deleted`);
  } catch (error) {
    console.error("Cron error:", error);
  }
});
