import React from 'react';

interface AnalysisProgressProps {
  progress: number;
  total: number;
}

const AnalysisProgress: React.FC<AnalysisProgressProps> = ({ progress, total }) => {
  const percentage = Math.round((progress / total) * 100);
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Analyzing Your Followers
        </h2>
        
        <div className="mb-2 flex justify-between items-center">
          <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Progress: {progress} of {total} followers
          </div>
          <div className="text-sm font-medium text-blue-600 dark:text-blue-400">
            {percentage}%
          </div>
        </div>
        
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 mb-4 overflow-hidden">
          <div 
            className="bg-blue-600 h-4 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
        
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Please wait while we analyze your followers. This may take a few moments depending on how many followers you have.
        </p>
      </div>
    </div>
  );
};

export default AnalysisProgress;