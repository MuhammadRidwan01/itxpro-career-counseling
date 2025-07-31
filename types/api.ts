export interface TujuanKarir {
  id: string;
  nisSiswa: string;
  kategoriUtama: 'kuliah' | 'bekerja' | 'wirausaha';
  ptn1?: string | null;
  jurusan1?: string | null;
  ptn2?: string | null;
  jurusan2?: string | null;
  ptn3?: string | null;
  jurusan3?: string | null;
  detailBekerja?: string | null;
  detailWirausaha?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface HasilKonseling {
  id: string;
  tanggal: Date;
  kategori: string;
  hasil: string;
  rating: number;
}

export interface StudentDashboardData {
  siswa: {
    nis: string;
    nama: string;
    email: string;
    kelasSaatIni: string;
    angkatan: number;
    jurusan: string;
    status: string;
    tujuanKarirSubmitted: boolean;
  };
  stats: {
    totalKonseling: number;
    avgRating: number;
    tujuanKarirStatus: string;
  };
  tujuanKarir: TujuanKarir | null;
  konselingHistory: HasilKonseling[];
}
