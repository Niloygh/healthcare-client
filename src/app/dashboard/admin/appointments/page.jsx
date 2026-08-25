import { allAppointment } from '@/lib/action/admin';
import React from 'react';

const ClinicalRegisterTable = async () => {
    const appointments = await allAppointment();
    // console.log(appointments)

    return (
        <div className="w-full">
            <div className="border border-gray-200 rounded-2xl bg-white overflow-hidden shadow-none">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        {/* Table Header */}
                        <thead>
                            <tr className="bg-gray-50/60 border-b border-gray-200">
                                <th className="text-gray-600 font-bold text-[11px] uppercase tracking-wider py-4 px-6">
                                    PATIENT REPRESENTATIVE
                                </th>
                                <th className="text-gray-600 font-bold text-[11px] uppercase tracking-wider py-4 px-6">
                                    SCHEDULES DOCTOR
                                </th>
                                <th className="text-gray-600 font-bold text-[11px] uppercase tracking-wider py-4 px-6">
                                    SCHEDULED HOURS
                                </th>
                                <th className="text-gray-600 font-bold text-[11px] uppercase tracking-wider py-4 px-6">
                                    BILLING CHARGE
                                </th>
                                <th className="text-gray-600 font-bold text-[11px] uppercase tracking-wider py-4 px-6">
                                    ECOSYSTEM STATUS
                                </th>
                            </tr>
                        </thead>

                        {/* Table Body */}
                        <tbody className="divide-y divide-gray-100">
                            {appointments.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="text-center py-8 text-sm text-gray-500 font-medium">
                                        No appointment records found.
                                    </td>
                                </tr>
                            ) : (
                                appointments.map((item) => {
                                    const {
                                        _id,
                                        clientName,
                                        doctorName,
                                        date,
                                        time,
                                        fee,
                                        paymentStatus,
                                        appointmentComplete,
                                    } = item;

                                    const isPaid = paymentStatus === true;
                                    const isCompleted = appointmentComplete === true;

                                    return (
                                        <tr key={_id || item.id} className="hover:bg-gray-50/50 transition-colors">
                                            {/* Patient Name */}
                                            <td className="py-4 px-6 text-sm">
                                                <span className="font-bold text-gray-900">
                                                    {clientName || 'N/A'}
                                                </span>
                                            </td>

                                            {/* Doctor Name */}
                                            <td className="py-4 px-6 text-sm">
                                                <div>
                                                    <p className="font-bold text-gray-800">
                                                        Dr. {doctorName}
                                                    </p>
                                                </div>
                                            </td>

                                            {/* Scheduled Hours (Date | Time) */}
                                            <td className="py-4 px-6 text-sm">
                                                <span className="font-medium text-gray-500 text-xs font-mono">
                                                    {date} <span className="mx-1 text-gray-300">|</span> {time}
                                                </span>
                                            </td>

                                            {/* Billing Charge */}
                                            <td className="py-4 px-6 text-sm">
                                                <div className="flex items-center gap-2">
                                                    {/* Custom Chip for Payment */}
                                                    <span
                                                        className={`font-bold text-[11px] px-2.5 py-1 rounded-full inline-flex items-center ${
                                                            isPaid
                                                                ? 'bg-emerald-100 text-emerald-700'
                                                                : 'bg-rose-100 text-rose-700'
                                                        }`}
                                                    >
                                                        {isPaid ? 'Paid' : 'Unpaid'}
                                                    </span>
                                                    <span className="text-xs font-semibold text-gray-600">
                                                        ${fee}
                                                    </span>
                                                </div>
                                            </td>

                                            {/* Ecosystem Status */}
                                            <td className="py-4 px-6 text-sm">
                                                {/* Custom Chip for Status */}
                                                <span
                                                    className={`font-extrabold text-[10px] uppercase tracking-wider px-3 py-1 rounded-full inline-flex items-center ${
                                                        isCompleted
                                                            ? 'bg-blue-100/70 text-blue-700'
                                                            : 'bg-amber-100/70 text-amber-700'
                                                    }`}
                                                >
                                                    {isCompleted ? 'COMPLETED' : 'PENDING'}
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ClinicalRegisterTable;