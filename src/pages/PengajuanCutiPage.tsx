import React, { useMemo, useState } from 'react';
import Modal from '../components/Modal';
import { ArrowLeft, Calendar, FileSpreadsheet, FileText, Plus, Search, ChevronLeft, ChevronRight, Edit, Trash2, CheckCircle2 } from 'lucide-react';
import PageHeader from '../components/PageHeader';

interface PengajuanCutiPageProps {
  onBack: () => void;
  rows: RowData[];
  setRows: React.Dispatch<React.SetStateAction<RowData[]>>;
  onAdd: () => void;
  onEdit: (row: RowData) => void;
}

interface RowData {
  id: string;
  nama: string;
  jabatan: string;
  jenisCuti: 'Tahunan' | 'Sakit' | 'Melahirkan' | 'Lainnya';
  periode: string; // formatted date range
  alasan: string;
  status: 'Diajukan' | 'Draft' | 'Disetujui' | 'Ditolak';
}

const badgeClassByStatus: Record<RowData['status'], string> = {
  Draft: 'bg-gray-200 text-gray-700',
  Diajukan: 'bg-yellow-100 text-yellow-700',
  Disetujui: 'bg-green-100 text-green-700',
  Ditolak: 'bg-red-100 text-red-700',
};

const PengajuanCutiPage: React.FC<PengajuanCutiPageProps> = ({ onBack, rows, setRows, onAdd, onEdit }) => {
  const [nama, setNama] = useState('');
  const [jenisCuti, setJenisCuti] = useState<string>('Semua');
  const [status, setStatus] = useState<string>('Semua');
  const [tglMulai, setTglMulai] = useState<string>('');
  const [tglSelesai, setTglSelesai] = useState<string>('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState<RowData | null>(null);

  const filtered = useMemo(() => {
    return rows.filter((row) => {
      const matchNama = nama ? row.nama.toLowerCase().includes(nama.toLowerCase()) : true;
      const matchJenis = jenisCuti === 'Semua' ? true : row.jenisCuti === (jenisCuti as RowData['jenisCuti']);
      const matchStatus = status === 'Semua' ? true : row.status === (status as RowData['status']);

      // Simple date filter using periode string
      const [startStr, endStr] = row.periode.split(' - ');
      const start = new Date(startStr);
      const end = new Date(endStr);
      const matchStart = tglMulai ? end >= new Date(tglMulai) : true;
      const matchEnd = tglSelesai ? start <= new Date(tglSelesai) : true;

      return matchNama && matchJenis && matchStatus && matchStart && matchEnd;
    });
  }, [rows, nama, jenisCuti, status, tglMulai, tglSelesai]);

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const currentPage = Math.min(page, totalPages);
  const startIndex = (currentPage - 1) * pageSize;
  const pageRows = filtered.slice(startIndex, startIndex + pageSize);

  const handleCari = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
  };

  // Actions
  const openDelete = (row: RowData) => {
    setSelectedRow(row);
    setShowDeleteModal(true);
  };
  const confirmDelete = () => {
    if (selectedRow) {
      setRows(prev => prev.filter(r => r.id !== selectedRow.id));
    }
    setShowDeleteModal(false);
    setSelectedRow(null);
  };
  const cancelDelete = () => {
    setShowDeleteModal(false);
    setSelectedRow(null);
  };

  const handleSubmitDraft = (id: string) => {
    setRows(prev => prev.map(r => r.id === id ? { ...r, status: 'Diajukan' } : r));
  };

  return (
    <div className="min-h-screen bg-background text-text p-4">
      {/* Header */}
      <PageHeader title="Pengajuan Cuti" onBack={onBack} />

      <div className="max-w-5xl mx-auto">
        {/* Filter Card */}
        <form onSubmit={handleCari} className="bg-surface rounded-xl shadow-card p-4 md:p-6 mb-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 md:gap-4">
            <div className="flex flex-col">
              <label className="text-xs text-textSecondary mb-1">Nama</label>
              <input
                type="text"
                placeholder="Cari nama..."
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                className="h-10 px-3 rounded-lg bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-xs text-textSecondary mb-1">Jenis Cuti</label>
              <select
                value={jenisCuti}
                onChange={(e) => setJenisCuti(e.target.value)}
                className="h-10 px-3 rounded-lg bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option>Semua</option>
                <option>Tahunan</option>
                <option>Sakit</option>
                <option>Melahirkan</option>
                <option>Lainnya</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label className="text-xs text-textSecondary mb-1">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="h-10 px-3 rounded-lg bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option>Semua</option>
                <option>Draft</option>
                <option>Diajukan</option>
                <option>Disetujui</option>
                <option>Ditolak</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label className="text-xs text-textSecondary mb-1">Tanggal Mulai ≥</label>
              <div className="relative">
                <input
                  type="date"
                  value={tglMulai}
                  onChange={(e) => setTglMulai(e.target.value)}
                  className="w-full h-10 pr-10 pl-3 rounded-lg bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <Calendar size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-textSecondary" />
              </div>
            </div>
            <div className="flex flex-col">
              <label className="text-xs text-textSecondary mb-1">Tanggal Selesai ≤</label>
              <div className="relative">
                <input
                  type="date"
                  value={tglSelesai}
                  onChange={(e) => setTglSelesai(e.target.value)}
                  className="w-full h-10 pr-10 pl-3 rounded-lg bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <Calendar size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-textSecondary" />
              </div>
            </div>
            <div className="flex items-end md:items-center md:col-span-3">
              <button type="submit" className="inline-flex items-center justify-center h-10 px-4 rounded-lg bg-primary text-white shadow hover:opacity-90 active:opacity-100">
                <Search size={16} className="mr-2" />
                Cari
              </button>
            </div>
          </div>
        </form>

        {/* Actions */}
        <div className="flex flex-wrap gap-2 mb-4">
          <button onClick={onAdd} className="inline-flex items-center h-10 px-3 rounded-lg bg-primary text-white shadow">
            <Plus size={16} className="mr-2" /> Tambah
          </button>
          <button className="inline-flex items-center h-10 px-3 rounded-lg bg-green-500 text-white shadow">
            <FileSpreadsheet size={16} className="mr-2" /> Export Excel
          </button>
          <button className="inline-flex items-center h-10 px-3 rounded-lg bg-red-500 text-white shadow">
            <FileText size={16} className="mr-2" /> Export PDF
          </button>
        </div>

        {/* Table Card */}
        <div className="bg-surface rounded-xl shadow-card overflow-hidden">
          <div className="px-4 py-3 border-b bg-gray-50 text-sm text-textSecondary flex items-center gap-2">
            <span>Show</span>
            <select
              className="h-8 px-2 rounded border"
              value={pageSize}
              onChange={(e) => { setPageSize(parseInt(e.target.value, 10)); setPage(1); }}
            >
              {[10, 20, 50].map(n => <option key={n} value={n}>{n}</option>)}
            </select>
            <span>entries</span>
          </div>

          <div className="overflow-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className="text-left px-4 py-3 whitespace-nowrap">ID</th>
                  <th className="text-left px-4 py-3 whitespace-nowrap">NAMA</th>
                  <th className="text-left px-4 py-3 whitespace-nowrap">JABATAN</th>
                  <th className="text-left px-4 py-3 whitespace-nowrap">JENIS CUTI</th>
                  <th className="text-left px-4 py-3 whitespace-nowrap">PERIODE</th>
                  <th className="text-left px-4 py-3 whitespace-nowrap">ALASAN</th>
                  <th className="text-left px-4 py-3 whitespace-nowrap">STATUS</th>
                  <th className="text-left px-4 py-3 whitespace-nowrap">AKSI</th>
                </tr>
              </thead>
              <tbody>
                {pageRows.map((row) => (
                  <tr key={row.id} className="border-t">
                    <td className="px-4 py-3 whitespace-nowrap">{row.id}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{row.nama}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{row.jabatan}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{row.jenisCuti}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{row.periode}</td>
                    <td className="px-4 py-3">{row.alasan}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`inline-flex items-center h-6 px-2 rounded-full text-xs ${badgeClassByStatus[row.status]}`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <button onClick={() => onEdit(row)} className="p-2 rounded-full bg-yellow-100 text-yellow-700" title="Edit">
                          <Edit size={16} />
                        </button>
                        <button onClick={() => openDelete(row)} className="p-2 rounded-full bg-red-100 text-red-600" title="Hapus">
                          <Trash2 size={16} />
                        </button>
                        {row.status === 'Draft' && (
                          <button onClick={() => handleSubmitDraft(row.id)} className="p-2 rounded-full bg-green-100 text-green-700" title="Ajukan">
                            <CheckCircle2 size={16} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
                {pageRows.length === 0 && (
                  <tr>
                    <td className="px-4 py-6 text-center text-textSecondary" colSpan={8}>Tidak ada data</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 px-4 py-3 border-t text-sm">
            <div className="text-textSecondary">Showing {startIndex + 1} to {Math.min(startIndex + pageSize, total)} of {total} entries</div>
            <div className="flex items-center gap-2">
              <button
                className="inline-flex items-center h-8 px-2 rounded border disabled:opacity-50"
                disabled={currentPage === 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                <ChevronLeft size={16} className="mr-1" /> Previous
              </button>
              <span className="inline-flex items-center h-8 px-3 rounded border bg-white">{currentPage}</span>
              <button
                className="inline-flex items-center h-8 px-2 rounded border disabled:opacity-50"
                disabled={currentPage === totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              >
                Next <ChevronRight size={16} className="ml-1" />
              </button>
            </div>
          </div>

          {/* Delete Confirmation Popup */}
          <Modal
            isOpen={showDeleteModal}
            onClose={cancelDelete}
            title="Notifikasi"
            message={selectedRow ? `Apakah anda yakin ingin menghapus Pengajuan Cuti ${selectedRow.nama} (${selectedRow.id}) pada periode ${selectedRow.periode}?` : ''}
            onConfirm={confirmDelete}
            confirmText="Hapus"
            cancelText="Batal"
          />
        </div>
      </div>
    </div>
  );
};

export default PengajuanCutiPage;
