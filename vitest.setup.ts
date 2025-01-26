import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { configMocks } from 'jsdom-testing-mocks';
import { act } from 'react';
import { afterEach, vi } from 'vitest';

vi.mock('server only', () => {
  return {};
});

// runs a cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup();
});

configMocks({ act });

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});
