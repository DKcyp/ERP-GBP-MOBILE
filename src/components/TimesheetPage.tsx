import React from 'react';
import { Plus, Trash2, ArrowLeft } from 'lucide-react'; // Import ArrowLeft icon
import Button from './Button'; // Assuming Button component is available

interface TimesheetPageProps {
  onBack: () => void;
  onAddTimesheet: () => void; // Placeholder for navigating to an add timesheet page
}

const TimesheetPage: React.FC<TimesheetPageProps> = ({ onBack, onAddTimesheet }) => {
  // Dummy data for timesheet entries
  const timesheetEntries = [
    {
      id: '1',
      soNumber: 'SO001.1',
      tmNumber: 'TM0001',
      employeeName: 'Ahmad Justin',
      company: 'Perusahaan A',
      zone: 'Zona 1',
      jobDescription: 'Perbaikan Mesin',
      date: '01-01-2025',
      timeRange: '08:00-22:00',
      allowances: [
        'Team Leader - DR Mob Demob PHE',
        'Team Leader - UR Riser PHE',
        'Team Leader PV - UR Besar PHE',
        'Team Leader - UR Besar PHE',
        'Team Leader - UR md PHE',
      ],
      imageUrl: 'https://images.pexels.com/photos/6238120/pexels-photo-6238120.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', // Pexels image
    },
    {
      id: '2',
      soNumber: 'SO002.5',
      tmNumber: 'TM0002',
      employeeName: 'Budi Santoso',
      company: 'Perusahaan B',
      zone: 'Zona 2',
      jobDescription: 'Instalasi Jaringan',
      date: '05-01-2025',
      timeRange: '09:00-17:00',
      allowances: [
        'Network Engineer - Data Center',
        'Project Coordinator - New Site',
      ],
      imageUrl: 'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', // Another Pexels image
    },
    // Add more dummy data as needed
  ];

  const handleDelete = (id: string) => {
    console.log(`Delete timesheet entry with ID: ${id}`);
    // In a real application, you would update state or call an API here
  };

  return (
    <div className="min-h-screen bg-background p-4 flex flex-col items-center">
      {/* Header with Back Button */}
      <div className="w-full max-w-sm bg-primary p-4 rounded-xl shadow-card flex items-center justify-between mb-6 relative">
        <button
          onClick={onBack}
          className="absolute left-4 text-white hover:text-white/80 transition-colors duration-200"
          aria-label="Go back"
        >
          <ArrowLeft size={24} />
        </button>
        <h2 className="flex-grow text-xl font-bold text-white text-center">Timesheet</h2>
        {/* Placeholder for right-aligned element if needed, to balance the header */}
        <div className="w-6"></div> {/* This div helps center the title by taking up space */}
      </div>

      {/* Add Button */}
      <div className="w-full max-w-sm mx-auto mb-6"> {/* Wrapper for full width and max-width constraint */}
        <Button
          onClick={onAddTimesheet}
          className="bg-primary text-white py-3 rounded-xl flex items-center justify-center w-full hover:bg-primary/90 transition-colors duration-200"
        >
          <Plus size={20} className="mr-2" />
          Tambah
        </Button>
      </div>

      {/* Timesheet Entries List */}
      <div className="w-full max-w-sm space-y-4">
        {timesheetEntries.map((entry) => (
          <div key={entry.id} className="bg-surface p-6 rounded-xl shadow-card relative">
            {/* Delete Icon */}
            <Trash2
              size={20}
              className="absolute top-4 right-4 text-error hover:text-error/80 cursor-pointer"
              onClick={() => handleDelete(entry.id)}
              aria-label={`Delete entry ${entry.soNumber}`}
            />

            <div className="flex items-baseline justify-between mb-2">
              <h3 className="text-xl font-bold text-text">{entry.soNumber}</h3>
              <p className="text-sm text-textSecondary">{entry.tmNumber}</p>
            </div>

            <h4 className="text-lg font-semibold text-text mt-4">{entry.employeeName}</h4>
            <p className="text-sm text-textSecondary flex items-center">
              {entry.company}
              <span className="w-1 h-1 bg-primary rounded-full mx-2 inline-block"></span>
              {entry.zone}
            </p>

            <p className="text-base font-semibold text-text mt-3">{entry.jobDescription}</p>
            <p className="text-sm text-textSecondary mt-1">
              {entry.date} | {entry.timeRange}
            </p>

            <p className="text-sm text-textSecondary mt-4 mb-2">Tunjangan</p>
            <div className="flex flex-wrap gap-2">
              {entry.allowances.map((allowance, idx) => (
                <span
                  key={idx}
                  className="bg-border text-textSecondary px-3 py-1 rounded-full text-xs font-medium"
                >
                  {allowance}
                </span>
              ))}
            </div>

            {entry.imageUrl && (
              <img
                src={entry.imageUrl}
                alt={`Work related to ${entry.jobDescription}`}
                className="w-full h-40 object-cover rounded-lg mt-4"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimesheetPage;
