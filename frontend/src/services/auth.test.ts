import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import * as auth from './auth';

describe('Auth Service', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  describe('getToken', () => {
    it('should return null when no token exists', () => {
      expect(auth.getToken()).toBeNull();
    });

    it('should return token when it exists', () => {
      const token = 'test-token';
      localStorage.setItem('auth_token', token);
      expect(auth.getToken()).toBe(token);
    });
  });

  describe('setToken', () => {
    it('should store token in localStorage', () => {
      const token = 'test-token';
      auth.setToken(token);
      expect(localStorage.getItem('auth_token')).toBe(token);
    });
  });

  describe('removeToken', () => {
    it('should remove token from localStorage', () => {
      localStorage.setItem('auth_token', 'test-token');
      auth.removeToken();
      expect(localStorage.getItem('auth_token')).toBeNull();
    });
  });

  describe('isAuthenticated', () => {
    it('should return false when no token exists', () => {
      expect(auth.isAuthenticated()).toBe(false);
    });

    it('should return true when token exists', () => {
      localStorage.setItem('auth_token', 'test-token');
      expect(auth.isAuthenticated()).toBe(true);
    });
  });

  describe('login', () => {
    it('should successfully login with valid credentials', async () => {
      const mockResponse = {
        token: 'test-token',
        message: 'Login successful',
      };

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockResponse,
      } as Response);

      const result = await auth.login({
        username: 'admin',
        password: 'admin',
      });

      expect(result).toEqual(mockResponse);
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/login'),
        expect.objectContaining({
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        })
      );
    });

    it('should throw error with invalid credentials', async () => {
      const mockError = {
        error: 'Invalid credentials',
      };

      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        json: async () => mockError,
      } as Response);

      await expect(
        auth.login({
          username: 'invalid',
          password: 'invalid',
        })
      ).rejects.toThrow('Invalid credentials');
    });
  });
});

