import type { AppProps } from 'next/app'
import "../../styles/globals.scss"
import { AuthProvider } from '../contexts/AuthContext'
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
      <ToastContainer autoClose={3000}/>
    </AuthProvider>
  )
}

export default MyApp
