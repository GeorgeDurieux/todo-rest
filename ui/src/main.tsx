import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { store } from './app/store.ts'
import './index.css';
import { ThemeProvider } from './context/ThemeContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider>
          <div className="min-h-screen bg-light-background dark:bg-dark-background">
            <App />
          </div>
      </ThemeProvider>
    </Provider>  
  </StrictMode>
)
