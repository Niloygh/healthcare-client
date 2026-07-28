import DoctorDetails from '@/component/DoctorsDetails';
import React from 'react';

const DoctorDetailsPage = async ({params}) => {
    const {id} = await params

    const res = await fetch(`
        ${process.env.NEXT_PUBLIC_BASE_URL}/doctor/${id}`
    );
    
    const doctor = await res.json()
    // console.log(data)


    
    return (
        <div>
            <DoctorDetails doctor={doctor} />
        </div>
    );
};

export default DoctorDetailsPage;