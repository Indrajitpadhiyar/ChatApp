import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './index.css'
import AppRoutes from './routes/AppRoutes.jsx'
import { UserProvider } from './context/User.context'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <UserProvider>
        <AppRoutes />
      </UserProvider>
    </>
  )
}

export default App
