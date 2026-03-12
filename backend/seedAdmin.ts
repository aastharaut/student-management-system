// import dotenv from "dotenv";
// dotenv.config(); // Load environment variables from .env
// import sequelize from "./connections/database";
// import User from "./models/User";

// async function seedAdmin() {
//   try {
//     await sequelize.authenticate();
//     console.log("Database connected.");
//     const adminEmail = process.env.ADMIN_EMAIL!;
//     const adminPassword = process.env.ADMIN_PASSWORD!;
//     if (!adminEmail || !adminPassword) {
//       throw new Error("ADMIN_EMAIL or ADMIN_PASSWORD not set in environment");
//     }
//     // Check if admin already exists
//     const existingAdmin = await User.findOne({ where: { email: adminEmail } });
//     if (existingAdmin) {
//       console.log("Admin already exists. Skipping creation.");
//       return;
//     }
//     await User.create({
//       firstName: "Aastha",
//       lastName: "Raut",
//       email: adminEmail,
//       password: adminPassword,
//       age: 30,
//       course: "Administration",
//       roles: "admin",
//       profilePicture: null,
//     });

//     console.log("Admin user created successfully.");
//   } catch (err) {
//     console.error("Error seeding admin:", err);
//   } finally {
//     await sequelize.close();
//   }
// }
// seedAdmin();
