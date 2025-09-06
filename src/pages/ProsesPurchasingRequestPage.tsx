import React, { useMemo, useState } from 'react';
import { ArrowLeft, Plus, Eye, CheckCircle2, Printer } from 'lucide-react';
import { PurchasingRequestEntry } from '../components/AddPurchasingRequestModal';

interface ProsesPurchasingRequestPageProps {
  onBack: () => void;
  onAddPr?: () => void; // navigate to add page (mobile)
}

const initialRows: PurchasingRequestEntry[] = [
  { id: '1', tanggal: '2025-02-07', noPr: 'PR001', noSo: 'SO001.22', departemen: 'HRD', keterangan: 'Jasa Pelatihan Karyawan', statusPr: 'Approve', statusPo: 'PO' },
  { id: '2', tanggal: '2025-02-08', noPr: 'PR002', noSo: 'SO002.12', departemen: 'Finance', keterangan: 'Pembelian Software Akuntansi', statusPr: 'Approve', statusPo: '-' },
  { id: '3', tanggal: '2025-02-09', noPr: 'PR003', noSo: 'SO003.33', departemen: 'HRD', keterangan: 'Jasa Pelatihan Karyawan', statusPr: 'Approve', statusPo: '-' },
  { id: '4', tanggal: '2025-02-10', noPr: 'PR004', noSo: 'SO004.90', departemen: 'Operasional', keterangan: 'Pembelian Alat Tulis Kantor', statusPr: 'Approve', statusPo: 'PO' },
  { id: '5', tanggal: '2025-02-11', noPr: 'PR005', noSo: 'SO005.55', departemen: 'Operasional', keterangan: 'Pembelian Alat Tulis Kantor', statusPr: 'Rejected', statusPo: '-' },
];

const badgePrClass = (status: PurchasingRequestEntry['statusPr']) =>
  status === 'Approve' ? 'bg-green-100 text-green-700' : status === 'Rejected' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700';

