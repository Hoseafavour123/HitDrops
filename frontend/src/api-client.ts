
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ''


export const checkDisplayNameExists = async (val: string) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/displayName/${val}`)
    const data = await response.json()
    return data.exists
}