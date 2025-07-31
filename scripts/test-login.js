const bcrypt = require("bcryptjs")

async function testPasswords() {
  console.log("Testing password hashes...\n")

  // Generate hash untuk admin123
  const adminHash = await bcrypt.hash("admin123", 12)
  console.log("Admin password hash for 'admin123':")
  console.log(adminHash)

  // Test admin password
  const adminTest = await bcrypt.compare("admin123", adminHash)
  console.log("Admin password test:", adminTest)
  console.log("")

  // Generate hash untuk student123
  const studentHash = await bcrypt.hash("student123", 12)
  console.log("Student password hash for 'student123':")
  console.log(studentHash)

  // Test student password
  const studentTest = await bcrypt.compare("student123", studentHash)
  console.log("Student password test:", studentTest)
  console.log("")

  // Test dengan hash yang ada di database
  const existingHash = "$2a$12$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi"
  console.log("Testing existing hash with different passwords:")
  console.log("admin123:", await bcrypt.compare("admin123", existingHash))
  console.log("student123:", await bcrypt.compare("student123", existingHash))
  console.log("password:", await bcrypt.compare("password", existingHash))
  console.log("hello:", await bcrypt.compare("hello", existingHash))
}

testPasswords().catch(console.error)
