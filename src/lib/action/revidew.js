'use server'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// review post api
export const review = async (data) => {
    const res = await fetch(`${baseUrl}/review`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    const result = await res.json()
    return result
}

// get review 
export const getReview = async (clientId) => {
    const res = await fetch(`${baseUrl}/review/${clientId}`)
    const result = await res.json()
    return result
}