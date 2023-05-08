import { Link } from "react-router-dom"
import Logo from "./Logo"
const Header: React.FC = () => {
  return (
    <header className="flex flex-col md:flex-row items-center justify-between bg-primary border-b-[2px] border-b-secondary shadow-lg p-6">
      <Link to='/dashboard'>
        <Logo width={250}/>
      </Link>
      <nav className="flex flex-col md:flex-row text-center md:gap-4">
        <Link className="hover:text-secondary-dark hover:cursor-pointer" to="/profile-settings">Settings</Link>
        <Link className="hover:text-secondary-dark hover:cursor-pointer" to="/logout">Logout</Link>
      </nav>
    </header>
  )
}

export default Header