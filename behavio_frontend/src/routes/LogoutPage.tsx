import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
const LogoutPage: React.FC = () => {
  const navigate = useNavigate()
  // TODO: Implement logout functionality
  // 1. Remove token from local storage
  // 2. setTimeout to do some stuff then Redirect to login page from this page

  useEffect(() => {
    localStorage.removeItem('isAuthenticated')
    setTimeout(() => {
      navigate('/login')
    }, 2000)
  }, [])
  return (
    <main className="h-screen w-screen bg-accent flex flex-col gap-10 items-center text-center justify-center text-2xl text-primary-dark">
      <h1>....Aww</h1>
      <p>You have been logged out.</p>
    </main>
  )
}

export default LogoutPage