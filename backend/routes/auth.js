import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import Config from '../models/Config.js';

const router = express.Router();

// Generate unique referral code
const generateReferralCode = () => {
  return Math.random().toString(36).substring(2, 10).toUpperCase();
};

// POST /register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const referralCode = generateReferralCode();

    const user = new User({
      name,
      email,
      password: hashedPassword,
      referralCode,
      coins: 0
    });

    await user.save();

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        referralCode: user.referralCode,
        coins: user.coins
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /apply-referral
router.post('/apply-referral', async (req, res) => {
  try {
    const { userId, referralCode } = req.body;

    if (!userId || !referralCode) {
      return res.status(400).json({ error: 'User ID and referral code are required' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (user.referredBy) {
      return res.status(400).json({ error: 'Referral code already applied' });
    }

    if (user.referralCode === referralCode) {
      return res.status(400).json({ error: 'Cannot use your own referral code' });
    }

    const referrer = await User.findOne({ referralCode });
    if (!referrer) {
      return res.status(404).json({ error: 'Invalid referral code' });
    }

    const config = await Config.findOne({ key: 'referralReward' });
    const rewardCoins = config ? config.value : 100;

    user.coins += rewardCoins;
    user.referredBy = referralCode;
    await user.save();

    referrer.coins += rewardCoins;
    await referrer.save();

    res.json({
      message: 'Referral code applied successfully',
      coinsEarned: rewardCoins,
      totalCoins: user.coins
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
