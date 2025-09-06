import React, { useState } from 'react';
import {
  ArrowLeft, Search, Calendar, Plus, FileSpreadsheet, FileText, FileDown,
  ArrowUp, ArrowDown, Eye, RefreshCcw, Edit, Trash2
} from 'lucide-react';

interface ProsesCashAdvancePageProps {
  onBack: () => void;
}

interface CashAdvanceEntry {
  no: number;
  namaDepartemen: string;
  noCa: string;
  tanggal: string;
  noSo: string;
  soTurunan: string;
  namaProyek: string;
  namaPemohon: string;
  nominal: string;
  keperluan: string;
  tglPembayaran: string;
  tglLaporanExpense: string;
  lampiranDokumen: boolean; // True if document exists, for Eye icon
}

const cashAdvanceData: CashAdvanceEntry[] = [
  {
    no: 1,
    namaDepartemen: 'Keuangan',
    noCa: 'CA002',
    tanggal: '2025-01-15',
    noSo: 'SO001',
    soTurunan: 'SO001.1',
    namaProyek: 'Proyek PHE ONWJ',
    namaPemohon: 'Michael Johnson',
    nominal: 'Rp 150,000',
    keperluan: 'Pembelian alat tulis',
    tglPembayaran: '2025-01-16',
    tglLaporanExpense: '2025-01-15',
    lampiranDokumen: true,
  },
  {
    no: 2,
    namaDepartemen: 'Operasional',
    noCa: 'CA001',
    tanggal: '2025-01-16',
    noSo: 'SO002',
    soTurunan: 'SO002.1',
    namaProyek: 'Proyek OSES',
    namaPemohon: 'Emily Davis',
    nominal: 'Rp 200,000',
    keperluan: 'Transportasi kegiatan',
    tglPembayaran: '2025-01-17',
    tglLaporanExpense: '2025-01-16',
    lampiranDokumen: true,
  },
  {
    no: 3,
    namaDepartemen: 'Pemasaran',
    noCa: 'CA022',
    tanggal: '2025-01-17',
    noSo: 'SO003',
    soTurunan: 'SO003.1',
    namaProyek: 'Proyek MEDCO',
    namaPemohon: 'William Brown',
    nominal: 'Rp 175,000',
    keperluan: 'Pembelian bahan seminar',
    tglPembayaran: '2025-01-18',
    tglLaporanExpense: '2025-01-17',
    lampiranDokumen: false,
  },
  {
    no: 4,
    namaDepartemen: 'HRD',
    noCa: 'CA012',
    tanggal: '2025-01-18',
    noSo: 'SO004',
    soTurunan: 'SO004.1',
    namaProyek: 'Proyek C',
    namaPemohon: 'Olivia Martinez',
    nominal: 'Rp 180,000',
    keperluan: 'Biaya konsumsi',
    tglPembayaran: '2025-01-19',
    tglLaporanExpense: '2025-01-18',
    lampiranDokumen: true,
  },
  {
    no: 5,
    namaDepartemen: 'Logistik',
    noCa: 'CA005',
    tanggal: '2025-01-19',
    noSo: 'SO005',
    soTurunan: 'SO005.1',
    namaProyek: 'Proyek A',
    namaPemohon: 'James Wilson',
    nominal: 'Rp 190,000',
    keperluan: 'Penggantian barang',
    tglPembayaran: '2025-01-20',
    tglLaporanExpense: '2025-01-19',
    lampiranDokumen: true,
  },
  {
    no: 6,
    namaDepartemen: 'Keuangan',
    noCa: 'CA006',
    tanggal: '2025-01-20',
    noSo: 'SO006',
    soTurunan: 'SO006.1',
    namaProyek: 'Proyek B',
    namaPemohon: 'Sophia Lee',
    nominal: 'Rp 120,000',
    keperluan: 'Perbaikan kantor',
    tglPembayaran: '2025-01-21',
    tglLaporanExpense: '2025-01-20',
    lampiranDokumen: false,
  },
  {
    no: 7,
    namaDepartemen: 'Operasional',
    noCa: 'CA007',
    tanggal: '2025-01-21',
    noSo: 'SO007',
    soTurunan: 'SO007.1',
    namaProyek: 'Proyek D',
    namaPemohon: 'Daniel Kim',
    nominal: 'Rp 250,000',
    keperluan: 'Sewa peralatan',
    tglPembayaran: '2025-01-22',
    tglLaporanExpense: '2025-01-21',
    lampiranDokumen: true,
  },
  {
    no: 8,
    namaDepartemen: 'Pemasaran',
    noCa: 'CA008',
    tanggal: '2025-01-22',
    noSo: 'SO008',
    soTurunan: 'SO008.1',
    namaProyek: 'Proyek E',
    namaPemohon: 'Isabella Garcia',
    nominal: 'Rp 160,000',
    keperluan: 'Makan siang klien',
    tglPembayaran: '2025-01-23',
    tglLaporanExpense: '2025-01-22',
    lampiranDokumen: true,
  },
  {
    no: 9,
    namaDepartemen: 'HRD',
    noCa: 'CA009',
    tanggal: '2025-01-23',
    noSo: 'SO009',
    soTurunan: 'SO009.1',
    namaProyek: 'Proyek F',
    namaPemohon: 'Ethan Martinez',
    nominal: 'Rp 300,000',
    keperluan: 'Pelatihan karyawan',
    tglPembayaran: '2025-01-24',
    tglLaporanExpense: '2025-01-23',
    lampiranDokumen: false,
  },
  {
    no: 10,
    namaDepartemen: 'Logistik',
    noCa: 'CA010',
    tanggal: '2025-01-24',
    noSo: 'SO010',
    soTurunan: 'SO010.1',
    namaProyek: 'Proyek G',
    namaPemohon: 'Mia Rodriguez',
    nominal: 'Rp 140,000',
    keperluan: 'Pengiriman dokumen',
    tglPembayaran: '2025-01-25',
    tglLaporanExpense: '2025-01-24',
    lampiranDokumen: true,
  },
];

