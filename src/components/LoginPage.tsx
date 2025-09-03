import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import Input from './Input';
import Button from './Button';

interface LoginPageProps {
  onLoginSuccess: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  // Pre-fill username and password for development
  const [username, setUsername] = useState('ERPM');
  const [password, setPassword] = useState('123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    if (username === 'ERPM' && password === '123') { // Updated credentials
      console.log('Login successful!', { username, password });
      onLoginSuccess(); // Call the prop on successful login
    } else {
      setError('Invalid username or password. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      {/* Login Card */}
      <div className="w-full max-w-sm bg-surface p-8 rounded-xl shadow-card">
        <div className="flex flex-col items-center mb-8">
          {/* Logo */}
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-4">
            <ArrowRight size={32} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-text text-center">ERP System</h1>
          <h1 className="text-textSecondary text-2xl font-bold text-center mb-2">Mobile</h1>
          <p className="text-textSecondary text-sm text-center">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-text text-sm font-medium mb-2">
              Username
            </label>
            <Input
              id="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-text text-sm font-medium mb-2">
              Password
            </label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && (
            <p className="text-error text-sm text-center" role="alert">
              {error}
            </p>
          )}

          <Button type="submit" disabled={loading} className="w-full"> {/* Added w-full here */}
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing In...
              </span>
            ) : (
              'Sign In'
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
