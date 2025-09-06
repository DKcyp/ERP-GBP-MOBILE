import React from 'react';
import { ArrowLeft, Menu } from 'lucide-react';

interface DashboardKpiPageProps {
  onBack: () => void;
}

const DashboardKpiPage: React.FC<DashboardKpiPageProps> = ({ onBack }) => {
  // Static data for the bar chart
  const kpiData = [
    { month: 'Jan', value: 10 },
    { month: 'Feb', value: 22 },
    { month: 'Mar', value: 32 },
    { month: 'Apr', value: 22 },
    { month: 'May', value: 12 },
    { month: 'Jun', value: 22 },
    { month: 'Jul', value: 32 },
    { month: 'Aug', value: 22 },
    { month: 'Sep', value: 12 },
    { month: 'Oct', value: 22 },
    { month: 'Nov', value: 32 },
    { month: 'Dec', value: 22 },
  ];

  const maxValue = 32; // Max value for Y-axis

  return (
    <div className="min-h-screen bg-background p-4 flex flex-col items-center">
      {/* Header */}
      <div className="w-full max-w-md bg-surface p-6 rounded-xl shadow-card grid grid-cols-3 items-center mb-8">
        <button
          onClick={onBack}
          className="flex items-center text-textSecondary hover:text-primary transition-colors duration-200 justify-self-start"
          aria-label="Back to menu"
        >
          <ArrowLeft size={20} className="mr-1" />
          Back
        </button>
        <h2 className="text-xl font-bold text-text text-center col-start-2">Dashboard KPI</h2>
        <div className="justify-self-end"></div> {/* Empty div to balance the grid */}
      </div>

      {/* Main Content Area */}
      <div className="w-full max-w-md flex flex-col gap-4 md:grid md:grid-cols-2 md:max-w-2xl">
        {/* KPI Chart Card */}
        <div className="bg-surface p-6 rounded-xl shadow-card flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-text">KPI</h3>
            <Menu size={20} className="text-textSecondary" />
          </div>
          <div className="relative h-64 w-full flex items-end pb-4 pr-4">
            {/* Y-axis labels */}
            <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-textSecondary pr-2">
              <span>{maxValue}</span>
              <span>{maxValue * 3 / 4}</span>
              <span>{maxValue / 2}</span>
              <span>{maxValue / 4}</span>
              <span>0</span>
            </div>
            {/* Horizontal grid lines */}
            <div className="absolute left-8 right-0 top-0 h-full flex flex-col justify-between">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-px bg-border w-full"></div>
              ))}
            </div>
            {/* Bars */}
            <div className="flex flex-1 h-full items-end justify-around pl-8">
              {kpiData.map((data, index) => (
                <div key={index} className="flex flex-col items-center h-full justify-end mx-0.5">
                  <div
                    className="w-4 bg-primary rounded-t-sm transition-all duration-300 ease-out"
                    style={{ height: `${(data.value / maxValue) * 100}%` }}
                  ></div>
                </div>
              ))}
            </div>
          </div>
          {/* X-axis labels */}
          <div className="flex justify-around text-xs text-textSecondary mt-2 pl-8">
            {kpiData.map((data, index) => (
              <span key={index} className="w-4 text-center">{data.month}</span>
            ))}
          </div>
        </div>

        {/* KPI Summary Cards */}
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold text-text mb-2">Pencapaian KPI</h3>
          <div className="rounded-xl p-4 text-center kpi-purple-bg shadow-card">
            <p className="text-sm kpi-purple-text">Pencapaian KPI Bulan Ini</p>
            <p className="text-3xl font-bold kpi-purple-text mt-1">100%</p>
          </div>
          <div className="rounded-xl p-4 text-center kpi-red-bg shadow-card">
            <p className="text-sm kpi-red-text">Pencapaian KPI Terendah</p>
            <p className="text-3xl font-bold kpi-red-text mt-1">10%</p>
          </div>
          <div className="rounded-xl p-4 text-center kpi-green-bg shadow-card">
            <p className="text-sm kpi-green-text">Pencapaian KPI Tertinggi</p>
            <p className="text-3xl font-bold kpi-green-text mt-1">100%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardKpiPage;
