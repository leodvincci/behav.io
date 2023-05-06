import { useEffect, useState } from "react"
import InterviewImage from "../components/ui/InterviewImage"
import Logo from "../components/ui/Logo"
import { Link } from "react-router-dom"
import RegistrationImage from "../components/ui/RegistrationImage"
import { useNavigate } from "react-router-dom"

const RegistrationPage: React.FC = () => {
  const [first_name, setFirstName] = useState('')
  const [last_name, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isError, setIsError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    // Basic validation to remove error message when user starts typing
    if (first_name.length > 0 && password.length > 0 && last_name.length > 0 && email.length > 0) {
      setIsError(false)
      setErrorMessage('')
    }
  }, [first_name, password, last_name, email])

  const handleRegistration = async (e: React.SyntheticEvent) => {
    e.preventDefault()

    setIsError(false)
    setErrorMessage('')

    if (!first_name || !last_name || !password || !email) {
      setIsError(true)
      setErrorMessage('Please fill in all fields')
      return
    }

    const user = {
      first_name,
      last_name,
      email,
      password
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/api/v1/registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })

      const data = await response.json()
      console.log(data)
      if (data['042']) {
        navigate('/login')
      } else {
        console.log('error')
        setIsError(true)
        setErrorMessage(data.error)
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
        <RegistrationImage width={500} />
      </div>
      <div className='bg-accent h-screen w-full flex-col flex items-center justify-center gap-20'>
        <h1 className='text-4xl text-primary font-bold'>REGISTRATION</h1>
        <form onSubmit={handleRegistration} className='flex flex-col gap-6 w-9/12'>
          <label>
            <input value={first_name} className='w-full p-2 rounded bg-secondary shadow' type="text" placeholder="First name"  onChange={e => setFirstName(e.target.value)} />
          </label>
          <label>
            <input value={last_name} className='w-full p-2 rounded bg-secondary shadow' type="text" placeholder="Last name"  onChange={e => setLastName(e.target.value)} />
          </label>
          <label>
            <input value={email} className='w-full p-2 rounded bg-secondary shadow' type="email" placeholder="Email"  onChange={e => setEmail(e.target.value)} />
          </label>
          <label>
            <input value={password} className='w-full p-2 rounded bg-secondary shadow' type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
          </label>
          {isError ? <p className='text-error font-bold text-center'>{errorMessage}</p> : <p className="h-6"></p>}
          <button className='btn text-secondary w-3/12 mx-auto tracking-widest bg-primary-light hover:bg-primary-dark shadow-lg hover:shadow-xl active:shadow-lg'>Register</button>
        </form>

        <p className='text-primary text-center'>Already have an account? <Link to='/login' className='text-primary-light hover:text-primary-dark underline ml-1 tracking-wider'>Login</Link></p>
      </div>
    </section>
  )
}
export default RegistrationPage