import { NavLink } from "react-router-dom";

export default function Contact() {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <div className="card" style={{ width: '18rem' }}>
        <div className="card-body">
          <h5 className="card-title">Contact Us</h5>
          <h6 className="card-subtitle mb-2 text-body-secondary">Support</h6>
          <NavLink to="#" className="card-link">Support@gmail.com</NavLink>
        </div>
      </div>
    </div>
  );
}
