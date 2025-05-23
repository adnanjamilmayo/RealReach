import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, CheckCircle, AlertCircle, Twitter, Instagram, Facebook } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Landing: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-800 dark:to-indigo-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-6">
            Identify & Remove Fake Followers
          </h1>
          <p className="text-xl max-w-3xl mx-auto text-blue-100 mb-8">
            RealReach helps you detect and remove fake or inactive followers from your social media accounts with AI-powered analytics.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {user ? (
              <Link
                to="/dashboard"
                className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-full shadow-md hover:bg-gray-100 transition-all duration-200"
              >
                Go to Dashboard
              </Link>
            ) : (
              <Link
                to="/login"
                className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-full shadow-md hover:bg-gray-100 transition-all duration-200"
              >
                Get Started
              </Link>
            )}
            <a
              href="#features"
              className="px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-full hover:bg-white/10 transition-all duration-200"
            >
              Learn More
            </a>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-white dark:bg-gray-900 clip-path-wave"></div>
      </section>

      {/* Platforms Section */}
      <section className="py-12 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Works with Your Favorite Platforms
          </h2>
          <div className="flex flex-wrap justify-center gap-8 items-center">
            <div className="flex flex-col items-center p-6 hover:scale-105 transition-transform duration-300">
              <Twitter className="h-16 w-16 text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Twitter/X</h3>
            </div>
            <div className="flex flex-col items-center p-6 hover:scale-105 transition-transform duration-300">
              <Instagram className="h-16 w-16 text-pink-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Instagram</h3>
            </div>
            <div className="flex flex-col items-center p-6 hover:scale-105 transition-transform duration-300">
              <Facebook className="h-16 w-16 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Facebook</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Our AI-powered tools help you clean up your follower list and maintain a genuine audience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/50 rounded-full inline-block mb-4">
                <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                AI Detection
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Our advanced AI analyzes multiple factors to identify fake and suspicious accounts with high accuracy.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="p-3 bg-green-100 dark:bg-green-900/50 rounded-full inline-block mb-4">
                <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Realness Score
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Each follower gets a 0-100 score based on their profile authenticity, activity, and engagement patterns.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="p-3 bg-red-100 dark:bg-red-900/50 rounded-full inline-block mb-4">
                <AlertCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                One-Click Actions
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Easily unfollow or block suspicious accounts with a single click, saving you time and effort.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-800 dark:to-indigo-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Clean Up Your Followers?
          </h2>
          <p className="text-xl text-purple-100 max-w-3xl mx-auto mb-8">
            Join thousands of users who've improved their social media presence with RealReach.
          </p>
          {user ? (
            <Link
              to="/dashboard"
              className="px-8 py-3 bg-white text-purple-600 font-semibold rounded-full shadow-md hover:bg-gray-100 transition-all duration-200"
            >
              Go to Dashboard
            </Link>
          ) : (
            <Link
              to="/login"
              className="px-8 py-3 bg-white text-purple-600 font-semibold rounded-full shadow-md hover:bg-gray-100 transition-all duration-200"
            >
              Get Started Now
            </Link>
          )}
        </div>
      </section>
    </div>
  );
};

export default Landing;