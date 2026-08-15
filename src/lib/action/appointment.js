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

// delete api 
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


// update api date update
export const updateAppointment = async (appointmentId, updatedData) => {
    const res = await fetch(`${baseUrl}/appointment/${appointmentId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            date: updatedData.date, 
            day: updatedData.day,
            time: updatedData.time,
        }),
    })

    const result = await res.json()
    return result
}


// status update api for doctor 
// appointment status update PATCH api (Accept / Reject)
export const updateAppointmentStatus = async (appointmentId, appointmentStatus) => {
    // const token = await getTokenServer();

    const res = await fetch(`${baseUrl}/appointment/status/${appointmentId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            // authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ appointmentStatus })
    });

    const result = await res.json();

    return result;
}