import React from 'react';
import { FileText, CheckCircle, Clock, Users, DollarSign, ClipboardCheck, LogOut, ArrowRight } from 'lucide-react';

interface MenuPageProps {
  onLogout: () => void;
  onNavigate: (page: 'pbg' | 'approvalPbg' | 'timesheet' | 'daftarPinjamPegawai' | 'pengajuanPinjamPegawai' | 'approvalPinjamPegawai') => void; // Add 'approvalPinjamPegawai' to page types
}

const MenuPage: React.FC<MenuPageProps> = ({ onLogout, onNavigate }) => {
  const menuItems = [
    { name: 'PBG', icon: FileText, description: 'Manage your Performance Bank Guarantees.', page: 'pbg' },
    { name: 'Approval PBG', icon: CheckCircle, description: 'Approve or reject Performance Bank Guarantees.', page: 'approvalPbg' },
    { name: 'Timesheet', icon: Clock, description: 'Track and submit your work hours.', page: 'timesheet' },
    { name: 'Daftar Pinjam Pegawai', icon: Users, description: 'View list of employee loans.', page: 'daftarPinjamPegawai' },
    { name: 'Pengajuan Pinjam Pegawai', icon: DollarSign, description: 'Submit new employee loan requests.', page: 'pengajuanPinjamPegawai' },
    { name: 'Approval Pinjaman Pegawai', icon: ClipboardCheck, description: 'Approve or reject employee loan applications.', page: 'approvalPinjamPegawai' }, // Add page for navigation
  ];

  return (
    <div className="min-h-screen bg-background p-4 flex flex-col items-center">
      {/* Header */}
      <div className="w-full max-w-sm bg-surface p-6 rounded-xl shadow-card flex items-center justify-between mb-8">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center mr-3">
            <ArrowRight size={20} className="text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-text">ERP Mobile</h2>
            <p className="text-textSecondary text-sm">Welcome, ERPM!</p>
          </div>
        </div>
        <button
          onClick={onLogout}
          className="flex items-center text-textSecondary hover:text-error transition-colors duration-200"
          aria-label="Logout"
        >
          <LogOut size={20} className="mr-1" />
          Logout
        </button>
      </div>

      {/* Menu Grid */}
      <div className="w-full max-w-sm grid grid-cols-1 gap-6">
        {menuItems.map((item, index) => (
          <div
            key={index}
            className="bg-surface p-6 rounded-xl shadow-card flex flex-col items-center text-center cursor-pointer
                       hover:scale-105 transition-transform duration-200 active:scale-95"
            role="button"
            tabIndex={0}
            aria-label={`Go to ${item.name}`}
            onClick={() => item.page && onNavigate(item.page as 'pbg' | 'approvalPbg' | 'timesheet' | 'daftarPinjamPegawai' | 'pengajuanPinjamPegawai' | 'approvalPinjamPegawai')} // Navigate on click
          >
            <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <item.icon size={28} className="text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-text mb-2">{item.name}</h3>
            <p className="text-sm text-textSecondary">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuPage;
