import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  onBack: () => void;
  rightSlot?: React.ReactNode;
}

// A reusable page header with blue background, left back arrow, centered title
// Matches the screenshot style: solid blue bar, white arrow and text, subtle shadow
const PageHeader: React.FC<PageHeaderProps> = ({ title, onBack, rightSlot }) => {
  return (
    <div className="w-full bg-primary text-white shadow-md">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={onBack}
            className="flex items-center text-white/90 hover:text-white transition-colors"
            aria-label="Kembali"
          >
            <ArrowLeft size={22} className="mr-2" />
            <span className="sr-only">Kembali</span>
          </button>
          <h1 className="text-lg md:text-xl font-semibold tracking-wide text-center">
            {title}
          </h1>
          <div className="min-w-[24px] flex items-center justify-end">
            {rightSlot ?? null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