const ProsesCashAdvancePage: React.FC<ProsesCashAdvancePageProps> = ({ onBack }) => {
  const [showEntries, setShowEntries] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = showEntries;

  const totalPages = Math.ceil(cashAdvanceData.length / entriesPerPage);
  const currentEntries = cashAdvanceData.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    // Always show first page
    buttons.push(
      <button
        key={1}
        onClick={() => handlePageChange(1)}
        className={`px-3 py-1 rounded-lg text-sm font-medium ${
          currentPage === 1 ? 'bg-primary text-white' : 'bg-surface text-textSecondary hover:bg-surface/80'
        } transition-colors duration-200`}
      >
        1
      </button>
    );

    // Show ellipsis if there are many pages and current page is far from start/end
    if (totalPages > 5 && currentPage > 3) {
      buttons.push(<span key="ellipsis-start" className="px-3 py-1 text-textSecondary">...</span>);
    }

    // Show pages around the current page
    let startPage = Math.max(2, currentPage - 1);
    let endPage = Math.min(totalPages - 1, currentPage + 1);

    if (currentPage <= 3) {
      endPage = Math.min(totalPages - 1, 4);
    } else if (currentPage >= totalPages - 2) {
      startPage = Math.max(2, totalPages - 3);
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-1 rounded-lg text-sm font-medium ${
            currentPage === i ? 'bg-primary text-white' : 'bg-surface text-textSecondary hover:bg-surface/80'
          } transition-colors duration-200`}
        >
          {i}
        </button>
      );
    }

    // Show ellipsis if there are many pages and current page is far from end
    if (totalPages > 5 && currentPage < totalPages - 2) {
      buttons.push(<span key="ellipsis-end" className="px-3 py-1 text-textSecondary">...</span>);
    }

    // Always show last page if totalPages > 1 and not already shown
    if (totalPages > 1 && (totalPages !== 1 && !buttons.some(btn => btn.key === totalPages))) {
      buttons.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className={`px-3 py-1 rounded-lg text-sm font-medium ${
            currentPage === totalPages ? 'bg-primary text-white' : 'bg-surface text-textSecondary hover:bg-surface/80'
          } transition-colors duration-200`}
        >
          {totalPages}
        </button>
      );
    }

    return buttons;
  };

  return (
    <div className="min-h-screen bg-background p-4 flex flex-col items-center">
      {/* Header */}
      <div className="w-full max-w-md bg-surface p-6 rounded-xl shadow-card grid grid-cols-3 items-center mb-8 md:max-w-4xl lg:max-w-6xl">
        <button
          onClick={onBack}
          className="flex items-center text-textSecondary hover:text-primary transition-colors duration-200 justify-self-start"
          aria-label="Back to menu"
        >
          <ArrowLeft size={20} className="mr-1" />
          Back
        </button>
        <h2 className="text-xl font-bold text-text text-center col-start-2">CASH ADVANCE</h2>
        <div className="justify-self-end"></div> {/* Empty div to balance the grid */}
      </div>

      {/* Main Content Area */}
      <div className="w-full max-w-md flex flex-col gap-4 md:max-w-4xl lg:max-w-6xl">
        {/* Filter Card */}
        <div className="bg-surface p-6 rounded-xl shadow-card flex flex-col gap-4">
          <h3 className="text-lg font-semibold text-text mb-2">Cash Advance</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Cari No Reimburse */}
            <div className="flex flex-col">
              <label htmlFor="noReimburse" className="text-sm font-medium text-text mb-1">Cari No Reimburse</label>
              <div className="relative">
                <input
                  type="text"
                  id="noReimburse"
                  placeholder="CA001"
                  className="w-full p-2 pl-3 pr-10 border border-border rounded-lg text-text text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 bg-white"
                />
                <Search size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-textSecondary" />
              </div>
            </div>

            {/* Cari No SO */}
            <div className="flex flex-col">
              <label htmlFor="noSo" className="text-sm font-medium text-text mb-1">Cari No SO</label>
              <div className="relative">
                <input
                  type="text"
                  id="noSo"
                  placeholder="SO001"
                  className="w-full p-2 pl-3 pr-10 border border-border rounded-lg text-text text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 bg-white"
                />
                <Search size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-textSecondary" />
              </div>
            </div>

            {/* Cari No SO Turunan */}
            <div className="flex flex-col">
              <label htmlFor="noSoTurunan" className="text-sm font-medium text-text mb-1">Cari No SO Turunan</label>
              <div className="relative">
                <input
                  type="text"
                  id="noSoTurunan"
                  placeholder="SO001.1"
                  className="w-full p-2 pl-3 pr-10 border border-border rounded-lg text-text text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 bg-white"
                />
                <Search size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-textSecondary" />
              </div>
            </div>

            {/* Cari Nama Project */}
            <div className="flex flex-col">
              <label htmlFor="namaProject" className="text-sm font-medium text-text mb-1">Cari Nama Project</label>
              <div className="relative">
                <input
                  type="text"
                  id="namaProject"
                  placeholder="PHE ONWJ"
                  className="w-full p-2 pl-3 pr-10 border border-border rounded-lg text-text text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 bg-white"
                />
                <Search size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-textSecondary" />
              </div>
            </div>
          </div>

          {/* Periode and Search Button */}
          <div className="flex flex-col md:flex-row items-end gap-4 mt-2">
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label htmlFor="periodeStart" className="text-sm font-medium text-text mb-1">Periode</label>
                <div className="relative">
                  <input
                    type="date"
                    id="periodeStart"
                    defaultValue="2025-09-06"
                    className="w-full p-2 pl-3 pr-10 border border-border rounded-lg text-text text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 bg-white appearance-none"
                  />
                  <Calendar size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-textSecondary pointer-events-none" />
                </div>
              </div>
              <div className="flex flex-col justify-end">
                <span className="text-sm font-medium text-text mb-1 hidden sm:block">s.d</span>
                <div className="relative">
                  <input
                    type="date"
                    id="periodeEnd"
                    defaultValue="2025-09-06"
                    className="w-full p-2 pl-3 pr-10 border border-border rounded-lg text-text text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 bg-white appearance-none"
                  />
                  <Calendar size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-textSecondary pointer-events-none" />
                </div>
              </div>
            </div>
            <button className="w-full md:w-auto bg-primary text-white px-6 py-2 rounded-lg flex items-center justify-center hover:bg-primary/90 transition-colors duration-200 mt-4 md:mt-0">
              Search
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-end gap-3 mt-4">
          <button className="bg-success text-white px-4 py-2 rounded-lg flex items-center justify-center hover:bg-success/90 transition-colors duration-200 text-sm">
            <Plus size={18} className="mr-2" /> Tambah
          </button>
          <button className="bg-success text-white px-4 py-2 rounded-lg flex items-center justify-center hover:bg-success/90 transition-colors duration-200 text-sm">
            <FileSpreadsheet size={18} className="mr-2" /> Export Excel
          </button>
          <button className="bg-primary text-white px-4 py-2 rounded-lg flex items-center justify-center hover:bg-primary/90 transition-colors duration-200 text-sm">
            <FileText size={18} className="mr-2" /> Export CSV
          </button>
          <button className="bg-error text-white px-4 py-2 rounded-lg flex items-center justify-center hover:bg-error/90 transition-colors duration-200 text-sm">
            <FileDown size={18} className="mr-2" /> Export PDF
          </button>
        </div>

        {/* Cash Advance List Table */}
        <div className="bg-surface p-6 rounded-xl shadow-card flex flex-col gap-4 mt-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center text-sm text-textSecondary">
              Show
              <select
                value={showEntries}
                onChange={(e) => setShowEntries(Number(e.target.value))}
                className="mx-2 p-1 border border-border rounded-md bg-white text-text text-sm focus:outline-none focus:ring-1 focus:ring-primary/50"
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
              entries
            </div>
          </div>

          {/* Table-like structure */}
          <div className="overflow-x-auto">
            <div className="min-w-[2000px] md:min-w-full"> {/* Adjusted min-w for 14 columns */}
              <div className="grid grid-cols-[0.5fr_1.2fr_1fr_1fr_1fr_1fr_1.5fr_1.2fr_1fr_1.5fr_1.2fr_1.2fr_1fr_1.5fr] gap-4 text-xs font-medium text-textSecondary uppercase py-2 border-b border-border">
                <span className="flex items-center">NO <ArrowUp size={12} className="ml-1" /><ArrowDown size={12} /></span>
                <span className="flex items-center">NAMA DEPARTEMEN <ArrowUp size={12} className="ml-1" /><ArrowDown size={12} /></span>
                <span className="flex items-center">NO CA <ArrowUp size={12} className="ml-1" /><ArrowDown size={12} /></span>
                <span className="flex items-center">TANGGAL <ArrowUp size={12} className="ml-1" /><ArrowDown size={12} /></span>
                <span className="flex items-center">NO SO <ArrowUp size={12} className="ml-1" /><ArrowDown size={12} /></span>
                <span className="flex items-center">SO TURUNAN <ArrowUp size={12} className="ml-1" /><ArrowDown size={12} /></span>
                <span className="flex items-center">NAMA PROYEK <ArrowUp size={12} className="ml-1" /><ArrowDown size={12} /></span>
                <span className="flex items-center">NAMA PEMOHON <ArrowUp size={12} className="ml-1" /><ArrowDown size={12} /></span>
                <span className="flex items-center">NOMINAL <ArrowUp size={12} className="ml-1" /><ArrowDown size={12} /></span>
                <span className="flex items-center">KEPERLUAN <ArrowUp size={12} className="ml-1" /><ArrowDown size={12} /></span>
                <span className="flex items-center">TGL PEMBAYARAN <ArrowUp size={12} className="ml-1" /><ArrowDown size={12} /></span>
                <span className="flex items-center">TGL LAPORAN EXPENSE <ArrowUp size={12} className="ml-1" /><ArrowDown size={12} /></span>
                <span className="flex items-center">LAMPIRAN DOKUMEN</span>
                <span className="flex items-center">AKSI</span>
              </div>
              {currentEntries.map((entry, index) => (
                <div key={index} className="grid grid-cols-[0.5fr_1.2fr_1fr_1fr_1fr_1fr_1.5fr_1.2fr_1fr_1.5fr_1.2fr_1.2fr_1fr_1.5fr] gap-4 items-center py-3 border-b border-border/50 last:border-b-0">
                  <span className="text-sm text-text">{entry.no}</span>
                  <span className="text-sm text-text">{entry.namaDepartemen}</span>
                  <span className="text-sm text-text">{entry.noCa}</span>
                  <span className="text-sm text-text">{entry.tanggal}</span>
                  <span className="text-sm text-text">{entry.noSo}</span>
                  <span className="text-sm text-text">{entry.soTurunan}</span>
                  <span className="text-sm text-text">{entry.namaProyek}</span>
                  <span className="text-sm text-text">{entry.namaPemohon}</span>
                  <span className="text-sm text-text">{entry.nominal}</span>
                  <span className="text-sm text-text">{entry.keperluan}</span>
                  <span className="text-sm text-text">{entry.tglPembayaran}</span>
                  <span className="text-sm text-text">{entry.tglLaporanExpense}</span>
                  <span className="text-sm text-text">
                    {entry.lampiranDokumen ? (
                      <button className="text-primary hover:text-primary/80 transition-colors duration-200" aria-label="View document">
                        <Eye size={18} />
                      </button>
                    ) : (
                      <span className="text-textSecondary/50">-</span>
                    )}
                  </span>
                  <span className="flex gap-2">
                    <button className="text-blue-500 hover:text-blue-600 transition-colors duration-200" aria-label="Refresh">
                      <RefreshCcw size={18} />
                    </button>
                    <button className="text-yellow-500 hover:text-yellow-600 transition-colors duration-200" aria-label="Edit">
                      <Edit size={18} />
                    </button>
                    <button className="text-red-500 hover:text-red-600 transition-colors duration-200" aria-label="Delete">
                      <Trash2 size={18} />
                    </button>
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row items-center justify-between mt-4 text-sm">
            <div className="text-textSecondary mb-2 sm:mb-0">
              Showing {(currentPage - 1) * entriesPerPage + 1} to {Math.min(currentPage * entriesPerPage, cashAdvanceData.length)} of {cashAdvanceData.length} entries
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded-lg text-sm font-medium bg-surface text-textSecondary hover:bg-surface/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                Previous
              </button>
              {renderPaginationButtons()}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded-lg text-sm font-medium bg-surface text-textSecondary hover:bg-surface/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProsesCashAdvancePage;
