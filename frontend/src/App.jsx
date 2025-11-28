import { useState } from 'react';
import Register from './components/Register';
import ApplyReferral from './components/ApplyReferral';

function App() {
  const [user, setUser] = useState(null);
  const [showApplyReferral, setShowApplyReferral] = useState(false);

  const handleRegisterSuccess = (userData) => {
    setUser(userData);
    setShowApplyReferral(true);
  };

  const handleReferralSuccess = (updatedCoins) => {
    setUser({ ...user, coins: updatedCoins });
  };

  const handleSkip = () => {
    setShowApplyReferral(false);
  };

  return (
    <div className="container">
      {!user ? (
        <Register onSuccess={handleRegisterSuccess} />
      ) : showApplyReferral ? (
        <ApplyReferral 
          userId={user.id} 
          onSuccess={handleReferralSuccess}
          onSkip={handleSkip}
        />
      ) : (
        <div className="card">
          <h1>Welcome, {user.name}!</h1>
          <div className="info-box">
            <h3>Your Account</h3>
            <div className="info-item">
              <span className="info-label">Email:</span>
              <span className="info-value">{user.email}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Referral Code:</span>
              <span className="info-value">{user.referralCode}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Coins:</span>
              <span className="info-value coins">{user.coins} 🪙</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
