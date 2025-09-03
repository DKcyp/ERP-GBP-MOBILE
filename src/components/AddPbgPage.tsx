import React, { useState } from 'react';
import { ArrowLeft, Plus } from 'lucide-react';
import FormField from './FormField';
import Button from './Button';
import Modal from './Modal'; // Import the new Modal component

interface AddPbgPageProps {
  onBack: () => void;
}

interface ItemEntry {
  kode: string;
  namaBarang: string;
  qty: number | '';
  satuan: string;
  keterangan: string;
  stockInfo?: string; // For "*sisa stok Gudang : 4*"
}

const AddPbgPage: React.FC<AddPbgPageProps> = ({ onBack }) => {
  const [pbgData, setPbgData] = useState({
    noPbg: 'PBG-001',
    noSoInduk: 'SO-005',
    noSoTurunan: 'SOT-001',
    namaProyek: 'Proyek Indonesia',
    namaTeknisi: 'Ahmad Justin',
    periodeStart: '2025-01-01',
    periodeEnd: '2025-01-02',
    scopeOfWork: 'Digunakan Justin, Herwana, Putra, Rahman, Rendi',
    lampiranDokumen: '',
  });

  const [itemEntries, setItemEntries] = useState<ItemEntry[]>([
    { kode: 'KCM-1', namaBarang: 'Kacamata', qty: 5, satuan: 'Pcs', keterangan: 'Digunakan Justin, Herwana, Putra, Rahman, Rendi', stockInfo: '*sisa stok Gudang : 4*' },
    { kode: 'SRT-1', namaBarang: 'Sarung Tangan', qty: 2, satuan: 'Pcs', keterangan: 'Digunakan Ibnu dan Adi' },
    { kode: '', namaBarang: '', qty: '', satuan: '', keterangan: '' }, // Initial empty entry
  ]);

  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: '',
    message: '',
  });

  const handlePbgChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setPbgData((prev) => ({ ...prev, [id]: value }));
  };

  const handleItemChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const updatedItems = itemEntries.map((item, i) =>
      i === index ? { ...item, [name]: name === 'qty' ? (value === '' ? '' : Number(value)) : value } : item
    );
    setItemEntries(updatedItems);
  };

  const handleAddItem = () => {
    setItemEntries((prev) => [...prev, { kode: '', namaBarang: '', qty: '', satuan: '', keterangan: '' }]);
  };

  const handleConfirmSubmit = () => {
    console.log('PBG Data:', pbgData);
    console.log('Item Entries:', itemEntries);
    alert('PBG data submitted! (Check console for details)');
    setShowModal(false); // Close modal after submission
    onBack(); // Go back after submission
  };

  const handleCancelModal = () => {
    setShowModal(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Check for stock issues
    const stockIssueItem = itemEntries.find(item => {
      if (item.stockInfo && item.qty !== '') {
        const stockMatch = item.stockInfo.match(/\d+/);
        const availableStock = stockMatch ? parseInt(stockMatch[0], 10) : 0;
        return item.qty > availableStock;
      }
      return false;
    });

    if (stockIssueItem) {
      // Found an item with stock issue, show modal
      const stockMatch = stockIssueItem.stockInfo?.match(/\d+/);
      const availableStock = stockMatch ? parseInt(stockMatch[0], 10) : 0;
      setModalContent({
        title: 'Notifikasi',
        message: `Stok ${stockIssueItem.namaBarang} terbatas. Anda mengajukan ${stockIssueItem.qty} ${stockIssueItem.satuan}, namun stok tersedia hanya ${availableStock} ${stockIssueItem.satuan}. Pengiriman mungkin akan terlambat karena akan dilakukan pengajuan terlebih dahulu. Tetap ajukan?`,
      });
      setShowModal(true);
    } else {
      // No stock issues, proceed directly
      handleConfirmSubmit();
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center">
      {/* Header */}
      <div className="w-full max-w-sm bg-primary p-4 flex items-center justify-between rounded-b-xl shadow-md">
        <button onClick={onBack} className="text-white p-2 rounded-full hover:bg-primary/80 transition-colors">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-white">PBG - Entry</h1>
        <div className="w-8"></div> {/* Placeholder for alignment */}
      </div>

      <form onSubmit={handleSubmit} className="w-full max-w-sm p-4">
        <div className="bg-surface p-6 rounded-xl shadow-card mb-6">
          <FormField
            id="noPbg"
            label="No PBG"
            value={pbgData.noPbg}
            onChange={handlePbgChange}
            readOnly
            className="border-gray-300"
          />
          <FormField
            id="noSoInduk"
            label="No SO Induk"
            value={pbgData.noSoInduk}
            onChange={handlePbgChange}
            readOnly
            className="border-gray-300"
          />
          <FormField
            id="noSoTurunan"
            label="No SO Turunan"
            value={pbgData.noSoTurunan}
            onChange={handlePbgChange}
            readOnly
            className="border-gray-300"
          />
          <FormField
            id="namaProyek"
            label="Nama Proyek"
            value={pbgData.namaProyek}
            onChange={handlePbgChange}
            readOnly
            className="border-gray-300"
          />
          <FormField
            id="namaTeknisi"
            label="Nama Teknisi"
            value={pbgData.namaTeknisi}
            onChange={handlePbgChange}
            readOnly
            className="border-gray-300"
          />

          <div className="mb-4">
            <label className="block text-text text-sm font-medium mb-2">Periode Pemakaian</label>
            <FormField
              id="periodeStart"
              label="Start"
              type="date"
              value={pbgData.periodeStart}
              onChange={handlePbgChange}
            />
            <FormField
              id="periodeEnd"
              label="End"
              type="date"
              value={pbgData.periodeEnd}
              onChange={handlePbgChange}
            />
          </div>

          <FormField
            id="scopeOfWork"
            label="Scope Of Work"
            type="textarea"
            value={pbgData.scopeOfWork}
            onChange={handlePbgChange}
            readOnly
            className="border-gray-300"
          />
          <FormField
            id="lampiranDokumen"
            label="Lampiran Dokumen"
            type="file"
            onChange={handlePbgChange}
            className="border-gray-300"
          />
        </div>

        {/* Item Entry Section */}
        <div className="bg-surface p-6 rounded-xl shadow-card mb-6">
          <h3 className="text-lg font-bold text-text mb-4">Entry Barang</h3>
          {itemEntries.map((item, index) => (
            <div key={index} className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  id={`kode-${index}`}
                  label="Kode"
                  name="kode"
                  value={item.kode}
                  onChange={(e) => handleItemChange(index, e)}
                />
                <FormField
                  id={`namaBarang-${index}`}
                  label="Nama Barang"
                  name="namaBarang"
                  value={item.namaBarang}
                  onChange={(e) => handleItemChange(index, e)}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  id={`qty-${index}`}
                  label="Qty"
                  name="qty"
                  type="number"
                  value={item.qty}
                  onChange={(e) => handleItemChange(index, e)}
                  errorMessage={item.stockInfo ? '' : undefined}
                  infoMessage={item.stockInfo}
                  className={item.stockInfo ? 'border-error' : ''}
                />
                <FormField
                  id={`satuan-${index}`}
                  label="Satuan"
                  name="satuan"
                  value={item.satuan}
                  onChange={(e) => handleItemChange(index, e)}
                />
              </div>
              <FormField
                id={`keterangan-${index}`}
                label="Keterangan"
                name="keterangan"
                type="textarea"
                value={item.keterangan}
                onChange={(e) => handleItemChange(index, e)}
              />
            </div>
          ))}
          <Button
            type="button"
            onClick={handleAddItem}
            className="bg-primary text-white p-3 rounded-xl w-full flex items-center justify-center gap-2 mt-4 shadow-md hover:bg-primary/90 transition-colors active:scale-95"
          >
            <Plus size={20} />
            Barang
          </Button>
          <Button
            type="submit"
            className="bg-primary text-white p-3 rounded-xl w-full flex items-center justify-center gap-2 mt-4 shadow-md hover:bg-primary/90 transition-colors active:scale-95"
          >
            Simpan
          </Button>
        </div>
      </form>

      {/* Stock Notification Modal */}
      <Modal
        isOpen={showModal}
        onClose={handleCancelModal}
        title={modalContent.title}
        message={modalContent.message}
        onConfirm={handleConfirmSubmit}
        confirmText="Ajukan"
        cancelText="Batal"
      />
    </div>
  );
};

export default AddPbgPage;
