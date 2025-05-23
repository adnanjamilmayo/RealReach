import React from 'react';
import { AlertCircle, Clock, CheckCircle } from 'lucide-react';
import { AnalysisSession } from '../types';

interface AnalysisSummaryProps {
  session: AnalysisSession;
}

const AnalysisSummary: React.FC<AnalysisSummaryProps> = ({ session }) => {
  const suspiciousPercentage = Math.round((session.suspiciousCount / session.totalFollowers) * 100);
  const inactivePercentage = Math.round((session.inactiveCount / session.totalFollowers) * 100);
  const averageScore = Math.round(session.averageRealScore);
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Analysis Summary
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
            <div className="p-2 bg-red-100 dark:bg-red-800 rounded-full">
              <AlertCircle className="h-5 w-5 text-red-500 dark:text-red-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Suspicious Followers</p>
              <div className="flex items-baseline">
                <span className="text-xl font-semibold text-gray-900 dark:text-white">
                  {session.suspiciousCount}
                </span>
                <span className="ml-1 text-sm text-gray-500 dark:text-gray-400">
                  ({suspiciousPercentage}%)
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="p-2 bg-blue-100 dark:bg-blue-800 rounded-full">
              <Clock className="h-5 w-5 text-blue-500 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Inactive Followers</p>
              <div className="flex items-baseline">
                <span className="text-xl font-semibold text-gray-900 dark:text-white">
                  {session.inactiveCount}
                </span>
                <span className="ml-1 text-sm text-gray-500 dark:text-gray-400">
                  ({inactivePercentage}%)
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div className="p-2 bg-green-100 dark:bg-green-800 rounded-full">
              <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Average Realness Score</p>
              <div className="flex items-baseline">
                <span className="text-xl font-semibold text-gray-900 dark:text-white">
                  {averageScore}
                </span>
                <span className="ml-1 text-sm text-gray-500 dark:text-gray-400">
                  /100
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-4">
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
            <div 
              className="bg-blue-600 h-2.5 rounded-full" 
              style={{ width: `${averageScore}%` }}
            ></div>
          </div>
          <div className="flex justify-between mt-1 text-xs text-gray-500 dark:text-gray-400">
            <span>0</span>
            <span>50</span>
            <span>100</span>
          </div>
        </div>
        
        <div className="mt-4 flex justify-between items-center">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Analyzed on {new Date(session.date).toLocaleDateString()}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {session.analyzedFollowers} followers analyzed
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisSummary;