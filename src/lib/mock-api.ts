export const mockDelay = (ms: number = 800) => 
  new Promise(resolve => setTimeout(resolve, ms));

export const mockApiCall = async <T>(data: T): Promise<T> => {
  await mockDelay();
  return data;
};

export const mockApiError = async (message: string = "Something went wrong") => {
  await mockDelay();
  throw new Error(message);
};

export class MockApiClient {
  async get<T>(endpoint: string): Promise<T> {
    await mockDelay();
    console.log(`[Mock API] GET ${endpoint}`);
    return {} as T;
  }

  async post<T>(endpoint: string, data: any): Promise<T> {
    await mockDelay();
    console.log(`[Mock API] POST ${endpoint}`, data);
    return data as T;
  }

  async put<T>(endpoint: string, data: any): Promise<T> {
    await mockDelay();
    console.log(`[Mock API] PUT ${endpoint}`, data);
    return data as T;
  }

  async delete<T>(endpoint: string): Promise<T> {
    await mockDelay();
    console.log(`[Mock API] DELETE ${endpoint}`);
    return {} as T;
  }
}

export const api = new MockApiClient();