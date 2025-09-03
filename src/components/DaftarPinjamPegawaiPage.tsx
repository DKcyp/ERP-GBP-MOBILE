import React from 'react';
import { ArrowLeft, Trash2 } from 'lucide-react';

interface DaftarPinjamPegawaiPageProps {
  onBack: () => void;
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
    name: 'Michael Scott',
    nominal: 'Rp1.000.000',
    tanggalPengajuan: '01-01-2025',
    tanggalJatuhTempo: '01-02-2025',
    keperluan: 'Keperluan Pribadi',
    status: 'Belum Lunas',
  },
  {
    id: '2',
    name: 'John Due',
    nominal: 'Rp1.000.000',
    tanggalPengajuan: '01-01-2025',
    tanggalJatuhTempo: '01-02-2025',
    keperluan: 'Keperluan Pribadi',
    status: 'Jatuh Tempo',
  },
  {
    id: '3',
    name: 'Jim Halpert',
    nominal: 'Rp1.000.000',
    tanggalPengajuan: '01-01-2025',
    tanggalJatuhTempo: '01-02-2025',
    keperluan: 'Keperluan Pribadi',
    status: 'Lunas',
  },
  {
    id: '4',
    name: 'Pam Beesly',
    nominal: 'Rp500.000',
    tanggalPengajuan: '15-12-2024',
    tanggalJatuhTempo: '15-01-2025',
    keperluan: 'Perbaikan Rumah',
    status: 'Belum Lunas',
  },
  {
    id: '5',
    name: 'Dwight Schrute',
    nominal: 'Rp2.500.000',
    tanggalPengajuan: '10-11-2024',
    tanggalJatuhTempo: '10-12-2024',
    keperluan: 'Investasi Pertanian',
    status: 'Jatuh Tempo',
  },
];

const DaftarPinjamPegawaiPage: React.FC<DaftarPinjamPegawaiPageProps> = ({ onBack }) => {
  const getStatusClasses = (status: LoanEntry['status']) => {
    switch (status) {
      case 'Belum Lunas':
        return 'bg-warning/20 text-warning'; // Using warning color from palette
      case 'Jatuh Tempo':
        return 'bg-error/20 text-error';   // Using error color from palette
      case 'Lunas':
        return 'bg-success/20 text-success'; // Using success color from palette
      default:
        return 'bg-gray-200 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center">
      {/* Header */}
      <div className="w-full max-w-sm bg-primary p-4 flex items-center justify-between rounded-b-xl shadow-md">
        <button onClick={onBack} className="text-white p-2 rounded-full hover:bg-primary/80 transition-colors">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-white">Daftar Pinjaman Pegawai</h1>
        <div className="w-8"></div> {/* Placeholder for alignment */}
      </div>

      {/* Loan List */}
      <div className="w-full max-w-sm p-4 space-y-4">
        {dummyLoanData.map((loan) => (
          <div key={loan.id} className="bg-surface p-6 rounded-xl shadow-card">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-lg font-semibold text-text">{loan.name}</h2>
              <div className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusClasses(loan.status)}`}>
                {loan.status}
                {loan.status === 'Lunas' && <Trash2 size={14} className="text-success" />}
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
    </div>
  );
};

export default DaftarPinjamPegawaiPage;
