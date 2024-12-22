import { NavLink } from "react-router-dom";

export default function About() {
  return (
    <div>
    
      <div className="card">
        <div className="card-header">
          About MoneyMap
        </div>
        <div className="card-body">
          <h5 className="card-title">MoneyMap</h5>
          <p className="card-text">The Money Tracker App is designed to help users manage their finances by tracking their income, expenses, and remaining balance. 
            With a user-friendly interface, the app allows users to easily input and categorize their earnings and expenditures, providing a clear overview of their financial situation.
            The app also offers insights into spending habits and helps users set budgets to stay on track. Whether you are saving for a specific goal or just looking to keep your finances in check, this app gives you the tools you need for effective money management.</p>
          <NavLink to="/dashboard" className="btn btn-primary">Visit Dashboard</NavLink>
        </div>
      </div>

    </div>
  )
}
