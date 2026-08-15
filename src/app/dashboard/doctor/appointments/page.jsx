import DoctorAppointmentCard from '@/component/dashboard/doctor/DoctorAppointmentCard';
import { doctorAllAppointment } from '@/lib/action/doctors';
import { clientId } from '@/lib/action/userId';
import React from 'react';

const DoctorAppointmentPage = async () => {

    const userData = await clientId()
    const id = userData.id
    // console.log(id)

    const doctorAppointment = await doctorAllAppointment(id)
    console.log(doctorAppointment)


    return (
        <div className="min-h-screen bg-gray-50/50 text-gray-800 p-6 md:p-10">
            {/* Header Section */}
            <div className="max-w-5xl mx-auto mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                        Clinical Appointment Inbox
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Review and manage incoming patient consultations
                    </p>
                </div>
                <span className="bg-emerald-50 text-emerald-700 text-xs font-semibold px-3 py-1.5 rounded-full border border-emerald-200">
                    Total: {doctorAppointment.length}
                </span>
            </div>

            {/* Appointment Cards List */}
            <div className="max-w-5xl mx-auto space-y-5">
                {doctorAppointment.length === 0 ? (
                    <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-sm">
                        <p className="text-gray-500 font-medium">No appointments found in inbox.</p>
                    </div>
                ) : (
                    doctorAppointment.map((appointment) => (
                        <DoctorAppointmentCard key={appointment._id} appointment={appointment} doctorData={userData} />
                    ))
                )}
            </div>
        </div>
    );
};

export default DoctorAppointmentPage;