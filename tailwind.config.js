/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // New palette based on the provided image
        background: '#F7F8FA', // Adjusted to a lighter, more neutral grey
        surface: '#FFFFFF',   // White for the login card background
        primary: '#2563EB',   // Strong blue for the button and logo circle
        text: '#1F2937',      // Dark grey for main text and labels
        textSecondary: '#6B7280', // Medium grey for subtitle and placeholders
        border: '#D1D5DB',    // Light grey for input borders
        // Keeping existing colors for potential future use, but not actively used in this basic design
        accent: '#f472b6',
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444',

        // --- NEW: KPI Dashboard specific colors ---
        'kpi-purple-bg': '#F3E8FF', // Light purple for "Bulan Ini" card background
        'kpi-purple-text': '#7C3AED', // Darker purple for "Bulan Ini" text
        'kpi-red-bg': '#FEE2E2',    // Light red for "Terendah" card background
        'kpi-red-text': '#EF4444',  // Darker red for "Terendah" text
        'kpi-green-bg': '#D1FAE5',  // Light green for "Tertinggi" card background
        'kpi-green-text': '#059669',// Darker green for "Tertinggi" text
      },
      borderRadius: {
        'xl': '12px', // Adjusted for softer, more modern rounded corners
        'lg': '6px', // For inputs
      },
      boxShadow: {
        'card': '0 4px 12px rgba(0, 0, 0, 0.08)', // Subtle shadow for the card
      },
    },
  },
  plugins: [],
}
