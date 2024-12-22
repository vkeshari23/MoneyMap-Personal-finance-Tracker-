import expensesModel from '../models/expensesModel.js';

export const expensesController = async (req, res) => {
  try {
    const { amount, description, category, date } = req.body;

    if (!amount || !date) {
      return res.status(400).json({
        success: false,
        message: "Amount and date are required",
      });
    }

    const expense = new expensesModel({ amount, description, category, date });
    await expense.save();

    res.status(201).json({
      success: true,
      message: "Expense added successfully!",
      expense,
    });
  } catch (error) {
    console.error("Error while saving expense:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getexpensesController = async (req, res) => {
  try {
    const expenses = await expensesModel.find();

    res.status(200).send({
      success: true,
      message: "Expenses fetched successfully!",
      expenses,
    });
  } catch (error) {
    console.error("Error while fetching expenses:", error);
    res.status(500).send({
      success: false,
      message: "Error in fetching expenses",
      error: error.message,
    });
  }
};
