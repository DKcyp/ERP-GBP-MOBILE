import React, { useState } from 'react';
import { ArrowLeft, Search, Calendar, FileSpreadsheet, FileText, FileDown, ArrowUp, ArrowDown } from 'lucide-react';

interface DashboardReimbursePageProps {
  onBack: () => void;
}

interface ReimburseEntry {
  no: number;
  noReimburse: string;
  noSo: string;
  soTurunan: string;
  namaProyek: string;
  namaPemohon: string;
  tglPengajuanReimburse: string;
  tglPembayaranReimburse: string;
  nominal: string; // Format as Rp X,XXX,XXX
}

const reimburseData: ReimburseEntry[] = [
  {
    no: 1,
    noReimburse: 'RO001',
    noSo: 'SO001',
    soTurunan: 'SO001.4',
    namaProyek: 'Proyek A',
    namaPemohon: 'Abdul Karim',
    tglPengajuanReimburse: '14-01-2025',
    tglPembayaranReimburse: '20-01-2025',
    nominal: 'Rp 40,000,000',
  },
  {
    no: 2,
    noReimburse: 'RO002',
    noSo: 'SO002',
    soTurunan: 'SO002.5',
    namaProyek: 'Proyek B',
    namaPemohon: 'Juna Saputra',
    tglPengajuanReimburse: '18-01-2025',
    tglPembayaranReimburse: '24-01-2025',
    nominal: 'Rp 35,000,000',
  },
  {
    no: 3,
    noReimburse: 'RO003',
    noSo: 'SO003',
    soTurunan: 'SO003.4',
    namaProyek: 'Proyek C',
    namaPemohon: 'Rizky Andrian',
    tglPengajuanReimburse: '20-01-2025',
    tglPembayaranReimburse: '26-01-2025',
    nominal: 'Rp 28,000,000',
  },
  {
    no: 4,
    noReimburse: 'RO004',
    noSo: 'SO004',
    soTurunan: 'SO004.2',
    namaProyek: 'Proyek D',
    namaPemohon: 'Hendra Prasetyo',
    tglPengajuanReimburse: '22-01-2025',
    tglPembayaranReimburse: '28-01-2025',
    nominal: 'Rp 50,000,000',
  },
  {
    no: 5,
    noReimburse: 'RO005',
    noSo: 'SO005',
    soTurunan: 'SO005.3',
    namaProyek: 'Proyek E',
    namaPemohon: 'Indra Wijaya',
    tglPengajuanReimburse: '25-01-2025',
    tglPembayaranReimburse: '31-01-2025',
    nominal: 'Rp 22,500,000',
  },
  {
    no: 6,
    noReimburse: 'RO006',
    noSo: 'SO006',
    soTurunan: 'SO006.1',
    namaProyek: 'Proyek F',
    namaPemohon: 'Siti Aminah',
    tglPengajuanReimburse: '01-02-2025',
    tglPembayaranReimburse: '05-02-2025',
    nominal: 'Rp 15,000,000',
  },
];

