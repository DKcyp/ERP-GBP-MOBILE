import React, { useState } from "react";
import MenuPage from "./components/MenuPage";
import DashboardKpiPage from "./pages/DashboardKpiPage";
import MasterKpiPage from "./pages/MasterKpiPage";
import ListKpiPage from "./pages/ListKpiPage";
import DashboardVoucherPage from "./pages/DashboardVoucherPage";
import ProsesVoucherPage from "./pages/ProsesVoucherPage";
import PertanggungJawabanVoucherPage from "./pages/PertanggungJawabanVoucherPage";
import DashboardReimbursePage from "./pages/DashboardReimbursePage";
import ProsesReimbursePage from "./pages/ProsesReimbursePage";
import DashboardCashAdvancePage from "./pages/DashboardCashAdvancePage";
import ProsesCashAdvancePage from "./pages/ProsesCashAdvancePage";
import DashboardPurchasingRequestPage from "./pages/DashboardPurchasingRequestPage";
import ProsesPurchasingRequestPage from "./pages/ProsesPurchasingRequestPage";
import AddPurchasingRequestPage from "./pages/AddPurchasingRequestPage";
import PbgPage from "./components/PbgPage";
import ApprovalPbgPage from "./components/ApprovalPbgPage";
import TimesheetPage from "./components/TimesheetPage";
import DaftarPinjamPegawaiPage from "./components/DaftarPinjamPegawaiPage";
import PengajuanPinjamPegawaiPage from "./components/PengajuanPinjamPegawaiPage";
import ApprovalPinjamanPegawaiPage from "./components/ApprovalPinjamPegawaiPage";
import PengajuanCutiPage from "./pages/PengajuanCutiPage";
import ApproveCutiPage from "./pages/ApproveCutiPage";
import AddPbgPage from "./components/AddPbgPage";
import AddTimesheetPage from "./components/AddTimesheetPage";
import AddPengajuanPinjamPegawaiPage from "./components/AddPengajuanPinjamPegawaiPage";
import AddPengajuanCutiPage, { type CutiEntry } from "./pages/AddPengajuanCutiPage";

type PageType = string;

