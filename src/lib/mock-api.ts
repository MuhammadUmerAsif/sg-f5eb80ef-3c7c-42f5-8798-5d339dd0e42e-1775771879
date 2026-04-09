export const mockDelay = (ms: number = 800) => 
  new Promise(resolve => setTimeout(resolve, ms));

export const mockApiCall = async (delayOrData?: any) => {
  const delay = typeof delayOrData === 'number' ? delayOrData : 800;
  await mockDelay(delay);
};

export class MockApiClient {
  async get<T>(endpoint: string): Promise<T> {
    await mockDelay();
    console.log(`[Mock API] GET ${endpoint}`);
    return {} as T;
  }

  async post<T>(endpoint: string, data?: unknown): Promise<T> {
    await mockDelay();
    console.log(`[Mock API] POST ${endpoint}`, data);
    return {} as T;
  }

  async put<T>(endpoint: string, data?: unknown): Promise<T> {
    await mockDelay();
    console.log(`[Mock API] PUT ${endpoint}`, data);
    return {} as T;
  }

  async patch<T>(endpoint: string, data?: unknown): Promise<T> {
    await mockDelay();
    console.log(`[Mock API] PATCH ${endpoint}`, data);
    return {} as T;
  }

  async delete<T>(endpoint: string): Promise<T> {
    await mockDelay();
    console.log(`[Mock API] DELETE ${endpoint}`);
    return {} as T;
  }
}

export const api = new MockApiClient();

// Success/Error simulation helpers
export function simulateSuccess<T>(data: T, delay?: number): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), delay || 800);
  });
}

export function simulateError(message: string, delay?: number): Promise<never> {
  return new Promise((_, reject) => {
    setTimeout(() => reject(new Error(message)), delay || 800);
  });
}

// Random success/failure for testing error states
export function simulateRandomOutcome<T>(
  successData: T,
  errorMessage: string = "Operation failed",
  successRate: number = 0.8
): Promise<T> {
  return Math.random() < successRate
    ? simulateSuccess(successData)
    : simulateError(errorMessage);
}