import React, { useState } from 'react';
import { X, Calendar } from 'lucide-react';

export type PRStatus = 'Approve' | 'Rejected' | 'Pending';
export type POStatus = 'PO' | '-';

export interface PurchasingRequestEntry {
  id: string; // running number or uuid
  tanggal: string; // yyyy-mm-dd
  noPr: string;
  noSo: string;
  departemen: 'HRD' | 'Finance' | 'Operasional';
  keterangan: string;
  statusPr: PRStatus;
  statusPo: POStatus;
}

interface AddPurchasingRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (entry: Omit<PurchasingRequestEntry, 'id'>) => void;
}

const AddPurchasingRequestModal: React.FC<AddPurchasingRequestModalProps> = ({ isOpen, onClose, onSave }) => {
  const [form, setForm] = useState<Omit<PurchasingRequestEntry, 'id'>>({
    tanggal: '',
    noPr: 'PR00X',
    noSo: 'SO00X.YY',
    departemen: 'HRD',
    keterangan: '',
    statusPr: 'Pending',
    statusPo: '-',
  });

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setForm(prev => ({ ...prev, [id]: value as any }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.tanggal) {
      alert('Tanggal PR wajib diisi');
      return;
    }
    onSave(form);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl">
        <div className="flex items-center justify-between px-5 py-4 border-b">
          <h3 className="text-lg font-semibold text-text">Entry Purchasing Request</h3>
          <button onClick={onClose} className="p-1 rounded hover:bg-gray-100">
            <X size={18} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="tanggal" className="block text-sm text-textSecondary mb-1">Tanggal PR</label>
              <div className="relative">
                <input id="tanggal" type="date" value={form.tanggal} onChange={handleChange} className="w-full h-10 pr-10 pl-3 rounded-lg border" />
                <Calendar size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-textSecondary" />
              </div>
            </div>
            <div>
              <label htmlFor="noPr" className="block text-sm text-textSecondary mb-1">No PR</label>
              <input id="noPr" value={form.noPr} onChange={handleChange} className="w-full h-10 px-3 rounded-lg border" />
            </div>
            <div>
              <label htmlFor="noSo" className="block text-sm text-textSecondary mb-1">No SO</label>
              <input id="noSo" value={form.noSo} onChange={handleChange} className="w-full h-10 px-3 rounded-lg border" />
            </div>
            <div>
              <label htmlFor="departemen" className="block text-sm text-textSecondary mb-1">Departemen</label>
              <select id="departemen" value={form.departemen} onChange={handleChange} className="w-full h-10 px-3 rounded-lg border">
                <option value="HRD">HRD</option>
                <option value="Finance">Finance</option>
                <option value="Operasional">Operasional</option>
              </select>
            </div>
            <div>
              <label htmlFor="statusPr" className="block text-sm text-textSecondary mb-1">Status PR</label>
              <select id="statusPr" value={form.statusPr} onChange={handleChange} className="w-full h-10 px-3 rounded-lg border">
                <option value="Pending">Pending</option>
                <option value="Approve">Approve</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
            <div>
              <label htmlFor="statusPo" className="block text-sm text-textSecondary mb-1">Status PO</label>
              <select id="statusPo" value={form.statusPo} onChange={handleChange} className="w-full h-10 px-3 rounded-lg border">
                <option value="-">-</option>
                <option value="PO">PO</option>
              </select>
            </div>
          </div>
          <div>
            <label htmlFor="keterangan" className="block text-sm text-textSecondary mb-1">Keterangan</label>
            <textarea id="keterangan" value={form.keterangan} onChange={handleChange} className="w-full min-h-[90px] p-3 rounded-lg border" placeholder="Masukkan keterangan..." />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={onClose} className="h-10 px-4 rounded-lg border bg-gray-50">Batal</button>
            <button type="submit" className="h-10 px-4 rounded-lg bg-primary text-white shadow hover:opacity-90">Simpan PR</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPurchasingRequestModal;
