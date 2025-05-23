import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { mockUserData } from '../data/mockData';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (platform: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem('realreach_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (platform: string) => {
    setLoading(true);
    try {
      // In a real app, this would be replaced with actual OAuth flow
      // For demo purposes, we'll use mock data
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay
      
      const userData = { ...mockUserData, platform };
      setUser(userData);
      localStorage.setItem('realreach_user', JSON.stringify(userData));
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('realreach_user');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};