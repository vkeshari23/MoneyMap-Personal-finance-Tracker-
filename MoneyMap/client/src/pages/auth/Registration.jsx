import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from 'axios'

export default function Registeration() {
  const navigate = useNavigate()
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
    mobile: "",
    address: ""
  });

  const handleChange = (e)=>{
      setData({...data,[e.target.name]:e.target.value})   
  }

  const handleSubmit = async(e)=>{
    e.preventDefault()
    try {
      // console.log(data);
     const res = await axios.post(`http://localhost:5050/api/v1/register`,data)
     if(res?.data)
      {
        toast.success(res?.data?.message,{autoClose:1000,position:"top-center"})
        setTimeout(()=>{
          navigate("/dashboard")
        },2000)
      }
      else{
        toast.error(res?.data?.message,{autoClose:1000})
      }
       
    } catch (error) {
      console.log(error);
    }
       
  }

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6 mt-3 mb-3">
            <form className="bg-light p-5" onSubmit={handleSubmit}>
              <h4>Registeration Form</h4>

              {/* name */}

              <div className="form-floating mb-3">
                <input
                  type="text"
                  name="name"
                  value={data.name}
                  onChange={handleChange}
                  className="form-control"
                  id="floatingInput"
                  placeholder="name"
                />
                <label htmlFor="floatingInput">Name</label>
              </div>

              {/* email */}

              <div className="form-floating mb-3">
                <input
                  type="email"
                  name="email"
                  value={data.email}
                  onChange={handleChange}
                  className="form-control"
                  id="floatingInput"
                  placeholder="name@example.com"
                />
                <label htmlFor="floatingInput">Email address</label>
              </div>

              {/* password */}

              <div className="form-floating mb-3">
                <input
                  type="password"
                  name="password"
                  value={data.password}
                  onChange={handleChange}
                  className="form-control"
                  id="floatingPassword"
                  placeholder="Password"
                />
                <label htmlFor="floatingPassword">Password</label>
              </div>

              {/* gender */}

              <div>
                <div className="form-check form-check-inline mb-3">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="gender"
                    value="male"
                    onChange={handleChange}
                    id="inlineRadio1"
                    defaultValue="option1"
                  />
                  <label className="form-check-label" htmlFor="inlineRadio1">Male</label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="gender"
                    value="female"
                    onChange={handleChange}
                    id="inlineRadio2"
                    defaultValue="option2"
                  />
                  <label className="form-check-label" htmlFor="inlineRadio2">
                    Female
                  </label>
                </div>
              </div>

              {/* mobile */}

              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  placeholder="mobile"
                  name="mobile"
                  value={data.mobile}
                  onChange={handleChange}
                />
                <label htmlFor="floatingInput">Mobile</label>
              </div>

              {/* address */}

              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  placeholder="address"
                  name="address"
                  value={data.address}
                  onChange={handleChange}
                />
                <label htmlFor="floatingInput">Address</label>
              </div>

              {/* button */}
              
              <div>
                <button className="btn btn-primary w-100">REGISTER</button>
                <p className="text-center mt-2">
                  Already registered! <Link to="/login">Login here</Link>
                </p>
              </div>
            </form>
          </div>
          <div className="col-md-6"></div>
        </div>
      </div>
    </>
  );
}
