import React from 'react';
import { Plus, ArrowLeft } from 'lucide-react';

interface PbgPageProps {
  onBack: () => void;
  onAddPbg: () => void; // New prop to navigate to AddPbgPage
}

const PbgPage: React.FC<PbgPageProps> = ({ onBack, onAddPbg }) => {
  // Dummy data for PBG items
  const pbgItems = [
    {
      id: 'SO-005',
      sot: 'S0T-001',
      user: 'Ahmad Justin',
      project: 'Proyek Indonesia',
      dateRange: '01-01-2025 sd 02-01-2025',
      status: 'Approved',
      itemName: 'KCM 1 - Kacamata',
      quantity: 5,
      unit: 'pcs',
      usage: 'Digunakan Justin, Herwana, Putra, Rahman, Rendi',
      notes: 'Stok hanya ada 4 kacamata di gudang',
      scopeOfWork: 'Manage alat',
    },
    {
      id: 'SO-006',
      sot: 'S0T-002',
      user: 'Ibnu dan Adi',
      project: 'Proyek Malaysia',
      dateRange: '05-01-2025 sd 10-01-2025',
      status: 'Rejected',
      itemName: 'SRT 1 - Sarung Tangan',
      quantity: 2,
      unit: 'pcs',
      usage: 'Digunakan oleh Ibnu dan Adi',
      notes: '', // Empty notes for this item
      scopeOfWork: 'Pengadaan barang',
    },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col items-center">
      {/* Header */}
      <div className="w-full max-w-sm bg-primary p-4 flex items-center justify-between rounded-b-xl shadow-md">
        <button onClick={onBack} className="text-white p-2 rounded-full hover:bg-primary/80 transition-colors">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-white">PBG</h1>
        <div className="w-8"></div> {/* Placeholder for alignment */}
      </div>

      <div className="w-full max-w-sm p-4">
        {/* Tambah Button */}
        <button
          onClick={onAddPbg} // Call onAddPbg when "Tambah" is clicked
          className="bg-primary text-white p-3 rounded-xl w-full flex items-center justify-center gap-2 mt-4 mb-6 shadow-md hover:bg-primary/90 transition-colors active:scale-95"
        >
          <Plus size={20} />
          Tambah
        </button>

        {/* PBG Items */}
        {pbgItems.map((item, index) => (
          <div key={index} className="bg-surface p-6 rounded-xl shadow-card mb-6 relative">
            {/* Close Button */}
            <button className="absolute top-4 right-4 bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-medium hover:bg-red-200 transition-colors">
              Close
            </button>

            <h3 className="text-lg font-bold text-text">{item.id}</h3>
            <p className="text-sm text-textSecondary">{item.sot}</p>

            <p className="text-sm text-textSecondary mt-2">
              {item.user} <span className="inline-block w-1.5 h-1.5 bg-primary rounded-full mx-1 align-middle"></span> {item.project}
            </p>
            <p className="text-sm text-textSecondary mb-4">{item.dateRange}</p>

            {/* Status Tag */}
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              item.status === 'Approved' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
            }`}>
              {item.status}
            </span>

            <h4 className="text-lg font-bold text-text mt-4 mb-2">{item.itemName}</h4>

            {/* Quantity and Unit */}
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-lg font-semibold text-sm">
                {item.quantity}
              </span>
              <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-lg font-semibold text-sm">
                {item.unit}
              </span>
            </div>

            {/* Usage Description */}
            <p className="text-sm text-textSecondary mb-4">{item.usage}</p>

            {/* Notes */}
            {item.notes && (
              <div className="bg-gray-100 p-3 rounded-lg text-sm text-textSecondary mb-4">
                {item.notes}
              </div>
            )}

            {/* Scope Of Work */}
            <div className="mt-6">
              <label className="block text-text text-sm font-medium mb-2">Scope Of Work</label>
              <div className="bg-gray-100 p-3 rounded-lg text-sm text-textSecondary">
                {item.scopeOfWork}
              </div>
            </div>

            {/* Lampiran Button */}
            <button className="bg-primary text-white p-3 rounded-xl w-full mt-6 shadow-md hover:bg-primary/90 transition-colors active:scale-95">
              Lampiran
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PbgPage;
