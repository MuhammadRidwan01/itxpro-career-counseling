const bcrypt = require("bcryptjs")

async function generateRealHashes() {
  console.log("Generating REAL password hashes...\n")

  try {
    // Generate hash untuk admin123
    console.log("Generating hash for 'admin123'...")
    const adminHash = await bcrypt.hash("admin123", 12)
    console.log("Admin hash:", adminHash)

    // Test admin hash
    const adminTest = await bcrypt.compare("admin123", adminHash)
    console.log("Admin test result:", adminTest)
    console.log("")

    // Generate hash untuk student123
    console.log("Generating hash for 'student123'...")
    const studentHash = await bcrypt.hash("student123", 12)
    console.log("Student hash:", studentHash)

    // Test student hash
    const studentTest = await bcrypt.compare("student123", studentHash)
    console.log("Student test result:", studentTest)
    console.log("")

    // Generate hash untuk password sederhana: 123456
    console.log("Generating hash for '123456'...")
    const simpleHash = await bcrypt.hash("123456", 12)
    console.log("Simple hash:", simpleHash)

    // Test simple hash
    const simpleTest = await bcrypt.compare("123456", simpleHash)
    console.log("Simple test result:", simpleTest)
    console.log("")

    // Generate SQL untuk update
    console.log("SQL untuk update admin password (admin123):")
    console.log(`UPDATE "users" SET "password" = '${adminHash}' WHERE "email" = 'admin@itxpro.sch.id';`)
    console.log("")

    console.log("SQL untuk update student password (student123):")
    console.log(`UPDATE "users" SET "password" = '${studentHash}' WHERE "role" = 'STUDENT';`)
    console.log("")

    console.log("SQL untuk update semua password ke 123456:")
    console.log(`UPDATE "users" SET "password" = '${simpleHash}';`)
  } catch (error) {
    console.error("Error:", error)
  }
}

generateRealHashes()
