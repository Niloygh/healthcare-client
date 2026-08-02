'use server'

import { getTokenServer } from "../getTokenServer";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const createDoctors = async (newDoctors) => {

    // const token = await getTokenServer()
    
    const res = await fetch(`${baseUrl}/doctors`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            // authorization: `Bearer ${token}`
        },
        body: JSON.stringify(newDoctors)
    });

    if (!res.ok) {
        throw new Error('Failed to update doctor profile');
    }

    return res.json()
}


export const AllDoctors = async () => {
    const res = await fetch(`${baseUrl}/doctors`)
    const data = await res.json()
    return data
}

export const limitDoctors = async () => {
    const res = await fetch(`${baseUrl}/limit-doctors`)
    const data = await res.json()
    return data
}

export const getDoctorByEmail = async (email) => {
    if (!email) return null;

    const res = await fetch(`${baseUrl}/doctors/${email}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      return null;
    }

    const data = await res.json();
    return data;
}


export const updateDoctorSchedule = async (scheduleData) => {
    const res = await fetch(`${baseUrl}/doctors/schedule`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(scheduleData)
    });

    if (!res.ok) {
        throw new Error('Failed to update doctor profile');
    }

    const data = await res.json()

    return data
}