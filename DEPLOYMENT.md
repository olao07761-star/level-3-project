# Deployment Guide - 6ix Gadgets

## Quick Overview
Your application has:
- **Frontend**: React + Vite (Currently on Vercel)
- **Backend**: Express.js + MongoDB
- **Database**: MongoDB Atlas (Already configured)

---

## ✅ Frontend is Already Deployed ✅

Your frontend is live at: **https://level-3-project-three.vercel.app**

No action needed for frontend - it's working!

---

## 🚀 Deploy Backend (REQUIRED TO FIX LOGIN/SIGNUP)

Your frontend needs a backend API to connect to. You have two options:

### Option 1: Deploy to Railway (RECOMMENDED - Easiest)

**Step 1:** Go to [railway.app](https://railway.app)

**Step 2:** Sign up or log in with GitHub

**Step 3:** Click "New Project" → "Deploy from GitHub repo"

**Step 4:** Select your repo: `level 3 project`

**Step 5:** Railway will automatically detect the `railway.json` file and deploy

**Step 6:** After deployment, Railway will give you a URL like: `https://level-3-project-three.railway.app`

**Step 7:** Go to your Railway project dashboard → Variables tab → Add:
```
PORT=5555
MONGO_URL=mongodb+srv://ola:ola123@cluster0.nxazcmn.mongodb.net/TestDb?appName=Cluster0
JWT_SECRET=6ixGadgets_SecretKey_2024_MernStack_Project
CORS_ORIGINS=https://level-3-project-three.vercel.app,http://localhost:5173,http://localhost:5174
```

---

### Option 2: Deploy to Render

**Step 1:** Go to [render.com](https://render.com)

**Step 2:** Sign up or log in with GitHub

**Step 3:** Click "New" → "Web Service"

**Step 4:** Select your repo

**Step 5:** Configure:
- **Name:** `6ix-gadgets-backend`
- **Environment:** `Node`
- **Build Command:** `cd Backend && npm install`
- **Start Command:** `cd Backend && node index.js`

**Step 6:** Add environment variables:
```
PORT=5555
MONGO_URL=mongodb+srv://ola:ola123@cluster0.nxazcmn.mongodb.net/TestDb?appName=Cluster0
JWT_SECRET=6ixGadgets_SecretKey_2024_MernStack_Project
CORS_ORIGINS=https://level-3-project-three.vercel.app,http://localhost:5173,http://localhost:5174
```

**Step 7:** Deploy. Get your URL like: `https://6ix-gadgets-backend.onrender.com`

---

## 🔗 Connect Frontend to Backend

After deploying backend, update your frontend:

**Step 1:** Create/edit `frontend/.env` with:
```env
VITE_API_URL=https://your-backend-url
```

Replace `https://your-backend-url` with:
- Railway: `https://level-3-project-three.railway.app`
- Render: `https://6ix-gadgets-backend.onrender.com`

**Step 2:** Push to GitHub (make sure you committed .env)

**Step 3:** Vercel will auto-redeploy your frontend

**Step 4:** Wait 2-3 minutes and test at https://level-3-project-three.vercel.app

---

## ✅ Testing Login/Signup

1. Go to https://level-3-project-three.vercel.app
2. Try signing up with:
   - Email: `test@example.com`
   - Password: `password123`
   - First Name: `Test`
   - Last Name: `User`

3. You should be redirected to dashboard immediately after signup

4. Try logging in with the same credentials - should redirect to dashboard

---

## 🐛 Troubleshooting

**Getting CORS errors?**
- Check that `CORS_ORIGINS` in backend includes your Vercel frontend URL
- Ensure backend is deployed and running

**Login not working?**
- Check browser console (F12 → Console tab) for errors
- Verify `VITE_API_URL` in frontend/.env points to correct backend
- Ensure backend environment variables are set

**Page not redirecting after login?**
- This is now fixed in your Signin.jsx and signup.jsx
- Just ensure backend is deployed and responding

---

## 📍 Status Check

Run these in your Backend directory to test locally first:

```bash
cd Backend
npm install
node index.js
```

You should see:
```
DB connected to MongoDB
Server is running on http://localhost:5555
```

Then in another terminal:
```bash
cd frontend
npm run dev
```

Visit http://localhost:5174 and test login/signup

---

## 🔑 Important Credentials (Already Configured)

- **MongoDB:** `mongodb+srv://ola:ola123@cluster0.nxazcmn.mongodb.net/TestDb`
- **JWT Secret:** `6ixGadgets_SecretKey_2024_MernStack_Project`
- **Frontend URL:** `https://level-3-project-three.vercel.app`

---

## ❓ Need Help?

1. Check terminal output for error messages
2. Verify all environment variables are set
3. Ensure MongoDB connection string is correct
4. Make sure backend port matches frontend API URL

Your backend must be deployed for login/signup to work!
