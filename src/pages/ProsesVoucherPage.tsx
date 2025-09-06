import React, { useState } from 'react';
import { ArrowLeft, Search, Calendar, Plus, FileSpreadsheet, FileText, FileDown, ArrowUp, ArrowDown } from 'lucide-react';

interface ProsesVoucherPageProps {
  onBack: () => void;
}

interface VoucherEntry {
  no: number;
  noVoucher: string;
  noSo: string;
  noSoTurunan: string;
  namaProject: string;
  tglPengajuan: string;
  tglPembayaran: string;
  tglExpense: string;
  tglExpired: string;
  nominalPengajuan: string;
}

const voucherData: VoucherEntry[] = [
  {
    no: 1,
    noVoucher: 'VCH001',
    noSo: 'SO12345',
    noSoTurunan: '-',
    namaProject: 'Project A',
    tglPengajuan: '2025-01-15',
    tglPembayaran: '2025-01-25',
    tglExpense: '2025-02-10',
    tglExpired: '2025-02-15',
    nominalPengajuan: 'Rp 13.000.000',
  },
  {
    no: 2,
    noVoucher: 'VCH002',
    noSo: 'SO12346',
    noSoTurunan: 'SO12346.23',
    namaProject: 'Project B',
    tglPengajuan: '2025-01-16',
    tglPembayaran: '-',
    tglExpense: '2025-02-12',
    tglExpired: '2025-02-16',
    nominalPengajuan: 'Rp 20.000.000',
  },
  {
    no: 3,
    noVoucher: 'VCH003',
    noSo: 'SO12347',
    noSoTurunan: 'SO12347.32',
    namaProject: 'Project C',
    tglPengajuan: '2025-01-17',
    tglPembayaran: '2025-01-27',
    tglExpense: '2025-02-12',
    tglExpired: '2025-02-17',
    nominalPengajuan: 'Rp 10.000.000',
  },
  {
    no: 4,
    noVoucher: 'VCH004',
    noSo: 'SO12348',
    noSoTurunan: 'SO12348.21',
    namaProject: 'Project D',
    tglPengajuan: '2025-01-18',
    tglPembayaran: '2025-01-28',
    tglExpense: '2025-02-18',
    tglExpired: '2025-02-18',
    nominalPengajuan: 'Rp 50.000.000',
  },
  {
    no: 5,
    noVoucher: 'VCH005',
    noSo: '-',
    noSoTurunan: '-',
    namaProject: 'Project E',
    tglPengajuan: '2025-01-19',
    tglPembayaran: '2025-01-29',
    tglExpense: '2025-02-14',
    tglExpired: '2025-02-19',
    nominalPengajuan: 'Rp 40.000.000',
  },
];

const ProsesVoucherPage: React.FC<ProsesVoucherPageProps> = ({ onBack }) => {
  const [showEntries, setShowEntries] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = showEntries;

  const totalPages = Math.ceil(voucherData.length / entriesPerPage);
  const currentEntries = voucherData.slice(
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
        <h2 className="text-xl font-bold text-text text-center col-start-2">Proses Voucher</h2>
        <div className="justify-self-end"></div> {/* Empty div to balance the grid */}
      </div>

      {/* Main Content Area */}
      <div className="w-full max-w-md flex flex-col gap-4 md:max-w-4xl">
        {/* Filter Card */}
        <div className="bg-surface p-6 rounded-xl shadow-card flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Cari No Voucher */}
            <div className="flex flex-col">
              <label htmlFor="noVoucher" className="text-sm font-medium text-text mb-1">Cari No Voucher</label>
              <div className="relative">
                <input
                  type="text"
                  id="noVoucher"
                  placeholder="RY-001"
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
                  placeholder="SO0023.12"
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
                  placeholder="SO0023.12"
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
                  placeholder="Proyek MEDCO"
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
                  <option>--Pilih Nama Project--</option>
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
                    defaultValue="2025-03-03"
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
                    defaultValue="2025-03-03"
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
        <div className="flex flex-wrap justify-between gap-3 mt-4">
          <button className="bg-success text-white px-4 py-2 rounded-lg flex items-center justify-center hover:bg-success/90 transition-colors duration-200 text-sm">
            <Plus size={18} className="mr-2" /> Tambah
          </button>
          <div className="flex flex-wrap gap-3">
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
        </div>

        {/* Voucher List Table */}
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
              <div className="grid grid-cols-[0.5fr_1fr_1fr_1fr_1.5fr_1fr_1fr_1fr_1fr_1.5fr] gap-4 text-xs font-medium text-textSecondary uppercase py-2 border-b border-border">
                <span className="flex items-center">NO <ArrowUp size={12} className="ml-1" /><ArrowDown size={12} /></span>
                <span className="flex items-center">NO VOUCHER <ArrowUp size={12} className="ml-1" /><ArrowDown size={12} /></span>
                <span className="flex items-center">NO SO <ArrowUp size={12} className="ml-1" /><ArrowDown size={12} /></span>
                <span className="flex items-center">NO SO TURUNAN <ArrowUp size={12} className="ml-1" /><ArrowDown size={12} /></span>
                <span className="flex items-center">NAMA PROJECT <ArrowUp size={12} className="ml-1" /><ArrowDown size={12} /></span>
                <span className="flex items-center">TGL PENGAJUAN <ArrowUp size={12} className="ml-1" /><ArrowDown size={12} /></span>
                <span className="flex items-center">TGL PEMBAYARAN <ArrowUp size={12} className="ml-1" /><ArrowDown size={12} /></span>
                <span className="flex items-center">TGL EXPENSE <ArrowUp size={12} className="ml-1" /><ArrowDown size={12} /></span>
                <span className="flex items-center">TGL EXPIRED <ArrowUp size={12} className="ml-1" /><ArrowDown size={12} /></span>
                <span className="flex items-center">NOMINAL PENGAJUAN <ArrowUp size={12} className="ml-1" /><ArrowDown size={12} /></span>
              </div>
              {currentEntries.map((entry, index) => (
                <div key={index} className="grid grid-cols-[0.5fr_1fr_1fr_1fr_1.5fr_1fr_1fr_1fr_1fr_1.5fr] gap-4 items-center py-3 border-b border-border/50 last:border-b-0">
                  <span className="text-sm text-text">{entry.no}</span>
                  <span className="text-sm text-text">{entry.noVoucher}</span>
                  <span className="text-sm text-text">{entry.noSo}</span>
                  <span className="text-sm text-text">{entry.noSoTurunan}</span>
                  <span className="text-sm text-text">{entry.namaProject}</span>
                  <span className="text-sm text-text">{entry.tglPengajuan}</span>
                  <span className="text-sm text-text">{entry.tglPembayaran}</span>
                  <span className="text-sm text-text">{entry.tglExpense}</span>
                  <span className="text-sm text-text">{entry.tglExpired}</span>
                  <span className="text-sm text-text">{entry.nominalPengajuan}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row items-center justify-between mt-4 text-sm">
            <div className="text-textSecondary mb-2 sm:mb-0">
              Showing {(currentPage - 1) * entriesPerPage + 1} to {Math.min(currentPage * entriesPerPage, voucherData.length)} of {voucherData.length} entries
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

export default ProsesVoucherPage;
