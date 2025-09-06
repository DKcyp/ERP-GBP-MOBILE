import React, { useMemo, useState } from "react";
import {
  Calendar,
  FileSpreadsheet,
  FileText,
  Search,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  ChevronDown,
} from "lucide-react";
import PageHeader from "../components/PageHeader";

interface ApproveCutiPageProps {
  onBack: () => void;
}

interface EmployeeRow {
  nama: string;
  jabatan: string;
  total: number;
  pending: number;
  disetujui: number;
  ditolak: number;
  limitTerlampaui?: boolean;
}

interface LeaveDetail {
  id: string;
  jenis: string;
  periode: string;
  alasan: string;
  status: "Pending" | "Disetujui" | "Ditolak";
}

const initialEmployees: EmployeeRow[] = [
  {
    nama: "Citra Lestari",
    jabatan: "QHSE Officer",
    total: 2,
    pending: 2,
    disetujui: 0,
    ditolak: 0,
    limitTerlampaui: true,
  },
  {
    nama: "Dewi Puspita",
    jabatan: "Technician",
    total: 1,
    pending: 1,
    disetujui: 0,
    ditolak: 0,
  },
];

const detailsByEmployee: Record<string, LeaveDetail[]> = {
  "Citra Lestari": [
    {
      id: "CUTI-REQ-011",
      jenis: "Tahunan",
      periode: "2025-09-15 - 2025-09-18",
      alasan: "Acara keluarga",
      status: "Pending",
    },
    {
      id: "CUTI-REQ-013",
      jenis: "Izin",
      periode: "2025-09-22 - 2025-09-22",
      alasan: "Urusan pribadi",
      status: "Pending",
    },
  ],
  "Dewi Puspita": [
    {
      id: "CUTI-REQ-021",
      jenis: "Sakit",
      periode: "2025-09-07 - 2025-09-07",
      alasan: "Demam",
      status: "Pending",
    },
  ],
};

