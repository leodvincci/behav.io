import { useEffect, useState } from 'react'
import InterviewImage from '../components/ui/InterviewImage'
import Logo from '../components/ui/Logo'
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isError, setIsError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate();

  useEffect(() => {
    // Basic validation to remove error message when user starts typing
    if (username.length > 0 && password.length > 0) {
      setIsError(false)
      setErrorMessage('')
    }
  }, [username, password])

  const handleLogin = async (e: React.SyntheticEvent) => {
    e.preventDefault()

    setIsError(false)
    setErrorMessage('')

    if (!username || !password) {
      setIsError(true)
      setErrorMessage('Please fill in all fields')
      return
    }

    const user = {
      username,
      password
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/api/v1/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      })

      const data = await response.json()
      console.log(data)
      if (data.success) {
        localStorage.setItem('session', data.tokens['session'])
        localStorage.setItem('csrf-token', data.tokens['csrf-token'])
        localStorage.setItem('isAuthenticated', 'true')
        localStorage.setItem('user', JSON.stringify(data.user))

        try {
          // Send post request to create a new session
          const sessionResponse = await fetch('http://127.0.0.1:8000/api/v1/session/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              "X-CSRFToken": localStorage.getItem("csrf-token") as string,
            },
            body: JSON.stringify({
              'session': data.tokens['session'],
            }),
          })
  
          const sessionData = await sessionResponse.json()
          console.log(sessionData)
          navigate('/dashboard')
        } catch (error) {
          setIsError(true)
          setErrorMessage('Something went wrong')
        }

      } else {
        setIsError(true)
        setErrorMessage('Invalid credentials. Please click on register below to create an account')
      }
    } catch (error) {
      setIsError(true)
      setErrorMessage('Something went wrong')
    }
  }


  return (
    <section className="min-h-screen min-w-full grid grid-cols-1 lg:grid-cols-2 place-content-center place-items-center tracking-wide text-black">
      <div className='hidden lg:h-screen lg:w-full bg-primary lg:flex lg:flex-col lg:justify-center lg:items-center gap-10'>
        <Logo width={500} />
        <InterviewImage />
      </div>
      <div className='bg-accent h-screen w-full flex-col flex items-center justify-center gap-20'>
        <h1 className='text-4xl text-primary font-bold'>LOGIN</h1>
        <form onSubmit={handleLogin} className='flex flex-col gap-6 w-9/12'>
          <label>
            <input className='w-full p-2 rounded bg-secondary shadow' type="text" placeholder="Username"  onChange={e => setUsername(e.target.value)} />
          </label>
          <label>
            <input className='w-full p-2 rounded bg-secondary shadow' type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
          </label>
          {isError ? <p className='text-error font-bold text-center'>{errorMessage}</p> : <p className="h-6"></p>}
          <button className='btn text-secondary w-3/12 mx-auto tracking-widest bg-primary-light hover:bg-primary-dark shadow-lg hover:shadow-xl active:shadow-lg'>Login</button>
        </form>
        <p className='text-primary text-center'>Need an account? <Link to='/registration' className='text-offBlue hover:text-offBlue-dark active:text-blue-900 underline tracking-wider ml-1'>Register</Link></p>
      </div>
    </section>
  )
}

export default LoginPage