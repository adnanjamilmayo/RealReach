import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Twitter, Instagram, Facebook, ArrowRight, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<string | null>(null);

  const handleLogin = async (platform: string) => {
    setLoading(platform);
    try {
      await login(platform);
      toast.success(`Successfully logged in with ${platform}!`);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Failed to log in. Please try again.');
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="min-h-[calc(100vh-16rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 rounded-xl shadow-md p-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">
            Connect Your Account
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Choose a platform to analyze your followers
          </p>
        </div>
        
        <div className="mt-8 space-y-4">
          <button
            onClick={() => handleLogin('twitter')}
            disabled={loading !== null}
            className="group relative w-full flex justify-between items-center px-6 py-4 border border-transparent text-lg font-medium rounded-lg text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          >
            <div className="flex items-center">
              <Twitter className="h-6 w-6 mr-4" />
              <span>Twitter / X</span>
            </div>
            {loading === 'twitter' ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
            )}
          </button>
          
          <button
            onClick={() => handleLogin('instagram')}
            disabled={loading !== null}
            className="group relative w-full flex justify-between items-center px-6 py-4 border border-transparent text-lg font-medium rounded-lg text-white bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-all duration-200"
          >
            <div className="flex items-center">
              <Instagram className="h-6 w-6 mr-4" />
              <span>Instagram</span>
            </div>
            {loading === 'instagram' ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
            )}
          </button>
          
          <button
            onClick={() => handleLogin('facebook')}
            disabled={loading !== null}
            className="group relative w-full flex justify-between items-center px-6 py-4 border border-transparent text-lg font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 transition-colors duration-200"
          >
            <div className="flex items-center">
              <Facebook className="h-6 w-6 mr-4" />
              <span>Facebook</span>
            </div>
            {loading === 'facebook' ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
            )}
          </button>
        </div>
        
        <div className="mt-6">
          <p className="text-xs text-center text-gray-500 dark:text-gray-400">
            By connecting your account, you agree to our{' '}
            <a href="#" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;