import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import { AuthContextProvider } from './context/auth/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>

            <AuthContextProvider>
                <App />

                <ToastContainer
                    position="top-center"
                    autoClose={2000}
                    closeOnClick
                    // draggable
                    theme="colored"
                />
            </AuthContextProvider>

        </BrowserRouter>
    </StrictMode>,
)