import React, { useState } from 'react';
import {
  FileText, CheckCircle, Clock, Users, DollarSign, ClipboardCheck, LogOut, ArrowRight, ChevronDown, ChevronUp,
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
  ChevronDown: ChevronDown,
  ChevronUp: ChevronUp,
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
  // --- UPDATED: Use a Set to track multiple open menus for nested navigation ---
  const [openMenus, setOpenMenus] = useState<Set<string>>(new Set());

  const toggleMenu = (menuName: string) => {
    setOpenMenus(prev => {
      const newSet = new Set(prev);
      if (newSet.has(menuName)) {
        newSet.delete(menuName);
      } else {
        newSet.add(menuName);
      }
      return newSet;
    });
  };

  // Improve accessibility/keyboard usage and unify activation for touch/keyboard
  const handleActivate = (hasChildren: boolean, name: string, page?: PageType) => {
    if (hasChildren) {
      toggleMenu(name);
    } else if (page) {
      onNavigate(page);
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLDivElement>,
    hasChildren: boolean,
    name: string,
    page?: PageType
  ) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleActivate(hasChildren, name, page);
    }
  };

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
      children: [ // Changed from subItems to children
        { name: 'PBG', icon: FileText, description: 'View and manage your PBGs.', page: 'pbg' },
        { name: 'Approval PBG', icon: CheckCircle, description: 'Approve or reject PBG requests.', page: 'approvalPbg' },
      ],
    },
    { name: 'Timesheet', icon: Clock, description: 'Track and submit your work hours.', page: 'timesheet' },
    {
      name: 'Pinjaman Pegawai',
      icon: DollarSign,
      description: 'Manage employee loan applications.',
      children: [ // Changed from subItems to children
        { name: 'Daftar Pinjam Pegawai', icon: Users, description: 'View list of employee loans.', page: 'daftarPinjamPegawai' },
        { name: 'Pengajuan Pinjam Pegawai', icon: DollarSign, description: 'Submit new employee loan requests.', page: 'pengajuanPinjamPegawai' },
        { name: 'Approval Pinjaman Pegawai', icon: ClipboardCheck, description: 'Approve or reject employee loan applications.', page: 'approvalPinjamanPegawai' },
      ],
    },
    // --- NEW: Add the single transformed General menu item here ---
    generalMenuItem,
  ];

  // --- NEW: Recursive Menu Renderer Component ---
  const renderMenuItem = (item: MenuItem, level: number = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isOpen = openMenus.has(item.name); // Check if this specific menu is open

    // Base styles for all menu items
    const baseClasses = "rounded-xl shadow-card flex flex-col cursor-pointer transition-transform duration-200 mb-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary";
    const hoverClasses = level === 0 ? "hover:scale-[1.01] active:scale-95" : "hover:bg-surface/80 active:scale-[0.98]";

    // Dynamic padding and background based on level
    const paddingClasses = level === 0 ? "p-6" : "p-4";
    const bgClasses = level === 0 ? "bg-surface" : "bg-surface";

    // Icon styling based on level
    const iconBgClasses = level === 0 ? "bg-primary/10" : "bg-accent/10";
    const iconTextClasses = level === 0 ? "text-primary" : "text-accent";
    const iconSize = level === 0 ? 24 : 20;
    const iconWrapperSize = level === 0 ? "w-12 h-12" : "w-10 h-10";
    const iconMargin = level === 0 ? "mr-4" : "mr-3";

    return (
      <div key={item.name}>
        <div
          className={`${baseClasses} ${hoverClasses} ${paddingClasses} ${bgClasses}`}
          role="button"
          tabIndex={0}
          aria-expanded={hasChildren ? isOpen : undefined}
          aria-controls={hasChildren ? `submenu-${item.name}` : undefined}
          aria-label={hasChildren ? `Toggle ${item.name} menu` : `Go to ${item.name}`}
          onClick={() => handleActivate(hasChildren, item.name, item.page)}
          onKeyDown={(e) => handleKeyDown(e, hasChildren, item.name, item.page)}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className={`${iconWrapperSize} ${iconBgClasses} rounded-full flex items-center justify-center ${iconMargin}`}>
                <item.icon size={iconSize} className={iconTextClasses} />
              </div>
              <div>
                <h3 className={`${level === 0 ? 'text-lg font-semibold' : 'text-md font-medium'} text-text`}>{item.name}</h3>
                <p className={`${level === 0 ? 'text-sm' : 'text-xs'} text-textSecondary`}>{item.description}</p>
              </div>
            </div>
            {hasChildren ? (
              isOpen ? (
                <ChevronUp size={20} className="text-textSecondary" />
              ) : (
                <ChevronDown size={20} className="text-textSecondary" />
              )
            ) : (
              // Placeholder for alignment if no chevron
              <div className="w-5 h-5"></div>
            )}
          </div>
        </div>

        {/* Render children if the menu is open and has children */}
        {hasChildren && isOpen && (
          <div
            id={`submenu-${item.name}`}
            className="flex flex-col gap-3 pl-6 pr-2 py-2 bg-surface/50 rounded-b-xl shadow-inner transition-all duration-300 ease-in-out"
          >
            {item.children?.map(child => renderMenuItem(child, level + 1))}
          </div>
        )}
      </div>
    );
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
        {menuItems.map(item => renderMenuItem(item))}
      </div>
    </div>
  );
};

export default MenuPage;
