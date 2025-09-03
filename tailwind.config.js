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
        background: '#F0F2F5', // Very light grey-blue for the overall page background
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
      },
      borderRadius: {
        'xl': '8px', // Slightly less rounded corners for the card, matching image
        'lg': '6px', // For inputs
      },
      boxShadow: {
        'card': '0 4px 12px rgba(0, 0, 0, 0.08)', // Subtle shadow for the card
      },
    },
  },
  plugins: [],
}
