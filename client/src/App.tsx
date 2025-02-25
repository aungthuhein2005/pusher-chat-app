import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Sidebar } from './components/sidebar'
import { TopBar } from './components/top-bar'
import { ChatInterface } from './components/chat-interface'
import { Login } from './pages/login'
import { Register } from './pages/register'
import { User } from 'lucide-react'
import { UserProvider } from './context/UserContext'

// Simulating authentication (Replace with real auth logic)
const useAuth = () => {
  const [user, setUser] = useState(undefined) // `undefined` instead of `null`

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (token) {
      setUser({ token }) // Simulate a logged-in user
    } else {
      setUser(null) // Explicitly set as null when no token
    }
  }, [])

  return user // `undefined` means "checking auth", `null` means "not logged in"
}


function ProtectedRoute({ children }) {
  const user = useAuth()

  if (user === undefined) {
    return <div>Loading...</div> // Prevents redirecting before auth is checked
  }

  return user ? children : <Navigate to="/login" />
}


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <UserProvider>
              <div className="flex flex-col h-screen">
                <TopBar />
                <div className="flex flex-1 overflow-hidden">
                  <Sidebar />
                  <main className="flex-1 overflow-auto">
                    <ChatInterface />
                  </main>
                </div>
              </div>
              </UserProvider>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  )
}

export default App
