import { getAppointment } from '@/lib/action/appointment';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import React from 'react';
import { Calendar, Clock, CreditCard, Stethoscope, AlertCircle } from 'lucide-react'; // Tailwind/Lucide icons (optional)
import AppointmentCard from '@/component/dashboard/patient/AppointmentCard';

const patientAppointmentPage = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    // Fetch user appointments
    const allAppointment = await getAppointment(session?.user?.email) || [];

    return (
        <div className="min-h-screen bg-gray-50/50 p-6 md:p-10">
            {/* Header Section */}
            <div className="max-w-5xl mx-auto mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                        Appointment Records
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Manage your upcoming and past medical consultations
                    </p>
                </div>
                <span className="bg-emerald-50 text-emerald-700 text-xs font-semibold px-3 py-1.5 rounded-full border border-emerald-200">
                    Total: {allAppointment?.length || 0}
                </span>
            </div>

            {/* Appointment Cards List */}
            <div className="max-w-5xl mx-auto space-y-5">
                {allAppointment?.length === 0 ? (
                    <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-sm">
                        <p className="text-gray-500 font-medium">No appointments found.</p>
                    </div>
                ) : (
                    allAppointment.map((appointment) => (
                        <AppointmentCard key={appointment._id} appointment={appointment} />
                    ))
                )}
            </div>
        </div>
    );
};

// Component to render individual Appointment Card


export default patientAppointmentPage;