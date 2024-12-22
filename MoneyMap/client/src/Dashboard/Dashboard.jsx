import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Layout from "../layout/Layout";
import axios from "axios";

export default function Dashboard() {
  const [totalIncome, setTotalIncome] = useState(0)
  const [totalExpenses, setTotalExpenses] = useState(0)
  const [remainingBalance, setRemainingBalance] = useState(0)

  useEffect(() => {
    const fetchTotalIncome = async () => {
      try {
        const res = await axios.get("http://localhost:5050/api/v2/income")
        if (res.data && res.data.data) {
          let total = 0;
          res.data.data.forEach(income => {
            total += +(income.amount || 0)
          });
          setTotalIncome(total)
        }
      } catch (error) {
        console.error("Failed to fetch income", error);
      }
    };

    const fetchTotalExpenses = async () => {
      try {
        const res = await axios.get("http://localhost:5050/api/v3/expenses");
        if(res.data && res.data.expenses) {
          let total = 0;
          res.data.expenses.forEach(expense => {
            total += parseFloat(expense.amount || 0)
          })
          setTotalExpenses(total);
        }
      } catch (error) {
        console.error("Failed to fetch expenses", error);
      }
    };

    fetchTotalIncome()
    fetchTotalExpenses()
  }, [])

  useEffect(() =>{
    setRemainingBalance(totalIncome - totalExpenses)
  }, [totalIncome, totalExpenses])

  return (
    <Layout>
      <div className="row">
        {/* remaining balance card */}
        <div className="col-sm-12 mb-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">REMAINING BALANCE</h5>
              <p className="card-text">Remaining Balance: ${remainingBalance}</p>
            </div>
          </div>
        </div>

        {/* total income and expenses card */}
        <div className="col-sm-6 mb-3 mb-sm-0">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">ALL INCOME</h5>
              <p className="card-text">Total Income: ${totalIncome}</p>
              <NavLink to="/income" className="btn btn-primary">
                Add Income
              </NavLink>
            </div>
          </div>
        </div>

        <div className="col-sm-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">TOTAL EXPENSES</h5>
              <p className="card-text">Total Expenses: ${totalExpenses}</p>
              <NavLink to="/expenses" className="btn btn-primary">
                Add Expenses
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
