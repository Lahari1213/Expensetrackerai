<<<<<<< HEAD
# ExpenseAI - AI-Powered Expense Tracker

A production-ready, full-stack expense tracking application with artificial intelligence-driven insights, smart categorization, and predictive analytics.

## 🚀 Features

### Core Features
- **User Authentication**: Secure JWT-based authentication with email/password registration and login
- **Dashboard**: Real-time overview of expenses with monthly summary
- **Expense Management**: 
  - Add, edit, delete expenses
  - Categorize by: Food, Rent, Travel, Shopping, Bills, Entertainment, Healthcare, Education
  - Attach notes, payment methods, and tags
  - Support for multiple currencies (USD, INR, EUR, GBP)

### AI Features
- **Smart Categorization**: Auto-categorize expenses based on description using OpenAI
- **Spending Summary**: Natural language monthly spending analysis
- **Smart Alerts**: Real-time overspending notifications by category
- **Cost Reduction Suggestions**: AI-powered tips to reduce expenses
- **Expense Predictions**: Predict next month's spending based on historical data

### Analytics
- **Visual Charts**: 
  - Pie charts for category breakdown
  - Bar charts for yearly trends
  - Interactive analytics dashboard
- **Monthly & Yearly Reports**: Detailed expense breakdowns
- **Budget Tracking**: Set and monitor monthly budgets by category

### UI/UX
- **Dark/Light Mode**: Toggle between themes with persistent storage
- **Mobile-First Design**: Fully responsive on all devices
- **Smooth Animations**: Fade-in and slide-up transitions
- **Modern UI**: Clean, minimal design with Tailwind CSS

## 🛠️ Tech Stack

### Frontend
- **React 18**: UI library
- **React Router**: Client-side routing
- **Tailwind CSS**: Styling
- **Recharts**: Data visualization
- **Axios**: HTTP client

### Backend
- **Node.js & Express**: Server framework
- **MongoDB & Mongoose**: Database and ODM
- **JWT**: Authentication
- **bcryptjs**: Password hashing
- **OpenAI API**: AI features

### Tools & Libraries
- **Nodemon**: Development auto-reload
- **Cors**: Cross-origin resource sharing
- **Dotenv**: Environment configuration

## 📋 Prerequisites

- Node.js >= 16.0.0
- npm >= 8.0.0
- MongoDB (local or cloud - MongoDB Atlas)
- OpenAI API Key

## 🚀 Installation

### 1. Clone or Download the Repository
```bash
cd ExpenseTrackerAI
```

### 2. Install Dependencies
```bash
npm run install:all
```

This installs dependencies for the root, server, and client.

### 3. Environment Configuration

#### Backend (.env)
Create `server/.env`:
```env
MONGODB_URI=mongodb://localhost:27017/expense-tracker
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
OPENAI_API_KEY=sk-your-openai-api-key-here
PORT=5000
NODE_ENV=development
```

**For MongoDB:**
- Local: Use the default URI above with local MongoDB
- Cloud: Use MongoDB Atlas connection string

**For OpenAI API:**
1. Go to https://platform.openai.com/api-keys
2. Create a new API key
3. Add to `.env` file

## 🏃 Running the Application

### Development Mode (Concurrent)
```bash
npm run dev
```
This runs both frontend and backend simultaneously.

### Individual Services

**Terminal 1 - Backend:**
```bash
npm run server
```
Starts on http://localhost:5000

**Terminal 2 - Frontend:**
```bash
npm run client
```
Starts on http://localhost:3000

## 🎯 Usage

### First Time Setup
1. Open http://localhost:3000
2. Click "Register" to create an account
3. Enter your details and set a monthly budget
4. Start adding expenses!

### Adding Expenses
1. Click "Add Expense" button
2. Fill in amount, category, description, and date
3. Optionally add payment method, notes, and tags
4. Save to record expense

### Viewing Analytics
- Switch between months/years using dropdown selectors
- View "Overview" tab for charts and statistics
- Check "AI Insights" tab for intelligent recommendations

### AI Features
- **Automatic Categorization**: Leave category blank, AI will categorize
- **Spending Summary**: Review monthly AI-generated summaries
- **Smart Alerts**: Get notified when approaching budget limits
- **Predictions**: See predicted next month expenses
- **Suggestions**: Get AI tips for reducing spending

## 📁 Project Structure

