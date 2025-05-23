import { User, Follower, AnalysisSession } from '../types';

export const mockUserData: User = {
  id: 'user123',
  username: 'techuser',
  name: 'Tech User',
  avatarUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300',
  platform: 'twitter',
  followerCount: 1243,
  followingCount: 587
};

// Helper to generate a random date within the past year
const getRandomDate = (monthsAgo = 12) => {
  const date = new Date();
  date.setMonth(date.getMonth() - Math.floor(Math.random() * monthsAgo));
  return date.toISOString();
};

// Generate an array of mock followers
export const generateMockFollowers = (count: number): Follower[] => {
  const followers: Follower[] = [];
  
  const bios = [
    "Digital enthusiast | Tech lover | Coffee addict",
    "Professional procrastinator | Avid reader",
    "Marketing specialist | Travel buff | Food lover",
    null,
    "Crypto investor 💰 DM for opportunities! #NFT #Bitcoin",
    "Follow for follow! Check out my latest giveaway!",
    "Just here to observe",
    "Living life one day at a time ✨",
    "Click the link in bio for free cashapp money! 💸",
    ""
  ];
  
  for (let i = 0; i < count; i++) {
    const hasProfilePic = Math.random() > 0.3;
    const followerCount = Math.floor(Math.random() * 2000);
    const followingCount = Math.floor(Math.random() * 2000);
    const isInactive = Math.random() > 0.7;
    const isSpammy = Math.random() > 0.8;
    
    followers.push({
      id: `follower${i}`,
      username: isSpammy ? `crypto_fan_${i}_giveway` : `user_${i}`,
      name: isSpammy ? `Crypto Fan ${i} | Giveaway` : `User ${i}`,
      avatarUrl: hasProfilePic 
        ? `https://images.pexels.com/photos/${5000 + i}/pexels-photo-${5000 + i}.jpeg?auto=compress&cs=tinysrgb&w=300` 
        : null,
      bio: bios[Math.floor(Math.random() * bios.length)],
      followerCount,
      followingCount,
      tweetCount: isInactive ? Math.floor(Math.random() * 5) : Math.floor(Math.random() * 2000),
      lastActivityDate: isInactive 
        ? getRandomDate(24) // Inactive users have older last activity
        : getRandomDate(3),  // Active users have recent activity
      joinDate: getRandomDate(36),
      isVerified: Math.random() > 0.9,
      isProtected: Math.random() > 0.9
    });
  }
  
  return followers;
};

// Analysis logic for generating scores
export const analyzeMockFollowers = (followers: Follower[]): AnalysisSession => {
  const results = followers.map(follower => {
    const issues = [];
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
      follower.bio.toLowerCase().includes('crypto') ||
      follower.bio.toLowerCase().includes('giveaway') ||
      follower.bio.toLowerCase().includes('cashapp') ||
      follower.bio.toLowerCase().includes('click') ||
      follower.bio.toLowerCase().includes('link in bio')
    ) {
      issues.push({
        type: 'spam_keywords',
        description: 'Bio contains potential spam keywords',
        severity: 'high'
      });
      scoreDeduction += 30;
    }
    
    // Check for low ratio
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
    let realScore = 100 - scoreDeduction;
    if (realScore < 0) realScore = 0;
    
    return {
      id: `analysis_${follower.id}`,
      follower,
      realScore,
      issues,
      isMarkedSuspicious: false,
      isHidden: false
    };
  });
  
  // Calculate summary stats
  const suspiciousCount = results.filter(r => r.realScore < 50).length;
  const inactiveCount = results.filter(r => 
    r.issues.some(issue => issue.type === 'inactive')
  ).length;
  const averageRealScore = results.reduce((acc, r) => acc + r.realScore, 0) / results.length;
  
  return {
    id: `session_${Date.now()}`,
    userId: mockUserData.id,
    platform: mockUserData.platform,
    date: new Date().toISOString(),
    totalFollowers: followers.length,
    analyzedFollowers: followers.length,
    suspiciousCount,
    inactiveCount,
    averageRealScore,
    results
  };
};

// Generate a complete mock analysis session
export const generateMockAnalysisSession = (): AnalysisSession => {
  const mockFollowers = generateMockFollowers(30);
  return analyzeMockFollowers(mockFollowers);
};

// For storing analysis sessions
export const mockAnalysisSessions: AnalysisSession[] = [
  generateMockAnalysisSession()
];