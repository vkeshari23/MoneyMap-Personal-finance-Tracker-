import { BrowserRouter,Routes,Route } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import Registeration from "./pages/auth/Registration"
import Login from "./pages/auth/Login"
import Expenses from "./Expenses/Expenses"
import Income from "./Income/Income"
import Dashboard from "./Dashboard/Dashboard"
import About from "./pages/About"
import Contact from "./pages/Contact"
import PageNotFound from "./pages/PageNotFound"
import TNC from "./pages/TNC"

function App() {

  return (
    <>
    <ToastContainer/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Registeration/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/expenses" element={<Expenses/>}/>
          <Route path="/income" element={<Income/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="about" element={<About/>}/>
          <Route path="contact" element={<Contact/>}/>
          <Route path="*" element={<PageNotFound/>}/>
          <Route path="t&c" element={<TNC/>}/>

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App