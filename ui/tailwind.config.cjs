module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'light-background': '#e8ebf0',   
        'light-card': '#f5f7fa',         
        'light-text': '#1f1f2e',         
        'light-primary': '#5c7cfa',      
        'light-secondary': '#7b7b7b',  
        'light-input': '#fdfdfd',        
        'light-border': '#d1d5db',
        'light-navbar': '#d8dbe5',       

        'dark-background': '#12121f', 
        'dark-card': '#1e1e2a',          
        'dark-text': '#e8ebf0',       
        'dark-primary': '#748ffc',     
        'dark-secondary': '#868e96',     
        'dark-input': '#1f1f2e',         
        'dark-border': '#2a2a36',      
        'dark-navbar': '#3a3a4b', 
      },
      boxShadow: {
        glow: '0 0 10px rgba(92,124,250,0.6)',
      }
    },
  },
  plugins: [],
}