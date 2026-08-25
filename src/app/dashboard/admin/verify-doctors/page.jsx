import React from 'react';
import Image from 'next/image';
import { DoctorLicenseActions } from '@/component/dashboard/admin/DoctorLicenseActions';
import { AllDoctors } from '@/lib/action/doctors';

const VerifyLicensesPage = async () => {
    const doctors = await AllDoctors();

    return (
        <div className="p-4 md:p-8 bg-gray-50/30 min-h-screen">
            <div className="max-w-6xl mx-auto space-y-6">
                
                {/* Header Title */}
                <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
                    Verify Practitioner Licenses
                </h1>

                {/* Grid Container */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {doctors.length > 0 ? (
                        doctors.map((doctor) => {
                            const { _id, name, specialty, hospital, qualifications, experience, fee, image, licenseStatus } = doctor;

                            return (
                                <div 
                                    key={_id} 
                                    className="bg-white border border-gray-200/90 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
                                >
                                    <div>
                                        {/* Doctor Header Info */}
                                        <div className="flex items-start gap-4">
                                            {image ? (
                                                <Image
                                                    width={100}
                                                    height={100}
                                                    src={image}
                                                    alt={name || 'Doctor Image'}
                                                    className="w-14 h-14 rounded-full object-cover border border-gray-100 flex-shrink-0"
                                                />
                                            ) : (
                                                <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center font-bold text-lg flex-shrink-0">
                                                    {name?.charAt(0) || 'D'}
                                                </div>
                                            )}

                                            <div>
                                                <h3 className="font-bold text-slate-900 text-lg leading-snug">
                                                    {name}
                                                </h3>
                                                
                                                <span className="inline-block bg-emerald-50 text-emerald-700 text-xs font-semibold px-2.5 py-0.5 rounded-md mt-1 mb-1">
                                                    {specialty || 'General'}
                                                </span>
                                                
                                                <p className="text-xs font-medium text-gray-400">
                                                    {hospital || 'Independent Practitioner'}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Qualifications & Extra details */}
                                        <div className="mt-4 space-y-1.5 text-xs text-gray-600">
                                            <p>
                                                <span className="font-bold text-gray-700">Qualifications: </span> 
                                                {qualifications || 'N/A'}
                                            </p>
                                            <p>
                                                <span className="font-bold text-gray-700">Clinical Experience: </span> 
                                                {experience ? `${experience} Years` : 'N/A'}
                                            </p>
                                            <p>
                                                <span className="font-bold text-gray-700">Consultation Charge: </span> 
                                                ${fee || '0'}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Action Buttons Component */}
                                    <DoctorLicenseActions 
                                        doctorId={_id} 
                                        currentStatus={licenseStatus} 
                                    />
                                </div>
                            );
                        })
                    ) : (
                        <div className="col-span-2 text-center py-12 bg-white rounded-2xl border border-gray-200 text-gray-500">
                            No doctors found for license verification.
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default VerifyLicensesPage;