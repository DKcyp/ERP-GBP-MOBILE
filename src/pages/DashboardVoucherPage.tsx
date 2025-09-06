import React, { useState } from 'react';
import { ArrowLeft, Search, Calendar, FileText, FileSpreadsheet, FileDown } from 'lucide-react';

interface DashboardVoucherPageProps {
  onBack: () => void;
}

interface VoucherEntry {
  noVoucher: string;
  noSo: string;
  noSoTurunan: string;
  namaProject: string;
  namaPemohon: string;
  tglPengajuanVoucher: string;
  tglPembayaranVoucher: string;
  tglExpired: string;
  tglLaporanExpense: string;
  nominal: string;
  keterangan: string;
}

const voucherData: VoucherEntry[] = [
  {
    noVoucher: 'VCH001',
    noSo: 'SO001',
    noSoTurunan: '-',
    namaProject: 'Project A',
    namaPemohon: 'Abdul Karim',
    tglPengajuanVoucher: '10-01-2025',
    tglPembayaranVoucher: '15-01-2025',
    tglExpired: '25-01-2025',
    tglLaporanExpense: '30-01-2025',
    nominal: 'Rp 20,000,000',
    keterangan: 'Tugas Luar Kota',
  },
  {
    noVoucher: 'VCH002',
    noSo: 'SO002',
    noSoTurunan: 'SO002.4',
    namaProject: 'Project B',
    namaPemohon: 'Juna Saputra',
    tglPengajuanVoucher: '10-01-2025',
    tglPembayaranVoucher: '15-01-2025',
    tglExpired: '25-01-2025',
    tglLaporanExpense: '30-01-2025',
    nominal: 'Rp 25,000,000',
    keterangan: 'Tugas Luar Kota',
  },
  {
    noVoucher: 'VCH003',
    noSo: 'SO003',
    noSoTurunan: 'SO003.12',
    namaProject: 'Inspeksi Rope Access',
    namaPemohon: 'Rizky Andrian',
    tglPengajuanVoucher: '12-02-2025',
    tglPembayaranVoucher: '17-02-2025',
    tglExpired: '27-02-2025',
    tglLaporanExpense: '05-03-2025',
    nominal: 'Rp 15,000,000',
    keterangan: 'Perjalanan Dinas ke Site',
  },
  {
    noVoucher: 'VCH004',
    noSo: '-',
    noSoTurunan: '-',
    namaProject: 'Training Keselamatan Kerja',
    namaPemohon: 'Hendra Prasetyo',
    tglPengajuanVoucher: '15-02-2025',
    tglPembayaranVoucher: '20-02-2025',
    tglExpired: '01-03-2025',
    tglLaporanExpense: '07-03-2025',
    nominal: 'Rp 30,000,000',
    keterangan: 'Pelatihan Internal',
  },
  {
    noVoucher: 'VCH005',
    noSo: 'SO004',
    noSoTurunan: 'SO004.1',
    namaProject: 'Audit Sistem',
    namaPemohon: 'Siti Aminah',
    tglPengajuanVoucher: '20-02-2025',
    tglPembayaranVoucher: '25-02-2025',
    tglExpired: '05-03-2025',
    tglLaporanExpense: '10-03-2025',
    nominal: 'Rp 12,500,000',
    keterangan: 'Pengadaan Software',
  },
];

const DashboardVoucherPage: React.FC<DashboardVoucherPageProps> = ({ onBack }) => {
  const [showEntries, setShowEntries] = useState(10);

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
        <h2 className="text-xl font-bold text-text text-center col-start-2">Dashboard Voucher</h2>
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
                  placeholder="VCH001"
                  className="w-full p-2 pl-3 pr-10 border border-border rounded-lg text-text text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
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
                  className="w-full p-2 pl-3 pr-10 border border-border rounded-lg text-text text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
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
                  placeholder="SO001.12"
                  className="w-full p-2 pl-3 pr-10 border border-border rounded-lg text-text text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
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
                  placeholder="Proyek Medco"
                  className="w-full p-2 pl-3 pr-10 border border-border rounded-lg text-text text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                <Search size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-textSecondary" />
              </div>
            </div>

            {/* Cari Status */}
            <div className="flex flex-col">
              <label htmlFor="status" className="text-sm font-medium text-text mb-1">Cari Status</label>
              <select
                id="status"
                className="w-full p-2 pl-3 pr-10 border border-border rounded-lg text-text text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 bg-white appearance-none"
              >
                <option>--Pilih Status--</option>
                <option>Approved</option>
                <option>Pending</option>
                <option>Rejected</option>
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-textSecondary pointer-events-none">
                <ArrowLeft size={18} className="rotate-90" /> {/* Custom arrow for select */}
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
                    className="w-full p-2 pl-3 pr-10 border border-border rounded-lg text-text text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 appearance-none"
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
                    className="w-full p-2 pl-3 pr-10 border border-border rounded-lg text-text text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 appearance-none"
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

        {/* Export Buttons */}
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
            <div className="min-w-[1200px] md:min-w-full"> {/* Adjust min-w for mobile scroll */}
              <div className="grid grid-cols-[1fr_1fr_1fr_1.5fr_1.5fr_1fr_1fr_1fr_1fr_1.5fr_2fr] gap-4 text-xs font-medium text-textSecondary uppercase py-2 border-b border-border">
                <span>NO VOUCHER</span>
                <span>NO SO</span>
                <span>NO SO TURUNAN</span>
                <span>NAMA PROJECT</span>
                <span>NAMA PEMOHON</span>
                <span>TGL PENGAJUAN VOUCHER</span>
                <span>TGL PEMBAYARAN VOUCHER</span>
                <span>TGL EXPIRED</span>
                <span>TGL LAPORAN EXPENSE</span>
                <span>NOMINAL</span>
                <span>KETERANGAN</span>
              </div>
              {voucherData.slice(0, showEntries).map((entry, index) => (
                <div key={index} className="grid grid-cols-[1fr_1fr_1fr_1.5fr_1.5fr_1fr_1fr_1fr_1fr_1.5fr_2fr] gap-4 items-center py-3 border-b border-border/50 last:border-b-0">
                  <span className="text-sm text-text">{entry.noVoucher}</span>
                  <span className="text-sm text-text">{entry.noSo}</span>
                  <span className="text-sm text-text">{entry.noSoTurunan}</span>
                  <span className="text-sm text-text">{entry.namaProject}</span>
                  <span className="text-sm text-text">{entry.namaPemohon}</span>
                  <span className="text-sm text-text">{entry.tglPengajuanVoucher}</span>
                  <span className="text-sm text-text">{entry.tglPembayaranVoucher}</span>
                  <span className="text-sm text-text">{entry.tglExpired}</span>
                  <span className="text-sm text-text">{entry.tglLaporanExpense}</span>
                  <span className="text-sm text-text">{entry.nominal}</span>
                  <span className="text-sm text-text">{entry.keterangan}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardVoucherPage;
