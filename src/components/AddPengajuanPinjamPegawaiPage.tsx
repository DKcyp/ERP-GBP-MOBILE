import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import FormField from './FormField'; // Assuming FormField component exists
import Button from './Button'; // Assuming Button component exists

interface AddPengajuanPinjamPegawaiPageProps {
  onBack: () => void;
}

const AddPengajuanPinjamPegawaiPage: React.FC<AddPengajuanPinjamPegawaiPageProps> = ({ onBack }) => {
  const [tanggalPengajuan, setTanggalPengajuan] = useState('');
  const [tanggalJatuhTempo, setTanggalJatuhTempo] = useState('');
  const [nominalPiutang, setNominalPiutang] = useState('');
  const [keterangan, setKeterangan] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Data Pengajuan Pinjaman:', {
      tanggalPengajuan,
      tanggalJatuhTempo,
      nominalPiutang,
      keterangan,
    });
    // Here you would typically send this data to a backend
    alert('Pengajuan pinjaman berhasil disimpan!');
    onBack(); // Navigate back after saving
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center">
      {/* Header */}
      <div className="w-full max-w-sm bg-primary p-4 flex items-center justify-between rounded-b-xl shadow-md">
        <button onClick={onBack} className="text-white p-2 rounded-full hover:bg-primary/80 transition-colors">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-white">Pengajuan Pinjaman Pegawai - Entry</h1>
        <div className="w-8"></div> {/* Placeholder for alignment */}
      </div>

      <form onSubmit={handleSubmit} className="w-full max-w-sm p-4 space-y-6 flex-grow">
        <FormField
          label="Tanggal Pengajuan"
          type="date"
          value={tanggalPengajuan}
          onChange={(e) => setTanggalPengajuan(e.target.value)}
          placeholder="Pilih Tanggal"
        />
        <FormField
          label="Tanggal Jatuh Tempo"
          type="date"
          value={tanggalJatuhTempo}
          onChange={(e) => setTanggalJatuhTempo(e.target.value)}
          placeholder="Pilih Tanggal"
        />
        <FormField
          label="Nominal Piutang"
          type="text" // Use text for currency input, can add pattern/validation later
          value={nominalPiutang}
          onChange={(e) => setNominalPiutang(e.target.value)}
          placeholder="Masukkan Nominal"
        />
        <FormField
          label="Keterangan"
          type="textarea"
          value={keterangan}
          onChange={(e) => setKeterangan(e.target.value)}
          placeholder="Masukkan Keterangan"
        />

        <div className="pt-4"> {/* Padding top for the button */}
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-primary to-indigo-500 text-white py-3 rounded-xl shadow-lg hover:from-primary/90 hover:to-indigo-500/90 focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all active:scale-95"
          >
            Simpan
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddPengajuanPinjamPegawaiPage;
