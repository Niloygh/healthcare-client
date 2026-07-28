'use server'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const createDoctors = async (newDoctors) => {
    const res = await fetch(`${baseUrl}/doctors`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
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