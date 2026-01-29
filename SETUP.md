# ExpenseAI - Setup & Installation Guide

## Quick Start

### 1. Prerequisites
- Node.js 16+ installed
- npm 8+ installed
- MongoDB account (local or MongoDB Atlas)
- OpenAI API account

### 2. Clone/Download Project
```bash
cd ExpenseTrackerAI
```

### 3. Install All Dependencies
```bash
npm run install:all
```

### 4. Environment Setup

#### Backend Configuration
Create `server/.env`:
```env
MONGODB_URI=mongodb://localhost:27017/expense-tracker
JWT_SECRET=your-super-secret-key-change-this
OPENAI_API_KEY=sk-your-key-here
PORT=5000
NODE_ENV=development
```

#### MongoDB Setup Options

**Option A: Local MongoDB**
1. Install MongoDB Community Edition
2. Start MongoDB service
3. Use default URI in `.env`

**Option B: MongoDB Atlas (Cloud)**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create cluster
4. Get connection string
5. Replace `<username>` and `<password>` in URI

**Example Atlas URI:**
```
mongodb+srv://user:password@cluster.mongodb.net/expense-tracker?retryWrites=true&w=majority
```

#### OpenAI API Setup
1. Visit https://platform.openai.com/account/api-keys
2. Create new API key
3. Copy and paste in `.env` file
4. Keep it SECRET!

### 5. Start Development Servers

```bash
# Terminal 1 - Start both simultaneously
npm run dev

# OR run separately

# Terminal 2 - Backend only
npm run server
# Runs on http://localhost:5000

# Terminal 3 - Frontend only  
npm run client
# Runs on http://localhost:3000
```

### 6. Access Application
Open browser and go to: http://localhost:3000

## First Time Usage

### Create Test Account
1. Click "Register"
2. Fill in details:
   - Name: Test User
   - Email: test@example.com
   - Password: password123
   - Monthly Budget: 5000
   - Currency: USD

3. Click "Register"
4. Redirected to Dashboard

### Add Test Expenses
1. Click "Add Expense"
2. Fill in:
   - Amount: 50
   - Category: Food
   - Description: Lunch at cafe
   - Date: Today
   - Payment: Cash

3. Click "Save"
4. Repeat for multiple expenses
5. Check Dashboard tab for analytics
6. Check AI Insights for recommendations

## Troubleshooting

### Port 5000 or 3000 Already in Use

**Windows:**
```bash
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

**Mac/Linux:**
```bash
lsof -i :5000
kill -9 <PID>
```

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution:**
- Ensure MongoDB is running
- Check MONGODB_URI in .env
- If using Atlas, check IP whitelist

### OpenAI API Error
```
Error: Invalid API Key
```
**Solution:**
- Verify API key in OpenAI dashboard
- Check billing is active
- Regenerate key if needed

### Dependencies Not Installing
```bash
# Clear cache and retry
npm cache clean --force
rm -rf node_modules package-lock.json
npm run install:all
```

### CORS Errors
```
Access-Control-Allow-Origin
```
**Solution:**
- Backend CORS is already configured
- Ensure frontend proxy in client/package.json
- Check API endpoint URL

## Build for Production

### Build Frontend
```bash
cd client
npm run build
```
Creates optimized build in `client/build/`

### Deploy Backend
See README.md for Heroku/Railway deployment

### Deploy Frontend
See README.md for Vercel/Netlify deployment

## Testing

### Test API Endpoints
Use Postman or cURL:

```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test",
    "email": "test@test.com",
    "password": "password123",
    "monthlyBudget": 5000,
    "currency": "USD"
  }'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@test.com",
    "password": "password123"
  }'

# Get Expenses (use token from login)
curl -X GET http://localhost:5000/api/expenses \
  -H "Authorization: Bearer <TOKEN>"
```

## Performance Optimization

1. **MongoDB Indexing**: Already added for common queries
2. **Frontend Optimization**: 
   - Code splitting with React Router
   - Lazy loading components
   - Optimized Recharts rendering

3. **Backend Optimization**:
   - Request/response compression with CORS
   - Database query optimization
   - JWT caching strategies

## Security Checklist

- [ ] Change JWT_SECRET before production
- [ ] Use MongoDB Atlas with IP whitelist
- [ ] Enable HTTPS on production
- [ ] Restrict OpenAI API usage limits
- [ ] Use environment variables for all secrets
- [ ] Regular dependency updates
- [ ] Input validation on all endpoints
- [ ] Rate limiting on production

## Next Steps

1. Customize branding (logo, colors)
2. Add email notifications
3. Set up Google OAuth
4. Implement PDF export
5. Deploy to production
6. Monitor with error tracking (Sentry)
7. Set up CI/CD pipeline

## Support

- Check README.md for detailed documentation
- Review API endpoints documentation
- Check browser console for errors
- Check server logs for backend errors

---

**Happy tracking! 💰**
