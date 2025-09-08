import React, { useMemo, useState } from 'react';
import {
  FileText, CheckCircle, Clock, Users, DollarSign, ClipboardCheck, LogOut, ArrowRight,
  Settings, BarChart, LayoutDashboard, Database, List, Ticket, Workflow, Wallet, FileEdit, Banknote, Send,
  ShoppingCart, FilePlus, Calendar
} from 'lucide-react';

type PageType = string;

// --- UPDATED: MenuItem type is now recursive ---
interface MenuItem {
  name: string;
  icon: React.ElementType;
  description: string;
  page?: PageType; // If this item is directly navigable (leaf node)
  children?: MenuItem[]; // If this item has children (sub-menus)
}

interface MenuPageProps {
  onLogout: () => void;
  onNavigate: (page: PageType) => void;
}

// --- NEW: Types for the createGeneralMenu structure (remains the same) ---
interface MenuSection {
  title: string;
  icon: string; // Icon name as string
  subSections: {
    title: string;
    icon: string;
    items: {
      title: string;
      icon: string;
      path: string;
    }[];
  }[];
}

// --- createGeneralMenu function (remains the same) ---
const createGeneralMenu = (role: string): MenuSection => ({
  title: "General",
  icon: "Settings",
  subSections: [
    {
      title: "KPI",
      icon: "BarChart",
      items: [
        {
          title: "Dashboard KPI",
          icon: "LayoutDashboard",
          path: `/${role}/general/kpi/dashboard`,
        },
        {
          title: "Master KPI",
          icon: "Database",
          path: `/${role}/general/kpi/master`,
        },
        { title: "List KPI", icon: "List", path: `/${role}/general/kpi/list` },
      ],
    },
    {
      title: "Voucher",
      icon: "Ticket",
      items: [
        {
          title: "Dashboard Voucher",
          icon: "LayoutDashboard",
          path: `/${role}/general/voucher/dashboard`,
        },
        {
          title: "Proses Voucher",
          icon: "Workflow",
          path: `/${role}/general/voucher/proses`,
        },
        {
          title: "Pertanggung jawaban voucher",
          icon: "FileText",
          path: `/${role}/general/voucher/pertanggungjawaban`,
        },
      ],
    },
    {
      title: "Reimburse",
      icon: "Wallet",
      items: [
        {
          title: "Dashboard Reimburse",
          icon: "LayoutDashboard",
          path: `/${role}/general/reimburse/dashboard`,
        },
        {
          title: "Proses Reimburse",
          icon: "FileEdit",
          path: `/${role}/general/reimburse/proses`,
        },
      ],
    },
    {
      title: "Cash Advance",
      icon: "Banknote",
      items: [
        {
          title: "Dashboard Cash Advance",
          icon: "LayoutDashboard",
          path: `/${role}/general/cash-advance/dashboard`,
        },
        {
          title: "Proses Cash Advance",
          icon: "Send",
          path: `/${role}/general/cash-advance/proses`,
        },
      ],
    },
    {
      title: "Purchase Request",
      icon: "ShoppingCart",
      items: [
        {
          title: "Dashboard Purchasing Request",
          icon: "LayoutDashboard",
          path: `/${role}/general/purchase-request/dashboard`,
        },
        {
          title: "Proses Purchasing Request",
          icon: "FilePlus",
          path: `/${role}/general/purchase-request/proses`,
        },
      ],
    },
    {
      title: "Cuti",
      icon: "Calendar",
      items: [
        {
          title: "Pengajuan Cuti",
          icon: "FilePlus",
          path: `/${role}/general/cuti/pengajuan`,
        },
        {
          title: "Approve Cuti",
          icon: "CheckCircle",
          path: `/${role}/general/cuti/approve`,
        },
      ],
    },
  ],
});

// --- Icon mapping (remains the same) ---
const iconMap: { [key: string]: React.ElementType } = {
  FileText: FileText,
  CheckCircle: CheckCircle,
  Clock: Clock,
  Users: Users,
  DollarSign: DollarSign,
  ClipboardCheck: ClipboardCheck,
  LogOut: LogOut,
  ArrowRight: ArrowRight,
  Settings: Settings,
  BarChart: BarChart,
  LayoutDashboard: LayoutDashboard,
  Database: Database,
  List: List,
  Ticket: Ticket,
  Workflow: Workflow,
  Wallet: Wallet,
  FileEdit: FileEdit,
  Banknote: Banknote,
  Send: Send,
  ShoppingCart: ShoppingCart,
  FilePlus: FilePlus,
  Calendar: Calendar,
};

