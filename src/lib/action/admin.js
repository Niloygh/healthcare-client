'use server'


const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// all users api 
export const allUser = async () => {
    const res = await fetch(`${baseUrl}/admin/users`)
    const data = await res.json()
    return data
}

// Suspend api 
export async function toggleUserSuspend(userId, currentStatus) {
        const res = await fetch(`${baseUrl}/admin/user/suspend/${userId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ suspendStatus: currentStatus }),
        });

        const data = await res.json();

        return data
        
}

// license api 
export async function updateDoctorLicense(doctorId, status) {
        const res = await fetch(`${baseUrl}/admin/doctor/license/${doctorId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status }),
        });

        const data = await res.json();
        return data;
}

// all appointment api 
export const allAppointment = async () => {
    const res = await fetch(`${baseUrl}/admin/all-appointment`, { cache: 'no-store' });
    const data = await res.json();
    return data;
}
