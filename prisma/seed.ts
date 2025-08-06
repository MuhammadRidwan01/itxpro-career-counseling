import { PrismaClient } from '@/generated/prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const environment = process.env.NODE_ENV || 'development'
  
  // Create admin user for both environments
  const adminPassword = environment === 'production' 
    ? process.env.ADMIN_PASSWORD || 'change_this_in_production'
    : 'admin123'
    
  const adminHash = await bcrypt.hash(adminPassword, 12)
  
  await prisma.user.upsert({
    where: { email: 'admin@itxpro.sch.id' },
    update: {},
    create: {
      id: 'admin_001',
      email: 'admin@itxpro.sch.id',
      password: adminHash,
      role: 'ADMIN',
    },
  })

  // Only seed development data if not in production
  if (environment !== 'production') {
    const studentPassword = await bcrypt.hash('student123', 12)
    
    // COMPLETE student data from your Excel file - PRIORITIZING ALL CLASS XII STUDENTS
    const studentData = [
      // ===== KELAS XII RPL 1 - COMPLETE DATA =====
      { nis: '232410005', nama: 'ALHIKAM DIRGA RAMADHAN', kelas: 'XII RPL 1', jurusan: 'RPL', angkatan: 2023, tahunLulus: 2026 },
      { nis: '232410010', nama: 'CITRA ANNISA TOURSINA TRIWIJAYA', kelas: 'XII RPL 1', jurusan: 'RPL', angkatan: 2023, tahunLulus: 2026 },
      { nis: '232410016', nama: 'FADHLY ACHMAD', kelas: 'XII RPL 1', jurusan: 'RPL', angkatan: 2023, tahunLulus: 2026 },
      { nis: '232410017', nama: 'FARRAS GHALYANDRA', kelas: 'XII RPL 1', jurusan: 'RPL', angkatan: 2023, tahunLulus: 2026 },
      { nis: '232410035', nama: 'KHAYLA AULIA RAMADHANI', kelas: 'XII RPL 1', jurusan: 'RPL', angkatan: 2023, tahunLulus: 2026 },
      { nis: '232410042', nama: 'MOHAMAD ARLEYXA SYARIF', kelas: 'XII RPL 1', jurusan: 'RPL', angkatan: 2023, tahunLulus: 2026 },
      { nis: '232410048', nama: 'MUHAMMAD ARIFKY WILDAN', kelas: 'XII RPL 1', jurusan: 'RPL', angkatan: 2023, tahunLulus: 2026 },
      { nis: '232410052', nama: 'MUHAMMAD DWIKY RAMADHAN', kelas: 'XII RPL 1', jurusan: 'RPL', angkatan: 2023, tahunLulus: 2026 },
      { nis: '232410053', nama: 'MUHAMMAD ESA PUNGKY KRISTANTO', kelas: 'XII RPL 1', jurusan: 'RPL', angkatan: 2023, tahunLulus: 2026 },
      { nis: '232410064', nama: 'MUHAMMAD RIDWAN', kelas: 'XII RPL 1', jurusan: 'RPL', angkatan: 2023, tahunLulus: 2026 },
      { nis: '232410066', nama: 'MUHAMMAD THOIFUR ALHASAN', kelas: 'XII RPL 1', jurusan: 'RPL', angkatan: 2023, tahunLulus: 2026 },
      { nis: '232410072', nama: 'NASHAT AKRAM', kelas: 'XII RPL 1', jurusan: 'RPL', angkatan: 2023, tahunLulus: 2026 },
      { nis: '232410073', nama: 'NAUFAL BAGASKARA BUDIHUTAMA', kelas: 'XII RPL 1', jurusan: 'RPL', angkatan: 2023, tahunLulus: 2026 },
      { nis: '232410075', nama: 'NUGRAHA ALGEIO FIRIZKI SUBARJI', kelas: 'XII RPL 1', jurusan: 'RPL', angkatan: 2023, tahunLulus: 2026 },
      { nis: '232410078', nama: 'PIERRE MAYSAR AL ZHEYREY', kelas: 'XII RPL 1', jurusan: 'RPL', angkatan: 2023, tahunLulus: 2026 },
      { nis: '232410088', nama: 'RASYA ISKANDAR', kelas: 'XII RPL 1', jurusan: 'RPL', angkatan: 2023, tahunLulus: 2026 },
      { nis: '232410090', nama: 'REVAN FAHRIANSYAH LAKSONO', kelas: 'XII RPL 1', jurusan: 'RPL', angkatan: 2023, tahunLulus: 2026 },
      { nis: '232410093', nama: 'SALMAN SYARIEF', kelas: 'XII RPL 1', jurusan: 'RPL', angkatan: 2023, tahunLulus: 2026 },
      { nis: '232410094', nama: 'SHAFIRA RIZKIA RAMADHANI', kelas: 'XII RPL 1', jurusan: 'RPL', angkatan: 2023, tahunLulus: 2026 },
      { nis: '232410095', nama: 'SHAIMA QUEENA MELFA', kelas: 'XII RPL 1', jurusan: 'RPL', angkatan: 2023, tahunLulus: 2026 },
      { nis: '232410098', nama: 'VANYA NUR SHAUMY GINANJAR', kelas: 'XII RPL 1', jurusan: 'RPL', angkatan: 2023, tahunLulus: 2026 },

      // ===== KELAS XII RPL 2 - COMPLETE DATA =====
      { nis: '232410007', nama: 'ARDHIKA RADITYA MUHAMMAD AL-AZIZI TUMANGGOR', kelas: 'XII RPL 2', jurusan: 'RPL', angkatan: 2023, tahunLulus: 2026 },
      { nis: '232410009', nama: 'AUFA IRFAN ADLI', kelas: 'XII RPL 2', jurusan: 'RPL', angkatan: 2023, tahunLulus: 2026 },
      { nis: '232410013', nama: 'DAFFA RAFIF RAMADHAN', kelas: 'XII RPL 2', jurusan: 'RPL', angkatan: 2023, tahunLulus: 2026 },
      { nis: '232410015', nama: 'FADHLAN PUTRA PAMUNGKAS', kelas: 'XII RPL 2', jurusan: 'RPL', angkatan: 2023, tahunLulus: 2026 },
      { nis: '232410021', nama: 'FAYYADH', kelas: 'XII RPL 2', jurusan: 'RPL', angkatan: 2023, tahunLulus: 2026 },
      { nis: '232410025', nama: 'GEVIRA NURFATIMAH', kelas: 'XII RPL 2', jurusan: 'RPL', angkatan: 2023, tahunLulus: 2026 },
      { nis: '232410027', nama: 'GUFRON WICAKSONO', kelas: 'XII RPL 2', jurusan: 'RPL', angkatan: 2023, tahunLulus: 2026 },
      { nis: '232410031', nama: 'KAFKA ALBIZARD', kelas: 'XII RPL 2', jurusan: 'RPL', angkatan: 2023, tahunLulus: 2026 },
      { nis: '232410039', nama: 'MADYAN ARASHY', kelas: 'XII RPL 2', jurusan: 'RPL', angkatan: 2023, tahunLulus: 2026 },
      { nis: '232410045', nama: 'MUHAMMAD ABDAN SYAKURO', kelas: 'XII RPL 2', jurusan: 'RPL', angkatan: 2023, tahunLulus: 2026 },
      { nis: '232410046', nama: 'MUHAMMAD ALTHAAF BASYSYAR', kelas: 'XII RPL 2', jurusan: 'RPL', angkatan: 2023, tahunLulus: 2026 },
      { nis: '232410055', nama: 'MUHAMMAD FARREL ALVIDI', kelas: 'XII RPL 2', jurusan: 'RPL', angkatan: 2023, tahunLulus: 2026 },
      { nis: '232410058', nama: 'MUHAMMAD MIKAIL ALI KARTADIYASA', kelas: 'XII RPL 2', jurusan: 'RPL', angkatan: 2023, tahunLulus: 2026 },
      { nis: '232410076', nama: 'NUR FAUZIAH', kelas: 'XII RPL 2', jurusan: 'RPL', angkatan: 2023, tahunLulus: 2026 },
      { nis: '232410077', nama: 'PANJI WASKITO ADHI', kelas: 'XII RPL 2', jurusan: 'RPL', angkatan: 2023, tahunLulus: 2026 },
      { nis: '232410084', nama: 'RAEVANDHANI FATTAN PURNAMA SYARIF', kelas: 'XII RPL 2', jurusan: 'RPL', angkatan: 2023, tahunLulus: 2026 },
      { nis: '232410086', nama: 'RAIHANAH MEUTHIA NISMARA', kelas: 'XII RPL 2', jurusan: 'RPL', angkatan: 2023, tahunLulus: 2026 },
      { nis: '232410101', nama: 'MOHAMMAD IBNU KHALID', kelas: 'XII RPL 2', jurusan: 'RPL', angkatan: 2023, tahunLulus: 2026 },
      { nis: '232410104', nama: 'MUHAMMAD AL FATHI AHYAN', kelas: 'XII RPL 2', jurusan: 'RPL', angkatan: 2023, tahunLulus: 2026 },

      // ===== KELAS XII TKJ - COMPLETE DATA =====
      { nis: '232410001', nama: 'ABDUL HAKAM SYAKUR', kelas: 'XII TKJ', jurusan: 'TKJ', angkatan: 2023, tahunLulus: 2026 },
      { nis: '232410002', nama: 'AHMAD ZAIDAN ZIDNA FANN', kelas: 'XII TKJ', jurusan: 'TKJ', angkatan: 2023, tahunLulus: 2026 },
      { nis: '232410003', nama: 'AL FADRY RAMADHAN', kelas: 'XII TKJ', jurusan: 'TKJ', angkatan: 2023, tahunLulus: 2026 },
      { nis: '232410012', nama: 'DAFA AHMAD RIFQI', kelas: 'XII TKJ', jurusan: 'TKJ', angkatan: 2023, tahunLulus: 2026 },
      { nis: '232410019', nama: 'FAT\'HUL HAFIZH SABARI', kelas: 'XII TKJ', jurusan: 'TKJ', angkatan: 2023, tahunLulus: 2026 },
      { nis: '232410026', nama: 'GIRINDRA BAYU MAULANA', kelas: 'XII TKJ', jurusan: 'TKJ', angkatan: 2023, tahunLulus: 2026 },
      { nis: '232410030', nama: 'JOVAN ERICKSON HUTAPEA', kelas: 'XII TKJ', jurusan: 'TKJ', angkatan: 2023, tahunLulus: 2026 },
      { nis: '232410037', nama: 'LELLY ARUM DHANY', kelas: 'XII TKJ', jurusan: 'TKJ', angkatan: 2023, tahunLulus: 2026 },
      { nis: '232410041', nama: 'MOCHAMMAD ERZA MAFADZA', kelas: 'XII TKJ', jurusan: 'TKJ', angkatan: 2023, tahunLulus: 2026 },
      { nis: '232410043', nama: 'MOHAMMED KHOIRUL AZZAM AL MUFATHIR', kelas: 'XII TKJ', jurusan: 'TKJ', angkatan: 2023, tahunLulus: 2026 },
      { nis: '232410054', nama: 'MUHAMMAD FAHRI AQBAR', kelas: 'XII TKJ', jurusan: 'TKJ', angkatan: 2023, tahunLulus: 2026 },
      { nis: '232410056', nama: 'MUHAMMAD FATHIN HABIBURRAHMAN', kelas: 'XII TKJ', jurusan: 'TKJ', angkatan: 2023, tahunLulus: 2026 },
      { nis: '232410059', nama: 'MUHAMMAD NAUFAL FIRDAUS', kelas: 'XII TKJ', jurusan: 'TKJ', angkatan: 2023, tahunLulus: 2026 },
      { nis: '232410060', nama: 'MUHAMMAD PUTRA AKBAR SETIAJI', kelas: 'XII TKJ', jurusan: 'TKJ', angkatan: 2023, tahunLulus: 2026 },
      { nis: '232410063', nama: 'MUHAMMAD REVAN ZAILAS', kelas: 'XII TKJ', jurusan: 'TKJ', angkatan: 2023, tahunLulus: 2026 },
      { nis: '232410065', nama: 'MUHAMMAD RYO DWIPUTRA', kelas: 'XII TKJ', jurusan: 'TKJ', angkatan: 2023, tahunLulus: 2026 },
      { nis: '232410068', nama: 'MUHAMMAD ZULFAN RIZQULLAH', kelas: 'XII TKJ', jurusan: 'TKJ', angkatan: 2023, tahunLulus: 2026 },
      { nis: '232410079', nama: 'PRASAYU GITA NASTITI', kelas: 'XII TKJ', jurusan: 'TKJ', angkatan: 2023, tahunLulus: 2026 },
      { nis: '232410085', nama: 'RAFID FADHLURRAHMAN ANWAR', kelas: 'XII TKJ', jurusan: 'TKJ', angkatan: 2023, tahunLulus: 2026 },
      { nis: '232410087', nama: 'RASYA FAKHREZA', kelas: 'XII TKJ', jurusan: 'TKJ', angkatan: 2023, tahunLulus: 2026 },
      { nis: '232410096', nama: 'TEGUH PRASETYA', kelas: 'XII TKJ', jurusan: 'TKJ', angkatan: 2023, tahunLulus: 2026 },
      { nis: '232410102', nama: 'RESTU DIAN PRIAMITRA', kelas: 'XII TKJ', jurusan: 'TKJ', angkatan: 2023, tahunLulus: 2026 },
      { nis: '232410103', nama: 'FERDHY RIZKI IRMANSYAH', kelas: 'XII TKJ', jurusan: 'TKJ', angkatan: 2023, tahunLulus: 2026 },
      { nis: '242511105', nama: 'ATHARRIZQI MUHARDILLAH', kelas: 'XII TKJ', jurusan: 'TKJ', angkatan: 2023, tahunLulus: 2026 },

      // ===== KELAS XII DKV - COMPLETE DATA =====
      { nis: '232410006', nama: 'ANDIKA SATRIO PRADANA', kelas: 'XII DKV', jurusan: 'DKV', angkatan: 2023, tahunLulus: 2026 },
      { nis: '232410008', nama: 'ATHALA ASSYARIF SANHAPY', kelas: 'XII DKV', jurusan: 'DKV', angkatan: 2023, tahunLulus: 2026 },
      { nis: '232410020', nama: 'FAUZIYAH NUR ROSIDAH', kelas: 'XII DKV', jurusan: 'DKV', angkatan: 2023, tahunLulus: 2026 },
      { nis: '232410022', nama: 'FIELDHA KENZANIA EDAMA', kelas: 'XII DKV', jurusan: 'DKV', angkatan: 2023, tahunLulus: 2026 },
      { nis: '232410023', nama: 'FIRAS FADILO HENDHARTO', kelas: 'XII DKV', jurusan: 'DKV', angkatan: 2023, tahunLulus: 2026 },
      { nis: '232410024', nama: 'GALANG SANDYAWAN SAMUDRA', kelas: 'XII DKV', jurusan: 'DKV', angkatan: 2023, tahunLulus: 2026 },
      { nis: '232410028', nama: 'IRSYAF RESKI ERIANDY', kelas: 'XII DKV', jurusan: 'DKV', angkatan: 2023, tahunLulus: 2026 },
      { nis: '232410029', nama: 'JENINA AZ ZAHRANI ARIEF', kelas: 'XII DKV', jurusan: 'DKV', angkatan: 2023, tahunLulus: 2026 },
      { nis: '232410032', nama: 'KAYLA SABRINA KURNIAWAN', kelas: 'XII DKV', jurusan: 'DKV', angkatan: 2023, tahunLulus: 2026 },
      { nis: '232410033', nama: 'KEISHA MAHARANI FARA PUTRI', kelas: 'XII DKV', jurusan: 'DKV', angkatan: 2023, tahunLulus: 2026 },
      { nis: '232410034', nama: 'KEISHA RIZQILLAH', kelas: 'XII DKV', jurusan: 'DKV', angkatan: 2023, tahunLulus: 2026 },
      { nis: '232410036', nama: 'KIRANA PUTRI MAULANI', kelas: 'XII DKV', jurusan: 'DKV', angkatan: 2023, tahunLulus: 2026 },
      { nis: '232410038', nama: 'LUTH RANDALL SUMANTRI', kelas: 'XII DKV', jurusan: 'DKV', angkatan: 2023, tahunLulus: 2026 },
      { nis: '232410040', nama: 'MOCHAMAD SATRIA AZRY HAZWAN', kelas: 'XII DKV', jurusan: 'DKV', angkatan: 2023, tahunLulus: 2026 },
      { nis: '232410047', nama: 'MUHAMMAD AQMAL ZAFRIAN NADZARI', kelas: 'XII DKV', jurusan: 'DKV', angkatan: 2023, tahunLulus: 2026 },
      { nis: '232410049', nama: 'MUHAMMAD BANYU BASKORO', kelas: 'XII DKV', jurusan: 'DKV', angkatan: 2023, tahunLulus: 2026 },
      { nis: '232410050', nama: 'MUHAMMAD DAFFA UMAR ALFARIDZI', kelas: 'XII DKV', jurusan: 'DKV', angkatan: 2023, tahunLulus: 2026 },
      { nis: '232410057', nama: 'MUHAMMAD HAIKAL AL-FATIH', kelas: 'XII DKV', jurusan: 'DKV', angkatan: 2023, tahunLulus: 2026 },
      { nis: '232410061', nama: 'MUHAMMAD RAFLI AKBAR', kelas: 'XII DKV', jurusan: 'DKV', angkatan: 2023, tahunLulus: 2026 },
      { nis: '232410062', nama: 'MUHAMMAD RAIHAN', kelas: 'XII DKV', jurusan: 'DKV', angkatan: 2023, tahunLulus: 2026 },
      { nis: '232410069', nama: 'NABIL AL MUCHRIS', kelas: 'XII DKV', jurusan: 'DKV', angkatan: 2023, tahunLulus: 2026 },
      { nis: '232410070', nama: 'NADZIFA ZAKIRAH PRIHADI', kelas: 'XII DKV', jurusan: 'DKV', angkatan: 2023, tahunLulus: 2026 },
      { nis: '232410071', nama: 'NAJLA KARAMINA PRIHADI', kelas: 'XII DKV', jurusan: 'DKV', angkatan: 2023, tahunLulus: 2026 },
      { nis: '232410074', nama: 'NIZAAR SHAQUILLE BAINURI', kelas: 'XII DKV', jurusan: 'DKV', angkatan: 2023, tahunLulus: 2026 },
      { nis: '232410081', nama: 'PUTRI KAYLA', kelas: 'XII DKV', jurusan: 'DKV', angkatan: 2023, tahunLulus: 2026 },
      { nis: '232410082', nama: 'PUTRI MUMTAZ MAJEEDAH NURUL MUSHOFA', kelas: 'XII DKV', jurusan: 'DKV', angkatan: 2023, tahunLulus: 2026 },
      { nis: '232410083', nama: 'RADYA RABBANI NARESHWARA', kelas: 'XII DKV', jurusan: 'DKV', angkatan: 2023, tahunLulus: 2026 },
      { nis: '232410089', nama: 'RENDY ARVA MARENDRA', kelas: 'XII DKV', jurusan: 'DKV', angkatan: 2023, tahunLulus: 2026 },
      { nis: '232410091', nama: 'REZQITA CITTANAILA NUGRAHA', kelas: 'XII DKV', jurusan: 'DKV', angkatan: 2023, tahunLulus: 2026 },
      { nis: '232410097', nama: 'TIA PUSPITA RAMADHANI', kelas: 'XII DKV', jurusan: 'DKV', angkatan: 2023, tahunLulus: 2026 },
      { nis: '232410099', nama: 'ZULVICAR NUR SALADIN', kelas: 'XII DKV', jurusan: 'DKV', angkatan: 2023, tahunLulus: 2026 },
      { nis: '232410100', nama: 'MUHAMMAD IBNU SULTHAN KANUN', kelas: 'XII DKV', jurusan: 'DKV', angkatan: 2023, tahunLulus: 2026 },

      // ===== SAMPLE DATA FROM OTHER CLASSES (for testing) =====
      // Kelas XI (Sample students)
      { nis: '242510005', nama: 'AKSAJRENO FATHUKHOTIR HAYU', kelas: 'XI 1', jurusan: 'UMUM', angkatan: 2024, tahunLulus: 2027 },
      { nis: '242510001', nama: 'AHMAD AZZAM MOZARIST', kelas: 'XI 2', jurusan: 'UMUM', angkatan: 2024, tahunLulus: 2027 },
      { nis: '242510003', nama: 'AHMAD SATTAR FATHULLOH', kelas: 'XI 3', jurusan: 'UMUM', angkatan: 2024, tahunLulus: 2027 },
      
      // Kelas X (Sample students)
      { nis: '252610002', nama: 'ABYAKTA DIMAS MAHARDIKA', kelas: 'X 1', jurusan: 'UMUM', angkatan: 2025, tahunLulus: 2028 },
      { nis: '252610005', nama: 'ALMEER SYAIRAZI BADHOWI', kelas: 'X 1', jurusan: 'UMUM', angkatan: 2025, tahunLulus: 2028 },
      { nis: '252610006', nama: 'ALVARO RAFKA SAPUTRA', kelas: 'X 2', jurusan: 'UMUM', angkatan: 2025, tahunLulus: 2028 },
      { nis: '252610007', nama: 'ALVIN NADHIF MAULANA', kelas: 'X 2', jurusan: 'UMUM', angkatan: 2025, tahunLulus: 2028 },
      { nis: '252610001', nama: 'ABBAD NAILUN NABHAN', kelas: 'X 3', jurusan: 'UMUM', angkatan: 2025, tahunLulus: 2028 },
    ]

    for (const student of studentData) {
      try {
        // Create only siswa record without user account
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
        console.error(`Error creating student ${student.nis}:`, error.message)
      }
    }

    // Enhanced counseling data with more XII students
    const counselingData = [
      // RPL Students
      {
        id: 'konseling_001',
        nisSiswa: '232410005', // ALHIKAM DIRGA RAMADHAN - XII RPL 1
        tanggalKonseling: new Date('2024-01-15T10:00:00Z'),
        hasilText: 'Siswa menunjukkan minat yang besar terhadap bidang programming dan teknologi.',
        deskripsi: 'Memiliki kemampuan logika yang baik dan kemampuan analisis yang kuat.',
        tindakLanjut: 'Direkomendasikan untuk melanjutkan ke perguruan tinggi jurusan Teknik Informatika atau langsung bekerja sebagai Software Developer.',
        status: 'SUDAH' as const,
        kategori: 'karir',
        adminId: 'admin_001',
      },
      {
        id: 'konseling_002',
        nisSiswa: '232410010', // CITRA ANNISA TOURSINA TRIWIJAYA - XII RPL 1
        tanggalKonseling: new Date('2024-01-18T09:30:00Z'),
        hasilText: 'Siswa perempuan dengan kemampuan programming yang sangat baik.',
        deskripsi: 'Menunjukkan pemahaman mendalam tentang konsep pemrograman dan analisis sistem.',
        tindakLanjut: 'Direkomendasikan untuk melanjutkan kuliah di bidang Teknik Informatika atau Systems Information. Memiliki potensi untuk menjadi System Analyst.',
        status: 'SUDAH' as const,
        kategori: 'karir',
        adminId: 'admin_001',
      },
      {
        id: 'konseling_003',
        nisSiswa: '232410048', // MUHAMMAD ARIFKY WILDAN - XII RPL 1
        tanggalKonseling: new Date('2024-01-22T14:00:00Z'),
        hasilText: 'Siswa memiliki minat tinggi terhadap mobile development.',
        deskripsi: 'Menunjukkan kemampuan dan dedikasi dalam pengembangan aplikasi mobile.',
        tindakLanjut: 'Cocok untuk mengembangkan karir di bidang Mobile App Developer atau melanjutkan kuliah dengan fokus Mobile Computing.',
        status: 'BELUM' as const,
        kategori: 'karir',
        adminId: 'admin_001',
      },
      {
        id: 'konseling_004',
        nisSiswa: '232410007', // ARDHIKA RADITYA MUHAMMAD AL-AZIZI TUMANGGOR - XII RPL 2
        tanggalKonseling: new Date('2024-01-25T11:15:00Z'),
        hasilText: 'Siswa menunjukkan kemampuan leadership yang baik dalam tim programming.',
        deskripsi: 'Memiliki kemampuan komunikasi dan manajemen tim yang baik.',
        tindakLanjut: 'Direkomendasikan untuk mengambil peran Project Manager atau melanjutkan kuliah dengan minor di bidang manajemen.',
        status: 'SUDAH' as const,
        kategori: 'karir',
        adminId: 'admin_001',
      },
      {
        id: 'konseling_005',
        nisSiswa: '232410025', // GEVIRA NURFATIMAH - XII RPL 2
        tanggalKonseling: new Date('2024-01-28T13:45:00Z'),
        hasilText: 'Siswa perempuan dengan kemampuan UI/UX Design yang menonjol selain programming.',
        deskripsi: 'Menunjukkan pemahaman yang baik tentang prinsip desain dan pengalaman pengguna.',
        tindakLanjut: 'Cocok untuk Frontend Developer atau UI/UX Designer. Direkomendasikan kuliah Desain Komunikasi Visual atau Informatika.',
        status: 'SUDAH' as const,
        kategori: 'karir',
        adminId: 'admin_001',
      },

      // DKV Students
      {
        id: 'konseling_006',
        nisSiswa: '232410020', // FAUZIYAH NUR ROSIDAH - XII DKV
        tanggalKonseling: new Date('2024-01-20T09:15:00Z'),
        hasilText: 'Siswa memiliki bakat seni yang menonjol, terutama dalam desain grafis dan ilustrasi.',
        deskripsi: 'Menunjukkan kreativitas tinggi dan pemahaman mendalam tentang prinsip desain.',
        tindakLanjut: 'Direkomendasikan untuk melanjutkan studi di bidang Desain Komunikasi Visual atau Seni Rupa dengan fokus pada digital art.',
        status: 'BELUM' as const,
        kategori: 'karir',
        adminId: 'admin_001',
      },
      {
        id: 'konseling_007',
        nisSiswa: '232410032', // KAYLA SABRINA KURNIAWAN - XII DKV
        tanggalKonseling: new Date('2024-02-01T10:30:00Z'),
        hasilText: 'Siswa menunjukkan kemampuan yang sangat baik dalam motion graphics dan video editing.',
        deskripsi: 'Memiliki pemahaman yang kuat tentang pergerakan visual dan storytelling.',
        tindakLanjut: 'Cocok untuk berkarir sebagai Motion Graphics Designer atau Video Editor. Disarankan kuliah di bidang Broadcasting atau DKV.',
        status: 'SUDAH' as const,
        kategori: 'karir',
        adminId: 'admin_001',
      },
      {
        id: 'konseling_008',
        nisSiswa: '232410047', // MUHAMMAD AQMAL ZAFRIAN NADZARI - XII DKV
        tanggalKonseling: new Date('2024-02-03T14:20:00Z'),
        hasilText: 'Siswa memiliki minat dan bakat dalam bidang fotografi dan desain visual.',
        deskripsi: 'Menunjukkan kreativitas dan pemahaman yang baik tentang komposisi visual.',
        tindakLanjut: 'Potensi untuk menjadi Creative Director atau Photographer. Direkomendasikan kuliah DKV atau Fotografi.',
        status: 'BELUM' as const,
        kategori: 'karir',
        adminId: 'admin_001',
      },

      // TKJ Students
      {
        id: 'konseling_009',
        nisSiswa: '232410001', // ABDUL HAKAM SYAKUR - XII TKJ
        tanggalKonseling: new Date('2024-01-25T14:30:00Z'),
        hasilText: 'Siswa menunjukkan minat terhadap networking dan sistem komputer.',
        deskripsi: 'Memiliki kemampuan troubleshooting yang baik dan pemahaman mendalam tentang infrastruktur jaringan.',
        tindakLanjut: 'Cocok untuk melanjutkan ke jurusan Teknik Komputer atau langsung bekerja di bidang IT Support/Network Administrator.',
        status: 'SUDAH' as const,
        kategori: 'karir',
        adminId: 'admin_001',
      },
      {
        id: 'konseling_010',
        nisSiswa: '232410026', // GIRINDRA BAYU MAULANA - XII TKJ
        tanggalKonseling: new Date('2024-02-05T09:00:00Z'),
        hasilText: 'Siswa memiliki ketertarikan tinggi terhadap cybersecurity dan network security.',
        deskripsi: 'Menunjukkan pemahaman yang baik tentang konsep keamanan sistem dan jaringan.',
        tindakLanjut: 'Direkomendasikan untuk melanjutkan kuliah di bidang Keamanan Siber atau Teknik Informatika dengan fokus security.',
        status: 'SUDAH' as const,
        kategori: 'karir',
        adminId: 'admin_001',
      },
      {
        id: 'konseling_011',
        nisSiswa: '232410054', // MUHAMMAD FAHRI AQBAR - XII TKJ
        tanggalKonseling: new Date('2024-02-07T11:30:00Z'),
        hasilText: 'Siswa menunjukkan kemampuan yang baik dalam server administration dan cloud computing.',
        deskripsi: 'Memiliki pemahaman yang kuat tentang manajemen sistem dan infrastruktur cloud.',
        tindakLanjut: 'Cocok untuk berkarir sebagai System Administrator atau Cloud Engineer.',
        status: 'SUDAH' as const,
        kategori: 'karir',
        adminId: 'admin_001',
      },

      // Additional counseling for various students
      {
        id: 'konseling_012',
        nisSiswa: '242510005', // AKSAJRENO FATHUKHOTIR HAYU - XI 1
        tanggalKonseling: new Date('2024-02-01T11:00:00Z'),
        hasilText: 'Siswa kelas XI masih dalam tahap eksplorasi minat.',
        deskripsi: 'Menunjukkan ketertarikan terhadap bidang teknologi tetapi masih mencari fokus spesifik.',
        tindakLanjut: 'Perlu bimbingan lebih lanjut untuk menentukan pilihan jurusan yang sesuai dengan bakat dan minatnya.',
        status: 'BELUM' as const,
        kategori: 'akademik',
        adminId: 'admin_001',
      },
      {
        id: 'konseling_013',
        nisSiswa: '252610002', // ABYAKTA DIMAS MAHARDIKA - X 1
        tanggalKonseling: new Date('2024-02-05T08:45:00Z'),
        hasilText: 'Siswa baru kelas X menunjukkan adaptasi yang baik.',
        deskripsi: 'Memiliki minat terhadap bidang teknologi dan menunjukkan kemampuan adaptasi yang baik.',
        tindakLanjut: 'Direkomendasikan untuk mengikuti kegiatan ekstrakurikuler coding atau robotika untuk mengembangkan minat dan bakat.',
        status: 'BELUM' as const,
        kategori: 'sosial',
        adminId: 'admin_001',
      },
      {
        id: 'konseling_014',
        nisSiswa: '232410076', // NUR FAUZIAH - XII RPL 2
        tanggalKonseling: new Date('2024-02-10T10:15:00Z'),
        hasilText: 'Siswa perempuan dengan kemampuan database management yang sangat baik.',
        deskripsi: 'Menunjukkan pemahaman yang kuat tentang manajemen basis data dan analisis data.',
        tindakLanjut: 'Cocok untuk berkarir sebagai Database Administrator atau Data Analyst. Direkomendasikan kuliah Sistem Informasi.',
        status: 'SUDAH' as const,
        kategori: 'karir',
        adminId: 'admin_001',
      },
      {
        id: 'konseling_015',
        nisSiswa: '232410069', // NABIL AL MUCHRIS - XII DKV
        tanggalKonseling: new Date('2024-02-12T13:30:00Z'),
        hasilText: 'Siswa memiliki kemampuan 3D modeling yang menonjol.',
        deskripsi: 'Menunjukkan kreativitas dan pemahaman teknis yang baik dalam pemodelan 3D.',
        tindakLanjut: 'Potensi besar untuk berkarir di industri game development atau animation. Disarankan kuliah Game Development atau Animation.',
        status: 'SUDAH' as const,
        kategori: 'karir',
        adminId: 'admin_001',
      },
    ]

    try {
      await prisma.hasilKonseling.createMany({
        skipDuplicates: true,
        data: counselingData,
      })
      console.log('Created sample counseling data')
    } catch (error: any) {
      if (error instanceof Error) {
        console.error('Error creating counseling data:', error.message)
      } else {
        console.error('Error creating counseling data:', error)
      }
    }

    // Comprehensive career goals for XII students (graduating class) - FIXED to match your model
    const careerGoals = [
      // RPL Students Career Goals - KULIAH
      {
        id: 'tujuan_001',
        nisSiswa: '232410005', // ALHIKAM DIRGA RAMADHAN - XII RPL 1
        kategoriUtama: 'kuliah',
        ptn1: 'Universitas Indonesia',
        jurusan1: 'Teknik Informatika',
        ptn2: 'Institut Teknologi Bandung',
        jurusan2: 'Sistem dan Teknologi Informasi',
        ptn3: 'Universitas Gadjah Mada',
        jurusan3: 'Ilmu Komputer',
      },
      {
        id: 'tujuan_002',
        nisSiswa: '232410010', // CITRA ANNISA TOURSINA TRIWIJAYA - XII RPL 1
        kategoriUtama: 'kuliah',
        ptn1: 'Institut Teknologi Bandung',
        jurusan1: 'Teknik Informatika',
        ptn2: 'Universitas Indonesia',
        jurusan2: 'Sistem Informasi',
        ptn3: 'Institut Teknologi Sepuluh Nopember',
        jurusan3: 'Informatika',
      },
      {
        id: 'tujuan_003',
        nisSiswa: '232410016', // FADHLY ACHMAD - XII RPL 1
        kategoriUtama: 'kuliah',
        ptn1: 'Universitas Gadjah Mada',
        jurusan1: 'Teknik Informatika',
        ptn2: 'Institut Teknologi Sepuluh Nopember',
        jurusan2: 'Informatika',
        ptn3: 'Universitas Brawijaya',
        jurusan3: 'Teknik Informatika',
      },
      {
        id: 'tujuan_004',
        nisSiswa: '232410007', // ARDHIKA RADITYA MUHAMMAD AL-AZIZI TUMANGGOR - XII RPL 2
        kategoriUtama: 'kuliah',
        ptn1: 'Universitas Indonesia',
        jurusan1: 'Sistem Informasi',
        ptn2: 'Institut Teknologi Bandung',
        jurusan2: 'Sistem dan Teknologi Informasi',
        ptn3: 'Universitas Padjadjaran',
        jurusan3: 'Teknik Informatika',
      },
      {
        id: 'tujuan_005',
        nisSiswa: '232410025', // GEVIRA NURFATIMAH - XII RPL 2
        kategoriUtama: 'kuliah',
        ptn1: 'Institut Seni Budaya Indonesia',
        jurusan1: 'Desain Komunikasi Visual',
        ptn2: 'Universitas Negeri Jakarta',
        jurusan2: 'Teknik Informatika',
        ptn3: 'Universitas Pendidikan Indonesia',
        jurusan3: 'Pendidikan Teknologi Informasi',
      },
      {
        id: 'tujuan_006',
        nisSiswa: '232410076', // NUR FAUZIAH - XII RPL 2
        kategoriUtama: 'kuliah',
        ptn1: 'Universitas Indonesia',
        jurusan1: 'Sistem Informasi',
        ptn2: 'Universitas Brawijaya',
        jurusan2: 'Sistem Informasi',
        ptn3: 'Universitas Diponegoro',
        jurusan3: 'Sistem Informasi',
      },

      // DKV Students Career Goals - KULIAH
      {
        id: 'tujuan_007',
        nisSiswa: '232410020', // FAUZIYAH NUR ROSIDAH - XII DKV
        kategoriUtama: 'kuliah',
        ptn1: 'Institut Seni Budaya Indonesia',
        jurusan1: 'Desain Komunikasi Visual',
        ptn2: 'Universitas Negeri Jakarta',
        jurusan2: 'Pendidikan Seni Rupa',
        ptn3: 'Institut Teknologi Bandung',
        jurusan3: 'Seni Rupa',
      },
      {
        id: 'tujuan_008',
        nisSiswa: '232410032', // KAYLA SABRINA KURNIAWAN - XII DKV
        kategoriUtama: 'bekerja',
        detailBekerja: 'Bekerja sebagai Motion Graphics Designer di studio kreatif atau agency periklanan. Fokus pada pembuatan animasi untuk iklan TV, media sosial, dan video promosi. Rencana jangka panjang untuk membuka studio animasi sendiri.',
      },
      {
        id: 'tujuan_009',
        nisSiswa: '232410047', // MUHAMMAD AQMAL ZAFRIAN NADZARI - XII DKV
        kategoriUtama: 'wirausaha',
        detailWirausaha: 'Membuka studio fotografi dan desain grafis. Fokus pada wedding photography, corporate branding, dan digital marketing design. Target pasar: UMKM dan startup di wilayah Jabodetabek.',
      },
      {
        id: 'tujuan_010',
        nisSiswa: '232410069', // NABIL AL MUCHRIS - XII DKV
        kategoriUtama: 'kuliah',
        ptn1: 'Institut Teknologi Bandung',
        jurusan1: 'Seni Rupa',
        ptn2: 'Institut Seni Budaya Indonesia',
        jurusan2: 'Animasi',
        ptn3: 'Universitas Negeri Jakarta',
        jurusan3: 'Pendidikan Seni Rupa',
      },

      // TKJ Students Career Goals - Mixed
      {
        id: 'tujuan_011',
        nisSiswa: '232410001', // ABDUL HAKAM SYAKUR - XII TKJ
        kategoriUtama: 'bekerja',
        detailBekerja: 'Bekerja sebagai Network Administrator di perusahaan IT atau ISP. Fokus pada maintenance server, troubleshooting network, dan network security. Rencana kuliah sambil kerja setelah 2-3 tahun pengalaman.',
      },
      {
        id: 'tujuan_012',
        nisSiswa: '232410026', // GIRINDRA BAYU MAULANA - XII TKJ
        kategoriUtama: 'kuliah',
        ptn1: 'Institut Teknologi Bandung',
        jurusan1: 'Teknik Informatika',
        ptn2: 'Universitas Indonesia',
        jurusan2: 'Ilmu Komputer',
        ptn3: 'Institut Teknologi Sepuluh Nopember',
        jurusan3: 'Teknik Informatika',
      },
      {
        id: 'tujuan_013',
        nisSiswa: '232410054', // MUHAMMAD FAHRI AQBAR - XII TKJ
        kategoriUtama: 'bekerja',
        detailBekerja: 'Bekerja sebagai System Administrator di perusahaan multinasional. Fokus pada server management, cloud computing (AWS/Azure), dan DevOps. Target sertifikasi: CompTIA Server+, AWS Certified Solutions Architect.',
      },
      {
        id: 'tujuan_014',
        nisSiswa: '232410002', // AHMAD ZAIDAN ZIDNA FANN - XII TKJ
        kategoriUtama: 'bekerja',
        detailBekerja: 'Bekerja sebagai IT Support Specialist di perusahaan teknologi. Melayani troubleshooting hardware/software, maintenance komputer, dan user support. Rencana sertifikasi CompTIA A+ dan Network+.',
      },
      {
        id: 'tujuan_015',
        nisSiswa: '232410019', // FAT'HUL HAFIZH SABARI - XII TKJ
        kategoriUtama: 'kuliah',
        ptn1: 'Politeknik Negeri Jakarta',
        jurusan1: 'Teknik Informatika',
        ptn2: 'Politeknik Elektronika Negeri Surabaya',
        jurusan2: 'Teknik Komputer',
        ptn3: 'Politeknik Negeri Bandung',
        jurusan3: 'Teknik Komputer dan Informatika',
      },

      // Additional students from different classes
      {
        id: 'tujuan_016',
        nisSiswa: '232410006', // ANDIKA SATRIO PRADANA - XII DKV
        kategoriUtama: 'bekerja',
        detailBekerja: 'Bekerja sebagai Graphic Designer di agency periklanan atau in-house designer di perusahaan. Fokus pada brand identity, packaging design, dan digital marketing materials.',
      },
      {
        id: 'tujuan_017',
        nisSiswa: '232410008', // ATHALA ASSYARIF SANHAPY - XII DKV
        kategoriUtama: 'kuliah',
        ptn1: 'Institut Teknologi Bandung',
        jurusan1: 'Seni Rupa',
        ptn2: 'Universitas Negeri Jakarta',
        jurusan2: 'Pendidikan Seni Rupa',
        ptn3: 'Institut Seni Budaya Indonesia',
        jurusan3: 'Desain Komunikasi Visual',
      },
      {
        id: 'tujuan_018',
        nisSiswa: '232410048', // MUHAMMAD ARIFKY WILDAN - XII RPL 1
        kategoriUtama: 'bekerja',
        detailBekerja: 'Bekerja sebagai Mobile App Developer (Android/iOS). Fokus pada pengembangan aplikasi native dan cross-platform menggunakan Flutter/React Native. Target bergabung dengan startup teknologi.',
      },
      {
        id: 'tujuan_019',
        nisSiswa: '232410003', // AL FADRY RAMADHAN - XII TKJ
        kategoriUtama: 'bekerja',                 detailBekerja: 'Bekerja sebagai Network Technician di ISP atau perusahaan telekomunikasi. Fokus pada instalasi, maintenance, dan troubleshooting infrastruktur jaringan. Rencana kuliah D3 sambil kerja.',
      },
      {
        id: 'tujuan_020',
        nisSiswa: '232410022', // FIELDHA KENZANIA EDAMA - XII DKV
        kategoriUtama: 'kuliah',
        ptn1: 'Institut Seni Budaya Indonesia',
        jurusan1: 'Desain Interior',
        ptn2: 'Universitas Negeri Jakarta',
        jurusan2: 'Pendidikan Seni Rupa',
        ptn3: 'Institut Teknologi Bandung',
        jurusan3: 'Seni Rupa',
      },

      // Additional career goals for more XII students
      {
        id: 'tujuan_021',
        nisSiswa: '232410017', // FARRAS GHALYANDRA - XII RPL 1
        kategoriUtama: 'wirausaha',
        detailWirausaha: 'Membuka software house yang fokus pada pengembangan aplikasi web dan mobile untuk UMKM. Menyediakan layanan custom software development, website development, dan digital transformation consulting.',
      },
      {
        id: 'tujuan_022',
        nisSiswa: '232410035', // KHAYLA AULIA RAMADHANI - XII RPL 1
        kategoriUtama: 'kuliah',
        ptn1: 'Universitas Indonesia',
        jurusan1: 'Sistem Informasi',
        ptn2: 'Institut Teknologi Bandung',
        jurusan2: 'Sistem dan Teknologi Informasi',
        ptn3: 'Universitas Gadjah Mada',
        jurusan3: 'Teknologi Informasi',
      },
      {
        id: 'tujuan_023',
        nisSiswa: '232410028', // IRSYAF RESKI ERIANDY - XII DKV
        kategoriUtama: 'bekerja',
        detailBekerja: 'Bekerja sebagai UI/UX Designer di perusahaan teknologi. Fokus pada user research, wireframing, prototyping, dan user testing. Target bergabung dengan fintech atau e-commerce startup.',
      },
      {
        id: 'tujuan_024',
        nisSiswa: '232410012', // DAFA AHMAD RIFQI - XII TKJ
        kategoriUtama: 'kuliah',
        ptn1: 'Universitas Negeri Jakarta',
        jurusan1: 'Teknik Elektro',
        ptn2: 'Institut Teknologi PLN',
        jurusan2: 'Teknik Informatika',
        ptn3: 'Universitas Mercu Buana',
        jurusan3: 'Teknik Elektro',
      },
      {
        id: 'tujuan_025',
        nisSiswa: '232410029', // JENINA AZ ZAHRANI ARIEF - XII DKV
        kategoriUtama: 'wirausaha',
        detailWirausaha: 'Membuka creative agency yang fokus pada social media management dan content creation. Target klien: brand fashion, beauty, dan lifestyle. Menyediakan layanan fotografi produk, video content, dan digital marketing strategy.',
      }
    ]

    for (const goal of careerGoals) {
      try {
        await prisma.tujuanKarir.create({
          data: goal,
        })
        
        // Update tujuanKarirSubmitted status
        await prisma.siswa.update({
          where: { nis: goal.nisSiswa },
          data: { tujuanKarirSubmitted: true },
        })
        
        console.log(`Created career goal for student: ${goal.nisSiswa}`)
      } catch (error: any) {
        if (error instanceof Error) {
          console.error(`Error creating career goal for ${goal.nisSiswa}:`, error.message)
        } else {
          console.error(`Error creating career goal for ${goal.nisSiswa}:`, error)
        }
      }
    }
  }

  console.log('✅ Seed completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })