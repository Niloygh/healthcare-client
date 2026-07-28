

export const imageUploader = async (image) => {
    const formData = new FormData();
    formData.append('image', image);
    
    const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
    const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
        method: 'POST',
        body: formData
    });

    const data = await response.json();

    return data;
}