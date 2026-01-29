# ExpenseAI - Deployment Guide

## Backend Deployment Options

### Option 1: Heroku Deployment

**Prerequisites:**
- Heroku account (free tier available)
- Heroku CLI installed
- Git initialized

**Steps:**

1. **Install Heroku CLI**
```bash
# Download from https://devcenter.heroku.com/articles/heroku-cli
```

2. **Prepare Backend**
```bash
cd server
git init
echo "node_modules/\n.env" > .gitignore
```

3. **Create Heroku App**
```bash
heroku login
heroku create your-expense-tracker-api
```

4. **Set Environment Variables**
```bash
heroku config:set MONGODB_URI=your-mongodb-atlas-uri
heroku config:set JWT_SECRET=your-production-secret-key
heroku config:set OPENAI_API_KEY=your-openai-key
heroku config:set NODE_ENV=production
```

5. **Deploy**
```bash
git add .
git commit -m "Initial deployment"
git push heroku main
```

6. **View Logs**
```bash
heroku logs --tail
```

### Option 2: Railway Deployment

**Steps:**

1. Go to https://railway.app
2. Sign up/Login with GitHub
3. Click "New Project"
4. Select "Deploy from GitHub repo"
5. Connect your repository
6. Add environment variables in dashboard
7. Deploy automatically

### Option 3: Render Deployment

**Steps:**

1. Go to https://render.com
2. Click "New +"
3. Select "Web Service"
4. Connect GitHub repo
5. Set Build command: `npm install`
6. Set Start command: `node src/server.js`
7. Add environment variables
8. Deploy

---

## Frontend Deployment Options

### Option 1: Vercel Deployment (Recommended)

**Steps:**

1. Go to https://vercel.com
2. Sign up/Login with GitHub
3. Click "Add New..."
4. Select "Project"
5. Select your repository
6. Set root directory to `client`
7. Add environment variable:
   ```
   REACT_APP_API_URL=your-backend-url
   ```
8. Click "Deploy"

**Configure API URL:**
Update `client/src/services/api.js`:
```javascript
const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || '/api',
});
```

### Option 2: Netlify Deployment

**Steps:**

1. Go to https://netlify.com
2. Sign up/Login with GitHub
3. Click "New site from Git"
4. Select repository
5. Set build command: `npm run build`
6. Set publish directory: `build`
7. Add environment variables
8. Deploy

### Option 3: GitHub Pages (Static)

1. Go to repository settings
2. Enable GitHub Pages
3. Select main branch
4. Deploy frontend only (backend must be deployed separately)

---

## Database Deployment

### MongoDB Atlas (Recommended)

**Steps:**

1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create organization and project
4. Create cluster (M0 free tier)
5. Set up database user and password
6. Add IP address to whitelist
7. Get connection string
8. Add to backend environment variables

**Connection String Format:**
```
mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority
```

---

## Full Stack Deployment Flow

### Development → Production

1. **Backend**
   - Deploy to Heroku/Railway/Render
   - Get backend URL (e.g., https://expense-tracker-api.herokuapp.com)

2. **Database**
   - Deploy to MongoDB Atlas
   - Get MongoDB URI

3. **Frontend**
   - Set API URL to backend domain
   - Deploy to Vercel/Netlify

4. **Update Configurations**
   - Backend: Add frontend domain to CORS
   - Frontend: Update API base URL

---

## Example Deployment Architecture

```
┌─────────────────┐
│  User Browser   │
└────────┬────────┘
         │
    ┌────▼─────┐
    │  Vercel   │ (Frontend)
    │ expenseai │ https://expenseai.vercel.app
    └────┬──────┘
         │
    ┌────▼──────────┐
    │  Heroku API   │ (Backend)
    │  expense-api  │ https://expense-api.herokuapp.com
    └────┬──────────┘
         │
    ┌────▼────────────┐
    │  MongoDB Atlas  │ (Database)
    │  Cloud Cluster  │
    └─────────────────┘
```

---

## Environment Variables Checklist

### Production Backend (.env)
```env
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/expense-tracker
JWT_SECRET=change-this-to-strong-random-key-minimum-32-characters
OPENAI_API_KEY=sk-your-production-key
PORT=5000
NODE_ENV=production
```

### Production Frontend (.env.production)
```env
REACT_APP_API_URL=https://your-backend-domain.com
```

---

## Post-Deployment Tasks

### 1. Testing
- [ ] Test registration/login
- [ ] Test expense CRUD operations
- [ ] Test analytics dashboard
- [ ] Test AI features
- [ ] Test dark mode
- [ ] Test mobile responsiveness

### 2. Monitoring
- [ ] Set up error tracking (Sentry)
- [ ] Monitor API performance
- [ ] Track database queries
- [ ] Monitor frontend errors
- [ ] Set up uptime monitoring

### 3. Optimization
- [ ] Enable caching
- [ ] Optimize images
- [ ] Minify frontend code
- [ ] Add CDN for static assets
- [ ] Enable gzip compression

### 4. Security
- [ ] Enable HTTPS everywhere
- [ ] Set security headers
- [ ] Configure CORS properly
- [ ] Set up rate limiting
- [ ] Regular security updates

### 5. Scaling
- [ ] Monitor database size
- [ ] Plan for data archiving
- [ ] Consider database replication
- [ ] Load testing
- [ ] Performance optimization

---

## Troubleshooting

### Backend Won't Start
```bash
heroku logs --tail
```
Check logs for errors

### Frontend Not Connecting to Backend
- Verify backend URL in API config
- Check CORS settings on backend
- Verify environment variables
- Check network tab in browser dev tools

### Database Connection Timeout
- Check MongoDB Atlas IP whitelist
- Verify connection string
- Check network connectivity
- Review database logs

### OpenAI API Errors
- Verify API key validity
- Check API usage quotas
- Review billing status
- Check rate limits

---

## Cost Optimization

### Free Tier Services
- **Backend**: Heroku free tier (512MB RAM)
- **Database**: MongoDB Atlas free tier (512MB)
- **Frontend**: Vercel free tier (unlimited)
- **OpenAI**: Pay-as-you-go ($0.0005 per 1K tokens)

### Estimated Monthly Costs
- **Heroku Dyno**: $7-50 (upgrade from free)
- **MongoDB**: $0-10 (depends on usage)
- **Vercel**: Free
- **OpenAI**: $5-50 (depends on API calls)

**Total**: ~$12-110/month for small-medium usage

---

## Maintenance

### Regular Updates
```bash
# Update dependencies (monthly)
npm update

# Security audit
npm audit

# Check for vulnerabilities
npm audit fix
```

### Backups
- MongoDB Atlas auto-backup: Enabled by default
- Frontend: Git versioning
- Monitor backup status in MongoDB Atlas

### Performance Review
- Monthly analytics review
- Database optimization
- API performance metrics
- Frontend load time analysis

---

## Documentation

For detailed information, see:
- [README.md](../README.md) - Full documentation
- [SETUP.md](../SETUP.md) - Local setup guide
- Backend API routes in `server/src/routes/`
- Component documentation in `client/src/components/`

---

**Deployment ready! 🚀**
