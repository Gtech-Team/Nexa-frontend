/**
 * Google OAuth Configuration for Nexa Frontend
 */

export interface GoogleOAuthConfig {
  clientId: string;
  redirectUri: string;
  scope: string;
}

export const googleOAuthConfig: GoogleOAuthConfig = {
  clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '',
  redirectUri: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI || 'http://localhost:3000/auth/google/callback',
  scope: 'openid email profile',
};

export interface GoogleUser {
  id: string;
  email: string;
  name: string;
  picture: string;
  email_verified: boolean;
}

interface GoogleCredentialResponse {
  credential: string;
  select_by: string;
}

interface GoogleNotification {
  isNotDisplayed(): boolean;
  isSkippedMoment(): boolean;
  getNotDisplayedReason(): string;
  getSkippedReason(): string;
}

interface GoogleButtonConfig {
  theme?: 'outline' | 'filled_blue' | 'filled_black';
  size?: 'large' | 'medium' | 'small';
  width?: number;
  text?: 'signin_with' | 'signup_with' | 'continue_with' | 'signin';
  shape?: 'rectangular' | 'pill' | 'circle' | 'square';
}

interface GoogleAuthWindow extends Window {
  google: {
    accounts: {
      id: {
        initialize(config: {
          client_id: string;
          callback: (response: GoogleCredentialResponse) => void;
          auto_select?: boolean;
          cancel_on_tap_outside?: boolean;
        }): void;
        prompt(callback?: (notification: GoogleNotification) => void): void;
        renderButton(element: HTMLElement, options: GoogleButtonConfig): void;
        disableAutoSelect(): void;
      };
    };
  };
  googleAuthResolve?: () => void;
  googleAuthReject?: (error: Error) => void;
}

export class GoogleOAuth {
  private static instance: GoogleOAuth;
  private isGoogleLoaded = false;

  private constructor() {}

  static getInstance(): GoogleOAuth {
    if (!GoogleOAuth.instance) {
      GoogleOAuth.instance = new GoogleOAuth();
    }
    return GoogleOAuth.instance;
  }

  async loadGoogleScript(): Promise<void> {
    if (this.isGoogleLoaded) return;

    return new Promise((resolve, reject) => {
      if (document.getElementById('google-oauth-script')) {
        this.isGoogleLoaded = true;
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.id = 'google-oauth-script';
      script.src = 'https://accounts.google.com/gsi/client';
      script.onload = () => {
        this.isGoogleLoaded = true;
        resolve();
      };
      script.onerror = () => reject(new Error('Failed to load Google OAuth script'));
      document.head.appendChild(script);
    });
  }

  /**
   * Initiate Google OAuth with Authorization Code Flow
   */
  initiateGoogleOAuth(): void {
    const params = new URLSearchParams({
      client_id: googleOAuthConfig.clientId,
      redirect_uri: googleOAuthConfig.redirectUri,
      response_type: 'code',
      scope: googleOAuthConfig.scope,
      access_type: 'offline',
      prompt: 'consent',
      state: this.generateRandomState(),
    });

    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
  }

  /**
   * Generate random state for CSRF protection
   */
  private generateRandomState(): string {
    return Math.random().toString(36).substring(2, 15) + 
           Math.random().toString(36).substring(2, 15);
  }

  async initializeGoogleAuth(): Promise<void> {
    await this.loadGoogleScript();
    
    if (!window.google) {
      throw new Error('Google OAuth library not loaded');
    }

    window.google.accounts.id.initialize({
      client_id: googleOAuthConfig.clientId,
      callback: this.handleGoogleCallback.bind(this),
      auto_select: false,
      cancel_on_tap_outside: true,
    });
  }

  private async handleGoogleCallback(response: GoogleCredentialResponse): Promise<void> {
    try {
      const credential = response.credential;
      
      // Send the credential to our backend for verification
      const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:6000/api'}/auth/google`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ credential }),
        credentials: 'include',
      });

      const data = await result.json();

      if (data.success) {
        // Store auth data and redirect
        localStorage.setItem('nexa_access_token', data.data.accessToken);
        localStorage.setItem('nexa_refresh_token', data.data.refreshToken);
        localStorage.setItem('nexa_user', JSON.stringify(data.data.user));
        
        // Dispatch custom event for auth state update
        window.dispatchEvent(new CustomEvent('auth-state-changed', {
          detail: { user: data.data.user, isAuthenticated: true }
        }));
        
        // Redirect to find-business page
        window.location.href = '/find-business';
      } else {
        throw new Error(data.message || 'Google authentication failed');
      }
    } catch (error) {
      console.error('Google OAuth error:', error);
      throw error;
    }
  }

  async signInWithPopup(): Promise<void> {
    await this.initializeGoogleAuth();
    
    return new Promise((resolve, reject) => {
      if (!window.google) {
        reject(new Error('Google OAuth not initialized'));
        return;
      }

      // Store resolve/reject in window for callback access
      (window as GoogleAuthWindow).googleAuthResolve = resolve;
      (window as GoogleAuthWindow).googleAuthReject = reject;

      try {
        window.google.accounts.id.prompt((notification: GoogleNotification) => {
          if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
            // Fallback to one-tap if popup is blocked
            this.showOneTap();
          }
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  showOneTap(): void {
    if (!window.google) return;
    
    window.google.accounts.id.prompt();
  }

  renderSignInButton(element: HTMLElement, options: GoogleButtonConfig = {}): void {
    if (!window.google) return;

    window.google.accounts.id.renderButton(element, {
      theme: 'outline',
      size: 'large',
      width: element.offsetWidth,
      ...options,
    });
  }

  async signOut(): Promise<void> {
    if (window.google) {
      window.google.accounts.id.disableAutoSelect();
    }
  }
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    google: {
      accounts: {
        id: {
          initialize(config: {
            client_id: string;
            callback: (response: GoogleCredentialResponse) => void;
            auto_select?: boolean;
            cancel_on_tap_outside?: boolean;
          }): void;
          prompt(callback?: (notification: GoogleNotification) => void): void;
          renderButton(element: HTMLElement, options: GoogleButtonConfig): void;
          disableAutoSelect(): void;
        };
      };
    };
    googleAuthResolve?: () => void;
    googleAuthReject?: (error: Error) => void;
  }
}

export const googleAuth = GoogleOAuth.getInstance();
