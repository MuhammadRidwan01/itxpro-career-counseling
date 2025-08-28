import { PrismaClient, Prisma, StatusKonseling } from '@/generated/prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

type Environment = 'development' | 'test' | 'production'

async function createAdmin(environment: Environment) {
  const adminPassword = environment === 'production' 
    ? process.env.ADMIN_PASSWORD || 'bushildi123'
    : 'admin123'
  
  const hash = await bcrypt.hash(adminPassword, 12)
  
  await prisma.user.upsert({
  where: { email: 'admin@itxpro.sch.id' },
  update: {
    password: hash,
    role: 'ADMIN',
  },
  create: {
    id: 'admin_001',
    email: 'admin@itxpro.sch.id',
    password: hash,
    role: 'ADMIN',
  },
})
}

async function main() {
  try {
    const environment = (process.env.NODE_ENV || 'development') as Environment
    console.log(`🌱 Starting seed process in ${environment} environment...`)
    
    // Create admin user for both environments
    await createAdmin(environment)
    console.log('✅ Admin user created successfully')

    // Stop here if we're in production
    if (environment === 'production') {
      console.log('🔄 Skipping development data in production environment')
      console.log('✅ Seed completed successfully!')
      return
    }
    
    console.log('🔄 Seeding development data...')

    // Student data seeding
    const studentData = [
      { nis: '232410005', nama: 'ALHIKAM DIRGA RAMADHAN', kelas: 'XII RPL 1', jurusan: 'RPL', angkatan: 2023, tahunLulus: 2026 },
      { nis: '232410010', nama: 'CITRA ANNISA TOURSINA TRIWIJAYA', kelas: 'XII RPL 1', jurusan: 'RPL', angkatan: 2023, tahunLulus: 2026 },
      // ... more student data ...
    ]

    for (const student of studentData) {
      try {
        await prisma.siswa.upsert({
          where: { nis: student.nis },
          update: {},
          create: {
            nis: student.nis,
            nama: student.nama,
            kelasSaatIni: student.kelas,
            angkatan: student.angkatan,
            jurusan: student.jurusan,
            status: 'AKTIF',
            tahunLulusTarget: student.tahunLulus,
          },
        })
        console.log(`Created student: ${student.nama} (${student.nis})`)
      } catch (error) {
        if (error instanceof Error) {
          console.error(`Error creating student ${student.nis}:`, error.message)
        } else {
          console.error(`Error creating student ${student.nis}:`, error)
        }
      }
    }

    // Counseling data with correct status
    const counselingData = [
      {
        id: 'konseling_001',
        nisSiswa: '232410005',
        tanggalKonseling: new Date('2024-01-15T10:00:00Z'),
        hasilText: 'Siswa menunjukkan minat yang besar terhadap bidang programming dan teknologi.',
        deskripsi: 'Memiliki kemampuan logika yang baik dan kemampuan analisis yang kuat.',
        tindakLanjut: 'Direkomendasikan untuk melanjutkan ke perguruan tinggi jurusan Teknik Informatika.',
        status: StatusKonseling.SELESAI,
        kategori: 'karir',
        adminId: 'admin_001',
      },
      // ... more counseling data with StatusKonseling.SELESAI ...
    ]

    try {
      await prisma.hasilKonseling.createMany({
        skipDuplicates: true,
        data: counselingData,
      })
      console.log('Created sample counseling data')
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error creating counseling data:', error.message)
      } else {
        console.error('Error creating counseling data:', error)
      }
    }

    console.log('✅ Seed completed successfully!')
  } catch (error) {
    console.error('❌ Seed failed:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

// Run the seed function
main().catch((e) => {
  console.error(e)
  process.exit(1)
})
