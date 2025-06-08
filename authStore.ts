import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  isAdmin: boolean;
}

interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshSession: () => Promise<void>;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      refreshToken: null,
      isAuthenticated: false,

      login: async (email: string, password: string) => {
        try {
          const response = await axios.post('http://localhost:5000/api/login', {
            email,
            password,
          });

          const { user, access_token, refresh_token } = response.data;

          set({
            user,
            token: access_token,
            refreshToken: refresh_token,
            isAuthenticated: true,
          });

          // Set default authorization header
          axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
        } catch (error) {
          console.error('Login error:', error);
          throw error;
        }
      },

      logout: async () => {
        try {
          await axios.post('http://localhost:5000/api/logout');
          
          // Clear auth headers
          delete axios.defaults.headers.common['Authorization'];
          
          set({
            user: null,
            token: null,
            refreshToken: null,
            isAuthenticated: false,
          });
        } catch (error) {
          console.error('Logout error:', error);
          throw error;
        }
      },

      refreshSession: async () => {
        try {
          const response = await axios.post('http://localhost:5000/api/refresh-token', {
            refresh_token: useAuthStore.getState().refreshToken,
          });

          const { access_token, refresh_token } = response.data;

          set((state) => ({
            ...state,
            token: access_token,
            refreshToken: refresh_token,
          }));

          axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
        } catch (error) {
          console.error('Session refresh error:', error);
          // If refresh fails, log out the user
          useAuthStore.getState().logout();
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export default useAuthStore;