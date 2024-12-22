import Layout from "../../layout/Layout";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";

export default function Login() {
  // eslint-disable-next-line no-unused-vars
  const [auth, setAuth] = useAuth();
  const [user, setUser] = useState({email:"",password:""});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user.email || !user.password) {
      toast.error("Please fill all fields!", { autoClose: 1000, position: "top-center" });
      return;
    }

    try {
      const res = await axios.post(`http://localhost:5050/api/v1/login`,user)
      if(res?.data?.success){
        toast.success(res.data.message, { autoClose: 1000, position: "top-center" })
        setAuth({ user: res.data.user, token: res.data.token })
        localStorage.setItem('auth', JSON.stringify(res.data))
        setTimeout(() => {
          navigate('/dashboard')
        }, 2000)
      }
      else{
        toast.error(res?.data?.message || "Login failed!",{autoClose:1000,position:"top-center"})
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Something went wrong! Please try again.",{autoClose:1000,position:"top-center"})
    }
  };

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6 mt-5 mb-5">
            <form className="p-5 bg-light" onSubmit={handleSubmit}>
              <h4>Login Form</h4>
              <div>
                <div className="form-floating mb-3">
                  <input
                    type="email"
                    className="form-control"
                    id="floatingInput"
                    placeholder="name@example.com"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                  />
                  <label htmlFor="floatingInput">Email address</label>
                </div>
                <div className="form-floating">
                  <input
                    type="password"
                    className="form-control"
                    id="floatingPassword"
                    placeholder="Password"
                    name="password"
                    value={user.password}
                    onChange={handleChange}
                  />
                  <label htmlFor="floatingPassword">Password</label>
                </div>
                <div className="mt-3">
                  <button className="btn btn-success w-100">LOGIN</button>
                </div>
                <div className="mt-3">
                  <button className="btn btn-info w-100">FORGET PASSWORD</button>
                </div>
              </div>
            </form>
          </div>
          <div className="col-md-3"></div>
        </div>
      </div>
    </Layout>
  );
}
