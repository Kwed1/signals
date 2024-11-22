import { useSignIn } from 'app/auth/auth'
import { ErrorProvider, useError } from 'app/ErrorContext'
import AppRouter from 'app/Router/Router'
import { useEffect, useRef } from 'react'
import { BrowserRouter } from 'react-router-dom'
import useTokenStore from 'shared/store/useTokenStore'
import Navbar from 'shared/ui/Navbar/Navbar'
import ErrorSnackbar from 'shared/ui/Snackbar/Snackbar'

function App() {
  return (
    <ErrorProvider>
      <BrowserRouter>
        <AppContent/>
        <Navbar/>
      </BrowserRouter>
    </ErrorProvider>
  )
}

function AppContent() {
  const { error, setError } = useError();
  const {setToken} = useTokenStore();
  const firstRender = useRef(false);
  const {signIn} = useSignIn();
  const Auth = async() => {
    try {
      const res = await signIn();
      if(res) setToken(res?.token);
    } catch(e) {
      console.log(e);
    }
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
