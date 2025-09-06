import React from 'react';
import { ArrowLeft, Plus, Eye } from 'lucide-react';

interface ListKpiPageProps {
  onBack: () => void;
}

interface KpiEntry {
  no: number;
  namaPegawai: string;
  posisiPegawai: string;
  atasanLangsung: string;
  posisiAtasan: string;
  periode: string;
}

const kpiData: KpiEntry[] = [
  { no: 1, namaPegawai: 'Kasim', posisiPegawai: 'Operation Manager', atasanLangsung: 'Andi Setiawan', posisiAtasan: 'General Manager', periode: 'Januari 2025' },
  { no: 2, namaPegawai: 'Rina Sari', posisiPegawai: 'Operation Manager', atasanLangsung: 'Arief Nugroho', posisiAtasan: 'General Manager', periode: 'Januari 2025' },
  { no: 3, namaPegawai: 'Budi Santoso', posisiPegawai: 'Operation Manager', atasanLangsung: 'Siti Rahma', posisiAtasan: 'General Manager', periode: 'Januari 2025' },
  { no: 4, namaPegawai: 'Dewi Lestari', posisiPegawai: 'Marketing Executive', atasanLangsung: 'Bambang Wijaya', posisiAtasan: 'Marketing Manager', periode: 'Januari 2025' },
  { no: 5, namaPegawai: 'Fajar Pratama', posisiPegawai: 'Finance Staff', atasanLangsung: 'Citra Kirana', posisiAtasan: 'Finance Manager', periode: 'Januari 2025' },
];

const ListKpiPage: React.FC<ListKpiPageProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-background p-4 flex flex-col items-center">
      {/* Header */}
      <div className="w-full max-w-md bg-surface p-6 rounded-xl shadow-card grid grid-cols-3 items-center mb-8">
        <button
          onClick={onBack}
          className="flex items-center text-textSecondary hover:text-primary transition-colors duration-200 justify-self-start"
          aria-label="Back to menu"
        >
          <ArrowLeft size={20} className="mr-1" />
          Back
        </button>
        <h2 className="text-xl font-bold text-text text-center col-start-2">KPI List</h2>
        <div className="justify-self-end"></div> {/* Empty div to balance the grid */}
      </div>

      {/* Main Content Area */}
      <div className="w-full max-w-md flex flex-col gap-4 md:max-w-2xl">
        {/* KPI List Card */}
        <div className="bg-surface p-6 rounded-xl shadow-card flex flex-col gap-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-text">KPI List</h3>
            <button className="bg-success text-white px-4 py-2 rounded-lg flex items-center justify-center hover:bg-success/90 transition-colors duration-200">
              <Plus size={18} className="mr-2" /> Tambah
            </button>
          </div>

          {/* Table-like structure */}
          <div className="overflow-x-auto">
            <div className="min-w-[800px] md:min-w-full"> {/* Adjust min-w for mobile scroll */}
              <div className="grid grid-cols-[0.5fr_1.5fr_1.5fr_1.5fr_1.5fr_1fr_0.5fr] gap-4 text-xs font-medium text-textSecondary uppercase py-2 border-b border-border">
                <span>NO</span>
                <span>NAMA PEGAWAI</span>
                <span>POSISI PEGAWAI</span>
                <span>ATASAN LANGSUNG</span>
                <span>POSISI ATASAN</span>
                <span>PERIODE</span>
                <span className="text-center">AKSI</span>
              </div>
              {kpiData.map((entry) => (
                <div key={entry.no} className="grid grid-cols-[0.5fr_1.5fr_1.5fr_1.5fr_1.5fr_1fr_0.5fr] gap-4 items-center py-3 border-b border-border/50 last:border-b-0">
                  <span className="text-sm text-text">{entry.no}</span>
                  <span className="text-sm text-text">{entry.namaPegawai}</span>
                  <span className="text-sm text-text">{entry.posisiPegawai}</span>
                  <span className="text-sm text-text">{entry.atasanLangsung}</span>
                  <span className="text-sm text-text">{entry.posisiAtasan}</span>
                  <span className="text-sm text-text">{entry.periode}</span>
                  <div className="flex justify-center">
                    <button
                      className="text-primary hover:text-primary/80 transition-colors duration-200"
                      aria-label={`View details for ${entry.namaPegawai}`}
                    >
                      <Eye size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListKpiPage;
