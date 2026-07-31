'use server'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const appointment = async (data) => {
    const res = await fetch(`${baseUrl}/appointment`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    const result = await res.json()
    return result
}