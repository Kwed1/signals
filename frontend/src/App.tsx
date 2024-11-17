import { ErrorProvider, useError } from 'app/ErrorContext'
import AppRouter from 'app/Router/Router'
import { BrowserRouter } from 'react-router-dom'
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
  const { error, setError } = useError()

  return (
    <>
      <AppRouter />
      <ErrorSnackbar error={error} onClose={() => setError('')} />
    </>
  )
}

export default App
