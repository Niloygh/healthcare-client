import ProfessionalCredentialsPage from '@/component/dashboard/doctor/profile';
import { getDoctorByEmail } from '@/lib/action/doctors';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import React from 'react';

const DoctorProfilePage = async () => {

  const session = await auth.api.getSession({
    headers: await headers(), 
  });

  const user = session?.user;
  
  const userData = await getDoctorByEmail(user.email)
  

  return (
    <div>
      <ProfessionalCredentialsPage userData={userData} />
    </div>
  );
};

export default DoctorProfilePage;