const ApproveCutiPage: React.FC<ApproveCutiPageProps> = ({ onBack }) => {
  const [nama, setNama] = useState("");
  const [jenisCuti, setJenisCuti] = useState<string>("Semua");
  const [status, setStatus] = useState<string>("Semua");
  const [tglMulai, setTglMulai] = useState<string>("");
  const [tglSelesai, setTglSelesai] = useState<string>("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [openRows, setOpenRows] = useState<Set<string>>(new Set());

  const toggleRow = (name: string) => {
    setOpenRows((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  };

  const filtered = useMemo(() => {
    return initialEmployees.filter((row) => {
      const matchNama = nama
        ? row.nama.toLowerCase().includes(nama.toLowerCase())
        : true;
      // jenisCuti dan status tidak mempengaruhi data mock ini; tetap biarkan untuk struktur UI
      return matchNama;
    });
  }, [nama, jenisCuti, status, tglMulai, tglSelesai]);

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const currentPage = Math.min(page, totalPages);
  const startIndex = (currentPage - 1) * pageSize;
  const pageRows = filtered.slice(startIndex, startIndex + pageSize);

  const handleCari = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
  };

  const limitList = filtered
    .filter((e) => e.limitTerlampaui)
    .map((e) => e.nama);

  return (
    <div className="min-h-screen bg-background text-text p-4">
      {/* Header */}
      <PageHeader title="Approve Cuti" onBack={onBack} />

      <div className="max-w-5xl mx-auto">
        {/* Filter Card */}
        <form
          onSubmit={handleCari}
          className="bg-surface rounded-xl shadow-card p-4 md:p-6 mb-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 md:gap-4">
            <div className="flex flex-col">
              <label className="text-xs text-textSecondary mb-1">Nama</label>
              <input
                type="text"
                placeholder="Cari nama..."
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                className="h-10 px-3 rounded-lg bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-xs text-textSecondary mb-1">
                Jenis Cuti
              </label>
              <select
                value={jenisCuti}
                onChange={(e) => setJenisCuti(e.target.value)}
                className="h-10 px-3 rounded-lg bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option>Semua</option>
                <option>Tahunan</option>
                <option>Sakit</option>
                <option>Melahirkan</option>
                <option>Lainnya</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label className="text-xs text-textSecondary mb-1">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="h-10 px-3 rounded-lg bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option>Semua</option>
                <option>Pending</option>
                <option>Disetujui</option>
                <option>Ditolak</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label className="text-xs text-textSecondary mb-1">
                Tanggal Mulai ≥
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={tglMulai}
                  onChange={(e) => setTglMulai(e.target.value)}
                  className="w-full h-10 pr-10 pl-3 rounded-lg bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <Calendar
                  size={16}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-textSecondary"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <label className="text-xs text-textSecondary mb-1">
                Tanggal Selesai ≤
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={tglSelesai}
                  onChange={(e) => setTglSelesai(e.target.value)}
                  className="w-full h-10 pr-10 pl-3 rounded-lg bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <Calendar
                  size={16}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-textSecondary"
                />
              </div>
            </div>
            <div className="flex items-end md:items-center md:col-span-3">
              <button
                type="submit"
                className="inline-flex items-center justify-center h-10 px-4 rounded-lg bg-primary text-white shadow hover:opacity-90 active:opacity-100"
              >
                <Search size={16} className="mr-2" />
                Cari
              </button>
            </div>
          </div>

          {/* Warning banner */}
          {limitList.length > 0 && (
            <div className="mt-4 p-3 rounded-lg bg-red-50 text-red-700 flex items-start gap-2">
              <AlertCircle size={18} className="mt-0.5" />
              <div className="text-sm">
                <strong>Peringatan:</strong> Pegawai berikut melebihi batas
                pengajuan cuti ({limitList.length}): {limitList.join(", ")}
              </div>
            </div>
          )}

          {/* Actions before table */}
          <div className="mt-3 flex flex-wrap gap-2 justify-end">
            <button className="inline-flex items-center h-9 px-3 rounded-lg bg-green-500 text-white shadow">
              <FileSpreadsheet size={16} className="mr-2" /> Export Excel
            </button>
            <button className="inline-flex items-center h-9 px-3 rounded-lg bg-red-500 text-white shadow">
              <FileText size={16} className="mr-2" /> Export PDF
            </button>
          </div>
        </form>

        {/* Table */}
        <div className="bg-surface rounded-xl shadow-card overflow-hidden">
          <div className="px-4 py-3 border-b bg-gray-50 text-sm text-textSecondary flex items-center gap-2">
            <span>Show</span>
            <select
              className="h-8 px-2 rounded border"
              value={pageSize}
              onChange={(e) => {
                setPageSize(parseInt(e.target.value, 10));
                setPage(1);
              }}
            >
              {[10, 20, 50].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
            <span>employees</span>
          </div>

          <div className="overflow-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className="text-left px-4 py-3 whitespace-nowrap">
                    NAMA
                  </th>
                  <th className="text-left px-4 py-3 whitespace-nowrap">
                    JABATAN
                  </th>
                  <th className="text-center px-4 py-3 whitespace-nowrap">
                    TOTAL CUTI
                  </th>
                  <th className="text-center px-4 py-3 whitespace-nowrap">
                    PENDING
                  </th>
                  <th className="text-center px-4 py-3 whitespace-nowrap">
                    DISETUJUI
                  </th>
                  <th className="text-center px-4 py-3 whitespace-nowrap">
                    DITOLAK
                  </th>
                </tr>
              </thead>
              <tbody>
                {pageRows.map((row) => {
                  const isOpen = openRows.has(row.nama);
                  return (
                    <>
                      <tr
                        key={row.nama}
                        className={`border-t ${
                          row.limitTerlampaui ? "bg-red-50/40" : ""
                        }`}
                      >
                        <td className="px-4 py-3 whitespace-nowrap">
                          <button
                            type="button"
                            onClick={() => toggleRow(row.nama)}
                            className="flex items-center gap-2 text-left"
                            aria-expanded={isOpen}
                            aria-controls={`detail-${row.nama}`}
                          >
                            <ChevronDown
                              size={16}
                              className={`text-textSecondary transition-transform ${
                                isOpen ? "rotate-180" : ""
                              }`}
                            />
                            <span>{row.nama}</span>
                            {row.limitTerlampaui && (
                              <span className="ml-2 inline-flex items-center h-5 px-2 rounded-full text-xs bg-red-100 text-red-700">
                                Limit terlampaui
                              </span>
                            )}
                          </button>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          {row.jabatan}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs">
                            {row.total}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-yellow-100 text-yellow-700 text-xs">
                            {row.pending}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-100 text-green-700 text-xs">
                            {row.disetujui}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-100 text-red-700 text-xs">
                            {row.ditolak}
                          </span>
                        </td>
                      </tr>
                      {isOpen && (
                        <tr>
                          <td
                            colSpan={6}
                            id={`detail-${row.nama}`}
                            className="bg-gray-50"
                          >
                            <div className="m-3 p-3 rounded-lg border">
                              <div className="text-sm font-medium mb-2">
                                Detail Cuti {row.nama}
                              </div>
                              <div className="overflow-auto">
                                <table className="min-w-full text-sm">
                                  <thead className="text-gray-600">
                                    <tr>
                                      <th className="text-left px-3 py-2">
                                        ID
                                      </th>
                                      <th className="text-left px-3 py-2">
                                        JENIS
                                      </th>
                                      <th className="text-left px-3 py-2">
                                        PERIODE
                                      </th>
                                      <th className="text-left px-3 py-2">
                                        ALASAN
                                      </th>
                                      <th className="text-left px-3 py-2">
                                        STATUS
                                      </th>
                                      <th className="text-left px-3 py-2">
                                        AKSI
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {(detailsByEmployee[row.nama] || []).map(
                                      (d) => (
                                        <tr key={d.id} className="border-t">
                                          <td className="px-3 py-2 whitespace-nowrap">
                                            {d.id}
                                          </td>
                                          <td className="px-3 py-2 whitespace-nowrap">
                                            {d.jenis}
                                          </td>
                                          <td className="px-3 py-2 whitespace-nowrap">
                                            {d.periode}
                                          </td>
                                          <td className="px-3 py-2">
                                            {d.alasan}
                                          </td>
                                          <td className="px-3 py-2 whitespace-nowrap">
                                            <span
                                              className={`inline-flex items-center h-6 px-2 rounded-full text-xs ${
                                                d.status === "Pending"
                                                  ? "bg-yellow-100 text-yellow-700"
                                                  : d.status === "Disetujui"
                                                  ? "bg-green-100 text-green-700"
                                                  : "bg-red-100 text-red-700"
                                              }`}
                                            >
                                              {d.status}
                                            </span>
                                          </td>
                                          <td className="px-3 py-2 whitespace-nowrap">
                                            <div className="flex items-center gap-2">
                                              <button className="h-8 px-2 rounded bg-green-100 text-green-700 text-xs">
                                                Setujui
                                              </button>
                                              <button className="h-8 px-2 rounded bg-red-100 text-red-700 text-xs">
                                                Tolak
                                              </button>
                                            </div>
                                          </td>
                                        </tr>
                                      )
                                    )}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  );
                })}
                {pageRows.length === 0 && (
                  <tr>
                    <td
                      className="px-4 py-6 text-center text-textSecondary"
                      colSpan={6}
                    >
                      Tidak ada data
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 px-4 py-3 border-t text-sm">
            <div className="text-textSecondary">
              Showing {startIndex + 1} to{" "}
              {Math.min(startIndex + pageSize, total)} of {total} employees
            </div>
            <div className="flex items-center gap-2">
              <button
                className="inline-flex items-center h-8 px-2 rounded border disabled:opacity-50"
                disabled={currentPage === 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                <ChevronLeft size={16} className="mr-1" /> Previous
              </button>
              <span className="inline-flex items-center h-8 px-3 rounded border bg-white">
                {currentPage}
              </span>
              <button
                className="inline-flex items-center h-8 px-2 rounded border disabled:opacity-50"
                disabled={currentPage === totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              >
                Next <ChevronRight size={16} className="ml-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApproveCutiPage;
