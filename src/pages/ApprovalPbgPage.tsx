import React from 'react';

interface ApprovalPbgPageProps {
  onBack: () => void;
}

const ApprovalPbgPage: React.FC<ApprovalPbgPageProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-background text-text p-4">
      <header className="flex items-center justify-between mb-6">
        <button onClick={onBack} className="text-primary hover:underline">
          &larr; Back
        </button>
        <h1 className="text-3xl font-bold text-text">Approval PBG</h1>
        <div></div> {/* Placeholder for alignment */}
      </header>
      <div className="bg-surface rounded-xl shadow-card p-6">
        <p className="text-textSecondary">Content for Approval PBG page will go here.</p>
        {/* Add your Approval PBG specific UI components here */}
      </div>
    </div>
  );
};

export default ApprovalPbgPage;
