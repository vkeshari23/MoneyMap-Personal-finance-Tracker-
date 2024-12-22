import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Layout from "../layout/Layout";
import axios from "axios";

export default function Expenses() {
  const [data, setData] = useState({
    amount: "",
    description: "",
    category: "",
    date: "",
  })

  const [expenses, setExpenses] = useState([]);
  const [totalExpenses, setTotalExpenses] = useState(0)

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const fetchExpenses = async () => {
    try {
      const res = await axios.get("https://moneymap-personal-finance-tracker-4.onrender.com/api/v3/expenses");
      if (res.data && res.data.expenses) {
        setExpenses(res.data.expenses);
        calculateTotal(res.data.expenses)
      }
    } catch (error) {
      toast.error("Failed to fetch expenses", { autoClose: 1000, position: "top-center" });
      console.log(error);
    }
  }

  const calculateTotal = (expenses) => {
    const total = expenses.reduce((acc, expense) => acc + parseFloat(expense.amount || 0), 0)
    setTotalExpenses(total)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!data.amount || !data.date) {
      toast.error("Amount and Date are required!", { autoClose: 1000 });
      return;
    }
    try {
      const res = await axios.post("https://moneymap-personal-finance-tracker-4.onrender.com/api/v3/expenses", data)
      if (res.data) {
        toast.success(res?.data?.message, { autoClose: 1000, position: "top-center" })
        fetchExpenses()
        setData({ amount: "", description: "", category: "", date: "" })
      }
      else{
        toast.error(res?.data?.message, { autoClose: 1000 })
      }
    } catch (error) {
      toast.error("Something Went Wrong", { autoClose: 1000, position: "top-center" });
      console.log(error);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6 mt-3 mb-3">
            <form className="bg-light p-5" onSubmit={handleSubmit}>
              <h4>Expenses</h4>

              {/* Amount */}
              <div className="form-floating mb-3">
                <input
                  type="number"
                  name="amount"
                  value={data.amount}
                  onChange={handleChange}
                  className="form-control"
                  id="floatingInput"
                  placeholder="Amount"
                />
                <label htmlFor="floatingInput">Amount</label>
              </div>

              {/* Description */}
              <div className="form-floating mb-3">
                <input
                  type="text"
                  name="description"
                  value={data.description}
                  onChange={handleChange}
                  className="form-control"
                  id="floatingInput"
                  placeholder="Description"
                />
                <label htmlFor="floatingInput">Description</label>
              </div>

              {/* Category */}
              <div className="form-floating mb-3">
                <input
                  type="text"
                  name="category"
                  value={data.category}
                  onChange={handleChange}
                  className="form-control"
                  id="floatingPassword"
                  placeholder="Category"
                />
                <label htmlFor="floatingPassword">Category</label>
              </div>

              {/* Date */}
              <div className="form-floating mb-3">
                <input
                  type="date"
                  className="form-control"
                  id="floatingInput"
                  placeholder="yy/mm/dd"
                  name="date"
                  value={data.date}
                  onChange={handleChange}
                />
                <label htmlFor="floatingInput">Date</label>
              </div>

              {/* Submit Button */}
              <div>
                <button className="btn btn-primary w-100">ADD</button>
              </div>
            </form>
          </div>
          <div className="col-md-3"></div>
        </div>

        {/* total expenses */}
        <div className="row mt-5">
          <div className="col-md-12">
            <h4>Total Expenses</h4>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Total Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{totalExpenses}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* all expenses */}
        <div className="row mt-5">
          <div className="col-md-12">
            <h4>All Expenses</h4>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>SL No.</th>
                  <th>Amount</th>
                  <th>Description</th>
                  <th>Category</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {expenses.length > 0 ? (
                  expenses.map((expense, index) => (
                    <tr key={expense._id}>
                      <td>{index + 1}</td>
                      <td>{expense.amount}</td>
                      <td>{expense.description}</td>
                      <td>{expense.category}</td>
                      <td>{expense.date}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center">
                      No expenses found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}
