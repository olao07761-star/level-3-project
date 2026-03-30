# Quick Start Guide - Admin Page Setup

## 🚀 Getting Started in 3 Steps

### Step 1: Setup Backend Environment
Create a `.env` file in the `Backend` folder with this content:
```env
PORT=5555
MONGO_URL=mongodb://localhost:27017/gadgets-db
JWT_SECRET=your-secret-key-change-in-production
```

### Step 2: Start Backend Server
```bash
cd Backend
node index.js
```
You should see: "Server is running on http://localhost:5555" and "DB connected to MongoDB"

### Step 3: Start Frontend
Open a new terminal:
```bash
cd frontend
npm run dev
```

## 📍 Access Your Pages
- **Admin Page**: http://localhost:5174/admin
- **Dashboard**: http://localhost:5174/dashboard
- **Home Page**: http://localhost:5174

## ✨ Admin Page Features

### What You Can Do:
1. **Add Devices** - Click "Add New Device" button
2. **Edit Devices** - Click "Edit" on any device card
3. **Delete Devices** - Click "Delete" on any device card
4. **Search Devices** - Use the search bar to filter
5. **View Stats** - See total devices and in-stock count

### Changes Sync Automatically!
✅ Add a device in Admin → It appears in Dashboard
✅ Edit a device in Admin → Dashboard updates instantly
✅ Delete a device in Admin → It's removed from Dashboard

## 📱 Responsive Design
The admin page works perfectly on:
- 💻 Desktop computers
- 📱 Tablets
- 📱 Mobile phones (all screen sizes)

## 🎨 Example Device Data
When adding a device, use this format:

- **Name**: iPhone 14 Pro
- **Image**: https://example.com/iphone14pro.jpg
- **Color**: Deep Purple
- **Storage**: 256GB
- **Condition**: Excellent
- **Market Value**: ₦850,000
- **Trade-In Value**: ₦680,000
- **Trend**: +12.4% (use + or -)
- **Availability**: In Stock
- **Availability Color**: Green (In Stock)

## ⚠️ Important Notes
- Make sure MongoDB is running before starting the backend
- Backend must be running on port 5555
- Frontend must be running on port 5174
- Check CORS settings if you have connection issues

## 🐛 Troubleshooting
**Backend won't start?**
- Check if MongoDB is running: `mongod`
- Verify `.env` file exists with correct values
- Check if port 5555 is available

**Frontend can't connect?**
- Ensure backend is running first
- Check browser console for errors
- Verify API URL in DeviceContext.jsx

**Devices not showing?**
- Check backend terminal for errors
- Verify MongoDB connection
- Try refreshing the page

## 📚 Need More Help?
See the full documentation in `ADMIN_PAGE_GUIDE.md`
