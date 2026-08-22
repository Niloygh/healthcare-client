import AllPrescription from '@/component/dashboard/doctor/AllPrescription';
import { allPrescription } from '@/lib/action/prescription';
import { clientId } from '@/lib/action/userId';
import React from 'react';

const PrescriptionsPage = async () => {

    const user = await clientId()
    

    const prescriptions = await allPrescription(user?.id)
    // console.log(ourAllPrescription.length)
    
    return (
        <div className="min-h-screen bg-slate-50/60 p-3 sm:p-6 md:p-8 font-sans">
            <AllPrescription prescriptions={prescriptions} />
        </div>
    );
};

export default PrescriptionsPage;