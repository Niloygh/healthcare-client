import PractitionerFeedback from '@/component/dashboard/patient/PatientFeedbackPage';
import { AllDoctors } from '@/lib/action/doctors';
import { getReview } from '@/lib/action/revidew';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import React from 'react';

const FeedbackPage = async () => {

    const session = await auth.api.getSession({
        headers: await headers()
    })

    const user = session.user
    // console.log(user)

    const addAllDoctors = await AllDoctors();
    
    const allReviews = await getReview(user?.id)
    // console.log(allReviews)




    return (
        <div>
            <PractitionerFeedback addAllDoctors={addAllDoctors} user={user} allReviews={allReviews} />
        </div>
    );
};

export default FeedbackPage;