# API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
All protected endpoints require:
```
Authorization: Bearer <JWT_TOKEN>
```

---

## 🔐 Authentication Endpoints

### Register User
**POST** `/auth/register`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123",
  "monthlyBudget": 5000,
  "currency": "USD"
}
```

**Response (201):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "63f7a1b2c3d4e5f6g7h8",
    "name": "John Doe",
    "email": "john@example.com",
    "monthlyBudget": 5000,
    "currency": "USD"
  }
}
```

---

### Login User
**POST** `/auth/login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "63f7a1b2c3d4e5f6g7h8",
    "name": "John Doe",
    "email": "john@example.com",
    "monthlyBudget": 5000,
    "currency": "USD",
    "theme": "light"
  }
}
```

---

### Get Current User
**GET** `/auth/me`

**Headers:** `Authorization: Bearer <TOKEN>`

**Response (200):**
```json
{
  "id": "63f7a1b2c3d4e5f6g7h8",
  "name": "John Doe",
  "email": "john@example.com",
  "monthlyBudget": 5000,
  "currency": "USD",
  "theme": "light"
}
```

---

### Update Profile
**PUT** `/auth/profile`

**Headers:** `Authorization: Bearer <TOKEN>`

**Request Body:**
```json
{
  "name": "Jane Doe",
  "monthlyBudget": 6000,
  "currency": "EUR",
  "theme": "dark",
  "emailNotifications": true
}
```

**Response (200):**
```json
{
  "id": "63f7a1b2c3d4e5f6g7h8",
  "name": "Jane Doe",
  "email": "john@example.com",
  "monthlyBudget": 6000,
  "currency": "EUR",
  "theme": "dark"
}
```

---

## 💰 Expense Endpoints

### Get All Expenses
**GET** `/expenses`

**Headers:** `Authorization: Bearer <TOKEN>`

**Query Parameters:**
- `month` (optional): 1-12
- `year` (optional): YYYY
- `category` (optional): Food, Rent, Travel, Shopping, Bills, Entertainment, Healthcare, Education, Others

**Example:**
```
GET /expenses?month=1&year=2024&category=Food
```

**Response (200):**
```json
[
  {
    "_id": "63f7a1b2c3d4e5f6g7h8",
    "userId": "63f7a1b2c3d4e5f6g7h9",
    "amount": 50,
    "category": "Food",
    "description": "Lunch at cafe",
    "date": "2024-01-15T12:30:00.000Z",
    "notes": "Great lunch",
    "aiCategory": "Food",
    "paymentMethod": "Cash",
    "tags": ["lunch", "cafe"],
    "createdAt": "2024-01-15T12:35:00.000Z",
    "updatedAt": "2024-01-15T12:35:00.000Z"
  }
]
```

---

### Get Single Expense
**GET** `/expenses/:id`

**Headers:** `Authorization: Bearer <TOKEN>`

**Response (200):**
```json
{
  "_id": "63f7a1b2c3d4e5f6g7h8",
  "userId": "63f7a1b2c3d4e5f6g7h9",
  "amount": 50,
  "category": "Food",
  "description": "Lunch at cafe",
  "date": "2024-01-15T12:30:00.000Z",
  "notes": "Great lunch",
  "aiCategory": "Food",
  "paymentMethod": "Cash",
  "tags": ["lunch", "cafe"],
  "createdAt": "2024-01-15T12:35:00.000Z"
}
```

---

### Create Expense
**POST** `/expenses`

**Headers:** `Authorization: Bearer <TOKEN>`

**Request Body:**
```json
{
  "amount": 50,
  "category": "Food",
  "description": "Lunch at cafe",
  "date": "2024-01-15",
  "notes": "Great lunch",
  "paymentMethod": "Cash",
  "tags": ["lunch", "cafe"]
}
```

**Notes:**
- `category` is optional - if not provided, AI will categorize
- `date` defaults to today if not provided
- `paymentMethod` defaults to "Cash"
- `tags` can be an array of strings

**Response (201):**
```json
{
  "_id": "63f7a1b2c3d4e5f6g7h8",
  "userId": "63f7a1b2c3d4e5f6g7h9",
  "amount": 50,
  "category": "Food",
  "description": "Lunch at cafe",
  "date": "2024-01-15T00:00:00.000Z",
  "notes": "Great lunch",
  "aiCategory": "Food",
  "paymentMethod": "Cash",
  "tags": ["lunch", "cafe"],
  "createdAt": "2024-01-15T12:35:00.000Z"
}
```

