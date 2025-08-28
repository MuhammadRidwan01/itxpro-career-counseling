"use client"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { Search, Filter, Edit, Trash2, Plus, X } from "lucide-react"
import { GlassCard } from "@/components/ui/glass-card"
import { PremiumButton } from "@/components/ui/premium-button"
import { StudentModal } from "@/components/admin/student-modal"
import { useState } from "react" // Removed useEffect as it's handled by parent
import { motion } from "framer-motion"
// Removed useDebounce as it's handled by parent

interface Student {
  nis: string
  nama: string
  email: string
  kelasSaatIni: string
  angkatan: number
  jurusan: string
  status: string
  tujuanKarirSubmitted: boolean
  createdAt: string
}

interface StudentListProps {
  students: Student[]
  fetchDashboardData: () => void // This will now trigger parent's fetch
  handleDeleteStudent: (nis: string) => void
  // New props for search and filters
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filterStatus: string;
  setFilterStatus: (status: string) => void;
  filterJurusan: string; // Added
  setFilterJurusan: (jurusan: string) => void; // Added
  filterAngkatan: string; // Added
  setFilterAngkatan: (angkatan: string) => void; // Added
  loadingStudents: boolean; // Added
  handleExportStudents: () => void; // Added
}

export function StudentList({
  students,
  fetchDashboardData,
  handleDeleteStudent,
  searchTerm,
  setSearchTerm,
  filterStatus,
  setFilterStatus,
  filterJurusan,
  setFilterJurusan,
  filterAngkatan,
  setFilterAngkatan,
  loadingStudents,
  handleExportStudents,
}: StudentListProps) {
  // Removed local state for searchTerm, filterStatus, debouncedSearchTerm
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const [showStudentModal, setShowStudentModal] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)

  // filteredStudents is now simply the students prop, as filtering is done by parent/backend
  const filteredStudents = students;

  const studentStatuses = [
    { label: "Semua", value: "all" },
    { label: "Aktif", value: "AKTIF" },
    { label: "Alumni", value: "ALUMNI" },
    { label: "Pindah", value: "PINDAH" },
  ]
  
  // Add unique jurusan and angkatan from the students prop for filters
  const uniqueJurusan = [...new Set(students.map((s) => s.jurusan))].filter(jurusan => jurusan && jurusan.trim() !== '');
  const uniqueAngkatan = [...new Set(students.map((s) => s.angkatan))].sort((a, b) => b - a);


  return (
    <>
      <GlassCard className="shadow-sm overflow-hidden">
        {/* Header & Search */}
        <div className="p-6 border-b border-white/20">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              Data Siswa ({filteredStudents.length})
            </h3>
            <div className="flex flex-col sm:flex-row gap-3">
              <PremiumButton
                onClick={() => setShowMobileFilters(!showMobileFilters)}
                className="sm:hidden"
                variant="ghost"
                size="sm"
              >
                <Filter className="w-4 h-4" />
                Filter
              </PremiumButton>
              <PremiumButton
                onClick={() => {
                  setSelectedStudent(null)
                  setShowStudentModal(true)
                }}
                variant="primary"
                size="sm"
              >
                <Plus className="w-4 h-4" />
                Tambah Siswa
              </PremiumButton>
              <PremiumButton
                onClick={handleExportStudents}
                variant="secondary"
                size="sm"
              >
                Export Excel
              </PremiumButton>
            </div>
          </div>

          {/* Search and Filters */}
          <div className={`mt-4 space-y-3 ${showMobileFilters ? 'block' : 'hidden sm:block'}`}>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  placeholder="Cari siswa..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 bg-white/80 border border-white/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-slate-800"
                />
                {searchTerm && (
                  <PremiumButton
                    onClick={() => setSearchTerm("")}
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
                  >
                    <X className="w-4 h-4 text-slate-500" />
                  </PremiumButton>
                )}
              </div>
              <div className="flex gap-2">
                {studentStatuses.map((statusOption) => (
                  <PremiumButton
                    key={statusOption.value}
                    onClick={() => setFilterStatus(statusOption.value)}
                    variant={filterStatus === statusOption.value ? "primary" : "secondary"}
                    size="sm"
                    className={`${filterStatus === statusOption.value ? "bg-blue-500 text-white" : "bg-white/20 text-slate-700 hover:bg-white/30"}`}
                  >
                    {statusOption.label}
                  </PremiumButton>
                ))}
              </div>
              {/* Jurusan and Angkatan Filters (New) */}
              <Select value={filterJurusan} onValueChange={setFilterJurusan}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Semua Jurusan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Jurusan</SelectItem>
                  {uniqueJurusan.map((jurusan) => (
                    <SelectItem key={jurusan} value={jurusan}>
                      {jurusan}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={filterAngkatan} onValueChange={setFilterAngkatan}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Semua Angkatan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Angkatan</SelectItem>
                  {uniqueAngkatan.map((angkatan) => (
                    <SelectItem key={angkatan} value={angkatan.toString()}>
                      {angkatan}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Mobile Card View */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.05,
              },
            },
          }}
          className="sm:hidden"
        >
          {filteredStudents.map((student) => (
            <motion.div
              key={student.nis}
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 },
              }}
              className="p-4 border-b border-white/20 last:border-b-0 hover:bg-white/10 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1 min-w-0">
                  <Link href={`/admin/student/${student.nis}`} className="hover:underline">
                    <h4 className="font-medium text-slate-800 truncate">{student.nama}</h4>
                  </Link>
                  <p className="text-sm text-slate-600">{student.nis}</p>
                </div>
                <div className="flex items-center gap-1 ml-3">
                  <PremiumButton
                    onClick={() => {
                      setSelectedStudent(student)
                      setShowStudentModal(true)
                    }}
                    variant="ghost"
                    size="sm"
                  >
                    <Edit className="w-4 h-4 text-slate-600" />
                  </PremiumButton>
                  <PremiumButton
                    onClick={() => handleDeleteStudent(student.nis)}
                    variant="ghost"
                    size="sm"
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </PremiumButton>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-slate-500">Kelas:</span>
                  <span className="ml-1 text-slate-700">{student.kelasSaatIni}</span>
                </div>
                <div>
                  <span className="text-slate-500">Jurusan:</span>
                  <span className="ml-1 text-slate-700">{student.jurusan}</span>
                </div>
              </div>
              <div className="flex items-center gap-3 mt-3">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    student.status === "AKTIF"
                      ? "bg-green-100 text-green-700"
                      : student.status === "ALUMNI"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {student.status}
                </span>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    student.tujuanKarirSubmitted
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {student.tujuanKarirSubmitted ? "Sudah Karir" : "Belum Karir"}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Desktop Table View */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50/50">
              <tr>
                {["NIS", "Nama", "Kelas", "Jurusan", "Status", "Tujuan Karir", "Aksi"].map((header) => (
                  <th key={header} className="text-left py-3 px-4 font-medium text-slate-700 text-sm">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loadingStudents ? (
                <tr>
                  <td colSpan={7} className="py-4 text-center">
                    <div className="animate-pulse flex flex-col items-center">
                      <div className="h-4 w-3/4 bg-gray-300 rounded mb-2"></div>
                      <div className="h-4 w-1/2 bg-gray-300 rounded"></div>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredStudents.map((student) => (
                  <tr key={student.nis} className="border-b border-white/20 hover:bg-white/10 transition-colors">
                    <td className="py-3 px-4 text-sm text-slate-800 font-mono">{student.nis}</td>
                    <td className="py-3 px-4 text-sm text-slate-800 font-medium">
                      <Link href={`/admin/student/${student.nis}`} className="hover:underline">
                        {student.nama}
                      </Link>
                    </td>
                    <td className="py-3 px-4 text-sm text-slate-600">{student.kelasSaatIni}</td>
                    <td className="py-3 px-4 text-sm text-slate-600">{student.jurusan}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          student.status === "AKTIF"
                            ? "bg-green-100 text-green-700"
                            : student.status === "ALUMNI"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {student.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          student.tujuanKarirSubmitted
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {student.tujuanKarirSubmitted ? "Sudah" : "Belum"}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1">
                        <PremiumButton
                          onClick={() => {
                            setSelectedStudent(student)
                            setShowStudentModal(true)
                          }}
                          variant="ghost"
                          size="sm"
                        >
                          <Edit className="w-4 h-4 text-slate-600" />
                        </PremiumButton>
                        <PremiumButton
                          onClick={() => handleDeleteStudent(student.nis)}
                          variant="ghost"
                          size="sm"
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </PremiumButton>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </GlassCard>

      <StudentModal
        isOpen={showStudentModal}
        onClose={() => {
          setShowStudentModal(false)
          setSelectedStudent(null)
        }}
        onSuccess={fetchDashboardData}
        student={selectedStudent}
      />
    </>
  )
}