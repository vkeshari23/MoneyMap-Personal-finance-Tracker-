import { NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-dark text-white">
      <div className="container py-2">
        <div className="row">
          <div className="col-md-3">
            <h5>MoneyMap</h5>
            <p>Track Your All Money Expenses</p>
          </div>
          <div className="col-md-3">
            <h5>Page</h5>
            <ul className="list-unstyled">
              <li>
                <NavLink to="/" className="text-white text-decoration-none">Home</NavLink>
              </li>
              <li>
                <NavLink to="/about" className="text-white text-decoration-none">About</NavLink>
              </li>
              <li>
                <NavLink to="/contact" className="text-white text-decoration-none">Contact</NavLink>
              </li>
              <li>
                <NavLink to="/t&c" className="text-white text-decoration-none">Terms &amp; Conditions</NavLink>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="col-md-3">
            <h5>Follow Us</h5>
            <ul className="list-unstyled">
              <li>
                <NavLink to="https://facebook.com" target="_blank" className="text-white text-decoration-none">Facebook</NavLink>
              </li>
              <li>
                <NavLink to="https://twitter.com" target="_blank" className="text-white text-decoration-none">  Twitter</NavLink>
              </li>
              <li>
                <NavLink  to="https://instagram.com"  target="_blank"  className="text-white text-decoration-none">  Instagram</NavLink>
              </li>
              <li>
                <NavLink  to="https://linkedin.com"  target="_blank"  className="text-white text-decoration-none">  Linkedin</NavLink>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-md-3">
            <h5>Contact Us</h5>
            <p>
              Email:{" "}
              <NavLink to="mailto:moneymap@support.com" className="text-white text-decoration-none">MoneyMap@support.com</NavLink>
            </p>
            <p>Phone: +91-1234567890</p>
          </div>
        </div>

        <div className="text-center mt-2">
          <p className="mb-1">© 2024 Company Name MoneyMap.</p>
          <p className="mb-0">
            Created By -{" "}
            <span>Abhishek Kumar Singh</span> | <span>Shrey Bhatt</span> |{" "}
            <span>Abhishek Jeetendra Nalawade</span> | <span>Vinay Keshari</span>{" "}
            | <span>Sagar Eknath Bangade</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
