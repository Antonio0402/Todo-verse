import { Auth } from "../store";

const API_AUTH_URL = `${import.meta.env.VITE_BASE_URL}/auth`;

export const login = async (user_email: string, password: string) => {

  return user_email || password
    ? await fetch(`${API_AUTH_URL}/login`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      credentials: "include",
      method: "POST",
      body: JSON.stringify({
        user_email,
        password
      })
    }).then(res => {
      if (!res.ok) {
        throw new Error('Network response was not ok')
      }
      return res.json();
    }).catch(err => { console.error(err); throw err })
    : await Promise.reject(new Error('Invalid email or password'))
}

export const register = async (user_email: string, password: string) => {
  return user_email || password
    ? await fetch(`${API_AUTH_URL}/register`, {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_email,
        password
      })
    }).then(res => {
      if (!res.ok) {
        throw new Error('Network response was not ok')
      }
      return res.json();
    }).catch(err => { console.error(err); throw err })
    : await Promise.reject(new Error('Invalid email or password'))
}

export const logout = async (): Promise<{ message: string } | undefined> => {
  try {
    const res = await fetch(`${API_AUTH_URL}/logout`, {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({})
    });
    if (!res.ok) {
      if (res.status === 403) {
        return {
          message: "Token is not valid!"
        }
      }
      throw new Error('Network response was not ok')
    }
    return {
      message: "No users found!"
    }
  } catch (error) {
    console.error(error);
    throw error
  }
}

export const getUser = async (): Promise<Auth> => {
  try {
    const res = await fetch(`${import.meta.env.VITE_BASE_URL}/user`, {
      method: "GET",
      credentials: "include",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
    if (!res.ok) {
      if (res.status === 401) {
        return {
          success: false,
          message: "You are not authenticated"
        }
      }
      throw new Error('Network response was not ok')
    } else if (res.status === 204) {
      return {
        success: false,
        message: "No users found!"
      }
    }
    return res.json();
  } catch (error) {
    console.error(error);
    throw error
  }
};