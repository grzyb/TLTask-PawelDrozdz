const LOGIN_API_URL = '/api/login';

export interface LoginApiData {
  email: string;
  password: string;
}

export const loginApi = async (data: LoginApiData) => {
  const loginResponse = await fetch(LOGIN_API_URL,
    {
      method: 'POST',
      body: JSON.stringify(data)
    }
  );
  return await loginResponse.json();
}