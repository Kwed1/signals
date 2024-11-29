import { useSignIn } from 'app/auth/auth'
import { ErrorProvider, useError } from 'app/ErrorContext'
import AppRouter from 'app/Router/Router'
import { useEffect, useRef } from 'react'
import { BrowserRouter } from 'react-router-dom'
import ErrorSnackbar from 'shared/ui/Snackbar/Snackbar'

function App() {
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
