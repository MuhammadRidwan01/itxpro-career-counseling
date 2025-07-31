const { PrismaClient } = require("@prisma/client")
const bcrypt = require("bcryptjs")

const prisma = new PrismaClient()

async function verifyDatabase() {
  try {
    console.log("🔍 Verifying database connection and data...\n")

    // Test database connection
    await prisma.$connect()
    console.log("✅ Database connection successful")

    // Check users table
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        role: true,
        password: true,
      },
    })

    console.log(`\n📊 Found ${users.length} users in database:`)

    for (const user of users) {
      console.log(`\n👤 User: ${user.email}`)
      console.log(`   Role: ${user.role}`)
      console.log(`   ID: ${user.id}`)

      // Test password for admin
      if (user.role === "ADMIN") {
        const adminTest = await bcrypt.compare("admin123", user.password)
        console.log(`   Password 'admin123' test: ${adminTest ? "✅ VALID" : "❌ INVALID"}`)
      }

      // Test password for student
      if (user.role === "STUDENT") {
        const studentTest = await bcrypt.compare("student123", user.password)
        console.log(`   Password 'student123' test: ${studentTest ? "✅ VALID" : "❌ INVALID"}`)
      }
    }

    // Check siswa table
    const siswa = await prisma.siswa.findMany({
      select: {
        nis: true,
        nama: true,
        email: true,
        user: {
          select: {
            id: true,
            role: true,
          },
        },
      },
    })

    console.log(`\n🎓 Found ${siswa.length} siswa in database:`)
    siswa.forEach((s) => {
      console.log(
        `   NIS: ${s.nis} | Name: ${s.nama} | Email: ${s.email} | User: ${s.user ? "Connected" : "Not Connected"}`,
      )
    })
  } catch (error) {
    console.error("❌ Database error:", error)
  } finally {
    await prisma.$disconnect()
  }
}

verifyDatabase()
