# Admin Page Documentation

## Overview
A fully functional admin page for managing devices in your inventory. All changes made in the admin page automatically reflect in the dashboard.

## Features
- ✅ **Create** new devices
- ✅ **View** all devices in a responsive grid layout
- ✅ **Update** existing device information
- ✅ **Delete** devices from inventory
- ✅ **Search** functionality for quick filtering
- ✅ **Real-time synchronization** with dashboard
- ✅ **Fully responsive** design for mobile, tablet, and desktop

## Setup Instructions

### Backend Setup
1. Navigate to the Backend folder:
   ```bash
   cd Backend
   ```

2. Create a `.env` file (copy from `.env.example`):
   ```bash
   cp .env.example .env
   ```

3. Update the `.env` file with your configuration:
   ```
   PORT=5555
   MONGO_URL=mongodb://localhost:27017/your-database-name
   JWT_SECRET=your-secret-key-here
   ```

4. Install dependencies (if not already done):
   ```bash
   npm install
   ```

5. Start the backend server:
   ```bash
   node index.js
   ```

### Frontend Setup
1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```

2. Install dependencies (if not already done):
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## Accessing the Admin Page

Once both backend and frontend are running:
- Admin Page: `http://localhost:5174/admin`
- Dashboard: `http://localhost:5174/dashboard`

## How to Use

### Adding a New Device
1. Click the "Add New Device" button
2. Fill in all required fields:
   - Device Name (e.g., iPhone 14 Pro)
   - Image URL
   - Color
   - Storage
   - Condition (Excellent, Good, Fair, Poor)
   - Market Value (e.g., ₦850,000)
   - Trade-In Value
   - Trend (e.g., +12.4% or -5.2%)
   - Availability (In Stock, Low Stock, Out of Stock, Pre-Order)
   - Availability Color
3. Click "Add Device"
4. The device will immediately appear in both admin page and dashboard

### Editing a Device
1. Click the "Edit" button on any device card
2. Update the desired fields
3. Click "Update Device"
4. Changes will be reflected immediately in the dashboard

### Deleting a Device
1. Click the "Delete" button on any device card
2. Confirm the deletion
3. The device will be removed from both admin page and dashboard

### Searching for Devices
- Use the search box to filter devices by name, color, or storage
- Results update in real-time as you type

## API Endpoints

All device operations use the following REST API:

- **GET** `/api/devices` - Fetch all devices
- **GET** `/api/devices/:id` - Fetch single device
- **POST** `/api/devices` - Create new device
- **PUT** `/api/devices/:id` - Update device
- **DELETE** `/api/devices/:id` - Delete device

## Device Schema

```javascript
{
  name: String,           // Device name
  image: String,          // Image URL
  color: String,          // Device color
  storage: String,        // Storage capacity
  condition: String,      // Device condition
  marketValue: String,    // Market price
  tradeInValue: String,   // Trade-in price
  trend: String,          // Price trend (±%)
  availability: String,   // Stock status
  availabilityColor: String // Status color code
}
```

## Responsive Breakpoints
- **Desktop**: 1024px and above
- **Tablet**: 768px - 1023px
- **Mobile**: 480px - 767px
- **Small Mobile**: Below 480px

## Troubleshooting

### Backend not connecting to MongoDB
- Ensure MongoDB is running on your machine
- Check that MONGO_URL in `.env` is correct
- Verify network connection

### Frontend can't connect to backend
- Ensure backend is running on port 5555
- Check that CORS is properly configured in backend
- Verify the API_URL in DeviceContext.jsx matches your backend port

### Devices not appearing in dashboard
- Check that DeviceContext is properly wrapped in App.jsx
- Verify backend API is returning data
- Check browser console for errors

## Tips
- Always add an image URL when creating devices for better visual presentation
- Use consistent formatting for prices (e.g., ₦850,000)
- Keep trend values realistic (+/- 0-20%)
- Choose appropriate availability colors for better UX
