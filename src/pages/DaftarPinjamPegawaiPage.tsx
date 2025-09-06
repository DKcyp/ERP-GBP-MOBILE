import React from 'react';

interface DaftarPinjamPegawaiPageProps {
  onBack: () => void;
}

const DaftarPinjamPegawaiPage: React.FC<DaftarPinjamPegawaiPageProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-background text-text p-4">
      <header className="flex items-center justify-between mb-6">
        <button onClick={onBack} className="text-primary hover:underline">
          &larr; Back
        </button>
        <h1 className="text-3xl font-bold text-text">Daftar Pinjam Pegawai</h1>
        <div></div> {/* Placeholder for alignment */}
      </header>
      <div className="bg-surface rounded-xl shadow-card p-6">
        <p className="text-textSecondary">Content for Daftar Pinjam Pegawai page will go here.</p>
        {/* Add your Daftar Pinjam Pegawai specific UI components here */}
      </div>
    </div>
  );
};

export default DaftarPinjamPegawaiPage;
