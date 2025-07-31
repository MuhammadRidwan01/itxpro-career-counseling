const bcrypt = require("bcryptjs")

async function testPasswords() {
  const adminHash = "$2a$12$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi"
  const studentHash = "$2a$12$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi"

  console.log("Testing password hashes...\n")

  console.log("Admin login test:")
  console.log("admin123 vs hash:", await bcrypt.compare("admin123", adminHash))

  console.log("\nStudent login test:")
  console.log("student123 vs hash:", await bcrypt.compare("student123", studentHash))

  console.log("\nWrong password test:")
  console.log("wrongpass vs hash:", await bcrypt.compare("wrongpass", adminHash))
}

testPasswords().catch(console.error)
