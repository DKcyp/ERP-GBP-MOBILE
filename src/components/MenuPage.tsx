import React, { useState } from 'react';
import { FileText, CheckCircle, Clock, Users, DollarSign, ClipboardCheck, LogOut, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';

interface MenuPageProps {
  onLogout: () => void;
  onNavigate: (page: 'pbg' | 'approvalPbg' | 'timesheet' | 'daftarPinjamPegawai' | 'pengajuanPinjamPegawai' | 'approvalPinjamPegawai') => void;
}

type PageType = 'pbg' | 'approvalPbg' | 'timesheet' | 'daftarPinjamPegawai' | 'pengajuanPinjamPegawai' | 'approvalPinjamPegawai';

interface SubMenuItem {
  name: string;
  icon: React.ElementType;
  description: string;
  page: PageType;
}

interface MenuItem {
  name: string;
  icon: React.ElementType;
  description: string;
  page?: PageType; // Optional for main menus that only have sub-items
  subItems?: SubMenuItem[];
}

const MenuPage: React.FC<MenuPageProps> = ({ onLogout, onNavigate }) => {
  const [openMenu, setOpenMenu] = useState<string | null>(null); // State to track which main menu is open

  const menuItems: MenuItem[] = [
    {
      name: 'PBG',
      icon: FileText,
      description: 'Manage Performance Bank Guarantees.',
      subItems: [
        { name: 'PBG', icon: FileText, description: 'View and manage your PBGs.', page: 'pbg' },
        { name: 'Approval PBG', icon: CheckCircle, description: 'Approve or reject PBG requests.', page: 'approvalPbg' },
      ],
    },
    { name: 'Timesheet', icon: Clock, description: 'Track and submit your work hours.', page: 'timesheet' },
    {
      name: 'Pinjaman Pegawai',
      icon: DollarSign,
      description: 'Manage employee loan applications.',
      subItems: [
        { name: 'Daftar Pinjam Pegawai', icon: Users, description: 'View list of employee loans.', page: 'daftarPinjamPegawai' },
        { name: 'Pengajuan Pinjam Pegawai', icon: DollarSign, description: 'Submit new employee loan requests.', page: 'pengajuanPinjamPegawai' },
        { name: 'Approval Pinjaman Pegawai', icon: ClipboardCheck, description: 'Approve or reject employee loan applications.', page: 'approvalPinjamPegawai' },
      ],
    },
  ];

  const toggleMenu = (menuName: string) => {
    setOpenMenu(openMenu === menuName ? null : menuName);
  };

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

      {/* Menu List */}
      <div className="w-full max-w-sm flex flex-col gap-4">
        {menuItems.map((item, index) => (
          <div key={index}>
            {item.subItems ? (
              // Main menu item with sub-items (dropdown)
              <div
                className="bg-surface p-6 rounded-xl shadow-card flex flex-col cursor-pointer
                           hover:scale-105 transition-transform duration-200 active:scale-95 mb-2"
                role="button"
                tabIndex={0}
                aria-expanded={openMenu === item.name}
                aria-controls={`submenu-${item.name}`}
                onClick={() => toggleMenu(item.name)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                      <item.icon size={24} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-text">{item.name}</h3>
                      <p className="text-sm text-textSecondary">{item.description}</p>
                    </div>
                  </div>
                  {openMenu === item.name ? (
                    <ChevronUp size={20} className="text-textSecondary" />
                  ) : (
                    <ChevronDown size={20} className="text-textSecondary" />
                  )}
                </div>
              </div>
            ) : (
              // Regular menu item (no sub-items) - Standardized height
              <div
                className="bg-surface p-6 rounded-xl shadow-card flex flex-col cursor-pointer
                           hover:scale-105 transition-transform duration-200 active:scale-95 mb-2"
                role="button"
                tabIndex={0}
                aria-label={`Go to ${item.name}`}
                onClick={() => item.page && onNavigate(item.page)}
              >
                <div className="flex items-center justify-between"> {/* Ensures consistent height with expandable menu */}
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4"> {/* Adjusted size and margin */}
                      <item.icon size={24} className="text-primary" /> {/* Adjusted icon size to match */}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-text">{item.name}</h3>
                      <p className="text-sm text-textSecondary">{item.description}</p>
                    </div>
                  </div>
                  {/* Placeholder for the chevron to maintain consistent height/layout */}
                  <div className="w-5 h-5"></div> {/* This will occupy the same space as the chevron icon */}
                </div>
              </div>
            )}

            {/* Render Sub-items if the main menu is open */}
            {item.subItems && openMenu === item.name && (
              <div id={`submenu-${item.name}`} className="flex flex-col gap-3 pl-6 pr-2 py-2 bg-surface/50 rounded-b-xl shadow-inner transition-all duration-300 ease-in-out">
                {item.subItems.map((subItem, subIndex) => (
                  <div
                    key={subIndex}
                    className="bg-surface p-4 rounded-lg shadow-sm flex items-center cursor-pointer
                               hover:bg-surface/80 transition-colors duration-200 active:scale-[0.98]"
                    role="button"
                    tabIndex={0}
                    aria-label={`Go to ${subItem.name}`}
                    onClick={() => onNavigate(subItem.page)}
                  >
                    <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center mr-3">
                      <subItem.icon size={20} className="text-accent" />
                    </div>
                    <div>
                      <h4 className="text-md font-medium text-text">{subItem.name}</h4>
                      <p className="text-xs text-textSecondary">{subItem.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuPage;
