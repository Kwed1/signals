import { useSignIn } from 'app/auth/auth'
import { ErrorProvider, useError } from 'app/ErrorContext'
import AppRouter from 'app/Router/Router'
import { useEffect, useRef } from 'react'
import { BrowserRouter } from 'react-router-dom'
import ErrorSnackbar from 'shared/ui/Snackbar/Snackbar'
import {init} from '@telegram-apps/sdk';

declare global {
  interface Window {
      Telegram: any;
  }
}

function App() {

  if (typeof window !== 'undefined' && window.Telegram && window.Telegram.WebApp) {
    init();
  } else {
    console.warn('Приложение запущено вне Telegram WebApp. SDK не инициализирован.');
  }

  return (
    <ErrorProvider>
      <BrowserRouter>
        <AppContent/>
      </BrowserRouter>
    </ErrorProvider>
  )
}

function AppContent() {
  const { error, setError } = useError();
  const firstRender = useRef(false);
  const {signIn} = useSignIn();
  
  const Auth = async() => {
    await signIn();
  }

  useEffect(() => {
    if(!firstRender.current) {
      Auth();
      firstRender.current = true;
    }
  }, [])

  return (
    <>
      <AppRouter />
      <ErrorSnackbar error={error} onClose={() => setError('')} />
    </>
  )
}

export default App
