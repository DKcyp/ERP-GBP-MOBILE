import React, { useState } from 'react';
import { Search, ArrowUp, ArrowDown } from 'lucide-react';
import PageHeader from '../components/PageHeader';

interface DashboardPurchasingRequestPageProps {
  onBack: () => void;
}

interface UrgentPREntry {
  no: number;
  namaDevisi: string;
  tglPembuatanPR: string;
  noPR: string;
  namaUser: string;
  namaBarang: string[];
  namaJasa: string[];
}

interface AllPREntry {
  no: number;
  namaTeamPurchasing: string;
  namaDevisi: string;
  tglPembuatanPR: string;
  noPR: string;
  namaUser: string;
  namaBarang: string[];
  namaJasa: string[];
}

const urgentPRData: UrgentPREntry[] = [
  {
    no: 1,
    namaDevisi: 'Divisi Inspeksi',
    tglPembuatanPR: '05-02-2024',
    noPR: 'PR001',
    namaUser: 'Zakaria',
    namaBarang: ['helm safety', 'sarung tangan safety', 'sepatu safety'],
    namaJasa: ['-'],
  },
  {
    no: 2,
    namaDevisi: 'Divisi Pelatihan',
    tglPembuatanPR: '07-02-2024',
    noPR: 'PR002',
    namaUser: 'Budi Santoso',
    namaBarang: ['-'],
    namaJasa: ['Jasa Penginapan', 'transportasi untuk peserta Pelatihan'],
  },
  {
    no: 3,
    namaDevisi: 'Divisi Konsultasi',
    tglPembuatanPR: '09-02-2024',
    noPR: 'PR003',
    namaUser: 'Cahyo Widodo',
    namaBarang: ['-'],
    namaJasa: ['Jasa riset', 'pengumpulan data'],
  },
  {
    no: 4,
    namaDevisi: 'Divisi Sertifikasi',
    tglPembuatanPR: '10-02-2024',
    noPR: 'PR004',
    namaUser: 'Dewi Lestari',
    namaBarang: ['Peralatan pendukung administrasi'],
    namaJasa: ['-'],
  },
];

const allPRData: AllPREntry[] = [
  {
    no: 1,
    namaTeamPurchasing: 'Team A',
    namaDevisi: 'Divisi Sertifikasi',
    tglPembuatanPR: '10-02-2025',
    noPR: 'PR0023',
    namaUser: 'Karim',
    namaBarang: ['Boiler', 'benjana tekan', 'tangki penyimpanan'],
    namaJasa: ['-'],
  },
  {
    no: 2,
    namaTeamPurchasing: 'Team B',
    namaDevisi: 'Divisi Konsultasi',
    tglPembuatanPR: '11-02-2025',
    noPR: 'PR0024',
    namaUser: 'Rina',
    namaBarang: ['-'],
    namaJasa: ['Jasa Layanan Konsultasi', 'Jasa Perbaikan'],
  },
  {
    no: 3,
    namaTeamPurchasing: 'Team C',
    namaDevisi: 'Divisi Inspeksi',
    tglPembuatanPR: '12-02-2025',
    noPR: 'PR0025',
    namaUser: 'Santi',
    namaBarang: ['Laptop', 'Monitor'],
    namaJasa: ['-'],
  },
  {
    no: 4,
    namaTeamPurchasing: 'Team D',
    namaDevisi: 'Divisi Pelatihan',
    tglPembuatanPR: '13-02-2025',
    noPR: 'PR0026',
    namaUser: 'Andi',
    namaBarang: ['-'],
    namaJasa: ['Pelatihan Karyawan'],
  },
  {
    no: 5,
    namaTeamPurchasing: 'Team E',
    namaDevisi: 'Divisi Keuangan',
    tglPembuatanPR: '14-02-2025',
    noPR: 'PR0027',
    namaUser: 'Budi',
    namaBarang: ['Printer', 'Kertas'],
    namaJasa: ['-'],
  },
];

