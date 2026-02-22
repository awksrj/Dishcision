/**
 * User Service
 * Handles user profile management, preferences, and data operations
 */

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  phone?: string;
  preferences: UserPreferences;
  stats: UserStats;
}

export interface UserPreferences {
  notifications: boolean;
  darkMode: boolean;
  language: string;
}

export interface UserStats {
  totalLogins: number;
  lastActive: Date;
  accountAge: number; // in days
}

class UserService {
  private readonly API_BASE_URL = '/api/users';

  /**
   * Get user profile by ID
   */
  async getUserProfile(userId: string): Promise<UserProfile> {
    // Mock API call
    await this.delay(800);

    return {
      id: userId,
      email: 'user@example.com',
      name: 'Demo User',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + userId,
      preferences: {
        notifications: true,
        darkMode: false,
        language: 'en',
      },
      stats: {
        totalLogins: 42,
        lastActive: new Date(),
        accountAge: 30,
      },
    };
  }

  /**
   * Update user profile
   */
  async updateProfile(
    userId: string,
    updates: Partial<UserProfile>
  ): Promise<{ success: boolean; message: string }> {
    // Mock API call
    await this.delay(1000);

    return {
      success: true,
      message: 'Profile updated successfully',
    };
  }

  /**
   * Update user preferences
   */
  async updatePreferences(
    userId: string,
    preferences: Partial<UserPreferences>
  ): Promise<{ success: boolean }> {
    // Mock API call
    await this.delay(500);

    return { success: true };
  }

  /**
   * Delete user account
   */
  async deleteAccount(userId: string): Promise<{ success: boolean }> {
    // Mock API call
    await this.delay(1500);

    return { success: true };
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

export const userService = new UserService();
