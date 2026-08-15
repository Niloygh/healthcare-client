'use server'

import { getTokenServer } from "../getTokenServer";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// prescription add 
export const addPrescriptionData = async (prescriptionData) => {
    // const token = await getTokenServer();

    const res = await fetch(`${baseUrl}/appointment/prescribe`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // authorization: `Bearer ${token}`
        },
        body: JSON.stringify(prescriptionData)
    });

    const result = await res.json();
    return result;
}