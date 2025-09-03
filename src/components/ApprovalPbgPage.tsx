import React, { useState } from 'react';
import { ArrowLeft, User, Briefcase, CalendarDays } from 'lucide-react';
import FormField from './FormField';
import Button from './Button';

interface ApprovalPbgPageProps {
  onBack: () => void;
}

interface PbgApprovalItem {
  id: string;
  code: string;
  name: string;
  value: number;
  quantity: number;
  unit: string;
  description: string;
  approvalNotes: string;
  status: 'pending' | 'approved' | 'rejected';
}

interface PbgApprovalRequest {
  id: string;
  prNumber: string;
  overallStatus: 'pending' | 'approved' | 'rejected';
  requesterName: string;
  projectName: string;
  date: string;
  items: PbgApprovalItem[];
}

const dummyApprovalRequests: PbgApprovalRequest[] = [
  {
    id: 'req-1',
    prNumber: 'PR-005',
    overallStatus: 'pending', // Changed to pending for demonstration
    requesterName: 'Ahmad Justin',
    projectName: 'Proyek Indonesia',
    date: '01-01-2025',
    items: [
      {
        id: 'item-1-1',
        code: 'KCM-1',
        name: 'Kacamata',
        value: 1000000,
        quantity: 5,
        unit: 'pcs',
        description: 'Digunakan Justin, Herwana, Putra, Rahman, Rendi',
        approvalNotes: '',
        status: 'pending',
      },
      {
        id: 'item-1-2',
        code: 'HLM-1',
        name: 'Helm',
        value: 2000000,
        quantity: 2,
        unit: 'pcs',
        description: 'Digunakan Justin, Herwana, Putra, Rahman, Rendi',
        approvalNotes: '',
        status: 'pending',
      },
    ],
  },
  {
    id: 'req-2',
    prNumber: 'PR-006',
    overallStatus: 'approved',
    requesterName: 'Budi Santoso',
    projectName: 'Proyek Maju',
    date: '05-01-2025',
    items: [
      {
        id: 'item-2-1',
        code: 'SGT-1',
        name: 'Seragam',
        value: 500000,
        quantity: 10,
        unit: 'pcs',
        description: 'Untuk tim lapangan',
        approvalNotes: 'Disetujui, sesuai kebutuhan proyek.',
        status: 'approved',
      },
    ],
  },
];

const ApprovalPbgPage: React.FC<ApprovalPbgPageProps> = ({ onBack }) => {
  const [requests, setRequests] = useState<PbgApprovalRequest[]>(dummyApprovalRequests);

  const handleApproveReject = (
    requestId: string,
    itemId: string,
    action: 'approve' | 'reject'
  ) => {
    setRequests((prevRequests) =>
      prevRequests.map((req) =>
        req.id === requestId
          ? {
              ...req,
              items: req.items.map((item) =>
                item.id === itemId ? { ...item, status: action } : item
              ),
              // Optionally update overallStatus if all items are approved/rejected
              overallStatus: req.items.every(
                (item) => item.id === itemId ? action === 'approved' : item.status === 'approved'
              ) ? 'approved' : (req.items.every(
                (item) => item.id === itemId ? action === 'rejected' : item.status === 'rejected'
              ) ? 'rejected' : 'pending')
            }
          : req
      )
    );
  };

  const handleNotesChange = (
    requestId: string,
    itemId: string,
    notes: string
  ) => {
    setRequests((prevRequests) =>
      prevRequests.map((req) =>
        req.id === requestId
          ? {
              ...req,
              items: req.items.map((item) =>
                item.id === itemId ? { ...item, approvalNotes: notes } : item
              ),
            }
          : req
      )
    );
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount).replace('Rp', '').trim(); // Remove 'Rp' and trim for cleaner display
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center">
      {/* Header */}
      <div className="w-full max-w-sm bg-primary p-4 flex items-center justify-between rounded-b-xl shadow-md">
        <button onClick={onBack} className="text-white p-2 rounded-full hover:bg-primary/80 transition-colors">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-white">Approval PBG</h1>
        <div className="w-8"></div> {/* Placeholder for alignment */}
      </div>

      <div className="w-full max-w-sm p-4 space-y-6">
        {requests.map((request) => (
          <div key={request.id} className="bg-surface p-6 rounded-xl shadow-card border-2 border-primary/50">
            {/* Request Header */}
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-bold text-text">{request.prNumber}</h2>
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold
                  ${request.overallStatus === 'approved' ? 'bg-success/20 text-success' :
                    request.overallStatus === 'rejected' ? 'bg-error/20 text-error' :
                    'bg-warning/20 text-warning' // Pending status
                  }`}
              >
                {request.overallStatus.charAt(0).toUpperCase() + request.overallStatus.slice(1)}
              </span>
            </div>
            <div className="text-textSecondary text-sm mb-4">
              <div className="flex items-center mb-1">
                <User size={14} className="mr-1 text-textSecondary" />
                <span>{request.requesterName}</span>
                <span className="mx-2 text-primary">•</span>
                <Briefcase size={14} className="mr-1 text-textSecondary" />
                <span>{request.projectName}</span>
              </div>
              <div className="flex items-center">
                <CalendarDays size={14} className="mr-1 text-textSecondary" />
                <span>{request.date}</span>
              </div>
            </div>

            <hr className="border-border mb-4" />

            {/* Items List */}
            <div className="space-y-6">
              {request.items.map((item) => (
                <div key={item.id} className="border-b border-border pb-4 last:border-b-0 last:pb-0">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-semibold text-text">{item.code} - {item.name}</h3>
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-lg text-sm font-semibold bg-error/20 text-error">
                        {formatCurrency(item.value)}
                      </span>
                      <span className="px-3 py-1 rounded-lg text-sm font-semibold bg-warning/20 text-warning">
                        {item.quantity} {item.unit}
                      </span>
                    </div>
                  </div>
                  <p className="text-textSecondary text-sm mb-3">{item.description}</p>

                  <FormField
                    id={`notes-${item.id}`}
                    label="Tambahkan Keterangan"
                    type="textarea"
                    value={item.approvalNotes}
                    onChange={(e) => handleNotesChange(request.id, item.id, e.target.value)}
                    className="bg-background border-border"
                    containerClassName="mb-4"
                    readOnly={item.status !== 'pending'} // Make read-only if already approved/rejected
                  />

                  {item.status === 'pending' && (
                    <div className="flex justify-end gap-2">
                      <Button
                        type="button"
                        onClick={() => handleApproveReject(request.id, item.id, 'reject')}
                        className="bg-error text-white hover:bg-error/90"
                      >
                        Reject
                      </Button>
                      <Button
                        type="button"
                        onClick={() => handleApproveReject(request.id, item.id, 'approve')}
                        className="bg-success text-white hover:bg-success/90"
                      >
                        Approve
                      </Button>
                    </div>
                  )}
                  {item.status !== 'pending' && (
                    <p className={`text-right text-sm font-semibold ${item.status === 'approved' ? 'text-success' : 'text-error'}`}>
                      Item {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApprovalPbgPage;
