// utils/apiHelpers.ts

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';

// Generic GET request
export async function apiGet<T>(endpoint: string, token?: string): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    cache: 'no-store',
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'API request failed');
  }

  return res.json();
}

// Generic POST request
export async function apiAuth<TResponse, TPayload>(
    endpoint: string,
    data: TPayload,
    token?: string
): Promise<TResponse> {
  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify(data),
    credentials: "include", // 🔥 ensures cookies are sent & received
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'API request failed');
  }

  return res.json();
}

// Generic POST request
export async function apiPost<TRequest, TResponse>(
  endpoint: string,
  data: TRequest,
  token?: string
): Promise<TResponse> {
  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify(data),
    credentials: "include",
  });

  const contentType = res.headers.get("content-type");

  if (!res.ok) {
    // Check if it's JSON or plain text
    let errorMessage = 'API request failed';
    if (contentType && contentType.includes("application/json")) {
      const errorData = await res.json();
      errorMessage = errorData.message || errorMessage;
    } else {
      const errorText = await res.text();
      errorMessage = errorText || errorMessage;
    }
    throw new Error(errorMessage);
  }

  // Parse response only if it's JSON
  if (contentType && contentType.includes("application/json")) {
    return res.json() as Promise<TResponse>;
  } else {
    throw new Error("Expected JSON response but got something else.");
  }
}


// Generic PUT request
export async function apiPut<TRequest, TResponse>(
  endpoint: string,
  data: TRequest,
  token?: string
): Promise<TResponse> {
  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'API request failed');
  }

  return res.json() as Promise<TResponse>;
}


// Generic DELETE request
export async function apiDelete<TResponse>(
  endpoint: string,
  token?: string
): Promise<TResponse> {
  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'API request failed');
  }

  return res.json();
}
