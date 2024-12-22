import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Layout from "../layout/Layout";
import axios from "axios";

export default function Income() {
  const [data, setData] = useState({
    amount: "",
    description: "",
    date: "",
  });
  const [incomeList, setIncomeList] = useState([])
  const [totalIncome, setTotalIncome] = useState(0)

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  };

  const fetchIncome = async () => {
    try {
      const res = await axios.get("https://moneymap-personal-finance-tracker-4.onrender.com/api/v2/income")
      if (res.data && res.data.data) {
        setIncomeList(res.data.data)
        calculateTotal(res.data.data)
      }
    } catch (error) {
      toast.error("Failed to fetch income",{autoClose:1000,position:"top-center"});
      console.error(error);
    }
  };

  const calculateTotal =(incData)=>{
    const total = incData.reduce((acc,income) => acc+ Number(income.amount || 0), 0)
    setTotalIncome(total)
  };

  const handleSubmit = async (e) =>{
    e.preventDefault();
    if (!data.amount || !data.date) {
      toast.error("Amount and Date are required!", { autoClose: 1000 });
      return;
    }

    try {
      const res = await axios.post("https://moneymap-personal-finance-tracker-4.onrender.com/api/v2/income", data);
      if(res.data){
        toast.success(res?.data?.message,{autoClose:1000,position:"top-center"});
        fetchIncome()
        setData({amount:"",description:"",date:""})
      }
      else{
        toast.error(res?.data?.message, { autoClose: 1000 })
      }
    } catch (error) {
      toast.error("Something Went Wrong", { autoClose:1000,position:"top-center"})
      console.error(error)
    }
  };

  useEffect(() => {
    fetchIncome();
  }, []);

  return (
    <Layout>
      <div className="container">
        {/* income Form */}
        <div className="row">
          <div className="col-md-6 offset-md-3 mt-3 mb-3">
            <form className="bg-light p-5" onSubmit={handleSubmit}>
              <h4>Add Income</h4>
              <div className="form-floating mb-3">
                <input
                  type="number"
                  name="amount"
                  value={data.amount}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Amount"
                />
                <label>Amount</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  name="description"
                  value={data.description}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Description"
                />
                <label>Description</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="date"
                  name="date"
                  value={data.date}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Date"
                />
                <label>Date</label>
              </div>
              <button className="btn btn-success w-100">ADD</button>
            </form>
          </div>
        </div>

        {/* display total income */}
        <div className="row mt-5">
          <div className="col-md-12">
            <h4>Total Income</h4>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Total Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{totalIncome}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* display income list */}
        <div className="row mt-5">
          <div className="col-md-12">
            <h4>All Incomes</h4>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Amount</th>
                  <th>Description</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {incomeList.length > 0 ? (
                  incomeList.map((income, index) => (
                    <tr key={income._id}>
                      <td>{index + 1}</td>
                      <td>{income.amount}</td>
                      <td>{income.description}</td>
                      <td>{income.date}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center">
                      No income records found.
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
