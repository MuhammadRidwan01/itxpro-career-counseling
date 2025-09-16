'use client'

import { useState, useEffect, useCallback } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { redirect, useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  LogOut,
  BarChart3,
} from 'lucide-react'
import { PremiumButton } from '@/components/ui/premium-button'
import { StatsCards } from '@/components/admin/dashboard/stats-cards'
import { TabNavigation } from '@/components/admin/dashboard/tab-navigation'
import { QuickActions } from '@/components/admin/dashboard/quick-actions'
import { RecentActivity } from '@/components/admin/dashboard/recent-activity'
import { StudentList } from '@/components/admin/dashboard/student-list'
import { KonselingList } from '@/components/admin/dashboard/konseling-list'
import { CareerManagement } from '@/components/admin/dashboard/career-management'
import { StatisticsView } from '@/components/admin/dashboard/statistics-view'
import { useToast } from '@/components/ui/use-toast'
import { useDebounce } from '@/hooks/use-debounce' // Import useDebounce
import { RefreshControls } from '@/components/ui/refresh-controls'

interface DashboardStats {
  totalSiswa: number
  totalKonseling: number
  totalTujuanKarir: number
  siswaAktif: number
  totalKonselingBelumSelesai: number
  konselingStatsByClass: { [key: string]: { totalStudents: number } } // New
}

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


interface Konseling {
  id: string
  nisSiswa: string
  tanggalKonseling: string
  hasilText: string
  deskripsi?: string
  tindakLanjut?: string
  status: 'SUDAH' | 'BELUM'
  kategori: string
  createdAt: string // Add createdAt
  siswa: {
    nama: string
    kelasSaatIni: string
  }
}

interface TujuanKarir {
  id: string
  nisSiswa: string
  kategoriUtama: string
  ptn1: string | null
  jurusan1: string | null
  ptn2: string | null
  jurusan2: string | null
  ptn3: string | null
  jurusan3: string | null
  detailBekerja: string | null
  detailWirausaha: string | null
  createdAt: string
  siswa: {
    nama: string
    kelasSaatIni: string
  }
}