const ProsesPurchasingRequestPage: React.FC<ProsesPurchasingRequestPageProps> = ({ onBack, onAddPr }) => {
  const [rows, setRows] = useState<PurchasingRequestEntry[]>(initialRows);
  const [statusFilter, setStatusFilter] = useState<'All' | PurchasingRequestEntry['statusPo']>('All');
  const [search, setSearch] = useState('');
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return rows.filter(r => {
      const matchPo = statusFilter === 'All' ? true : r.statusPo === statusFilter;
      const q = search.toLowerCase();
      const matchSearch = q
        ? r.noPr.toLowerCase().includes(q) || r.noSo.toLowerCase().includes(q) || r.keterangan.toLowerCase().includes(q) || r.departemen.toLowerCase().includes(q)
        : true;
      return matchPo && matchSearch;
    });
  }, [rows, statusFilter, search]);

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const currentPage = Math.min(page, totalPages);
  const startIndex = (currentPage - 1) * pageSize;
  const pageRows = filtered.slice(startIndex, startIndex + pageSize);

  const addRow = (data: Omit<PurchasingRequestEntry, 'id'>) => {
    const newId = String(rows.length + 1);
    setRows(prev => [...prev, { id: newId, ...data }]);
  };

  return (
    <div className="min-h-screen bg-background text-text p-4">
      {/* Header */}
      <header className="flex items-center justify-between mb-4 max-w-5xl mx-auto">
        <button onClick={onBack} className="flex items-center text-primary hover:underline">
          <ArrowLeft size={18} className="mr-1" /> Kembali
        </button>
        <h1 className="text-2xl md:text-3xl font-bold">Daftar Purchasing Request</h1>
        <div className="w-24"></div>
      </header>

      <div className="max-w-5xl mx-auto">
        {/* Filter */}
        <div className="bg-surface rounded-xl shadow-card p-4 md:p-6 mb-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <label className="text-sm">Status PR</label>
            <select className="h-10 px-3 rounded-lg border" value={statusFilter} onChange={e => { setStatusFilter(e.target.value as any); setPage(1); }}>
              <option value="All">--Pilih Status PO--</option>
              <option value="PO">PO</option>
              <option value="-">-</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm">Search:</span>
            <input value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} className="h-10 px-3 rounded-lg border" placeholder="Cari..." />
          </div>
        </div>

        {/* Add button under filter */}
        <div className="max-w-5xl mx-auto mb-3 flex justify-end">
          <button onClick={() => onAddPr && onAddPr()} className="inline-flex items-center h-10 px-3 rounded-lg bg-primary text-white shadow">
            <Plus size={16} className="mr-2" /> Tambah PR
          </button>
        </div>

        {/* Table */}
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
                  <th className="px-4 py-3 text-left">NO</th>
                  <th className="px-4 py-3 text-left">TANGGAL PR</th>
                  <th className="px-4 py-3 text-left">NO PR</th>
                  <th className="px-4 py-3 text-left">NO SO</th>
                  <th className="px-4 py-3 text-left">DEPARTEMEN</th>
                  <th className="px-4 py-3 text-left">KETERANGAN</th>
                  <th className="px-4 py-3 text-left">STATUS PR</th>
                  <th className="px-4 py-3 text-left">STATUS PO</th>
                  <th className="px-4 py-3 text-left">AKSI</th>
                </tr>
              </thead>
              <tbody>
                {pageRows.map((r, idx) => (
                  <tr key={r.id} className={`${r.statusPr === 'Rejected' ? 'bg-red-50/50' : idx % 2 === 1 ? 'bg-blue-50/30' : ''} border-t`}>
                    <td className="px-4 py-3">{startIndex + idx + 1}</td>
                    <td className="px-4 py-3">{new Date(r.tanggal).toLocaleDateString('id-ID')}</td>
                    <td className="px-4 py-3">{r.noPr}</td>
                    <td className="px-4 py-3">{r.noSo}</td>
                    <td className="px-4 py-3">{r.departemen}</td>
                    <td className="px-4 py-3">{r.keterangan}</td>
                    <td className="px-4 py-3"><span className={`inline-flex items-center h-6 px-2 rounded-full text-xs ${badgePrClass(r.statusPr)}`}>{r.statusPr}</span></td>
                    <td className="px-4 py-3"><span className={`inline-flex items-center h-6 px-2 rounded-full text-xs ${r.statusPo === 'PO' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>{r.statusPo}</span></td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button title="Tambah" className="p-2 rounded-full bg-blue-100 text-blue-700"><Plus size={16} /></button>
                        <button title="Detail" className="p-2 rounded-full bg-yellow-100 text-yellow-700"><Eye size={16} /></button>
                        <button title="Approve" className="p-2 rounded-full bg-green-100 text-green-700"><CheckCircle2 size={16} /></button>
                        <button title="Cetak" className="p-2 rounded-full bg-indigo-100 text-indigo-700"><Printer size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
                {pageRows.length === 0 && (
                  <tr>
                    <td colSpan={9} className="px-4 py-6 text-center text-textSecondary">Tidak ada data</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 px-4 py-3 border-t text-sm">
            <div className="text-textSecondary">Showing {startIndex + 1} to {Math.min(startIndex + pageSize, total)} of {total} entries</div>
            <div className="flex items-center gap-2">
              <button className="inline-flex items-center h-8 px-2 rounded border disabled:opacity-50" disabled={currentPage === 1} onClick={() => setPage(p => Math.max(1, p - 1))}>Previous</button>
              <span className="inline-flex items-center h-8 px-3 rounded border bg-white">{currentPage}</span>
              <button className="inline-flex items-center h-8 px-2 rounded border disabled:opacity-50" disabled={currentPage === totalPages} onClick={() => setPage(p => Math.min(totalPages, p + 1))}>Next</button>
            </div>
          </div>
        </div>
      </div>

      {/* Note: for mobile flow, adding navigates to a dedicated page via onAddPr */}
    </div>
  );
};

export default ProsesPurchasingRequestPage;
