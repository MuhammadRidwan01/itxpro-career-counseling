'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
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
import { useDebounce } from '@/hooks/use-debounce'
import { RefreshControls } from '@/components/ui/refresh-controls'

interface DashboardStats {
  totalSiswa: number
  totalKonseling: number
  totalTujuanKarir: number
  siswaAktif: number
  totalKonselingBelumSelesai: number
  konselingStatsByClass: { [key: string]: { totalStudents: number } }
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
  createdAt: string
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
  
  // State management
  const [stats, setStats] = useState<DashboardStats>({
    totalSiswa: 0,
    totalKonseling: 0,
    totalTujuanKarir: 0,
    siswaAktif: 0,
    totalKonselingBelumSelesai: 0,
    konselingStatsByClass: {},
  })
  
  const [students, setStudents] = useState<Student[]>([])
  const [allStudents, setAllStudents] = useState<Student[]>([])
  const [recentKonseling, setRecentKonseling] = useState<Konseling[]>([])
  const [recentTujuanKarir, setRecentTujuanKarir] = useState<TujuanKarir[]>([])
  const [tujuanKarir, setTujuanKarir] = useState<TujuanKarir[]>([])
  
  // Loading states
  const [loading, setLoading] = useState(true)
  const [loadingStudents, setLoadingStudents] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  
  // UI state
  const [activeTab, setActiveTab] = useState('overview')
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterJurusan, setFilterJurusan] = useState('all')
  const [filterAngkatan, setFilterAngkatan] = useState('all')
  
  // Debounced search for better performance
  const debouncedSearchTerm = useDebounce(searchTerm, 500)
  
  // Memoized filter parameters to prevent unnecessary re-renders
  const filterParams = useMemo(() => ({
    search: debouncedSearchTerm.trim(),
    status: filterStatus,
    jurusan: filterJurusan,
    angkatan: filterAngkatan
  }), [debouncedSearchTerm, filterStatus, filterJurusan, filterAngkatan])

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

  const handleExportStudents = useCallback(async () => {
    try {
      // Build query parameters with current filters
      const params = new URLSearchParams();
      if (searchTerm.trim()) {
        params.append('search', searchTerm.trim());
      }
      if (filterStatus !== 'all') {
        params.append('status', filterStatus);
      }
      if (filterJurusan !== 'all') {
        params.append('jurusan', filterJurusan);
      }
      if (filterAngkatan !== 'all') {
        params.append('angkatan', filterAngkatan);
      }

      const response = await fetch(`/api/admin/siswa/export?${params.toString()}`);
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'data_siswa.xlsx';
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
        toast({
          title: 'Ekspor Berhasil',
          description: 'Data siswa telah berhasil diekspor ke Excel.',
        });
      } else {
        const errorData = await response.json();
        toast({
          title: 'Ekspor Gagal',
          description: errorData.message || 'Terjadi kesalahan saat mengekspor data siswa.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error exporting students:', error);
      toast({
        title: 'Ekspor Gagal',
        description: 'Terjadi kesalahan jaringan atau server.',
        variant: 'destructive',
      });
    }
  }, [toast, searchTerm, filterStatus, filterJurusan, filterAngkatan]);

  // Reset filters when switching tabs
  useEffect(() => {
    if (activeTab !== 'students' && activeTab !== 'statistics') {
      setSearchTerm('');
      setFilterStatus('all');
      setFilterJurusan('all');
      setFilterAngkatan('all');
    }
  }, [activeTab]);

  const fetchDashboardData = useCallback(async (isManualRefresh = false) => {
    if (isManualRefresh) {
      setIsRefreshing(true)
    } else if (activeTab === 'overview') {
      setLoading(true)
    }
    
    // Set loading for students when fetching student data
    if (activeTab === 'students' || activeTab === 'statistics') {
      setLoadingStudents(true)
    }

    try {
      const promises = []
      
      // Always fetch dashboard stats
      promises.push(fetch('/api/admin/dashboard'))

      // Conditionally fetch data based on active tab
      if (activeTab === 'students' || activeTab === 'statistics') {
        // Build student API URL with current filters
        const studentParams = new URLSearchParams()
        
        // Only add non-default filter values
        if (filterParams.search) {
          studentParams.append('search', filterParams.search)
        }
        if (filterParams.status !== 'all') {
          studentParams.append('status', filterParams.status)
        }
        if (filterParams.jurusan !== 'all') {
          studentParams.append('jurusan', filterParams.jurusan)
        }
        if (filterParams.angkatan !== 'all') {
          studentParams.append('angkatan', filterParams.angkatan)
        }

        const studentUrl = `/api/admin/siswa?${studentParams.toString()}`
        promises.push(fetch(studentUrl))
        
        // Always fetch all students for filter dropdown options
        promises.push(fetch('/api/admin/siswa?all=true'))
      } else if (activeTab === 'overview') {
        // For overview, get limited student data and recent activities
        promises.push(fetch('/api/admin/siswa?all=true'))
        promises.push(fetch('/api/admin/siswa?all=true')) // Duplicate for allStudents
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
      
      // Parse responses
      const statsData = await responses[0].json()
      
      let responseIndex = 1
      let studentsData, allStudentsData, recentKonselingData, recentTujuanKarirData, tujuanKarirData, konselingStatsData

      if (activeTab === 'students' || activeTab === 'statistics') {
        studentsData = await responses[responseIndex++].json()
        allStudentsData = await responses[responseIndex++].json()
      } else if (activeTab === 'overview') {
        studentsData = await responses[responseIndex++].json()
        allStudentsData = await responses[responseIndex++].json()
        recentKonselingData = await responses[responseIndex++].json()
        recentTujuanKarirData = await responses[responseIndex++].json()
      }
      
      if (activeTab === 'career') {
        tujuanKarirData = await responses[responseIndex++].json()
      }
      
      if (activeTab === 'konseling' || activeTab === 'overview' || activeTab === 'statistics') {
        konselingStatsData = await responses[responseIndex++].json()
      }

      // Update state with successful responses
      if (statsData?.success) {
        setStats(prevStats => ({
          ...prevStats,
          ...statsData.data.stats,
          konselingStatsByClass: konselingStatsData?.success ? konselingStatsData.data.konselingStatsByClass : prevStats.konselingStatsByClass,
        }))
      }
      
      if (studentsData?.success) {
        setStudents(studentsData.data.siswa)
      }
      
      if (allStudentsData?.success) {
        setAllStudents(allStudentsData.data.siswa)
      }
      
      if (recentKonselingData?.success) {
        setRecentKonseling(recentKonselingData.data.konseling)
      }
      
      if (recentTujuanKarirData?.success) {
        setRecentTujuanKarir(recentTujuanKarirData.data)
      }
      
      if (tujuanKarirData?.success) {
        setTujuanKarir(tujuanKarirData.data)
      }
      
      setLastUpdated(new Date())

      if (isManualRefresh) {
        toast({
          title: 'Refresh Berhasil',
          description: 'Data berhasil diperbarui.',
          variant: 'default',
        })
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
      
      if (isManualRefresh) {
        toast({
          title: 'Refresh Gagal',
          description: 'Terjadi kesalahan saat memperbarui data. Silakan coba lagi.',
          variant: 'destructive',
        })
      }
    } finally {
      setLoading(false)
      setLoadingStudents(false)
      setIsRefreshing(false)
    }
  }, [activeTab, filterParams, toast])

  // Initial data fetch
  useEffect(() => {
    if (status === 'loading') return
    if (status === 'unauthenticated') {
      router.push('/auth/admin')
      return
    }
    
    fetchDashboardData()
  }, [status, router])

  // Refetch data when tab changes or filters change
  useEffect(() => {
    if (!loading && !isRefreshing && status === 'authenticated') {
      fetchDashboardData()
    }
  }, [activeTab, filterParams])

  // Auto refresh data every 1.5 minutes (90,000ms)
  useEffect(() => {
    if (status !== 'authenticated' || loading) return

    const intervalId = setInterval(() => {
      if (!isRefreshing) {
        fetchDashboardData()
      }
    }, 90000) // 1.5 minutes

    return () => clearInterval(intervalId)
  }, [status, loading, isRefreshing, fetchDashboardData])

  // Show notification for pending konseling
  useEffect(() => {
    if (!loading && stats.totalKonselingBelumSelesai > 0) {
      toast({
        title: 'Pemberitahuan Konseling',
        description: `Ada ${stats.totalKonselingBelumSelesai} konseling yang belum selesai.`,
        variant: 'destructive',
      })
    }
  }, [loading, stats.totalKonselingBelumSelesai, toast])

  const handleDeleteStudent = useCallback(async (nis: string) => {
    if (!confirm('Yakin ingin menghapus siswa ini?')) return;

    try {
      const response = await fetch(`/api/admin/siswa/${nis}`, {
        method: 'DELETE',
      });
      const data = await response.json();

      if (data.success) {
        toast({
          title: 'Berhasil',
          description: 'Siswa berhasil dihapus.',
        })
        fetchDashboardData();
      } else {
        toast({
          title: 'Gagal',
          description: data.message || 'Gagal menghapus siswa.',
          variant: 'destructive',
        })
      }
    } catch (error) {
      console.error('Error deleting student:', error);
      toast({
        title: 'Error',
        description: 'Terjadi kesalahan saat menghapus siswa.',
        variant: 'destructive',
      })
    }
  }, [fetchDashboardData, toast]);

  const handleDeleteKonseling = useCallback(async (id: string) => {
    if (!confirm('Yakin ingin menghapus konseling ini?')) return;

    try {
      const response = await fetch(`/api/admin/konseling/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();

      if (data.success) {
        toast({
          title: 'Berhasil',
          description: 'Konseling berhasil dihapus.',
        })
        fetchDashboardData();
      } else {
        toast({
          title: 'Gagal',
          description: data.message || 'Gagal menghapus konseling.',
          variant: 'destructive',
        })
      }
    } catch (error) {
      console.error('Error deleting konseling:', error);
      toast({
        title: 'Error',
        description: 'Terjadi kesalahan saat menghapus konseling.',
        variant: 'destructive',
      })
    }
  }, [fetchDashboardData, toast]);

  const handleDeleteTujuanKarir = useCallback(async (id: string) => {
    if (!confirm('Yakin ingin menghapus tujuan karir ini?')) return;

    try {
      const response = await fetch(`/api/admin/tujuan-karir?id=${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();

      if (data.success) {
        toast({
          title: 'Berhasil',
          description: 'Tujuan karir berhasil dihapus.',
        })
        fetchDashboardData();
      } else {
        toast({
          title: 'Gagal',
          description: data.message || 'Gagal menghapus tujuan karir.',
          variant: 'destructive',
        })
      }
    } catch (error) {
      console.error('Error deleting career goal:', error);
      toast({
        title: 'Error',
        description: 'Terjadi kesalahan saat menghapus tujuan karir.',
        variant: 'destructive',
      })
    }
  }, [fetchDashboardData, toast]);

  // Show loading only for initial overview load
  if (loading && activeTab === 'overview') {
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
            <QuickActions fetchDashboardData={fetchDashboardData} />
            <RecentActivity recentKonseling={recentKonseling} recentTujuanKarir={recentTujuanKarir} />
          </div>
        )}

        {activeTab === 'students' && (
          <StudentList
            students={students}
            allStudents={allStudents}
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
            loadingStudents={loadingStudents}
            handleExportStudents={handleExportStudents}
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
            handleExportCareerData={handleExportCareerData}
          />
        )}

        {activeTab === 'statistics' && (
          <StatisticsView konselingStatsByClass={stats.konselingStatsByClass} />
        )}
      </div>
    </div>
  )
}