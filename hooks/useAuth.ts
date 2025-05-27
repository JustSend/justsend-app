import { useState } from 'react';
import { router } from 'expo-router';

interface LoginCredentials {
  email: string;
  password: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: any | null;
  token: string | null;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    token: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (credentials: LoginCredentials) => {
    try {
      setLoading(true);
      setError(null);

      // TODO: Replace with your actual API endpoint
      const response = await fetch('YOUR_API_ENDPOINT/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Update auth state with the response data
      setAuthState({
        isAuthenticated: true,
        user: data.user,
        token: data.token,
      });

      // Store the token in secure storage
      // TODO: Implement secure storage for the token
      // await SecureStore.setItemAsync('userToken', data.token);

      // Navigate to the main app
      router.replace('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setAuthState({
        isAuthenticated: false,
        user: null,
        token: null,
      });
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      // TODO: Call your logout endpoint if needed
      // await fetch('YOUR_API_ENDPOINT/logout', {
      //     method: 'POST',
      //     headers: {
      //         'Authorization': `Bearer ${authState.token}`,
      //     },
      // });

      // Clear auth state
      setAuthState({
        isAuthenticated: false,
        user: null,
        token: null,
      });

      // Remove token from secure storage
      // await SecureStore.deleteItemAsync('userToken');

      // Navigate to login
      router.replace('/login');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const checkAuth = async () => {
    try {
      setLoading(true);
      // TODO: Implement token validation
      // const token = await SecureStore.getItemAsync('userToken');
      // if (token) {
      //     // Validate token with your backend
      //     const response = await fetch('YOUR_API_ENDPOINT/validate-token', {
      //         headers: {
      //         'Authorization': `Bearer ${token}`,
      //         },
      //     });
      //     if (response.ok) {
      //         const data = await response.json();
      //         setAuthState({
      //             isAuthenticated: true,
      //             user: data.user,
      //             token,
      //         });
      //         return true;
      //     }
      // }
      return false;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    ...authState,
    loading,
    error,
    login,
    logout,
    checkAuth,
  };
};
