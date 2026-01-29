const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'sk-test-key',
});

// Categorize expense based on description
const categorizeExpense = async (description) => {
  try {
    const message = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are an expense categorization assistant. Categorize the following expense into one of these categories: Food, Rent, Travel, Shopping, Bills, Entertainment, Healthcare, Education, Others. Respond with only the category name.',
        },
        {
          role: 'user',
          content: description,
        },
      ],
      max_tokens: 50,
    });
    
    return message.choices[0].message.content.trim();
  } catch (error) {
    console.error('Categorization error:', error);
    return 'Others';
  }
};

// Generate monthly spending summary
const generateSpendingSummary = async (expenses, previousMonthExpenses) => {
  try {
    const totalCurrent = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    const totalPrevious = previousMonthExpenses.reduce((sum, exp) => sum + exp.amount, 0);
    const percentageChange = totalPrevious ? ((totalCurrent - totalPrevious) / totalPrevious * 100).toFixed(2) : 0;
    
    const categorySpending = {};
    expenses.forEach(exp => {
      categorySpending[exp.category] = (categorySpending[exp.category] || 0) + exp.amount;
    });
    
    const topCategory = Object.entries(categorySpending).sort((a, b) => b[1] - a[1])[0];
    
    // Fallback response if OpenAI fails
    if (totalCurrent > 0) {
      const change = percentageChange > 0 ? `increased by ${percentageChange}%` : percentageChange < 0 ? `decreased by ${Math.abs(percentageChange)}%` : 'remained similar';
      const topCat = topCategory ? `${topCategory[0]} (${topCategory[1]})` : 'various categories';
      return `You spent $${totalCurrent.toFixed(2)} this month, which ${change} compared to last month. Your highest spending category is ${topCat}.`;
    }
    
    const expenseSummary = Object.entries(categorySpending)
      .map(([cat, amount]) => `${cat}: ${amount}`)
      .join(', ');
    
    const prompt = `Based on this expense data:
    Total spent this month: ${totalCurrent}
    Previous month: ${totalPrevious}
    Spending by category: ${expenseSummary}
    Percentage change: ${percentageChange}%
    
    Generate a natural language summary of the spending patterns in 2-3 sentences. Be concise and insightful.`;
    
    const message = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a financial advisor. Provide concise, insightful spending summaries.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      max_tokens: 150,
    });
    
    return message.choices[0].message.content.trim();
  } catch (error) {
    console.error('Summary generation error:', error);
    // Fallback response
    const totalCurrent = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    const totalPrevious = previousMonthExpenses.reduce((sum, exp) => sum + exp.amount, 0);
    const percentageChange = totalPrevious ? ((totalCurrent - totalPrevious) / totalPrevious * 100).toFixed(2) : 0;
    const change = percentageChange > 0 ? `increased by ${percentageChange}%` : percentageChange < 0 ? `decreased by ${Math.abs(percentageChange)}%` : 'remained similar';
    return `You spent $${totalCurrent.toFixed(2)} this month, which ${change} compared to last month.`;
  }
};

// Generate cost-saving suggestions
const generateSavingSuggestions = async (expenses, monthlyBudget) => {
  try {
    const categorySpending = {};
    expenses.forEach(exp => {
      categorySpending[exp.category] = (categorySpending[exp.category] || 0) + exp.amount;
    });
    
    const totalSpent = Object.values(categorySpending).reduce((a, b) => a + b, 0);
    const budgetUtilization = ((totalSpent / monthlyBudget) * 100).toFixed(2);
    
    const topSpend = Object.entries(categorySpending).sort((a, b) => b[1] - a[1])[0];
    
    // Fallback response
    if (totalSpent > 0) {
      const savings = (monthlyBudget - totalSpent).toFixed(2);
      const topCategory = topSpend ? topSpend[0] : 'expenses';
      return `You've used ${budgetUtilization}% of your budget. Your highest spending is in ${topCategory}. Try setting a limit on this category and review unnecessary subscriptions to save money.`;
    }
    
    const prompt = `Based on this spending data:
    Monthly budget: ${monthlyBudget}
    Total spent: ${totalSpent}
    Budget utilization: ${budgetUtilization}%
    Spending by category: ${JSON.stringify(categorySpending, null, 2)}
    
    Provide 3-4 specific, actionable suggestions to reduce expenses. Be practical and realistic.`;
    
    const message = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a personal finance expert. Provide practical money-saving advice.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      max_tokens: 200,
    });
    
    return message.choices[0].message.content.trim();
  } catch (error) {
    console.error('Suggestion generation error:', error);
    // Fallback response
    const categorySpending = {};
    expenses.forEach(exp => {
      categorySpending[exp.category] = (categorySpending[exp.category] || 0) + exp.amount;
    });
    const totalSpent = Object.values(categorySpending).reduce((a, b) => a + b, 0);
    const topSpend = Object.entries(categorySpending).sort((a, b) => b[1] - a[1])[0];
    const topCategory = topSpend ? topSpend[0] : 'expenses';
    return `Consider reducing spending in ${topCategory}. Review your subscriptions and look for ways to cut unnecessary costs in high-spending categories.`;
  }
};

// Predict next month's expenses
const predictNextMonthExpenses = async (expenses, months = 3) => {
  try {
    const categoryTrends = {};
    const categoryMonths = {};
    
    expenses.forEach(exp => {
      if (!categoryTrends[exp.category]) {
        categoryTrends[exp.category] = [];
        categoryMonths[exp.category] = [];
      }
      categoryTrends[exp.category].push(exp.amount);
      categoryMonths[exp.category].push(new Date(exp.date).toISOString().slice(0, 7));
    });
    
    const predictions = {};
    for (const [category, amounts] of Object.entries(categoryTrends)) {
      const average = amounts.reduce((a, b) => a + b, 0) / amounts.length;
      predictions[category] = Math.round(average * 100) / 100;
    }
    
    const prompt = `Based on these average monthly expenses by category: ${JSON.stringify(predictions)}
    Predict the next month's expenses and provide insights on potential trends. Keep it concise.`;
    
    const message = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a financial analyst. Predict future expenses based on historical data.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      max_tokens: 150,
    });
    
    return {
      predictions,
      analysis: message.choices[0].message.content.trim(),
    };
  } catch (error) {
    console.error('Prediction error:', error);
    // Fallback prediction
    const categoryTrends = {};
    expenses.forEach(exp => {
      if (!categoryTrends[exp.category]) {
        categoryTrends[exp.category] = [];
      }
      categoryTrends[exp.category].push(exp.amount);
    });
    
    const predictions = {};
    for (const [category, amounts] of Object.entries(categoryTrends)) {
      const average = amounts.reduce((a, b) => a + b, 0) / amounts.length;
      predictions[category] = Math.round(average * 100) / 100;
    }
    
    const totalAvg = Object.values(predictions).reduce((a, b) => a + b, 0);
    return { 
      predictions,
      analysis: `Based on your spending trends, expect to spend approximately $${totalAvg.toFixed(2)} next month. Maintain consistent budgeting to stay on track.`
    };
  }
};

module.exports = {
  categorizeExpense,
  generateSpendingSummary,
  generateSavingSuggestions,
  predictNextMonthExpenses,
};