```
ExpenseTrackerAI/
├── client/                          # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/             # Reusable React components
│   │   ├── context/                # Auth & Theme contexts
│   │   ├── pages/                  # Page components
│   │   ├── services/               # API service calls
│   │   ├── App.jsx                 # Main app component
│   │   ├── index.js                # React DOM entry
│   │   └── index.css               # Global styles
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── package.json
├── server/                          # Node.js backend
│   ├── src/
│   │   ├── controllers/            # Business logic
│   │   ├── middleware/             # Authentication middleware
│   │   ├── models/                 # MongoDB schemas
│   │   ├── routes/                 # API endpoints
│   │   ├── utils/                  # Helper functions & AI service
│   │   └── server.js               # Express server entry
│   ├── .env.example
│   └── package.json
└── package.json                    # Root package file
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update profile

### Expenses
- `GET /api/expenses` - Get all expenses (with filters)
- `GET /api/expenses/:id` - Get single expense
- `POST /api/expenses` - Create expense
- `PUT /api/expenses/:id` - Update expense
- `DELETE /api/expenses/:id` - Delete expense

### Analytics
- `GET /api/analytics/monthly` - Monthly analytics
- `GET /api/analytics/yearly` - Yearly analytics
- `GET /api/analytics/category/:category` - Category analytics

### AI Features
- `GET /api/ai/spending-summary` - Monthly summary
- `GET /api/ai/suggestions` - Cost saving suggestions
- `GET /api/ai/predictions` - Next month predictions
- `POST /api/ai/check-alerts` - Check spending alerts

### Budget
- `GET /api/budget/monthly` - Get monthly budget
- `PUT /api/budget/:id` - Update budget

## 🎨 Features in Detail

### 1. Smart Categorization
When adding an expense without selecting a category, the AI automatically categorizes it based on the description using OpenAI's GPT model.

### 2. Monthly Spending Summary
Generates a natural language summary comparing current month with previous month, highlighting spending patterns and changes.

### 3. Intelligent Alerts
- Tracks spending across all categories
- Alerts when overall budget usage exceeds 60% (warning) or 80% (danger)
- Per-category alerts for overspending
- Visual indication with warning levels

### 4. Cost Reduction Suggestions
- Analyzes spending patterns
- Provides 3-4 actionable recommendations
- Based on category-wise breakdowns
- AI-generated practical tips

### 5. Expense Predictions
- Analyzes last 3 months of data
- Predicts next month's spending by category
- Provides trend analysis and insights

### 6. Visual Analytics
- **Pie Chart**: Category-wise spending distribution
- **Bar Chart**: Yearly spending trends by month
- **Summary Cards**: Quick stats (total, budget, remaining, average)

## 🔐 Security

- **Password Hashing**: bcryptjs with salt rounds
- **JWT Tokens**: Secure token-based authentication
- **Protected Routes**: Authorization middleware on all sensitive endpoints
- **CORS**: Cross-origin requests configured
- **Environment Variables**: Sensitive data in .env files

## 🚀 Deployment

### Backend Deployment (Heroku)
```bash
# Initialize git in server directory
cd server
git init
echo "node_modules/\n.env" > .gitignore

# Deploy to Heroku
heroku create your-app-name
heroku config:set MONGODB_URI=your-mongodb-uri
heroku config:set JWT_SECRET=your-secret
heroku config:set OPENAI_API_KEY=your-openai-key
git push heroku main
```

### Frontend Deployment (Vercel)
```bash
cd client
npm install -g vercel
vercel
```

Update API endpoint in `client/src/services/api.js` after deployment.

## 📊 Database Schema

### User Model
- name, email, password
- monthlyBudget, currency
- theme (dark/light), emailNotifications
- timestamps

### Expense Model
- userId (ref: User)
- amount, category, description
- date, notes
- paymentMethod, tags
- aiCategory, isRecurring
- timestamps

### Budget Model
- userId, month
- totalBudget, categoryBudgets
- alerts tracking
- timestamps

## 🐛 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running locally or use MongoDB Atlas
- Check connection string in `.env`
- Verify network access if using MongoDB Atlas

### OpenAI API Error
- Verify API key is valid
- Check API usage and billing
- Ensure API key has proper permissions

### Port Already in Use
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :5000
kill -9 <PID>
```

### CORS Issues
- Backend is configured with CORS enabled
- Frontend proxy in package.json points to backend
- Ensure both services are running

## 📝 Environment Variables

### Required for Backend
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT signing
- `OPENAI_API_KEY` - OpenAI API key
- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Environment (development/production)

## 💡 Future Enhancements

- [ ] Google OAuth login
- [ ] Export expenses as PDF/CSV
- [ ] Recurring expense automation
- [ ] Receipt image upload and OCR
- [ ] Multi-currency support with exchange rates
- [ ] Mobile app (React Native)
- [ ] Email notifications
- [ ] Budget collaboration (shared budgets)
- [ ] Advanced filtering and search
- [ ] Spending goals with progress tracking

## 📄 License

MIT License

## 🤝 Contributing

Contributions are welcome! Feel free to submit pull requests or open issues.

## 📞 Support

For issues or questions, please create an issue in the repository.

---

**Built with ❤️ for smarter expense management**
=======
# ExpenseTrackerAI
>>>>>>> main