function App() {
  const [currentPage, setCurrentPage] = useState<PageType | null>(null);
  // Global state for Pengajuan Cuti list so actions work across pages
  type RowData = {
    id: string;
    nama: string;
    jabatan: string;
    jenisCuti: "Tahunan" | "Sakit" | "Melahirkan" | "Lainnya";
    periode: string; // "yyyy-mm-dd - yyyy-mm-dd"
    alasan: string;
    status: "Diajukan" | "Draft" | "Disetujui" | "Ditolak";
  };

  const [cutiRows, setCutiRows] = useState<RowData[]>([
    {
      id: "CUTI-001",
      nama: "Andi Wijaya",
      jabatan: "Radiographer",
      jenisCuti: "Tahunan",
      periode: "2025-09-10 - 2025-09-12",
      alasan: "Liburan keluarga",
      status: "Diajukan",
    },
    {
      id: "CUTI-002",
      nama: "Budi Santoso",
      jabatan: "Assistant Radiographer",
      jenisCuti: "Sakit",
      periode: "2025-09-03 - 2025-09-04",
      alasan: "Demam tinggi",
      status: "Draft",
    },
  ]);
  const [editCuti, setEditCuti] = useState<RowData | null>(null);

  const handleNavigate = (page: PageType) => {
    setCurrentPage(page);
  };

  const handleLogout = () => {
    setCurrentPage(null);
    console.log("User logged out");
  };

  const renderPage = () => {
    if (currentPage === "/user/general/kpi/dashboard") {
      return <DashboardKpiPage onBack={() => setCurrentPage(null)} />;
    }
    if (currentPage === "/user/general/kpi/master") {
      return <MasterKpiPage onBack={() => setCurrentPage(null)} />;
    }
    if (currentPage === "/user/general/kpi/list") {
      return <ListKpiPage onBack={() => setCurrentPage(null)} />;
    }
    if (currentPage === "/user/general/voucher/dashboard") {
      return <DashboardVoucherPage onBack={() => setCurrentPage(null)} />;
    }
    if (currentPage === "/user/general/cuti/pengajuan") {
      return (
        <PengajuanCutiPage
          onBack={() => setCurrentPage(null)}
          rows={cutiRows}
          setRows={setCutiRows}
          onAdd={() => {
            setEditCuti(null);
            setCurrentPage("addPengajuanCuti");
          }}
          onEdit={(row) => {
            setEditCuti(row);
            setCurrentPage("addPengajuanCuti");
          }}
        />
      );
    }
    if (currentPage === "/user/general/cuti/approve") {
      return <ApproveCutiPage onBack={() => setCurrentPage(null)} />;
    }
    if (currentPage === "addPengajuanCuti") {
      const toEntry = (r: RowData): CutiEntry => {
        const [mulai, selesai] = r.periode.split(" - ");
        return {
          id: r.id,
          nama: r.nama,
          jabatan: r.jabatan,
          jenisCuti: r.jenisCuti,
          tanggalMulai: mulai,
          tanggalSelesai: selesai,
          alasan: r.alasan,
          status: r.status as CutiEntry["status"],
        };
      };

      return (
        <AddPengajuanCutiPage
          onBack={() => setCurrentPage("/user/general/cuti/pengajuan")}
          initial={editCuti ? toEntry(editCuti) : null}
          onSave={(entry) => {
            const periode = `${entry.tanggalMulai} - ${entry.tanggalSelesai}`;
            if (entry.id) {
              setCutiRows((prev) =>
                prev.map((r) =>
                  r.id === entry.id
                    ? {
                        ...r,
                        nama: entry.nama,
                        jabatan: entry.jabatan,
                        jenisCuti: entry.jenisCuti,
                        periode,
                        alasan: entry.alasan,
                        status: entry.status === undefined ? r.status : (entry.status as RowData["status"]),
                      }
                    : r,
                ),
              );
            } else {
              const newId = `CUTI-${String(cutiRows.length + 1).padStart(3, "0")}`;
              setCutiRows((prev) => [
                ...prev,
                {
                  id: newId,
                  nama: entry.nama,
                  jabatan: entry.jabatan,
                  jenisCuti: entry.jenisCuti,
                  periode,
                  alasan: entry.alasan,
                  status: entry.status ?? "Draft",
                },
              ]);
            }
          }}
        />
      );
    }
    if (currentPage === "/user/general/voucher/proses") {
      return <ProsesVoucherPage onBack={() => setCurrentPage(null)} />;
    }
    if (currentPage === "/user/general/voucher/pertanggungjawaban") {
      return (
        <PertanggungJawabanVoucherPage onBack={() => setCurrentPage(null)} />
      );
    }
    if (currentPage === "/user/general/reimburse/dashboard") {
      return <DashboardReimbursePage onBack={() => setCurrentPage(null)} />;
    }
    if (currentPage === "/user/general/reimburse/proses") {
      return <ProsesReimbursePage onBack={() => setCurrentPage(null)} />;
    }
    if (currentPage === "/user/general/cash-advance/dashboard") {
      return <DashboardCashAdvancePage onBack={() => setCurrentPage(null)} />;
    }
    if (currentPage === "/user/general/cash-advance/proses") {
      return <ProsesCashAdvancePage onBack={() => setCurrentPage(null)} />;
    }
    if (currentPage === "/user/general/purchase-request/dashboard") {
      return (
        <DashboardPurchasingRequestPage onBack={() => setCurrentPage(null)} />
      );
    }
    if (currentPage === "/user/general/purchase-request/proses") {
      return (
        <ProsesPurchasingRequestPage
          onBack={() => setCurrentPage(null)}
          onAddPr={() => setCurrentPage("/user/general/purchase-request/add")}
        />
      );
    }
    if (currentPage === "/user/general/purchase-request/add") {
      return (
        <AddPurchasingRequestPage
          onBack={() => setCurrentPage("/user/general/purchase-request/proses")}
        />
      );
    }
    if (currentPage === "pbg") {
      return (
        <PbgPage
          onBack={() => setCurrentPage(null)}
          onAddPbg={() => setCurrentPage("addPbg")}
        />
      );
    }
    if (currentPage === "addPbg") {
      return <AddPbgPage onBack={() => setCurrentPage("pbg")} />;
    }
    if (currentPage === "approvalPbg") {
      // New route for Approval PBG
      return <ApprovalPbgPage onBack={() => setCurrentPage(null)} />;
    }
    if (currentPage === "timesheet") {
      // New route for Timesheet
      return (
        <TimesheetPage
          onBack={() => setCurrentPage(null)}
          onAddTimesheet={() => setCurrentPage("addTimesheet")}
        />
      );
    }
    if (currentPage === "addTimesheet") {
      return <AddTimesheetPage onBack={() => setCurrentPage("timesheet")} />;
    }
    if (currentPage === "daftarPinjamPegawai") {
      // New route for Daftar Pinjam Pegawai
      return <DaftarPinjamPegawaiPage onBack={() => setCurrentPage(null)} />;
    }
    if (currentPage === "pengajuanPinjamPegawai") {
      // New route for Pengajuan Pinjam Pegawai
      return (
        <PengajuanPinjamPegawaiPage
          onBack={() => setCurrentPage(null)}
          onAddPengajuanPinjamPegawai={() => setCurrentPage("addPengajuanPinjamPegawai")}
        />
      );
    }
    if (currentPage === "addPengajuanPinjamPegawai") {
      return (
        <AddPengajuanPinjamPegawaiPage
          onBack={() => setCurrentPage("pengajuanPinjamPegawai")}
        />
      );
    }
    if (currentPage === "approvalPinjamanPegawai") {
      // New route for Approval Pinjaman Pegawai
      return (
        <ApprovalPinjamanPegawaiPage onBack={() => setCurrentPage(null)} />
      );
    }
    // Add other page routes here as needed
    // For now, if no specific page is selected, show the MenuPage
    return <MenuPage onLogout={handleLogout} onNavigate={handleNavigate} />;
  };

  return <div className="App">{renderPage()}</div>;
}

export default App;
