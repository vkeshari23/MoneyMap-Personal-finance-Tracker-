import { NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
export default function Nav() {
  const [auth,setAuth] = useAuth()
  // handleLogout
  const handleLogout=()=>{
    setAuth({
      ...auth,
      user:null,
      token:""
    })
    localStorage.removeItem('auth')
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container">
          <a className="navbar-brand" href="#">
          <img src="https://tse4.mm.bing.net/th?id=OIP.NrMY7uP_m2YLb4z_nitJQwHaHa&pid=Api&P=0&h=180" alt="MoneyMap Logo" width="30" height="30" />
            MoneyMap
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
          <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

              <li className="nav-item">
                <NavLink className="nav-link" to="/income">
                  Income
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/expenses">
                  Expenses
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/about">
                About
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link" to="/contact">
                  Contact
                </NavLink>
              </li>

              {!auth.user ? (
                <>
                  
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/login">
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  {/* drop down */}
                    <li className="nav-item">
                    <NavLink className="nav-link" to="/login" onClick={handleLogout}>Logout</NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
