import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
const LogoutPage: React.FC = () => {
  const [redirectText, setRedirectText] = useState<string>("You have been logged out.")
  const navigate = useNavigate()
  // TODO: Implement logout functionality
  // 1. Remove token from local storage
  // 2. setTimeout to do some stuff then Redirect to login page from this page

  const logoutUser = async () => {
    const response = await fetch('http://127.0.0.1:8000/api/v1/logout/', {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': `${localStorage.getItem('csrftoken')}`,
      },
      body: JSON.stringify({}),
    })

    const data = await response.json()
    if (data.success) {
      console.log('User logged out')
      setTimeout(() => {
        localStorage.removeItem('isAuthenticated')
        navigate('/login')
      }, 2000)
    } else {
      setRedirectText('Something went wrong, redirecting to dashboard...')
      navigate('/dashboard')
    }



    
  }
  useEffect(() => {
    // POST Request to logout
    logoutUser()
  }, [])
  return (
    <main className="h-screen w-screen bg-accent flex flex-col gap-10 items-center text-center justify-center text-2xl text-primary-dark">
      <h1>....Aww</h1>
      <p>{redirectText}</p>
    </main>
  )
}

export default LogoutPage