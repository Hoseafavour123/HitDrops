import { LoginFormData } from "./pages/SignIn";
import { RegisterFormData } from "./pages/SignUp"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ''


{/*export const checkDisplayNameExists = async (val: string) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/displayName/${val}`)
    const data = await response.json()
    return data.exists
}
*/}

export const register = async ( formData: RegisterFormData) => {
    const response = await fetch(`${API_BASE_URL}/api/users/register`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })

    const responseBody =  await response.json();

    if (!response.ok) {
        throw new Error(responseBody.message)
    }
}

export const validateToken = async () => {
    const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
        credentials: 'include'
    })
    if (!response.ok) {
        throw new Error('Token invalid')
    }
}

export const Logout = async () => {
    const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
        credentials: 'include',
        method: 'POST'
    })

    if (!response.ok) {
        throw new Error(' Error during sign out')
    }
}


export const SignIn = async (formData: LoginFormData) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    })
    const body = await response.json()
    if (!response.ok) {
        throw new Error(body.message)
    }
    return body
}