'use server'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// payment post api 
export const payment = async (data) => {
    const res = await fetch(`${baseUrl}/payment`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    const result = await res.json()
    return result
}



