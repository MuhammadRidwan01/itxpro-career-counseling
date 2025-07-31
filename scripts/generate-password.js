const bcrypt = require("bcryptjs")

async function generatePasswords() {
  console.log("Generating password hashes...\n")

  // Password untuk admin: admin123
  const adminPassword = await bcrypt.hash("admin123", 12)
  console.log("Admin password hash (admin123):")
  console.log(adminPassword)
  console.log("")

  // Password untuk student: student123
  const studentPassword = await bcrypt.hash("student123", 12)
  console.log("Student password hash (student123):")
  console.log(studentPassword)
  console.log("")

  // Test verification
  console.log("Testing admin password verification:")
  console.log(await bcrypt.compare("admin123", adminPassword))

  console.log("Testing student password verification:")
  console.log(await bcrypt.compare("student123", studentPassword))
}

generatePasswords().catch(console.error)
