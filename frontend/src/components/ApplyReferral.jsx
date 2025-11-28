import { useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

function ApplyReferral({ userId, onSuccess, onSkip }) {
  const [referralCode, setReferralCode] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}/apply-referral`, {
        userId,
        referralCode: referralCode.toUpperCase()
      });
      
      setMessage(`${response.data.message}! You earned ${response.data.coinsEarned} coins 🎉`);
      setMessageType('success');
      
      setTimeout(() => {
        onSuccess(response.data.totalCoins);
      }, 2000);
    } catch (err) {
      setMessage(err.response?.data?.error || 'Failed to apply referral code');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h1>Have a Referral Code?</h1>
      <p className="subtitle">Enter it now to earn bonus coins</p>
      
      {message && <div className={`message ${messageType}`}>{message}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Referral Code</label>
          <input
            type="text"
            value={referralCode}
            onChange={(e) => setReferralCode(e.target.value)}
            placeholder="Enter referral code"
            required
            style={{ textTransform: 'uppercase' }}
          />
        </div>
        
        <button type="submit" disabled={loading}>
          {loading ? 'Applying...' : 'Apply Code'}
        </button>
        
        <button type="button" onClick={onSkip} className="link-button">
          Skip for now
        </button>
      </form>
    </div>
  );
}

export default ApplyReferral;
