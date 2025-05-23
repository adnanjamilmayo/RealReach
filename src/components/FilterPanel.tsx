import React, { useState } from 'react';
import { Filter, SlidersHorizontal, ChevronDown, ChevronUp } from 'lucide-react';
import { Filter as FilterType } from '../types';

interface FilterPanelProps {
  filter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ filter, onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleScoreChange = (value: [number, number]) => {
    onFilterChange({ ...filter, scoreRange: value });
  };

  const handleIssueToggle = (issueType: string) => {
    const newIssues = filter.issues.includes(issueType)
      ? filter.issues.filter(i => i !== issueType)
      : [...filter.issues, issueType];
    onFilterChange({ ...filter, issues: newIssues });
  };

  const handleMarkedStatusChange = (status: 'all' | 'marked' | 'unmarked') => {
    onFilterChange({ ...filter, markedStatus: status });
  };

  const handleSortChange = (sortBy: 'score' | 'username' | 'date') => {
    onFilterChange({ ...filter, sortBy });
  };

  const handleSortDirectionChange = () => {
    onFilterChange({ 
      ...filter, 
      sortDirection: filter.sortDirection === 'asc' ? 'desc' : 'asc'
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div 
        className="p-4 flex items-center justify-between cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center space-x-2">
          <Filter className="h-5 w-5 text-blue-500" />
          <h3 className="font-medium text-gray-900 dark:text-white">Filter & Sort</h3>
        </div>
        <div>
          {isOpen ? (
            <ChevronUp className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          )}
        </div>
      </div>

      {isOpen && (
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-4">
          <div>
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Realness Score</h4>
            <div className="flex items-center space-x-2">
              <input
                type="range"
                min="0"
                max="100"
                value={filter.scoreRange[0]}
                onChange={(e) => handleScoreChange([parseInt(e.target.value), filter.scoreRange[1]])}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              />
              <span className="text-sm text-gray-600 dark:text-gray-400 min-w-[30px]">
                {filter.scoreRange[0]}
              </span>
            </div>
            <div className="flex items-center space-x-2 mt-2">
              <input
                type="range"
                min="0"
                max="100"
                value={filter.scoreRange[1]}
                onChange={(e) => handleScoreChange([filter.scoreRange[0], parseInt(e.target.value)])}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              />
              <span className="text-sm text-gray-600 dark:text-gray-400 min-w-[30px]">
                {filter.scoreRange[1]}
              </span>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Issues</h4>
            <div className="grid grid-cols-2 gap-2">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-blue-600"
                  checked={filter.issues.includes('no_profile_picture')}
                  onChange={() => handleIssueToggle('no_profile_picture')}
                />
                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">No profile picture</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-blue-600"
                  checked={filter.issues.includes('suspicious_bio')}
                  onChange={() => handleIssueToggle('suspicious_bio')}
                />
                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Suspicious bio</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-blue-600"
                  checked={filter.issues.includes('low_ratio')}
                  onChange={() => handleIssueToggle('low_ratio')}
                />
                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Low ratio</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-blue-600"
                  checked={filter.issues.includes('inactive')}
                  onChange={() => handleIssueToggle('inactive')}
                />
                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Inactive</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-blue-600"
                  checked={filter.issues.includes('spam_keywords')}
                  onChange={() => handleIssueToggle('spam_keywords')}
                />
                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Spam keywords</span>
              </label>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Status</h4>
            <div className="flex space-x-2">
              <button
                className={`px-3 py-1 text-sm rounded-md ${
                  filter.markedStatus === 'all' 
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' 
                    : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                }`}
                onClick={() => handleMarkedStatusChange('all')}
              >
                All
              </button>
              <button
                className={`px-3 py-1 text-sm rounded-md ${
                  filter.markedStatus === 'marked' 
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' 
                    : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                }`}
                onClick={() => handleMarkedStatusChange('marked')}
              >
                Marked
              </button>
              <button
                className={`px-3 py-1 text-sm rounded-md ${
                  filter.markedStatus === 'unmarked' 
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' 
                    : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                }`}
                onClick={() => handleMarkedStatusChange('unmarked')}
              >
                Unmarked
              </button>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Sort By</h4>
            <div className="flex justify-between">
              <div className="flex space-x-2">
                <button
                  className={`px-3 py-1 text-sm rounded-md ${
                    filter.sortBy === 'score' 
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' 
                      : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                  }`}
                  onClick={() => handleSortChange('score')}
                >
                  Score
                </button>
                <button
                  className={`px-3 py-1 text-sm rounded-md ${
                    filter.sortBy === 'username' 
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' 
                      : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                  }`}
                  onClick={() => handleSortChange('username')}
                >
                  Username
                </button>
                <button
                  className={`px-3 py-1 text-sm rounded-md ${
                    filter.sortBy === 'date' 
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' 
                      : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                  }`}
                  onClick={() => handleSortChange('date')}
                >
                  Last Activity
                </button>
              </div>
              <button
                className="px-3 py-1 text-sm rounded-md bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 flex items-center"
                onClick={handleSortDirectionChange}
              >
                {filter.sortDirection === 'asc' ? (
                  <>
                    <ChevronUp className="h-4 w-4 mr-1" /> Asc
                  </>
                ) : (
                  <>
                    <ChevronDown className="h-4 w-4 mr-1" /> Desc
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterPanel;