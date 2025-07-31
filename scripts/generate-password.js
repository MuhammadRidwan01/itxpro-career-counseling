const bcrypt = require("bcryptjs")

async function generatePassword(password) {
  const salt = await bcrypt.genSalt(12)
  const hash = await bcrypt.hash(password, salt)
  console.log(`Password: ${password}`)
  console.log(`Hash: ${hash}`)
  return hash
}

// Generate hash untuk password default
generatePassword("admin123")
generatePassword("student123")