export default function AdminDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { toast } = useToast()
  const [stats, setStats] = useState<DashboardStats>({
    totalSiswa: 0,
    totalKonseling: 0,
    totalTujuanKarir: 0,
    siswaAktif: 0,
    totalKonselingBelumSelesai: 0,
    konselingStatsByClass: {}, // Initialize with an empty object
  })
  const [students, setStudents] = useState<Student[]>([])
  const [allStudents, setAllStudents] = useState<Student[]>([]) // For filter options
  const [recentKonseling, setRecentKonseling] = useState<Konseling[]>([])
  const [recentTujuanKarir, setRecentTujuanKarir] = useState<TujuanKarir[]>([]) // New state for recent tujuan karir
  const [tujuanKarir, setTujuanKarir] = useState<TujuanKarir[]>([])
  const [loading, setLoading] = useState(true) // Keep this for initial dashboard load
  const [activeTab, setActiveTab] = useState('overview')
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  
  const handleExportCareerData = useCallback(async () => {
    try {
      const response = await fetch('/api/admin/tujuan-karir/export');
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'data_tujuan_karir.xlsx';
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
        toast({
          title: 'Ekspor Berhasil',
          description: 'Data tujuan karir telah berhasil diekspor ke Excel.',
        });
      } else {
        const errorData = await response.json();
        toast({
          title: 'Ekspor Gagal',
          description: errorData.message || 'Terjadi kesalahan saat mengekspor data tujuan karir.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error exporting career data:', error);
      toast({
        title: 'Ekspor Gagal',
        description: 'Terjadi kesalahan jaringan atau server.',
        variant: 'destructive',
      });
    }
  }, [toast]);

  // State for search and filters
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterJurusan, setFilterJurusan] = useState('all');
  const [filterAngkatan, setFilterAngkatan] = useState('all');

  // Reset filters when switching tabs
  useEffect(() => {
    if (activeTab !== 'students' && activeTab !== 'statistics') {
      setSearchTerm('');
      setFilterStatus('all');
      setFilterJurusan('all');
      setFilterAngkatan('all');
    }
  }, [activeTab]);

  // Debounced search term for API calls
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // Separate loading state for students list
  const [loadingStudents, setLoadingStudents] = useState(false);

  const fetchDashboardData = useCallback(async (isManualRefresh = false) => {
    if (isManualRefresh) {
      setIsRefreshing(true)
    } else {
      setLoading(true) // Keep for overall dashboard loading
    }
    setLoadingStudents(true); // Set loading for students list
    try {
      // Construct URL for fetching students with search and filter parameters
      const studentParams = new URLSearchParams()

      // Only add search and filter parameters if we're on the students or statistics tab
      if (activeTab === 'students' || activeTab === 'statistics') {
        if (debouncedSearchTerm) {
          studentParams.append('search', debouncedSearchTerm)
        }
        if (filterStatus !== 'all') {
          studentParams.append('status', filterStatus)
        }
        if (filterJurusan !== 'all') {
          studentParams.append('jurusan', filterJurusan)
        }
        if (filterAngkatan !== 'all') {
          studentParams.append('angkatan', filterAngkatan)
        }
        studentParams.append('all', 'true')
      }

      // Optimize by fetching only what's needed for the current tab
      const promises = [fetch('/api/admin/dashboard')]

      if (activeTab === 'students' || activeTab === 'overview' || activeTab === 'statistics') {
        const studentUrl = (activeTab === 'students' || activeTab === 'statistics')
          ? `/api/admin/siswa?${studentParams.toString()}`
          : '/api/admin/siswa?all=true'
        promises.push(fetch(studentUrl))

        // Fetch all students for filter options (only once)
        if (allStudents.length === 0) {
          promises.push(fetch('/api/admin/siswa?all=true'))
        }
      }
      
      if (activeTab === 'overview') {
        promises.push(fetch('/api/admin/konseling?limit=5&orderBy=tanggalKonseling:desc'))
        promises.push(fetch('/api/admin/tujuan-karir?limit=5&orderBy=createdAt:desc'))
      }
      
      if (activeTab === 'career') {
        promises.push(fetch('/api/admin/tujuan-karir'))
      }
      
      if (activeTab === 'konseling' || activeTab === 'overview' || activeTab === 'statistics') {
        promises.push(fetch('/api/admin/konseling/stats'))
      }

      const responses = await Promise.all(promises)
      
      // Parse responses based on what was fetched
      let statsData, studentsData, allStudentsData, recentKonselingData, recentTujuanKarirData, tujuanKarirData, konselingStatsData
      
      statsData = await responses[0].json()
      
      let responseIndex = 1
      if (activeTab === 'students' || activeTab === 'overview') {
        studentsData = await responses[responseIndex++].json()
        if (allStudents.length === 0) {
          allStudentsData = await responses[responseIndex++].json()
        }
      }
      
      if (activeTab === 'overview') {
        recentKonselingData = await responses[responseIndex++].json()
        recentTujuanKarirData = await responses[responseIndex++].json()
      }
      
      if (activeTab === 'career') {
        tujuanKarirData = await responses[responseIndex++].json()
      }
      
      if (activeTab === 'konseling' || activeTab === 'overview') {
        konselingStatsData = await responses[responseIndex++].json()
      }

      if (statsData.success) {
        setStats(prevStats => ({
          ...prevStats,
          ...statsData.data.stats,
          konselingStatsByClass: konselingStatsData?.success ? konselingStatsData.data.konselingStatsByClass : {},
        }));
      }
      if (studentsData?.success) setStudents(studentsData.data.siswa)
      if (allStudentsData?.success) setAllStudents(allStudentsData.data.siswa)
      if (recentKonselingData?.success) setRecentKonseling(recentKonselingData.data.konseling)
      if (recentTujuanKarirData?.success) setRecentTujuanKarir(recentTujuanKarirData.data)
      if (tujuanKarirData?.success) setTujuanKarir(tujuanKarirData.data)
      
      // Update last refreshed time
      setLastUpdated(new Date())

      // Show success toast for manual refresh
      if (isManualRefresh) {
        toast({
          title: 'Refresh Berhasil',
          description: 'Data berhasil diperbarui.',
          variant: 'default',
        })
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error)

      // Show error toast for refresh failures
      if (isManualRefresh) {
        toast({
          title: 'Refresh Gagal',
          description: 'Terjadi kesalahan saat memperbarui data. Silakan coba lagi.',
          variant: 'destructive',
        })
      }
    } finally {
      setLoading(false) // Set overall dashboard loading to false
      setLoadingStudents(false); // Set students list loading to false
      setIsRefreshing(false)
    }
  }, [toast])

  useEffect(() => {
    if (status === 'loading') return
    fetchDashboardData()
  }, [session, status]); // Removed fetchDashboardData to prevent infinite loop

  useEffect(() => {
    if (!loading && stats.totalKonselingBelumSelesai > 0) {
      toast({
        title: 'Pemberitahuan Konseling',
        description: `Ada ${stats.totalKonselingBelumSelesai} konseling yang belum selesai.`,
        variant: 'destructive',
      })
    }
  }, [loading, stats.totalKonselingBelumSelesai, toast]);

  // Effect to re-fetch data when search/filter parameters change or tab changes
  useEffect(() => {
    // Only fetch if we're not already loading/refreshing and there's an actual change
    if (!loading && !isRefreshing) {
      const debounceFetch = setTimeout(() => {
        fetchDashboardData();
      }, 300); // Reduced debounce time for faster response

      return () => clearTimeout(debounceFetch);
    }
  }, [debouncedSearchTerm, filterStatus, filterJurusan, filterAngkatan, activeTab]);

  
  const handleDeleteStudent = useCallback(async (nis: string) => {
    if (!confirm('Yakin ingin menghapus siswa ini?')) return;

    try {
      const response = await fetch(`/api/admin/siswa/${nis}`, {
        method: 'DELETE',
      });
      const data = await response.json();

      if (data.success) {
        fetchDashboardData();
      } else {
        alert(data.message || 'Gagal menghapus siswa');
      }
    } catch (error) {
      console.error('Error deleting student:', error);
      alert('Terjadi kesalahan');
    }
  }, [fetchDashboardData]);

  const handleDeleteKonseling = useCallback(async (id: string) => {
    if (!confirm('Yakin ingin menghapus konseling ini?')) return;

    try {
      const response = await fetch(`/api/admin/konseling/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();

      if (data.success) {
        fetchDashboardData();
      } else {
        alert(data.message || 'Gagal menghapus konseling');
      }
    } catch (error) {
      console.error('Error deleting konseling:', error);
      alert('Terjadi kesalahan');
    }
  }, [fetchDashboardData]);

  const handleDeleteTujuanKarir = useCallback(async (id: string) => {
    if (!confirm('Yakin ingin menghapus tujuan karir ini?')) return;

    try {
      const response = await fetch(`/api/admin/tujuan-karir?id=${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();

      if (data.success) {
        fetchDashboardData();
      } else {
        alert(data.message || 'Gagal menghapus tujuan karir');
      }
    } catch (error) {
      console.error('Error deleting career goal:', error);
      alert('Terjadi kesalahan');
    }
  }, [fetchDashboardData]);
 
  if (loading && activeTab === 'overview') { // Only show full page loading for overview tab
    return (
      <div className='min-h-screen bg-gradient-primary flex items-center justify-center px-4'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4'></div>
          <p className='text-slate-600 text-sm'>Memuat dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-gradient-primary'>
      <div className='container mx-auto px-4 py-6 max-w-7xl'>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className='flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8'
        >
          <div>
            <div className='flex items-center gap-3 mb-2'>
              <div className='w-8 h-8 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-lg flex items-center justify-center'>
                <BarChart3 className='w-5 h-5 text-white' />
              </div>
              <h1 className='text-2xl font-bold text-slate-800'>Admin Dashboard</h1>
            </div>
            <p className='text-slate-600 text-sm'>Kelola sistem konseling karir SMK ITXPRO</p>
          </div>
          <div className='flex flex-col sm:flex-row gap-3 lg:max-h-14'>
            <RefreshControls
              onRefresh={() => fetchDashboardData(true)}
              isRefreshing={isRefreshing}
              lastUpdated={lastUpdated}
            />
            <PremiumButton onClick={() => router.push('/')} variant='secondary' size='sm'>
              <ArrowLeft className='w-4 h-4 mr-2' />
              Kembali
            </PremiumButton>
            <PremiumButton onClick={() => signOut({ callbackUrl: '/auth/admin' })} variant='secondary' size='sm' className='w-full sm:w-auto'>
              <LogOut className='w-4 h-4 mr-2' />
              Logout
            </PremiumButton>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <StatsCards stats={stats} totalKonselingBelumSelesai={stats.totalKonselingBelumSelesai} />

        {/* Navigation Tabs */}
        <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
            {/* Quick Actions */}
            <QuickActions fetchDashboardData={fetchDashboardData} />

            {/* Recent Activity */}
            <RecentActivity recentKonseling={recentKonseling} recentTujuanKarir={recentTujuanKarir} />
          </div>
        )}

        {activeTab === 'students' && (
          <StudentList
            students={students}
            allStudents={allStudents.length > 0 ? allStudents : students} // Use allStudents for filter options
            fetchDashboardData={fetchDashboardData}
            handleDeleteStudent={handleDeleteStudent}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
            filterJurusan={filterJurusan}
            setFilterJurusan={setFilterJurusan}
            filterAngkatan={filterAngkatan}
            setFilterAngkatan={setFilterAngkatan}
            loadingStudents={loading}
            handleExportStudents={handleExportCareerData} // Re-using handleExportCareerData for student export
          />
        )}

        {activeTab === 'konseling' && (
          <KonselingList
            fetchDashboardData={fetchDashboardData}
          />
        )}

        {activeTab === 'career' && (
          <CareerManagement
            tujuanKarir={tujuanKarir}
            fetchDashboardData={fetchDashboardData}
            handleDeleteTujuanKarir={handleDeleteTujuanKarir}
            handleExportCareerData={handleExportCareerData} // Pass the new function
          />
        )}

        {activeTab === 'statistics' && (
          <StatisticsView konselingStatsByClass={stats.konselingStatsByClass} />
        )}
      </div>
    </div>
  )
}
