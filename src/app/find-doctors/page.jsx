import AllDoctorsSection from '@/component/AllDoctorsSection';
import { AllDoctors } from '@/lib/action/doctors';
import React from 'react';

const FindDoctor = async ({searchParams}) => {

    const allDoctors = await AllDoctors()

    // console.log(allDoctors)
    const searchQuery = await searchParams;
    const searchText = searchQuery.search || ""
    
    return (
        <div>
            <AllDoctorsSection allDoctors={allDoctors} />
        </div>
    );
};

export default FindDoctor;