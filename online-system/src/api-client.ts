import { RegisterFormData } from "./pages/Register";
import { SignInFormData } from "./pages/SignIn";
// import {server-base-url} from '..
const API_BASE_url=import.meta.env.API_BASE_URL || ''
export const register = async (formData: RegisterFormData) => {
  const res = await fetch(`${API_BASE_url}/api/users/register`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  const responseBody = await res.json();

  if (!res.ok) {
    throw new Error(responseBody.message);
  }
};

export const signIn = async (formData: SignInFormData) => {
  const response = await fetch(`${API_BASE_url}/api/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const body = await response.json();
  if (!response.ok) {
    throw new Error(body.message);
  }
  return body;
};

export const signout = async () => {
  const response = await fetch(`${API_BASE_url}/api/auth/logout`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Error During Sign out");
  }
};
export const validateToken = async () => {
  const res = await fetch(`${API_BASE_url}/api/auth/validate-token`, {
    credentials: "include",
  })
  if (!res.ok) {
    throw new Error("Invalid Token");
  }
  return res.json();
};
