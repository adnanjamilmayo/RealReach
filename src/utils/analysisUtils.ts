import { Follower, FollowerIssue, AnalysisResult } from '../types';

// Calculate realness score for a follower
export const calculateRealScore = (follower: Follower): { score: number; issues: FollowerIssue[] } => {
  const issues: FollowerIssue[] = [];
  let scoreDeduction = 0;
  
  // Check for no profile picture
  if (!follower.avatarUrl) {
    issues.push({
      type: 'no_profile_picture',
      description: 'No profile picture set',
      severity: 'medium'
    });
    scoreDeduction += 20;
  }
  
  // Check for suspicious bio
  if (!follower.bio || follower.bio.length === 0) {
    issues.push({
      type: 'suspicious_bio',
      description: 'Empty bio',
      severity: 'low'
    });
    scoreDeduction += 10;
  } else if (
    /crypto|giveaway|cashapp|click|link in bio|follow for follow|nft|bitcoin|investment/i.test(follower.bio)
  ) {
    issues.push({
      type: 'spam_keywords',
      description: 'Bio contains potential spam keywords',
      severity: 'high'
    });
    scoreDeduction += 30;
  }
  
  // Check for low follower/following ratio
  if (follower.followerCount < 10 && follower.followingCount > 300) {
    issues.push({
      type: 'low_ratio',
      description: 'Unusually low follower to following ratio',
      severity: 'medium'
    });
    scoreDeduction += 15;
  }
  
  // Check for inactivity
  const lastActivity = new Date(follower.lastActivityDate);
  const now = new Date();
  const monthsDiff = (now.getFullYear() - lastActivity.getFullYear()) * 12 + 
                     (now.getMonth() - lastActivity.getMonth());
  
  if (monthsDiff > 3) {
    issues.push({
      type: 'inactive',
      description: `Inactive for ${monthsDiff} months`,
      severity: 'medium'
    });
    scoreDeduction += 15;
  }
  
  // Calculate the final score
  let score = 100 - scoreDeduction;
  if (score < 0) score = 0;
  
  return { score, issues };
};

// Filter and sort analysis results based on criteria
export const filterResults = (
  results: AnalysisResult[],
  scoreRange: [number, number] = [0, 100],
  issueTypes: string[] = [],
  markedStatus: 'all' | 'marked' | 'unmarked' = 'all',
  sortBy: 'score' | 'username' | 'date' = 'score',
  sortDirection: 'asc' | 'desc' = 'asc'
): AnalysisResult[] => {
  // Filter by score range
  let filtered = results.filter(result => 
    result.realScore >= scoreRange[0] && 
    result.realScore <= scoreRange[1]
  );
  
  // Filter by issue types
  if (issueTypes.length > 0) {
    filtered = filtered.filter(result => 
      result.issues.some(issue => issueTypes.includes(issue.type))
    );
  }
  
  // Filter by marked status
  if (markedStatus === 'marked') {
    filtered = filtered.filter(result => result.isMarkedSuspicious);
  } else if (markedStatus === 'unmarked') {
    filtered = filtered.filter(result => !result.isMarkedSuspicious);
  }
  
  // Sort results
  filtered.sort((a, b) => {
    let comparison = 0;
    
    switch (sortBy) {
      case 'score':
        comparison = a.realScore - b.realScore;
        break;
      case 'username':
        comparison = a.follower.username.localeCompare(b.follower.username);
        break;
      case 'date':
        comparison = new Date(a.follower.lastActivityDate).getTime() - 
                     new Date(b.follower.lastActivityDate).getTime();
        break;
    }
    
    return sortDirection === 'asc' ? comparison : -comparison;
  });
  
  return filtered;
};

// Generate summary statistics
export const generateSummaryStats = (results: AnalysisResult[]) => {
  const totalFollowers = results.length;
  const suspiciousCount = results.filter(r => r.realScore < 50).length;
  const inactiveCount = results.filter(r => 
    r.issues.some(issue => issue.type === 'inactive')
  ).length;
  const averageRealScore = results.reduce((acc, r) => acc + r.realScore, 0) / totalFollowers;
  
  return {
    totalFollowers,
    suspiciousCount,
    inactiveCount,
    suspiciousPercentage: (suspiciousCount / totalFollowers) * 100,
    inactivePercentage: (inactiveCount / totalFollowers) * 100,
    averageRealScore
  };
};