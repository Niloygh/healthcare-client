'use server'

import { getTokenServer } from "../getTokenServer";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// appointment POST api 
export const appointment = async (data) => {

    const token = await getTokenServer()
    
    const res = await fetch(`${baseUrl}/appointment`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })

    const result = await res.json()
    return result
}

// appointment Get Api
export const getAppointment = async (clientEmail) => {
    const res = await fetch(`${baseUrl}/appointment/${clientEmail}`)

    if (!res.ok) {
      return null;
    }
    
    const result = await res.json()
    return result
}

export const DeleteAppointment = async (appointmentId) => {
    const res = await fetch(`${baseUrl}/appointment/${appointmentId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    });

    const result = await res.json()
    return result
    
}