const DashboardPurchasingRequestPage: React.FC<DashboardPurchasingRequestPageProps> = ({ onBack }) => {
  const [urgentShowEntries, setUrgentShowEntries] = useState(10);
  const [urgentCurrentPage, setUrgentCurrentPage] = useState(1);
  const [allShowEntries, setAllShowEntries] = useState(10);
  const [allCurrentPage, setAllCurrentPage] = useState(1);

  const renderPaginationButtons = (currentPage: number, totalPages: number, handlePageChange: (page: number) => void) => {
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

    if (totalPages > 5 && currentPage > 3) {
      buttons.push(<span key="ellipsis-start" className="px-3 py-1 text-textSecondary">...</span>);
    }

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

    if (totalPages > 5 && currentPage < totalPages - 2) {
      buttons.push(<span key="ellipsis-end" className="px-3 py-1 text-textSecondary">...</span>);
    }

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

  // Urgent PR Table Logic
  const urgentEntriesPerPage = urgentShowEntries;
  const urgentTotalPages = Math.ceil(urgentPRData.length / urgentEntriesPerPage);
  const urgentCurrentEntries = urgentPRData.slice(
    (urgentCurrentPage - 1) * urgentEntriesPerPage,
    urgentCurrentPage * urgentEntriesPerPage
  );
  const handleUrgentPageChange = (page: number) => {
    if (page >= 1 && page <= urgentTotalPages) {
      setUrgentCurrentPage(page);
    }
  };

  // All PR Table Logic
  const allEntriesPerPage = allShowEntries;
  const allTotalPages = Math.ceil(allPRData.length / allEntriesPerPage);
  const allCurrentEntries = allPRData.slice(
    (allCurrentPage - 1) * allEntriesPerPage,
    allCurrentPage * allEntriesPerPage
  );
  const handleAllPageChange = (page: number) => {
    if (page >= 1 && page <= allTotalPages) {
      setAllCurrentPage(page);
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 flex flex-col items-center">
      {/* Header */}
      <PageHeader title="DASHBOARD PURCHASING REQUEST" onBack={onBack} />

      {/* Main Content Area */}
      <div className="w-full max-w-md flex flex-col gap-8 md:max-w-4xl lg:max-w-6xl">
        {/* Urgent Dalam Periode 1 Minggu Table */}
        <div className="bg-surface p-6 rounded-xl shadow-card flex flex-col gap-4">
          <h3 className="text-lg font-semibold text-text mb-2">Urgent Dalam Periode 1 Minggu</h3>
          <div className="flex flex-col sm:flex-row items-center justify-between mb-2 gap-2">
            <div className="flex items-center text-sm text-textSecondary">
              Show
              <select
                value={urgentShowEntries}
                onChange={(e) => setUrgentShowEntries(Number(e.target.value))}
                className="mx-2 p-1 border border-border rounded-md bg-white text-text text-sm focus:outline-none focus:ring-1 focus:ring-primary/50"
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
              entries
            </div>
            <div className="relative w-full sm:w-auto">
              <input
                type="text"
                placeholder="Search:"
                className="w-full p-2 pl-3 pr-10 border border-border rounded-lg text-text text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 bg-white"
              />
              <Search size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-textSecondary" />
            </div>
          </div>

          <div className="overflow-x-auto">
            <div className="min-w-[1000px] md:min-w-full">
              <div className="grid grid-cols-[0.5fr_1.5fr_1.5fr_1fr_1.5fr_2fr_2fr] gap-4 text-xs font-medium text-textSecondary uppercase py-2 border-b border-border">
                <span className="flex items-center">NO <ArrowUp size={12} className="ml-1" /><ArrowDown size={12} /></span>
                <span className="flex items-center">NAMA DEVISI <ArrowUp size={12} className="ml-1" /><ArrowDown size={12} /></span>
                <span className="flex items-center">TGL PEMBUATAN PR <ArrowUp size={12} className="ml-1" /><ArrowDown size={12} /></span>
                <span className="flex items-center">NO PR <ArrowUp size={12} className="ml-1" /><ArrowDown size={12} /></span>
                <span className="flex items-center">NAMA USER <ArrowUp size={12} className="ml-1" /><ArrowDown size={12} /></span>
                <span className="flex items-center">NAMA BARANG <ArrowUp size={12} className="ml-1" /><ArrowDown size={12} /></span>
                <span className="flex items-center">NAMA JASA <ArrowUp size={12} className="ml-1" /><ArrowDown size={12} /></span>
              </div>
              {urgentCurrentEntries.map((entry, index) => (
                <div key={index} className="grid grid-cols-[0.5fr_1.5fr_1.5fr_1fr_1.5fr_2fr_2fr] gap-4 items-start py-3 border-b border-border/50 last:border-b-0">
                  <span className="text-sm text-text">{entry.no}</span>
                  <span className="text-sm text-text">{entry.namaDevisi}</span>
                  <span className="text-sm text-text">{entry.tglPembuatanPR}</span>
                  <span className="text-sm text-text">{entry.noPR}</span>
                  <span className="text-sm text-text">{entry.namaUser}</span>
                  <ul className="text-sm text-text list-disc pl-4">
                    {entry.namaBarang.map((item, i) => <li key={i}>{item}</li>)}
                  </ul>
                  <ul className="text-sm text-text list-disc pl-4">
                    {entry.namaJasa.map((item, i) => <li key={i}>{item}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between mt-4 text-sm">
            <div className="text-textSecondary mb-2 sm:mb-0">
              Showing {(urgentCurrentPage - 1) * urgentEntriesPerPage + 1} to {Math.min(urgentCurrentPage * urgentEntriesPerPage, urgentPRData.length)} of {urgentPRData.length} entries
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleUrgentPageChange(urgentCurrentPage - 1)}
                disabled={urgentCurrentPage === 1}
                className="px-3 py-1 rounded-lg text-sm font-medium bg-surface text-textSecondary hover:bg-surface/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                Previous
              </button>
              {renderPaginationButtons(urgentCurrentPage, urgentTotalPages, handleUrgentPageChange)}
              <button
                onClick={() => handleUrgentPageChange(urgentCurrentPage + 1)}
                disabled={urgentCurrentPage === urgentTotalPages}
                className="px-3 py-1 rounded-lg text-sm font-medium bg-surface text-textSecondary hover:bg-surface/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                Next
              </button>
            </div>
          </div>
        </div>

        {/* Daftar PR dari masing-masing team Purchasing Table */}
        <div className="bg-surface p-6 rounded-xl shadow-card flex flex-col gap-4">
          <h3 className="text-lg font-semibold text-text mb-2">Daftar PR dari masing-masing team Purchasing</h3>
          <div className="flex flex-col sm:flex-row items-center justify-between mb-2 gap-2">
            <div className="flex items-center text-sm text-textSecondary">
              Show
              <select
                value={allShowEntries}
                onChange={(e) => setAllShowEntries(Number(e.target.value))}
                className="mx-2 p-1 border border-border rounded-md bg-white text-text text-sm focus:outline-none focus:ring-1 focus:ring-primary/50"
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
              entries
            </div>
            <div className="relative w-full sm:w-auto">
              <input
                type="text"
                placeholder="Search:"
                className="w-full p-2 pl-3 pr-10 border border-border rounded-lg text-text text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 bg-white"
              />
              <Search size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-textSecondary" />
            </div>
          </div>

          <div className="overflow-x-auto">
            <div className="min-w-[1200px] md:min-w-full">
              <div className="grid grid-cols-[0.5fr_1.5fr_1.5fr_1.5fr_1fr_1.5fr_2fr_2fr] gap-4 text-xs font-medium text-textSecondary uppercase py-2 border-b border-border">
                <span className="flex items-center">NO <ArrowUp size={12} className="ml-1" /><ArrowDown size={12} /></span>
                <span className="flex items-center">NAMA TEAM PURCHASING <ArrowUp size={12} className="ml-1" /><ArrowDown size={12} /></span>
                <span className="flex items-center">NAMA DEVISI <ArrowUp size={12} className="ml-1" /><ArrowDown size={12} /></span>
                <span className="flex items-center">TGL PEMBUATAN PR <ArrowUp size={12} className="ml-1" /><ArrowDown size={12} /></span>
                <span className="flex items-center">NO PR <ArrowUp size={12} className="ml-1" /><ArrowDown size={12} /></span>
                <span className="flex items-center">NAMA USER <ArrowUp size={12} className="ml-1" /><ArrowDown size={12} /></span>
                <span className="flex items-center">NAMA BARANG <ArrowUp size={12} className="ml-1" /><ArrowDown size={12} /></span>
                <span className="flex items-center">NAMA JASA <ArrowUp size={12} className="ml-1" /><ArrowDown size={12} /></span>
              </div>
              {allCurrentEntries.map((entry, index) => (
                <div key={index} className="grid grid-cols-[0.5fr_1.5fr_1.5fr_1.5fr_1fr_1.5fr_2fr_2fr] gap-4 items-start py-3 border-b border-border/50 last:border-b-0">
                  <span className="text-sm text-text">{entry.no}</span>
                  <span className="text-sm text-text">{entry.namaTeamPurchasing}</span>
                  <span className="text-sm text-text">{entry.namaDevisi}</span>
                  <span className="text-sm text-text">{entry.tglPembuatanPR}</span>
                  <span className="text-sm text-text">{entry.noPR}</span>
                  <span className="text-sm text-text">{entry.namaUser}</span>
                  <ul className="text-sm text-text list-disc pl-4">
                    {entry.namaBarang.map((item, i) => <li key={i}>{item}</li>)}
                  </ul>
                  <ul className="text-sm text-text list-disc pl-4">
                    {entry.namaJasa.map((item, i) => <li key={i}>{item}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between mt-4 text-sm">
            <div className="text-textSecondary mb-2 sm:mb-0">
              Showing {(allCurrentPage - 1) * allEntriesPerPage + 1} to {Math.min(allCurrentPage * allEntriesPerPage, allPRData.length)} of {allPRData.length} entries
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleAllPageChange(allCurrentPage - 1)}
                disabled={allCurrentPage === 1}
                className="px-3 py-1 rounded-lg text-sm font-medium bg-surface text-textSecondary hover:bg-surface/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                Previous
              </button>
              {renderPaginationButtons(allCurrentPage, allTotalPages, handleAllPageChange)}
              <button
                onClick={() => handleAllPageChange(allCurrentPage + 1)}
                disabled={allCurrentPage === allTotalPages}
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

export default DashboardPurchasingRequestPage;
