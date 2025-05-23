import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, Trash2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import AnalysisSummary from '../components/AnalysisSummary';
import FilterPanel from '../components/FilterPanel';
import FollowerCard from '../components/FollowerCard';
import { AnalysisResult, AnalysisSession, Filter } from '../types';
import { filterResults } from '../utils/analysisUtils';
import { mockAnalysisSessions } from '../data/mockData';
import toast from 'react-hot-toast';

const AnalysisResults: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [session, setSession] = useState<AnalysisSession | null>(null);
  const [filteredResults, setFilteredResults] = useState<AnalysisResult[]>([]);
  const [filter, setFilter] = useState<Filter>({
    scoreRange: [0, 100],
    issues: [],
    markedStatus: 'all',
    sortBy: 'score',
    sortDirection: 'asc'
  });
  
  useEffect(() => {
    // Find the session in local storage or mock data
    const savedSessions = localStorage.getItem('realreach_sessions');
    let sessions = savedSessions ? JSON.parse(savedSessions) : mockAnalysisSessions;
    
    const currentSession = sessions.find((s: AnalysisSession) => s.id === id);
    if (currentSession) {
      setSession(currentSession);
      applyFilters(currentSession.results, filter);
    } else {
      toast.error('Analysis session not found');
      navigate('/dashboard');
    }
  }, [id, navigate]);
  
  useEffect(() => {
    if (session) {
      applyFilters(session.results, filter);
    }
  }, [filter, session]);
  
  const applyFilters = (results: AnalysisResult[], currentFilter: Filter) => {
    const filtered = filterResults(
      results,
      currentFilter.scoreRange,
      currentFilter.issues,
      currentFilter.markedStatus,
      currentFilter.sortBy,
      currentFilter.sortDirection
    );
    setFilteredResults(filtered);
  };
  
  const handleToggleMark = (resultId: string) => {
    if (!session) return;
    
    const updatedResults = session.results.map(result => 
      result.id === resultId
        ? { ...result, isMarkedSuspicious: !result.isMarkedSuspicious }
        : result
    );
    
    const updatedSession = { ...session, results: updatedResults };
    updateSession(updatedSession);
    toast.success('Follower status updated');
  };
  
  const handleUnfollow = (resultId: string) => {
    if (!session) return;
    
    // In a real app, this would call the Twitter API to unfollow
    toast.success('Unfollowed successfully');
  };
  
  const handleBlock = (resultId: string) => {
    if (!session) return;
    
    // In a real app, this would call the Twitter API to block
    toast.success('Blocked successfully');
  };
  
  const updateSession = (updatedSession: AnalysisSession) => {
    setSession(updatedSession);
    
    // Update in localStorage
    const savedSessions = localStorage.getItem('realreach_sessions');
    let sessions = savedSessions ? JSON.parse(savedSessions) : mockAnalysisSessions;
    
    const updatedSessions = sessions.map((s: AnalysisSession) => 
      s.id === updatedSession.id ? updatedSession : s
    );
    
    localStorage.setItem('realreach_sessions', JSON.stringify(updatedSessions));
  };
  
  const exportResults = () => {
    if (!session) return;
    
    const data = {
      analysisDate: new Date(session.date).toISOString(),
      platform: session.platform,
      user: user?.username,
      summary: {
        totalFollowers: session.totalFollowers,
        suspiciousCount: session.suspiciousCount,
        inactiveCount: session.inactiveCount,
        averageRealScore: session.averageRealScore
      },
      suspiciousFollowers: session.results
        .filter(r => r.realScore < 50)
        .map(r => ({
          username: r.follower.username,
          realScore: r.realScore,
          issues: r.issues.map(i => i.description)
        }))
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `realreach-analysis-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    toast.success('Analysis exported successfully');
  };
  
  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <button
            onClick={() => navigate('/dashboard')}
            className="mr-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Analysis Results</h1>
            <p className="text-gray-600 dark:text-gray-400">
              {new Date(session.date).toLocaleDateString()} • {session.platform.charAt(0).toUpperCase() + session.platform.slice(1)}
            </p>
          </div>
        </div>
        <button
          onClick={exportResults}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Download className="h-4 w-4 mr-2" />
          Export
        </button>
      </div>
      
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-3">
          <AnalysisSummary session={session} />
        </div>
        
        <div className="lg:col-span-1 space-y-6">
          <FilterPanel filter={filter} onFilterChange={setFilter} />
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
            <h3 className="font-medium text-gray-900 dark:text-white mb-2">Bulk Actions</h3>
            <div className="space-y-2">
              <button
                className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Unfollow All Marked
              </button>
              <button
                className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 dark:text-red-400 dark:bg-red-900/30 dark:hover:bg-red-900/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Block All Marked
              </button>
            </div>
            
            <div className="mt-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {filteredResults.length} of {session.results.length} followers shown
              </p>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-2">
          {filteredResults.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8 text-center">
              <Trash2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">No results match your filters</h3>
              <p className="mt-1 text-gray-500 dark:text-gray-400">
                Try adjusting your filters to see more followers.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredResults.map((result) => (
                <FollowerCard
                  key={result.id}
                  result={result}
                  onToggleMark={handleToggleMark}
                  onUnfollow={handleUnfollow}
                  onBlock={handleBlock}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnalysisResults;