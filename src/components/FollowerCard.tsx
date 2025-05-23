import React from 'react';
import { User, Trash2, AlertCircle, CheckCircle, Clock, MoreHorizontal } from 'lucide-react';
import { AnalysisResult } from '../types';

interface FollowerCardProps {
  result: AnalysisResult;
  onToggleMark: (id: string) => void;
  onUnfollow: (id: string) => void;
  onBlock: (id: string) => void;
}

const FollowerCard: React.FC<FollowerCardProps> = ({ 
  result, 
  onToggleMark, 
  onUnfollow, 
  onBlock 
}) => {
  const { follower, realScore, issues, isMarkedSuspicious } = result;
  
  const getScoreColor = () => {
    if (realScore >= 70) return 'text-green-500 bg-green-50 dark:bg-green-900/20';
    if (realScore >= 40) return 'text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20';
    return 'text-red-500 bg-red-50 dark:bg-red-900/20';
  };
  
  const getIssueIcon = (type: string) => {
    switch (type) {
      case 'no_profile_picture':
        return <User className="h-4 w-4 text-gray-500" />;
      case 'suspicious_bio':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case 'low_ratio':
        return <MoreHorizontal className="h-4 w-4 text-orange-500" />;
      case 'inactive':
        return <Clock className="h-4 w-4 text-blue-500" />;
      case 'spam_keywords':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };
  
  // Calculate how many months since last activity
  const getLastActivityText = () => {
    const lastActivity = new Date(follower.lastActivityDate);
    const now = new Date();
    const monthsDiff = (now.getFullYear() - lastActivity.getFullYear()) * 12 + 
                      (now.getMonth() - lastActivity.getMonth());
    
    if (monthsDiff === 0) return 'Active this month';
    if (monthsDiff === 1) return 'Active 1 month ago';
    return `Active ${monthsDiff} months ago`;
  };

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border ${
      isMarkedSuspicious ? 'border-red-200 dark:border-red-900/50' : 'border-gray-200 dark:border-gray-700'
    } overflow-hidden transition-all duration-300 hover:shadow-md`}>
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              {follower.avatarUrl ? (
                <img 
                  src={follower.avatarUrl} 
                  alt={follower.name} 
                  className="h-12 w-12 rounded-full object-cover"
                />
              ) : (
                <div className="h-12 w-12 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                  <User className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                </div>
              )}
              {follower.isVerified && (
                <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1">
                  <CheckCircle className="h-3 w-3 text-white" />
                </div>
              )}
            </div>
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">{follower.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">@{follower.username}</p>
            </div>
          </div>
          <div className={`px-2 py-1 rounded-full text-xs font-medium ${getScoreColor()}`}>
            {realScore}
          </div>
        </div>

        <div className="mt-3">
          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
            {follower.bio || <span className="italic text-gray-400">No bio</span>}
          </p>
        </div>

        <div className="mt-3 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <div>{getLastActivityText()}</div>
          <div className="flex space-x-3">
            <span>{follower.followerCount} followers</span>
            <span>{follower.followingCount} following</span>
          </div>
        </div>

        {issues.length > 0 && (
          <div className="mt-3 space-y-1">
            {issues.map((issue, idx) => (
              <div key={idx} className="flex items-center space-x-1 text-xs">
                {getIssueIcon(issue.type)}
                <span className={`${
                  issue.severity === 'high' ? 'text-red-600 dark:text-red-400' :
                  issue.severity === 'medium' ? 'text-yellow-600 dark:text-yellow-400' :
                  'text-gray-600 dark:text-gray-400'
                }`}>
                  {issue.description}
                </span>
              </div>
            ))}
          </div>
        )}

        <div className="mt-4 flex justify-between">
          <button
            onClick={() => onToggleMark(result.id)}
            className={`px-3 py-1 rounded-md text-xs font-medium ${
              isMarkedSuspicious 
                ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
                : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
            }`}
          >
            {isMarkedSuspicious ? 'Marked Suspicious' : 'Mark as Suspicious'}
          </button>
          
          <div className="flex space-x-2">
            <button
              onClick={() => onUnfollow(result.id)}
              className="p-1 rounded-md text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400"
              title="Unfollow"
            >
              <User className="h-4 w-4" />
            </button>
            <button
              onClick={() => onBlock(result.id)}
              className="p-1 rounded-md text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400"
              title="Block"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FollowerCard;