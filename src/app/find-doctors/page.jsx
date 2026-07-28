import { AllDoctors } from '@/lib/action/doctors';
import React from 'react';

const FindDoctor = async () => {

    const allDoctors = await AllDoctors()

    console.log(allDoctors)
    
    return (
        <div>
            find doctor page
        </div>
    );
};

export default FindDoctor;