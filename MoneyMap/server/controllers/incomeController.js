import incomeModel from "../models/incomeModel.js";

export const incomeController = async (req, res) => {
  try {
    const { amount, description = "No description provided", date } = req.body;

    if (!amount || !date) {
      return res.status(400).json({
        success: false,
        message: "Amount and date are required",
      });
    }

    const income = new incomeModel({ amount, description, date });
    await income.save();

    res.status(201).json({
      success: true,
      message: "Income added successfully!",
      income,
    });
  } catch (error) {
    console.error("Error while saving income:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getIncomes = async (req, res) => {
  try {
    const incomes = await incomeModel.find();

    res.status(200).json({
      success: true,
      message: "Incomes retrieved successfully",
      data: incomes,
    });
  } catch (error) {
    console.error("Error while fetching incomes:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