const getIconComponent = (iconName: string): React.ElementType => {
  return iconMap[iconName] || FileText; // Default to FileText if icon not found
};

const MenuPage: React.FC<MenuPageProps> = ({ onLogout, onNavigate }) => {
  // Active bottom-tab: PBG | Home | Timesheet | Pinjaman Pegawai | General
  const [activeTab, setActiveTab] = useState<'PBG' | 'Home' | 'Timesheet' | 'Pinjaman Pegawai' | 'General'>('Home');

  const defaultRole = 'user'; // Example role, adjust as per your application's logic
  const generalMenuData = createGeneralMenu(defaultRole);

  // --- UPDATED: Transform the general menu data into a single 'General' MenuItem with nested children ---
  const generalMenuItem: MenuItem = {
    name: generalMenuData.title, // "General"
    icon: getIconComponent(generalMenuData.icon), // Settings icon
    description: `Manage all ${generalMenuData.title} related functionalities.`,
    children: generalMenuData.subSections.map(subSection => ({
      name: subSection.title, // KPI, Voucher, etc.
      icon: getIconComponent(subSection.icon),
      description: `Manage ${subSection.title} related functionalities.`,
      children: subSection.items.map(item => ({
        name: item.title, // Dashboard KPI, Master KPI, etc.
        icon: getIconComponent(item.icon),
        description: `Go to ${item.title}.`,
        page: item.path, // This is a leaf node, so it has a page
      })),
    })),
  };

  const menuItems: MenuItem[] = [
    {
      name: 'PBG',
      icon: FileText,
      description: 'Manage Performance Bank Guarantees.',
      children: [
        { name: 'PBG', icon: FileText, description: 'View and manage your PBGs.', page: 'pbg' },
        { name: 'Approval PBG', icon: CheckCircle, description: 'Approve or reject PBG requests.', page: 'approvalPbg' },
        { name: 'Tambah PBG', icon: FilePlus, description: 'Add new PBG record.', page: 'addPbg' },
      ],
    },
    {
      name: 'Timesheet',
      icon: Clock,
      description: 'Track and submit your work hours.',
      children: [
        { name: 'Timesheet', icon: Clock, description: 'View timesheet list.', page: 'timesheet' },
        { name: 'Tambah Timesheet', icon: FilePlus, description: 'Add a new timesheet.', page: 'addTimesheet' },
      ],
    },
    {
      name: 'Pinjaman Pegawai',
      icon: DollarSign,
      description: 'Manage employee loan applications.',
      children: [
        { name: 'Daftar Pinjam Pegawai', icon: Users, description: 'View list of employee loans.', page: 'daftarPinjamPegawai' },
        { name: 'Pengajuan Pinjam Pegawai', icon: DollarSign, description: 'Submit new employee loan requests.', page: 'pengajuanPinjamPegawai' },
        { name: 'Approval Pinjaman Pegawai', icon: ClipboardCheck, description: 'Approve or reject employee loan applications.', page: 'approvalPinjamanPegawai' },
        { name: 'Tambah Pengajuan', icon: FilePlus, description: 'Add loan request.', page: 'addPengajuanPinjamPegawai' },
      ],
    },
    // General is a container of many sections
    generalMenuItem,
  ];

  // Helpers: build grid items for active tab
  const activeTabItems: MenuItem[] = useMemo(() => {
    if (activeTab === 'Home') {
      // Quick actions on Home
      return [
        { name: 'Timesheet', icon: Clock, description: 'View timesheet list.', page: 'timesheet' },
        { name: 'Tambah Timesheet', icon: FilePlus, description: 'Add a new timesheet.', page: 'addTimesheet' },
        { name: 'PBG', icon: FileText, description: 'View and manage your PBGs.', page: 'pbg' },
        { name: 'Pengajuan Pinjam', icon: DollarSign, description: 'Ajukan pinjaman', page: 'pengajuanPinjamPegawai' },
      ];
    }
    if (activeTab === 'General') {
      // Flatten General sections into leaf items
      const sections = generalMenuItem.children || [];
      return sections.flatMap((sec) => sec.children || []);
    }
    const found = menuItems.find((m) => m.name === activeTab);
    return found?.children || [];
  }, [activeTab, generalMenuItem, menuItems]);

  const GridItem: React.FC<{ item: MenuItem }> = ({ item }) => {
    const Icon = item.icon;
    return (
      <button
        key={item.name}
        onClick={() => item.page && onNavigate(item.page)}
        className="flex flex-col items-center justify-center gap-2 p-3 rounded-2xl bg-white shadow-card hover:shadow-md active:scale-95 transition-all"
        aria-label={`Open ${item.name}`}
      >
        <div className="w-14 h-14 rounded-full flex items-center justify-center"
             style={{ backgroundColor: 'rgba(59,130,246,0.12)' }}>
          <Icon className="text-primary" size={22} />
        </div>
        <span className="text-xs text-text text-center leading-tight">{item.name}</span>
      </button>
    );
  };

  const BottomTabButton: React.FC<{ name: 'PBG' | 'Home' | 'Timesheet' | 'Pinjaman Pegawai' | 'General'; Icon: React.ElementType }>
    = ({ name, Icon }) => {
    const isActive = activeTab === name;
    return (
      <button
        onClick={() => setActiveTab(name)}
        className="flex flex-col items-center justify-center flex-1 py-2"
        aria-label={`Switch to ${name}`}
      >
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isActive ? 'bg-primary' : 'bg-gray-200'}`}>
          <Icon size={18} className={isActive ? 'text-white' : 'text-gray-500'} />
        </div>
        <span className={`text-[11px] mt-1 ${isActive ? 'text-primary font-medium' : 'text-gray-500'}`}>{name}</span>
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center pb-20">
      {/* Header */}
      <div className="w-full max-w-sm bg-surface p-5 rounded-xl shadow-card flex items-center justify-between m-4">
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

      {/* Home Dashboard */}
      {activeTab === 'Home' && (
        <div className="w-full max-w-sm px-4 space-y-4">
          {/* Greeting / Banner */}
          <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl p-4 shadow-card">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mr-3">
                <LayoutDashboard size={20} />
              </div>
              <div>
                <h3 className="text-base font-semibold">Selamat datang!</h3>
                <p className="text-xs text-white/90">Ringkasan aktivitas Anda hari ini</p>
              </div>
            </div>
          </div>

          {/* Summary cards */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white rounded-xl p-3 shadow-card text-center">
              <div className="w-8 h-8 mx-auto rounded-full bg-blue-100 flex items-center justify-center mb-1">
                <Clock size={16} className="text-blue-600" />
              </div>
              <div className="text-lg font-bold text-text">8h</div>
              <div className="text-[10px] text-textSecondary">Timesheet</div>
            </div>
            <div className="bg-white rounded-xl p-3 shadow-card text-center">
              <div className="w-8 h-8 mx-auto rounded-full bg-amber-100 flex items-center justify-center mb-1">
                <ClipboardCheck size={16} className="text-amber-600" />
              </div>
              <div className="text-lg font-bold text-text">3</div>
              <div className="text-[10px] text-textSecondary">Pending</div>
            </div>
            <div className="bg-white rounded-xl p-3 shadow-card text-center">
              <div className="w-8 h-8 mx-auto rounded-full bg-emerald-100 flex items-center justify-center mb-1">
                <Calendar size={16} className="text-emerald-600" />
              </div>
              <div className="text-lg font-bold text-text">12</div>
              <div className="text-[10px] text-textSecondary">Saldo Cuti</div>
            </div>
          </div>

          {/* Title Quick Actions */}
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold text-text">Quick Actions</h4>
          </div>
        </div>
      )}

      {/* Grid / Sections for active tab */}
      {activeTab === 'General' ? (
        <div className="w-full max-w-sm px-4 mt-2 space-y-4">
          {(generalMenuItem.children || []).map((section) => (
            <div key={section.name} className="bg-surface rounded-xl shadow-card p-4">
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-2">
                  {(() => {
                    const Icon = section.icon;
                    return <Icon size={16} className="text-gray-600" />;
                  })()}
                </div>
                <h5 className="text-sm font-semibold text-text">{section.name}</h5>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {(section.children || []).map((child) => (
                  <GridItem key={child.name} item={child} />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full max-w-sm px-4 mt-4">
          <div className="grid grid-cols-3 gap-4">
            {activeTabItems.map((item) => (
              <GridItem key={item.name} item={item} />
            ))}
          </div>
        </div>
      )}

      {/* Bottom Tab Bar */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
        <div className="mx-auto w-full max-w-sm flex">
          <BottomTabButton name="PBG" Icon={FileText} />
          <BottomTabButton name="Timesheet" Icon={Clock} />
          <BottomTabButton name="Home" Icon={LayoutDashboard} />
          <BottomTabButton name="Pinjaman Pegawai" Icon={Users} />
          <BottomTabButton name="General" Icon={Settings} />
        </div>
      </nav>
    </div>
  );
};

export default MenuPage;
