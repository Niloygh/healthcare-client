import AllDoctorsSection from '@/component/AllDoctorsSection';
import { AllDoctors } from '@/lib/action/doctors';
import React from 'react';

const FindDoctor = async () => {

    const allDoctors = await AllDoctors()

    console.log(allDoctors)
    
    return (
        <div>
            <AllDoctorsSection allDoctors={allDoctors} />
        </div>
    );
};

export default FindDoctor;