---

### Update Expense
**PUT** `/expenses/:id`

**Headers:** `Authorization: Bearer <TOKEN>`

**Request Body:**
```json
{
  "amount": 60,
  "category": "Food",
  "description": "Lunch and dessert",
  "notes": "Excellent lunch!"
}
```

**Response (200):**
```json
{
  "_id": "63f7a1b2c3d4e5f6g7h8",
  "userId": "63f7a1b2c3d4e5f6g7h9",
  "amount": 60,
  "category": "Food",
  "description": "Lunch and dessert",
  "date": "2024-01-15T00:00:00.000Z",
  "notes": "Excellent lunch!",
  "paymentMethod": "Cash",
  "tags": ["lunch", "cafe"],
  "updatedAt": "2024-01-15T13:00:00.000Z"
}
```

---

### Delete Expense
**DELETE** `/expenses/:id`

**Headers:** `Authorization: Bearer <TOKEN>`

**Response (200):**
```json
{
  "message": "Expense deleted successfully"
}
```

---

## 📊 Analytics Endpoints

### Get Monthly Analytics
**GET** `/analytics/monthly`

**Headers:** `Authorization: Bearer <TOKEN>`

**Query Parameters:**
- `month` (optional): 1-12, defaults to current month
- `year` (optional): YYYY, defaults to current year

**Response (200):**
```json
{
  "month": 1,
  "year": 2024,
  "totalExpenses": 2500,
  "remainingBudget": 2500,
  "monthlyBudget": 5000,
  "categoryWiseSpending": {
    "Food": 400,
    "Rent": 1200,
    "Travel": 150,
    "Shopping": 200,
    "Bills": 300,
    "Entertainment": 100,
    "Healthcare": 50,
    "Education": 0,
    "Others": 100
  },
  "expenseCount": 25,
  "averageExpense": "100.00"
}
```

---

### Get Yearly Analytics
**GET** `/analytics/yearly`

**Headers:** `Authorization: Bearer <TOKEN>`

**Query Parameters:**
- `year` (optional): YYYY, defaults to current year

**Response (200):**
```json
{
  "year": 2024,
  "totalExpenses": 30000,
  "monthlyBreakdown": {
    "1": 2500,
    "2": 2400,
    "3": 2600,
    "4": 2500,
    "5": 2450,
    "6": 2550,
    "7": 2500,
    "8": 2500,
    "9": 2400,
    "10": 2500,
    "11": 2450,
    "12": 2550
  },
  "categoryBreakdown": {
    "Food": 4500,
    "Rent": 14400,
    "Travel": 1800,
    "Shopping": 2400,
    "Bills": 3600,
    "Entertainment": 1200,
    "Healthcare": 600,
    "Education": 300,
    "Others": 1200
  },
  "averageMonthly": "2500.00",
  "expenseCount": 300
}
```

---

### Get Category Analytics
**GET** `/analytics/category/:category`

**Headers:** `Authorization: Bearer <TOKEN>`

**Query Parameters:**
- `month` (optional): 1-12
- `year` (optional): YYYY

**Response (200):**
```json
{
  "category": "Food",
  "totalExpense": 400,
  "count": 12,
  "average": "33.33",
  "expenses": [
    {
      "_id": "63f7a1b2c3d4e5f6g7h8",
      "amount": 50,
      "description": "Lunch",
      "date": "2024-01-15T12:30:00.000Z"
    }
  ]
}
```

---

## 🤖 AI Features Endpoints

### Get Spending Summary
**GET** `/ai/spending-summary`

**Headers:** `Authorization: Bearer <TOKEN>`

**Response (200):**
```json
{
  "summary": "You spent 18% more on food this month compared to last month. Overall spending increased by 5%. Your shopping expenses have tripled.",
  "currentMonth": 1,
  "year": 2024
}
```

---

### Get Spending Suggestions
**GET** `/ai/suggestions`

**Headers:** `Authorization: Bearer <TOKEN>`

**Response (200):**
```json
{
  "suggestions": "1. Consider meal planning to reduce food spending by 15-20%.\n2. Look for discounts on your entertainment subscriptions.\n3. Review your travel patterns - carpooling could save 30%.\n4. Set specific budget limits for each category to maintain control.",
  "month": 1,
  "year": 2024
}
```

---

### Get Predictions
**GET** `/ai/predictions`

