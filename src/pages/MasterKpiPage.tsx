import React, { useState } from 'react';
import { ArrowLeft, Plus, Trash2 } from 'lucide-react';

interface MasterKpiPageProps {
  onBack: () => void;
}

interface KpiRow {
  id: string;
  kra: string;
  variableIndicator: string;
  responsibility: string;
  plan: string;
  satuan: string;
  bobot: string;
  target: string;
}

const MasterKpiPage: React.FC<MasterKpiPageProps> = ({ onBack }) => {
  const [kpiRows, setKpiRows] = useState<KpiRow[]>([
    { id: '1', kra: '', variableIndicator: '', responsibility: '', plan: '', satuan: '', bobot: '', target: '' }
  ]);

  const addKpiRow = () => {
    setKpiRows(prevRows => [
      ...prevRows,
      { id: String(prevRows.length + 1), kra: '', variableIndicator: '', responsibility: '', plan: '', satuan: '', bobot: '', target: '' }
    ]);
  };

  const removeKpiRow = (id: string) => {
    setKpiRows(prevRows => prevRows.filter(row => row.id !== id));
  };

  const handleRowChange = (id: string, field: keyof KpiRow, value: string) => {
    setKpiRows(prevRows =>
      prevRows.map(row => (row.id === id ? { ...row, [field]: value } : row))
    );
  };

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
        <h2 className="text-xl font-bold text-text text-center col-start-2">Master KPI</h2>
        <div className="justify-self-end"></div> {/* Empty div to balance the grid */}
      </div>

      {/* Main Content Area */}
      <div className="w-full max-w-md flex flex-col gap-4 md:max-w-2xl">
        {/* Data Pegawai Card */}
        <div className="bg-surface p-6 rounded-xl shadow-card flex flex-col gap-4">
          <h3 className="text-lg font-semibold text-text mb-2">Data Pegawai</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="namaPegawai" className="text-sm font-medium text-text mb-1 block">Nama Pegawai</label>
              <select
                id="namaPegawai"
                className="w-full p-3 rounded-lg border border-border bg-surface text-textSecondary focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200"
              >
                <option>--Pilih Nama Pegawai--</option>
                <option>Pegawai A</option>
                <option>Pegawai B</option>
              </select>
            </div>
            <div>
              <label htmlFor="namaPenilai" className="text-sm font-medium text-text mb-1 block">Nama Penilai</label>
              <select
                id="namaPenilai"
                className="w-full p-3 rounded-lg border border-border bg-surface text-textSecondary focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200"
              >
                <option>--Pilih Nama Penilai--</option>
                <option>Penilai X</option>
                <option>Penilai Y</option>
              </select>
            </div>
            <div>
              <label htmlFor="posisiPegawai" className="text-sm font-medium text-text mb-1 block">Posisi Pegawai</label>
              <input
                type="text"
                id="posisiPegawai"
                className="w-full p-3 rounded-lg border border-border bg-surface text-text focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200"
                placeholder="-"
              />
            </div>
            <div>
              <label htmlFor="posisiPenilai" className="text-sm font-medium text-text mb-1 block">Posisi Penilai</label>
              <input
                type="text"
                id="posisiPenilai"
                className="w-full p-3 rounded-lg border border-border bg-surface text-text focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200"
                placeholder="-"
              />
            </div>
          </div>

          <div>
            <label htmlFor="jenisKpi" className="text-sm font-medium text-text mb-1 block">Jenis KPI</label>
            <select
              id="jenisKpi"
              className="w-full p-3 rounded-lg border border-border bg-surface text-textSecondary focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200"
            >
              <option>--Pilih Jenis KPI--</option>
              <option>KPI Tahunan</option>
              <option>KPI Bulanan</option>
            </select>
          </div>

          <button className="bg-primary text-white px-4 py-2 rounded-lg flex items-center justify-center hover:bg-primary/90 transition-colors duration-200 self-end mt-4">
            <Plus size={18} className="mr-2" /> Tambah Prespektif
          </button>
        </div>

        {/* Prespektif Card */}
        <div className="bg-surface p-6 rounded-xl shadow-card flex flex-col gap-4">
          <h3 className="text-lg font-semibold text-text mb-2">Prespektif</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
            <div>
              <label htmlFor="prespektif" className="text-sm font-medium text-text mb-1 block">Prespektif</label>
              <select
                id="prespektif"
                className="w-full p-3 rounded-lg border border-border bg-surface text-textSecondary focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200"
              >
                <option>--Pilih Prespektif--</option>
                <option>Keuangan</option>
                <option>Pelanggan</option>
              </select>
            </div>
            <div>
              <label htmlFor="bobotPrespektif" className="text-sm font-medium text-text mb-1 block">Bobot Prespektif (%)</label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  id="bobotPrespektif"
                  className="flex-1 p-3 rounded-lg border border-border bg-surface text-text focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200"
                  placeholder="Masukkan Bobot Prespektif"
                />
                <button
                  onClick={addKpiRow}
                  className="bg-primary text-white px-4 py-2 rounded-lg flex items-center justify-center hover:bg-primary/90 transition-colors duration-200 whitespace-nowrap"
                >
                  <Plus size={18} className="mr-2" /> Tambah Baris
                </button>
              </div>
            </div>
          </div>

          {/* KPI Rows Table-like structure */}
          <div className="overflow-x-auto mt-4">
            <div className="min-w-[700px] md:min-w-full"> {/* Adjust min-w for mobile scroll */}
              <div className="grid grid-cols-[1fr_1fr_1fr_0.8fr_0.8fr_0.6fr_0.8fr_0.4fr] gap-2 text-xs font-medium text-textSecondary uppercase py-2 border-b border-border">
                <span>KRA</span>
                <span>Variabel Indicator</span>
                <span>Responsibility</span>
                <span>Plan</span>
                <span>Satuan</span>
                <span>Bobot (%)</span>
                <span>Target</span>
                <span className="text-center">Aksi</span>
              </div>
              {kpiRows.map(row => (
                <div key={row.id} className="grid grid-cols-[1fr_1fr_1fr_0.8fr_0.8fr_0.6fr_0.8fr_0.4fr] gap-2 items-center py-3 border-b border-border/50 last:border-b-0">
                  <textarea
                    className="w-full p-2 rounded-lg border border-border bg-surface text-text text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-y min-h-[40px]"
                    value={row.kra}
                    onChange={(e) => handleRowChange(row.id, 'kra', e.target.value)}
                  ></textarea>
                  <textarea
                    className="w-full p-2 rounded-lg border border-border bg-surface text-text text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-y min-h-[40px]"
                    value={row.variableIndicator}
                    onChange={(e) => handleRowChange(row.id, 'variableIndicator', e.target.value)}
                  ></textarea>
                  <textarea
                    className="w-full p-2 rounded-lg border border-border bg-surface text-text text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-y min-h-[40px]"
                    value={row.responsibility}
                    onChange={(e) => handleRowChange(row.id, 'responsibility', e.target.value)}
                  ></textarea>
                  <select
                    className="w-full p-2 rounded-lg border border-border bg-surface text-textSecondary text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    value={row.plan}
                    onChange={(e) => handleRowChange(row.id, 'plan', e.target.value)}
                  >
                    <option>--Pilih Pln--</option>
                    <option>Plan A</option>
                  </select>
                  <select
                    className="w-full p-2 rounded-lg border border-border bg-surface text-textSecondary text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    value={row.satuan}
                    onChange={(e) => handleRowChange(row.id, 'satuan', e.target.value)}
                  >
                    <option>--Pilih Satua--</option>
                    <option>Unit</option>
                  </select>
                  <input
                    type="text"
                    className="w-full p-2 rounded-lg border border-border bg-surface text-text text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    value={row.bobot}
                    onChange={(e) => handleRowChange(row.id, 'bobot', e.target.value)}
                  />
                  <input
                    type="text"
                    className="w-full p-2 rounded-lg border border-border bg-surface text-text text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    value={row.target}
                    onChange={(e) => handleRowChange(row.id, 'target', e.target.value)}
                  />
                  <button
                    onClick={() => removeKpiRow(row.id)}
                    className="flex items-center justify-center text-error hover:text-error/80 transition-colors duration-200"
                    aria-label="Hapus baris"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <button className="bg-error text-white px-4 py-2 rounded-lg flex items-center justify-center hover:bg-error/90 transition-colors duration-200 self-end mt-6">
            Hapus Prespektif
          </button>
        </div>
      </div>
    </div>
  );
};

export default MasterKpiPage;
