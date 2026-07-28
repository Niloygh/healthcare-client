import ScheduleSelector from '@/component/dashboard/doctor/schedules';
import { getDoctorByEmail } from '@/lib/action/doctors';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import React from 'react';

const DoctorsSchedulePage = async () => {

  const session = await auth.api.getSession({
      headers: await headers(), 
    });
  
    const user = session?.user;
    
    const userData = await getDoctorByEmail(user.email)
    // console.log(userData)
  
  return (
    <div>
      <ScheduleSelector userData={userData} /> 
    </div>
  );
};

export default DoctorsSchedulePage;