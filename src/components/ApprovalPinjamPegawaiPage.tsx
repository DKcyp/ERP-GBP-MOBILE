import React from 'react';
import { ArrowLeft, CheckCircle, XCircle } from 'lucide-react';
import Button from './Button'; // Assuming Button component exists

interface ApprovalPinjamPegawaiPageProps {
  onBack: () => void;
}

interface ApprovalLoanEntry {
  id: string;
  name: string;
  nominal: string;
  tanggalPengajuan: string;
  tanggalJatuhTempo: string;
  keperluan: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

const dummyApprovalLoanData: ApprovalLoanEntry[] = [
  {
    id: '1',
    name: 'Michael Scott',
    nominal: 'Rp1.500.000',
    tanggalPengajuan: '05-01-2025',
    tanggalJatuhTempo: '05-02-2025',
    keperluan: 'Biaya Pendidikan Anak',
    status: 'Pending',
  },
  {
    id: '2',
    name: 'John Due',
    nominal: 'Rp800.000',
    tanggalPengajuan: '10-01-2025',
    tanggalJatuhTempo: '10-02-2025',
    keperluan: 'Pembelian Gadget Baru',
    status: 'Pending',
  },
  {
    id: '3',
    name: 'Jim Halpert',
    nominal: 'Rp2.000.000',
    tanggalPengajuan: '15-12-2024',
    tanggalJatuhTempo: '15-01-2025',
    keperluan: 'Renovasi Dapur',
    status: 'Approved',
  },
  {
    id: '4',
    name: 'Pam Beesly',
    nominal: 'Rp700.000',
    tanggalPengajuan: '20-12-2024',
    tanggalJatuhTempo: '20-01-2025',
    keperluan: 'Liburan Keluarga',
    status: 'Rejected',
  },
];

const ApprovalPinjamPegawaiPage: React.FC<ApprovalPinjamPegawaiPageProps> = ({ onBack }) => {
  const getStatusClasses = (status: ApprovalLoanEntry['status']) => {
    switch (status) {
      case 'Pending':
        return 'bg-warning/20 text-warning';
      case 'Approved':
        return 'bg-success/20 text-success';
      case 'Rejected':
        return 'bg-error/20 text-error';
      default:
        return 'bg-gray-200 text-gray-800';
    }
  };

  const handleApprove = (id: string) => {
    console.log(`Loan ${id} Approved`);
    alert(`Pinjaman ${id} disetujui!`);
    // In a real app, you'd update state or call an API
  };

  const handleReject = (id: string) => {
    console.log(`Loan ${id} Rejected`);
    alert(`Pinjaman ${id} ditolak!`);
    // In a real app, you'd update state or call an API
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center">
      {/* Header */}
      <div className="w-full max-w-sm bg-primary p-4 flex items-center justify-between rounded-b-xl shadow-md">
        <button onClick={onBack} className="text-white p-2 rounded-full hover:bg-primary/80 transition-colors">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-white">Approval Pinjaman Pegawai</h1>
        <div className="w-8"></div> {/* Placeholder for alignment */}
      </div>

      <div className="w-full max-w-sm p-4 space-y-4">
        {dummyApprovalLoanData.map((loan) => (
          <div key={loan.id} className="bg-surface p-6 rounded-xl shadow-card">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-lg font-semibold text-text">{loan.name}</h2>
              <div className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusClasses(loan.status)}`}>
                {loan.status}
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

            <div className="bg-background p-3 rounded-lg text-sm text-textSecondary mb-4">
              {loan.keperluan}
            </div>

            {loan.status === 'Pending' && (
              <div className="flex gap-2 mt-4">
                <Button
                  onClick={() => handleApprove(loan.id)}
                  className="flex-1 bg-success text-white py-2 rounded-lg flex items-center justify-center gap-1 hover:bg-success/90 transition-colors"
                >
                  <CheckCircle size={18} /> Approve
                </Button>
                <Button
                  onClick={() => handleReject(loan.id)}
                  className="flex-1 bg-error text-white py-2 rounded-lg flex items-center justify-center gap-1 hover:bg-error/90 transition-colors"
                >
                  <XCircle size={18} /> Reject
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApprovalPinjamPegawaiPage;
