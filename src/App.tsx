import React, { useState } from 'react';
import LoginPage from './components/LoginPage';
import MenuPage from './components/MenuPage';
import PbgPage from './components/PbgPage';
import AddPbgPage from './components/AddPbgPage';
import ApprovalPbgPage from './components/ApprovalPbgPage';
import TimesheetPage from './components/TimesheetPage';
import AddTimesheetPage from './components/AddTimesheetPage';
import DaftarPinjamPegawaiPage from './components/DaftarPinjamPegawaiPage';
import PengajuanPinjamPegawaiPage from './components/PengajuanPinjamPegawaiPage';
import AddPengajuanPinjamPegawaiPage from './components/AddPengajuanPinjamPegawaiPage';
import ApprovalPinjamPegawaiPage from './components/ApprovalPinjamPegawaiPage'; // Import new ApprovalPinjamPegawaiPage
import FormField from './components/FormField';
import Button from './components/Button';

type Page = 'login' | 'menu' | 'pbg' | 'addPbg' | 'approvalPbg' | 'timesheet' | 'addTimesheet' | 'daftarPinjamPegawai' | 'pengajuanPinjamPegawai' | 'addPengajuanPinjamPegawai' | 'approvalPinjamPegawai'; // Add new page type

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setCurrentPage('menu'); // Go to menu after login
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage('login'); // Go back to login on logout
  };

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-background">
      {!isLoggedIn ? (
        <LoginPage onLoginSuccess={handleLoginSuccess} />
      ) : (
        currentPage === 'menu' ? (
          <MenuPage onLogout={handleLogout} onNavigate={handleNavigate} />
        ) : currentPage === 'pbg' ? (
          <PbgPage onBack={() => handleNavigate('menu')} onAddPbg={() => handleNavigate('addPbg')} />
        ) : currentPage === 'addPbg' ? (
          <AddPbgPage onBack={() => handleNavigate('pbg')} />
        ) : currentPage === 'approvalPbg' ? (
          <ApprovalPbgPage onBack={() => handleNavigate('menu')} />
        ) : currentPage === 'timesheet' ? (
          <TimesheetPage onBack={() => handleNavigate('menu')} onAddTimesheet={() => handleNavigate('addTimesheet')} />
        ) : currentPage === 'addTimesheet' ? (
          <AddTimesheetPage onBack={() => handleNavigate('timesheet')} />
        ) : currentPage === 'daftarPinjamPegawai' ? (
          <DaftarPinjamPegawaiPage onBack={() => handleNavigate('menu')} />
        ) : currentPage === 'pengajuanPinjamPegawai' ? (
          <PengajuanPinjamPegawaiPage onBack={() => handleNavigate('menu')} onAddPengajuanPinjamPegawai={() => handleNavigate('addPengajuanPinjamPegawai')} />
        ) : currentPage === 'addPengajuanPinjamPegawai' ? (
          <AddPengajuanPinjamPegawaiPage onBack={() => handleNavigate('pengajuanPinjamPegawai')} />
        ) : currentPage === 'approvalPinjamPegawai' ? ( // Render ApprovalPinjamPegawaiPage
          <ApprovalPinjamPegawaiPage onBack={() => handleNavigate('menu')} />
        ) : null
      )}
    </div>
  );
}

export default App;
