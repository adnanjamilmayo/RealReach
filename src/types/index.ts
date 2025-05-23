export interface User {
  id: string;
  username: string;
  name: string;
  avatarUrl: string;
  platform: string;
  followerCount: number;
  followingCount: number;
  token?: string;
}

export interface Follower {
  id: string;
  username: string;
  name: string;
  avatarUrl: string | null;
  bio: string | null;
  followerCount: number;
  followingCount: number;
  tweetCount: number;
  lastActivityDate: string;
  joinDate: string;
  isVerified: boolean;
  isProtected: boolean;
}

export interface AnalysisResult {
  id: string;
  follower: Follower;
  realScore: number;
  issues: FollowerIssue[];
  isMarkedSuspicious: boolean;
  isHidden: boolean;
}

export interface FollowerIssue {
  type: 'no_profile_picture' | 'suspicious_bio' | 'low_ratio' | 'inactive' | 'spam_keywords';
  description: string;
  severity: 'low' | 'medium' | 'high';
}

export interface AnalysisSession {
  id: string;
  userId: string;
  platform: string;
  date: string;
  totalFollowers: number;
  analyzedFollowers: number;
  suspiciousCount: number;
  inactiveCount: number;
  averageRealScore: number;
  results: AnalysisResult[];
}

export interface Filter {
  scoreRange: [number, number];
  issues: string[];
  markedStatus: 'all' | 'marked' | 'unmarked';
  sortBy: 'score' | 'username' | 'date';
  sortDirection: 'asc' | 'desc';
}