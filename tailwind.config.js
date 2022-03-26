// Idk Colors are not coming in the UI
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: { 
      background: {
        // App Background
        dark100: "#191E24",
        // Auction List Background
        dark200: "#07080A",
        // Create Auction Last step background
        dark300: "#101215",
        // Header Background
        dark400: "#121519",
        
      },
      borderColor: "#656565",
      primary : "#F70FE8",
      test: "#FF0000",
    },
  },
  plugins: [],
};