const DashboardReimbursePage: React.FC<DashboardReimbursePageProps> = ({ onBack }) => {
  const [showEntries, setShowEntries] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = showEntries;

  const totalPages = Math.ceil(reimburseData.length / entriesPerPage);
  const currentEntries = reimburseData.slice(
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
      <div className="w-full max-w-md bg-surface p-6 rounded-xl shadow-card grid grid-cols-3 items-center mb-8 md:max-w-4xl">
        <button
          onClick={onBack}
          className="flex items-center text-textSecondary hover:text-primary transition-colors duration-200 justify-self-start"
          aria-label="Back to menu"
        >
          <ArrowLeft size={20} className="mr-1" />
          Back
        </button>
        <h2 className="text-xl font-bold text-text text-center col-start-2">Dashboard Reimburse</h2>
        <div className="justify-self-end"></div> {/* Empty div to balance the grid */}
      </div>

      {/* Main Content Area */}
      <div className="w-full max-w-md flex flex-col gap-4 md:max-w-4xl">
        {/* Filter Card */}
        <div className="bg-surface p-6 rounded-xl shadow-card flex flex-col gap-4">
          <h3 className="text-lg font-semibold text-text mb-2">Reimburse</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Cari No Reimburse */}
            <div className="flex flex-col">
              <label htmlFor="noReimburse" className="text-sm font-medium text-text mb-1">Cari No Reimburse</label>
              <div className="relative">
                <input
                  type="text"
                  id="noReimburse"
                  placeholder="RO001"
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

            {/* Cari Status */}
            <div className="flex flex-col">
              <label htmlFor="status" className="text-sm font-medium text-text mb-1">Cari Status</label>
              <div className="relative">
                <select
                  id="status"
                  className="w-full p-2 pl-3 pr-10 border border-border rounded-lg text-text text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 bg-white appearance-none"
                >
                  <option>--Pilih Status--</option>
                  <option>Approved</option>
                  <option>Pending</option>
                  <option>Rejected</option>
                </select>
                <ArrowLeft size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-textSecondary rotate-90 pointer-events-none" />
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
            <FileSpreadsheet size={18} className="mr-2" /> Export Excel
          </button>
          <button className="bg-primary text-white px-4 py-2 rounded-lg flex items-center justify-center hover:bg-primary/90 transition-colors duration-200 text-sm">
            <FileText size={18} className="mr-2" /> Export CSV
          </button>
          <button className="bg-error text-white px-4 py-2 rounded-lg flex items-center justify-center hover:bg-error/90 transition-colors duration-200 text-sm">
            <FileDown size={18} className="mr-2" /> Export PDF
          </button>
        </div>

        {/* Reimburse List Table */}
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
            <div className="min-w-[1400px] md:min-w-full"> {/* Adjust min-w for mobile scroll */}
              <div className="grid grid-cols-[0.5fr_1fr_1fr_1fr_1.5fr_1.2fr_1.5fr_1.5fr_1fr] gap-4 text-xs font-medium text-textSecondary uppercase py-2 border-b border-border">
                <span className="flex items-center">NO <ArrowUp size={12} className="ml-1" /><ArrowDown size={12} /></span>
                <span className="flex items-center">NO REIMBURSE <ArrowUp size={12} className="ml-1" /><ArrowDown size={12} /></span>
                <span className="flex items-center">NO SO <ArrowUp size={12} className="ml-1" /><ArrowDown size={12} /></span>
                <span className="flex items-center">SO TURUNAN <ArrowUp size={12} className="ml-1" /><ArrowDown size={12} /></span>
                <span className="flex items-center">NAMA PROYEK <ArrowUp size={12} className="ml-1" /><ArrowDown size={12} /></span>
                <span className="flex items-center">NAMA PEMOHON <ArrowUp size={12} className="ml-1" /><ArrowDown size={12} /></span>
                <span className="flex items-center">TGL PENGAJUAN REIMBURSE <ArrowUp size={12} className="ml-1" /><ArrowDown size={12} /></span>
                <span className="flex items-center">TGL PEMBAYARAN REIMBURSE <ArrowUp size={12} className="ml-1" /><ArrowDown size={12} /></span>
                <span className="flex items-center">NOMINAL <ArrowUp size={12} className="ml-1" /><ArrowDown size={12} /></span>
              </div>
              {currentEntries.map((entry, index) => (
                <div key={index} className="grid grid-cols-[0.5fr_1fr_1fr_1fr_1.5fr_1.2fr_1.5fr_1.5fr_1fr] gap-4 items-center py-3 border-b border-border/50 last:border-b-0">
                  <span className="text-sm text-text">{entry.no}</span>
                  <span className="text-sm text-text">{entry.noReimburse}</span>
                  <span className="text-sm text-text">{entry.noSo}</span>
                  <span className="text-sm text-text">{entry.soTurunan}</span>
                  <span className="text-sm text-text">{entry.namaProyek}</span>
                  <span className="text-sm text-text">{entry.namaPemohon}</span>
                  <span className="text-sm text-text">{entry.tglPengajuanReimburse}</span>
                  <span className="text-sm text-text">{entry.tglPembayaranReimburse}</span>
                  <span className="text-sm text-text">{entry.nominal}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row items-center justify-between mt-4 text-sm">
            <div className="text-textSecondary mb-2 sm:mb-0">
              Showing {(currentPage - 1) * entriesPerPage + 1} to {Math.min(currentPage * entriesPerPage, reimburseData.length)} of {reimburseData.length} entries
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

export default DashboardReimbursePage;