**Headers:** `Authorization: Bearer <TOKEN>`

**Response (200):**
```json
{
  "predictions": {
    "Food": 400,
    "Rent": 1200,
    "Travel": 150,
    "Shopping": 200,
    "Bills": 300,
    "Entertainment": 100,
    "Healthcare": 50,
    "Education": 25,
    "Others": 100
  },
  "analysis": "Based on your spending patterns over the last 3 months, we predict your next month spending will be around 2500. Food and entertainment show slight upward trends.",
  "nextMonth": 2
}
```

---

### Check Alerts
**POST** `/ai/check-alerts`

**Headers:** `Authorization: Bearer <TOKEN>`

**Response (200):**
```json
{
  "alerts": [
    {
      "level": "warning",
      "message": "You've spent 72.5% of your monthly budget.",
      "category": "Overall"
    },
    {
      "level": "danger",
      "message": "Food spending exceeded budget by 25%",
      "category": "Food"
    }
  ],
  "budgetUsage": "72.50"
}
```

**Alert Levels:**
- `warning`: 60-80% of budget
- `danger`: >80% of budget

---

## 💾 Budget Endpoints

### Get Monthly Budget
**GET** `/budget/monthly`

**Headers:** `Authorization: Bearer <TOKEN>`

**Query Parameters:**
- `month` (optional): 1-12
- `year` (optional): YYYY

**Response (200):**
```json
{
  "_id": "63f7a1b2c3d4e5f6g7h8",
  "userId": "63f7a1b2c3d4e5f6g7h9",
  "month": "2024-01-01T00:00:00.000Z",
  "totalBudget": 5000,
  "categoryBudgets": {
    "Food": 1500,
    "Rent": 1250,
    "Travel": 750,
    "Shopping": 750,
    "Bills": 500,
    "Entertainment": 250,
    "Healthcare": 250,
    "Education": 250,
    "Others": 500
  },
  "alerts": [],
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

---

### Update Budget
**PUT** `/budget/:id`

**Headers:** `Authorization: Bearer <TOKEN>`

**Request Body:**
```json
{
  "totalBudget": 6000,
  "categoryBudgets": {
    "Food": 1800,
    "Rent": 1500,
    "Travel": 900,
    "Shopping": 900,
    "Bills": 600,
    "Entertainment": 300,
    "Healthcare": 300,
    "Education": 300,
    "Others": 600
  }
}
```

**Response (200):**
```json
{
  "_id": "63f7a1b2c3d4e5f6g7h8",
  "userId": "63f7a1b2c3d4e5f6g7h9",
  "month": "2024-01-01T00:00:00.000Z",
  "totalBudget": 6000,
  "categoryBudgets": {
    "Food": 1800,
    "Rent": 1500,
    "Travel": 900,
    "Shopping": 900,
    "Bills": 600,
    "Entertainment": 300,
    "Healthcare": 300,
    "Education": 300,
    "Others": 600
  },
  "updatedAt": "2024-01-15T13:00:00.000Z"
}
```

---

## 🔍 Error Responses

### 400 Bad Request
```json
{
  "error": "Please provide all required fields"
}
```

### 401 Unauthorized
```json
{
  "error": "Not authorized to access this route"
}
```

### 403 Forbidden
```json
{
  "error": "Not authorized to access this expense"
}
```

### 404 Not Found
```json
{
  "error": "Expense not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal Server Error"
}
```

---

## 📝 Categories

Valid expense categories:
- `Food`
- `Rent`
- `Travel`
- `Shopping`
- `Bills`
- `Entertainment`
- `Healthcare`
- `Education`
- `Others`

---

## 💵 Currencies

Supported currencies:
- `USD` - US Dollar
- `INR` - Indian Rupee
- `EUR` - Euro
- `GBP` - British Pound

---

## 🔧 Example Requests

### Using cURL

**Register:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "monthlyBudget": 5000,
    "currency": "USD"
  }'
```

**Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

**Create Expense:**
```bash
curl -X POST http://localhost:5000/api/expenses \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "amount": 50,
    "category": "Food",
    "description": "Lunch",
    "date": "2024-01-15"
  }'
```

---

## ⚡ Rate Limiting

Currently no rate limiting implemented. For production, add:
- 100 requests per minute per IP
- 1000 requests per hour per user

---

## 📚 Pagination

Currently no pagination implemented. Consider adding for:
- Large expense lists
- Analytics data

---

**API Documentation v1.0** ✨
