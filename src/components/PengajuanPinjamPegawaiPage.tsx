import React, { useState } from 'react';
import { ArrowLeft, Trash2, Plus } from 'lucide-react';
import Modal from './Modal';

interface PengajuanPinjamPegawaiPageProps {
  onBack: () => void;
  onAddPengajuanPinjamPegawai: () => void;
}

interface LoanEntry {
  id: string;
  name: string;
  nominal: string;
  tanggalPengajuan: string;
  tanggalJatuhTempo: string;
  keperluan: string;
  status: 'Belum Lunas' | 'Jatuh Tempo' | 'Lunas';
}

const dummyLoanData: LoanEntry[] = [
  {
    id: '1',
    name: 'Ahmad Syahroni',
    nominal: 'Rp1.000.000',
    tanggalPengajuan: '01-01-2025',
    tanggalJatuhTempo: '01-02-2025',
    keperluan: 'Keperluan Pribadi',
    status: 'Belum Lunas',
  },
  {
    id: '2',
    name: 'Ahmad Syahroni',
    nominal: 'Rp1.000.000',
    tanggalPengajuan: '01-01-2025',
    tanggalJatuhTempo: '01-02-2025',
    keperluan: 'Keperluan Pribadi',
    status: 'Jatuh Tempo',
  },
  {
    id: '3',
    name: 'Ahmad Syahroni',
    nominal: 'Rp1.000.000',
    tanggalPengajuan: '01-01-2025',
    tanggalJatuhTempo: '01-02-2025',
    keperluan: 'Keperluan Pribadi',
    status: 'Lunas',
  },
  {
    id: '4',
    name: 'Ahmad Syahroni',
    nominal: 'Rp500.000',
    tanggalPengajuan: '15-12-2024',
    tanggalJatuhTempo: '15-01-2025',
    keperluan: 'Perbaikan Rumah',
    status: 'Belum Lunas',
  },
  {
    id: '5',
    name: 'Ahmad Syahroni',
    nominal: 'Rp2.500.000',
    tanggalPengajuan: '10-11-2024',
    tanggalJatuhTempo: '10-12-2024',
    keperluan: 'Investasi Pertanian',
    status: 'Jatuh Tempo',
  },
];

const PengajuanPinjamPegawaiPage: React.FC<PengajuanPinjamPegawaiPageProps> = ({ onBack, onAddPengajuanPinjamPegawai }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedLoanToDelete, setSelectedLoanToDelete] = useState<LoanEntry | null>(null);

  const getStatusClasses = (status: LoanEntry['status']) => {
    switch (status) {
      case 'Belum Lunas':
        return 'bg-warning/20 text-warning';
      case 'Jatuh Tempo':
        return 'bg-error/20 text-error';
      case 'Lunas':
        return 'bg-success/20 text-success';
      default:
        return 'bg-gray-200 text-gray-800';
    }
  };

  const handleDeleteClick = (loan: LoanEntry) => {
    setSelectedLoanToDelete(loan);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (selectedLoanToDelete) {
      console.log(`Deleting loan: ${selectedLoanToDelete.name} (${selectedLoanToDelete.id})`);
      // In a real application, you would dispatch an action or call an API here to delete the loan.
      // For now, we just close the modal.
    }
    setShowDeleteModal(false);
    setSelectedLoanToDelete(null);
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setSelectedLoanToDelete(null);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center">
      {/* Header */}
      <div className="w-full max-w-sm bg-primary p-4 flex items-center justify-between rounded-b-xl shadow-md">
        <button onClick={onBack} className="text-white p-2 rounded-full hover:bg-primary/80 transition-colors">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-white">Pengajuan Pinjaman Pegawai</h1>
        <div className="w-8"></div> {/* Placeholder for alignment */}
      </div>
      <div className="w-full max-w-sm p-4 space-y-4">
        {/* Tambah Button */}
        <button
          onClick={onAddPengajuanPinjamPegawai}
          className="bg-primary text-white p-3 rounded-xl w-full flex items-center justify-center gap-2 mt-4 mb-6 shadow-md hover:bg-primary/90 transition-colors active:scale-95"
        >
          <Plus size={20} />
          Tambah
        </button>
        {/* Loan List */}
        {dummyLoanData.map((loan) => (
          <div key={loan.id} className="bg-surface p-6 rounded-xl shadow-card">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-lg font-semibold text-text">{loan.name}</h2>
              <div className="flex items-center gap-2">
                <div className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusClasses(loan.status)}`}>
                  {loan.status}
                </div>
                <button
                  onClick={() => handleDeleteClick(loan)}
                  className="p-1 rounded-full text-textSecondary hover:bg-background transition-colors active:scale-95"
                  aria-label={`Hapus pengajuan pinjaman ${loan.name}`}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-y-2 mb-4">
              <p className="text-sm text-textSecondary">Nominal Piutang</p>
              <p className="text-sm text-text font-medium text-right">{loan.nominal}</p>

              <p className="text-sm text-textSecondary">Tanggal Pengajuan</p>
              <p className="text-sm text-text font-medium text-right">{loan.tanggalPengajuan}</p>

              <p className="text-sm text-textSecondary">Tanggal Jatuh Tempo</p>
              <p className="text-sm text-text font-medium text-right">{loan.tanggalJatuhTempo}</p>
            </div>

            <div className="bg-background p-3 rounded-lg text-sm text-textSecondary">
              {loan.keperluan}
            </div>
          </div>
        ))}
      </div>

      {/* Delete Confirmation Popup */}
      <Modal
        isOpen={showDeleteModal && !!selectedLoanToDelete}
        onClose={cancelDelete}
        title="Notifikasi"
        message={selectedLoanToDelete ? `Apakah anda yakin ingin menghapus Pengajuan Pinjaman ${selectedLoanToDelete.name} pada ${selectedLoanToDelete.tanggalPengajuan}?` : ''}
        onConfirm={confirmDelete}
        confirmText="Hapus"
        cancelText="Batal"
      />
    </div>
  );
};

export default PengajuanPinjamPegawaiPage;
