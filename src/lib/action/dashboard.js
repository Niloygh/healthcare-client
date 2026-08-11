'use server'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// patient dashboard get api
export const patientDashboard = async (id) => {
    const res = await fetch(`${baseUrl}/patient/dashboard/${id}`)
    const result = await res.json()
    return result    
}
