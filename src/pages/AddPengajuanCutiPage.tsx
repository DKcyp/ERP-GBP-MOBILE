import React, { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';

export interface CutiEntry {
  id?: string;
  nama: string;
  jabatan: string;
  jenisCuti: 'Tahunan' | 'Sakit' | 'Melahirkan' | 'Lainnya';
  tanggalMulai: string; // yyyy-mm-dd
  tanggalSelesai: string; // yyyy-mm-dd
  alasan: string;
  status?: 'Draft' | 'Diajukan' | 'Disetujui' | 'Ditolak';
}

interface AddPengajuanCutiPageProps {
  onBack: () => void;
  onSave: (entry: CutiEntry) => void;
  initial?: CutiEntry | null;
}

const AddPengajuanCutiPage: React.FC<AddPengajuanCutiPageProps> = ({ onBack, onSave, initial }) => {
  const [form, setForm] = useState<CutiEntry>({
    id: undefined,
    nama: '',
    jabatan: '',
    jenisCuti: 'Tahunan',
    tanggalMulai: '',
    tanggalSelesai: '',
    alasan: '',
    status: 'Draft',
  });

  useEffect(() => {
    if (initial) setForm({ ...initial });
  }, [initial]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { id, value } = e.target;
    setForm(prev => ({ ...prev, [id]: value } as CutiEntry));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nama || !form.jabatan || !form.tanggalMulai || !form.tanggalSelesai) {
      alert('Lengkapi Nama, Jabatan, Tanggal Mulai dan Tanggal Selesai.');
      return;
    }
    onSave({ ...form });
    onBack();
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center">
      {/* Header mobile */}
      <div className="w-full max-w-sm bg-primary p-4 flex items-center justify-between rounded-b-xl shadow-md">
        <button onClick={onBack} className="text-white p-2 rounded-full hover:bg-primary/80 transition-colors">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-lg font-bold text-white">Tambah Pengajuan Cuti</h1>
        <div className="w-8" />
      </div>

      <form onSubmit={handleSubmit} className="w-full max-w-sm p-4">
        <div className="bg-surface p-4 rounded-xl shadow-card space-y-4">
          <div>
            <label htmlFor="nama" className="block text-sm text-text mb-1">Nama</label>
            <input id="nama" value={form.nama} onChange={handleChange} placeholder="Nama pegawai" className="w-full h-11 px-3 rounded-lg border border-gray-300" />
          </div>
          <div>
            <label htmlFor="jabatan" className="block text-sm text-text mb-1">Jabatan</label>
            <input id="jabatan" value={form.jabatan} onChange={handleChange} placeholder="Jabatan" className="w-full h-11 px-3 rounded-lg border border-gray-300" />
          </div>
          <div>
            <label htmlFor="jenisCuti" className="block text-sm text-text mb-1">Jenis Cuti</label>
            <select id="jenisCuti" value={form.jenisCuti} onChange={handleChange} className="w-full h-11 px-3 rounded-lg border border-gray-300">
              <option value="Tahunan">Tahunan</option>
              <option value="Sakit">Sakit</option>
              <option value="Melahirkan">Melahirkan</option>
              <option value="Lainnya">Lainnya</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="tanggalMulai" className="block text-sm text-text mb-1">Tanggal Mulai</label>
              <input id="tanggalMulai" type="date" value={form.tanggalMulai} onChange={handleChange} className="w-full h-11 px-3 rounded-lg border border-gray-300" />
            </div>
            <div>
              <label htmlFor="tanggalSelesai" className="block text-sm text-text mb-1">Tanggal Selesai</label>
              <input id="tanggalSelesai" type="date" value={form.tanggalSelesai} onChange={handleChange} className="w-full h-11 px-3 rounded-lg border border-gray-300" />
            </div>
          </div>
          <div>
            <label htmlFor="alasan" className="block text-sm text-text mb-1">Alasan</label>
            <textarea id="alasan" value={form.alasan} onChange={handleChange} placeholder="Alasan pengajuan cuti" className="w-full min-h-[96px] p-3 rounded-lg border border-gray-300" />
          </div>
          <div className="flex gap-2">
            <button type="button" onClick={onBack} className="flex-1 h-11 rounded-lg border">Batal</button>
            <button type="submit" className="flex-1 h-11 rounded-lg bg-primary text-white">Simpan</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddPengajuanCutiPage;
