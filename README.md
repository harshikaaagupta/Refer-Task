# Refer & Earn Application

A modern MERN stack application for referral-based rewards system.

## Features

- User registration with unique referral codes
- Apply referral codes to earn coins
- Reward system stored in MongoDB
- Modern, responsive UI
- Error handling for invalid/own referral codes

## Tech Stack

- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Frontend**: React, Vite, Axios
- **Styling**: Pure CSS with gradient design

## Setup Instructions

### Prerequisites

- Node.js (v16+)
- MongoDB (running locally or MongoDB Atlas)

### Backend Setup

1. Navigate to backend folder:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Update `.env` file if needed (default uses local MongoDB)

4. Start the server:
```bash
npm run dev
```

Backend runs on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend folder:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

Frontend runs on `http://localhost:3000`

## API Endpoints

### POST /api/register
Register a new user and generate referral code.

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "referralCode": "ABC123XY",
    "coins": 0
  }
}
```

### POST /api/apply-referral
Apply a referral code to earn coins.

**Request:**
```json
{
  "userId": "user_id_here",
  "referralCode": "ABC123XY"
}
```

**Response:**
```json
{
  "message": "Referral code applied successfully",
  "coinsEarned": 100,
  "totalCoins": 100
}
```

## Database Schema

### Users Collection
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  referralCode: String (unique),
  coins: Number,
  referredBy: String,
  timestamps: true
}
```

### Config Collection
```javascript
{
  key: String (unique),
  value: Number
}
```

Default config: `{ key: 'referralReward', value: 100 }`

## How It Works

1. User registers → Gets unique referral code
2. User can share their referral code
3. New users apply referral code after registration
4. Both users earn coins (configurable amount)
5. Validations prevent self-referral and duplicate usage

## Error Handling

- Invalid referral code
- Using own referral code
- Referral code already applied
- Duplicate email registration
- Missing required fields
