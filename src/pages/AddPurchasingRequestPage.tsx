import React, { useState } from 'react';
import { ArrowLeft, Calendar } from 'lucide-react';

interface AddPurchasingRequestPageProps {
  onBack: () => void;
}

const AddPurchasingRequestPage: React.FC<AddPurchasingRequestPageProps> = ({ onBack }) => {
  const [tanggal, setTanggal] = useState('');
  const [noPr, setNoPr] = useState('PR00X');
  const [noSo, setNoSo] = useState('SO00X.YY');
  const [departemen, setDepartemen] = useState<'HRD' | 'Finance' | 'Operasional'>('HRD');
  const [statusPr, setStatusPr] = useState<'Pending' | 'Approve' | 'Rejected'>('Pending');
  const [statusPo, setStatusPo] = useState<'PO' | '-' >('-');
  const [keterangan, setKeterangan] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('PR tersimpan (demo)');
    onBack();
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center">
      {/* Header */}
      <div className="w-full max-w-sm bg-primary p-4 flex items-center justify-between rounded-b-xl shadow-md">
        <button onClick={onBack} className="text-white p-2 rounded-full hover:bg-primary/80 transition-colors">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-white">Entry Purchasing Request</h1>
        <div className="w-8" />
      </div>

      <form onSubmit={handleSubmit} className="w-full max-w-sm p-4 space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm text-textSecondary mb-1">Tanggal PR</label>
            <div className="relative">
              <input type="date" value={tanggal} onChange={(e)=>setTanggal(e.target.value)} className="w-full h-11 pr-10 pl-3 rounded-lg border" />
              <Calendar size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-textSecondary" />
            </div>
          </div>
          <div>
            <label className="block text-sm text-textSecondary mb-1">No PR</label>
            <input value={noPr} onChange={(e)=>setNoPr(e.target.value)} className="w-full h-11 px-3 rounded-lg border" />
          </div>
          <div>
            <label className="block text-sm text-textSecondary mb-1">No SO</label>
            <input value={noSo} onChange={(e)=>setNoSo(e.target.value)} className="w-full h-11 px-3 rounded-lg border" />
          </div>
          <div>
            <label className="block text-sm text-textSecondary mb-1">Departemen</label>
            <select value={departemen} onChange={(e)=>setDepartemen(e.target.value as any)} className="w-full h-11 px-3 rounded-lg border">
              <option value="HRD">HRD</option>
              <option value="Finance">Finance</option>
              <option value="Operasional">Operasional</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-textSecondary mb-1">Status PR</label>
            <select value={statusPr} onChange={(e)=>setStatusPr(e.target.value as any)} className="w-full h-11 px-3 rounded-lg border">
              <option value="Pending">Pending</option>
              <option value="Approve">Approve</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-textSecondary mb-1">Status PO</label>
            <select value={statusPo} onChange={(e)=>setStatusPo(e.target.value as any)} className="w-full h-11 px-3 rounded-lg border">
              <option value="-">-</option>
              <option value="PO">PO</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm text-textSecondary mb-1">Keterangan</label>
          <textarea value={keterangan} onChange={(e)=>setKeterangan(e.target.value)} className="w-full min-h-[96px] p-3 rounded-lg border" placeholder="Masukkan keterangan..." />
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={onBack} className="flex-1 h-11 rounded-lg border">Batal</button>
          <button type="submit" className="flex-1 h-11 rounded-lg bg-primary text-white shadow">Simpan PR</button>
        </div>
      </form>
    </div>
  );
};

export default AddPurchasingRequestPage;
