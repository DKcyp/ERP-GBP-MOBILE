import React, { useState } from 'react';
import { ArrowLeft, Plus } from 'lucide-react';
import FormField from './FormField';
import Button from './Button';

interface AddTimesheetPageProps {
  onBack: () => void;
}

interface ItemEntry {
  kode: string;
  satuan: string;
  qty: number | '';
}

const AddTimesheetPage: React.FC<AddTimesheetPageProps> = ({ onBack }) => {
  const [timesheetData, setTimesheetData] = useState({
    noTimesheet: 'TM0001', // New field
    soInduk: 'S001',       // New field
    soTurunan: 'S00.01',   // New field
    namaProyek: 'Proyek A', // New field
    namaTeknisi: 'Azka',   // New field
    namaPerusahaan: 'PT Indonesia', // New field
    zona: 'Zona 1',        // New field
    tanggal: '2025-01-01', // New field, format for date input
    deskripsiPekerjaan: '',
    lampiranDokumen: '', // This will store file name or path
    kualifikasi: '', // For now, a comma-separated string
  });

  const [itemEntries, setItemEntries] = useState<ItemEntry[]>([
    { kode: '', satuan: '', qty: '' }, // Initial empty entry
  ]);

  const handleTimesheetChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value, files } = e.target as HTMLInputElement; // Cast to HTMLInputElement for files, but it can also be HTMLSelectElement
    if (id === 'lampiranDokumen' && files && files.length > 0) {
      setTimesheetData((prev) => ({ ...prev, [id]: files[0].name })); // Store file name
    } else {
      setTimesheetData((prev) => ({ ...prev, [id]: value }));
    }
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
    setItemEntries((prev) => [...prev, { kode: '', satuan: '', qty: '' }]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Timesheet Data:', timesheetData);
    console.log('Item Entries:', itemEntries);
    // In a real application, you would typically send this data to a backend
    alert('Timesheet data submitted! (Check console for details)');
    onBack(); // Go back after submission
  };

  // Dummy options for SO Induk and SO Turunan
  const soIndukOptions = [
    { value: 'S001', label: 'S001' },
    { value: 'S002', label: 'S002' },
    { value: 'S003', label: 'S003' },
  ];

  const soTurunanOptions = [
    { value: 'S00.01', label: 'S00.01' },
    { value: 'S00.02', label: 'S00.02' },
    { value: 'S00.03', label: 'S00.03' },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col items-center">
      {/* Header */}
      <div className="w-full max-w-sm bg-primary p-4 flex items-center justify-between rounded-b-xl shadow-md">
        <button onClick={onBack} className="text-white p-2 rounded-full hover:bg-primary/80 transition-colors">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-white">Timesheet</h1>
        <div className="w-8"></div> {/* Placeholder for alignment */}
      </div>

      <form onSubmit={handleSubmit} className="w-full max-w-sm p-4">
        <div className="bg-surface p-6 rounded-xl shadow-card mb-6">
          {/* New Fields Added Here */}
          <FormField
            id="noTimesheet"
            label="No Timesheet"
            type="text"
            value={timesheetData.noTimesheet}
            onChange={handleTimesheetChange}
            readOnly={true}
          />
          <FormField
            id="soInduk"
            label="SO Induk"
            type="select"
            value={timesheetData.soInduk}
            onChange={handleTimesheetChange}
            options={soIndukOptions}
          />
          <FormField
            id="soTurunan"
            label="SO Turunan"
            type="select"
            value={timesheetData.soTurunan}
            onChange={handleTimesheetChange}
            options={soTurunanOptions}
          />
          <FormField
            id="namaProyek"
            label="Nama Proyek"
            type="text"
            value={timesheetData.namaProyek}
            onChange={handleTimesheetChange}
            placeholder="Proyek A"
          />
          <FormField
            id="namaTeknisi"
            label="Nama Teknisi"
            type="text"
            value={timesheetData.namaTeknisi}
            onChange={handleTimesheetChange}
            placeholder="Azka"
          />
          <FormField
            id="namaPerusahaan"
            label="Nama Perusahaan"
            type="text"
            value={timesheetData.namaPerusahaan}
            onChange={handleTimesheetChange}
            placeholder="PT Indonesia"
          />
          <FormField
            id="zona"
            label="Zona"
            type="text"
            value={timesheetData.zona}
            onChange={handleTimesheetChange}
            placeholder="Zona 1"
          />
          <FormField
            id="tanggal"
            label="Tanggal"
            type="date"
            value={timesheetData.tanggal}
            onChange={handleTimesheetChange}
          />

          {/* Existing Fields Below */}
          <FormField
            id="deskripsiPekerjaan"
            label="Deskripsi Pekerjaan"
            type="textarea"
            value={timesheetData.deskripsiPekerjaan}
            onChange={handleTimesheetChange}
            placeholder="Memperbaiki Mesin"
          />
          <FormField
            id="lampiranDokumen"
            label="Lampiran Dokumen"
            type="file"
            onChange={handleTimesheetChange}
          />
          {/* Kualifikasi - simplified as text input for now. A custom multi-select tag component would be needed for full functionality as per image. */}
          <FormField
            id="kualifikasi"
            label="Kualifikasi"
            type="text"
            value={timesheetData.kualifikasi}
            onChange={handleTimesheetChange}
            placeholder="Kualifikasi 1, Kualifikasi 2"
            infoMessage="Pisahkan kualifikasi dengan koma"
          />
        </div>

        {/* Item Usage Section */}
        <div className="bg-surface p-6 rounded-xl shadow-card mb-6">
          <h3 className="text-lg font-bold text-text mb-4">Pemakaian Barang</h3>
          {itemEntries.map((item, index) => (
            <div key={index} className="mb-6 p-4 bg-surface rounded-lg border border-border">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  id={`kode-${index}`}
                  label="Kode"
                  name="kode"
                  value={item.kode}
                  onChange={(e) => handleItemChange(index, e)}
                  placeholder="SRT-1"
                />
                <FormField
                  id={`satuan-${index}`}
                  label="Satuan"
                  name="satuan"
                  value={item.satuan}
                  onChange={(e) => handleItemChange(index, e)}
                  placeholder="Pcs"
                />
              </div>
              <FormField
                id={`qty-${index}`}
                label="Qty"
                name="qty"
                type="number"
                value={item.qty}
                onChange={(e) => handleItemChange(index, e)}
                placeholder="5"
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
        </div>

        <Button type="submit" className="mt-6 w-full">
          Simpan
        </Button>
      </form>
    </div>
  );
};

export default AddTimesheetPage;
