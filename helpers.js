const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'your-secret-key', {
    expiresIn: '30d',
  });
};

const parseError = (error) => {
  return {
    message: error.message || 'An error occurred',
    status: error.status || 500,
  };
};

const formatExpenseResponse = (expense) => {
  return {
    id: expense._id,
    amount: expense.amount,
    category: expense.category,
    description: expense.description,
    date: expense.date,
    notes: expense.notes,
    aiCategory: expense.aiCategory,
    paymentMethod: expense.paymentMethod,
    tags: expense.tags,
    createdAt: expense.createdAt,
  };
};

module.exports = {
  generateToken,
  parseError,
  formatExpenseResponse,
};
