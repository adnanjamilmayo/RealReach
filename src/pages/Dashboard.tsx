import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RefreshCw, AlertTriangle, Shield } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import AnalysisProgress from '../components/AnalysisProgress';
import { generateMockAnalysisSession, mockAnalysisSessions } from '../data/mockData';
import toast from 'react-hot-toast';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [sessions, setSessions] = useState(mockAnalysisSessions);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [totalFollowers, setTotalFollowers] = useState(0);

  useEffect(() => {
    // Load any saved sessions from localStorage
    const savedSessions = localStorage.getItem('realreach_sessions');
    if (savedSessions) {
      setSessions(JSON.parse(savedSessions));
    }
  }, []);

  const startNewAnalysis = () => {
    if (isAnalyzing) return;
    
    setIsAnalyzing(true);
    setProgress(0);
    
    // Mock the total followers count
    const total = user?.followerCount || 100;
    setTotalFollowers(total);
    
    // Simulate a progress bar
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 5) + 1;
      if (currentProgress > total) {
        currentProgress = total;
        clearInterval(interval);
        
        // Generate a new mock analysis session
        const newSession = generateMockAnalysisSession();
        const updatedSessions = [newSession, ...sessions];
        setSessions(updatedSessions);
        localStorage.setItem('realreach_sessions', JSON.stringify(updatedSessions));
        
        setIsAnalyzing(false);
        toast.success('Analysis completed successfully!');
        
        // Navigate to the results page
        navigate(`/analysis/${newSession.id}`);
      }
      setProgress(currentProgress);
    }, 200);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Welcome back, {user?.name}! Monitor and manage your followers here.
        </p>
      </div>

      {isAnalyzing ? (
        <AnalysisProgress progress={progress} total={totalFollowers} />
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mb-8">
          <div className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="mb-4 md:mb-0">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Analyze Your Followers
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  Detect fake and inactive followers to clean up your account.
                </p>
              </div>
              <button
                onClick={startNewAnalysis}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Start New Analysis
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Recent Analysis Sessions
          </h2>
        </div>
        
        {sessions.length === 0 ? (
          <div className="p-6 text-center">
            <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">No analysis sessions yet</h3>
            <p className="mt-1 text-gray-500 dark:text-gray-400">
              Start your first analysis to identify fake followers.
            </p>
            <button
              onClick={startNewAnalysis}
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Start Analysis
            </button>
          </div>
        ) : (
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {sessions.map((session) => (
              <div key={session.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors duration-150">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="mb-4 md:mb-0">
                    <div className="flex items-center">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                        {session.platform.charAt(0).toUpperCase() + session.platform.slice(1)} Analysis
                      </h3>
                      <span className="ml-2 px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                        {formatDate(session.date)}
                      </span>
                    </div>
                    <div className="mt-2 flex items-center">
                      <div className="flex items-center mr-4">
                        <AlertTriangle className="h-4 w-4 text-yellow-500 mr-1" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {session.suspiciousCount} suspicious
                        </span>
                      </div>
                      <div className="flex items-center">
                        <RefreshCw className="h-4 w-4 text-blue-500 mr-1" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {session.inactiveCount} inactive
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => navigate(`/analysis/${session.id}`)}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 dark:text-blue-300 dark:bg-blue-900/30 dark:hover:bg-blue-900/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    View Results
                  </button>
                </div>
                <div className="mt-4">
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                    <div 
                      className="bg-blue-600 h-1.5 rounded-full" 
                      style={{ width: `${session.averageRealScore}%` }}
                    ></div>
                  </div>
                  <div className="mt-1 flex justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span>Average Score: {Math.round(session.averageRealScore)}</span>
                    <span>{session.analyzedFollowers} followers analyzed</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;