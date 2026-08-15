"use client";

import React, { useState } from 'react';
import { Calendar, Clock, Check, X, FileText } from 'lucide-react';
import { updateAppointmentStatus } from '@/lib/action/appointment';
import { addPrescriptionData } from '@/lib/action/prescription';
import toast from 'react-hot-toast';

const DoctorAppointmentCard = ({ appointment, doctorData }) => {
    const { _id, clientId, clientName, appointmentStatus: initialStatus, date, time, symptoms, appointmentComplete: initialComplete } = appointment;
    const {id:doctorId, name:doctorName} = doctorData
    // console.log( doctorId, name)


    const [status, setStatus] = useState(initialStatus?.toLowerCase() || 'pending');
    const [isCompleted, setIsCompleted] = useState(initialComplete || false);
    const [loading, setLoading] = useState(false);

    // Modal & Form state for Prescription
    const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);
    const [formData, setFormData] = useState({
        doctorId,
        doctorName,
        clientId,
        clientName,
        appointmentId : _id,
        diagnosis: '',
        medications: '',
        advisoryNotes: '',

    });

    const handleStatusChange = async (newStatus) => {
        setLoading(true);
        const data = await updateAppointmentStatus(_id, newStatus);
        if (data.success) {
            setStatus(newStatus);
        } else {
            alert(data.message || 'Not Update');
        }
    };

    const handlePrescriptionSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const sendPrescription = await addPrescriptionData(formData)

        if(sendPrescription.success) {
            setIsCompleted(true);
            setShowPrescriptionModal(false)
            toast.success("Prescription Successful Send")
        }else{
            toast.error(sendPrescription.message || "Prescription send Problem" )
        }

    };

    return (
        <>
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    {/* Left Side: Patient Info */}
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <h2 className="text-xl font-bold text-gray-800">
                                {clientName}
                            </h2>
                            <span className={`text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-md border ${isCompleted
                                    ? 'bg-blue-50 text-blue-700 border-blue-200'
                                    : status === 'accepted'
                                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                        : status === 'rejected'
                                            ? 'bg-red-50 text-red-600 border-red-200'
                                            : 'bg-amber-50 text-amber-700 border-amber-200'
                                }`}>
                                {isCompleted ? 'COMPLETED' : status}
                            </span>
                        </div>

                        <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                            <span className="flex items-center gap-1.5">
                                <Calendar className="w-4 h-4 text-gray-400" />
                                {date}
                            </span>
                            <span className="flex items-center gap-1.5">
                                <Clock className="w-4 h-4 text-gray-400" />
                                {time}
                            </span>
                        </div>
                    </div>

                    {/* Right Side: Actions */}
                    <div className="flex items-center gap-3">
                        {status === 'pending' && (
                            <>
                                <button
                                    disabled={loading}
                                    onClick={() => handleStatusChange('accepted')}
                                    className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors shadow-sm cursor-pointer"
                                >
                                    <Check className="w-4 h-4" /> Accept
                                </button>

                                <button
                                    disabled={loading}
                                    onClick={() => handleStatusChange('rejected')}
                                    className="flex items-center gap-1.5 bg-red-50 hover:bg-red-100 disabled:opacity-50 text-red-600 text-xs font-semibold px-4 py-2 rounded-lg border border-red-200 transition-colors cursor-pointer"
                                >
                                    <X className="w-4 h-4" /> Reject
                                </button>
                            </>
                        )}

                        {/* Accept করার পর কিন্তু এখনো Complete না হলে এই বাটনটি দেখাবে */}
                        {status === 'accepted' && !isCompleted && (
                            <button
                                onClick={() => setShowPrescriptionModal(true)}
                                className="flex items-center gap-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold px-4 py-2.5 rounded-lg transition-all shadow-md cursor-pointer"
                            >
                                <FileText className="w-4 h-4" /> Mark Completed & Prescribe
                            </button>
                        )}

                        {/* Complete হয়ে গেলে */}
                        {isCompleted && (
                            <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold px-4 py-2 rounded-lg">
                                Prescribed & Completed
                            </span>
                        )}

                        {status === 'rejected' && (
                            <span className="bg-red-50 text-red-600 border border-red-200 text-xs font-semibold px-4 py-2 rounded-lg uppercase">
                                Rejected
                            </span>
                        )}
                    </div>
                </div>

                {/* Symptom Presentation Box */}
                <div className="bg-gray-50 rounded-xl p-3.5 border border-gray-100 mt-3">
                    <p className="text-sm text-gray-600">
                        <strong className="text-gray-800">Symptom Presentation:</strong> {symptoms}
                    </p>
                </div>
            </div>

            {/* ---------- PRESCRIPTION MODAL ---------- */}
            {showPrescriptionModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
                    <div className="bg-emerald-50/50 border border-emerald-100 rounded-3xl max-w-3xl w-full p-8 shadow-2xl bg-white">

                        {/* Header */}
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-emerald-950">
                                Medications & Prescription Records
                            </h2>
                            <button
                                onClick={() => setShowPrescriptionModal(false)}
                                className="text-gray-400 hover:text-gray-600 text-xl font-bold"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Card Container */}
                        <div className="bg-emerald-50/40 border border-emerald-100 rounded-2xl p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-bold text-emerald-900">
                                    Generate Digital Rx
                                </h3>
                                <span className="bg-white border border-emerald-100 px-3 py-1 rounded-full text-xs font-semibold text-emerald-800">
                                    Patient: <strong>{clientName}</strong>
                                </span>
                            </div>

                            <form onSubmit={handlePrescriptionSubmit} className="space-y-5">
                                {/* Clinical Diagnosis */}
                                <div>
                                    <label className="block text-xs font-bold text-emerald-800 uppercase tracking-wider mb-2">
                                        CLINICAL DIAGNOSIS
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="e.g., Acute Respiratory Infection, Hypercholesterolemia"
                                        value={formData.diagnosis}
                                        onChange={(e) => setFormData({ ...formData, diagnosis: e.target.value })}
                                        className="w-full bg-white border border-emerald-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-700"
                                    />
                                </div>

                                {/* Medications Instructions */}
                                <div>
                                    <label className="block text-xs font-bold text-emerald-800 uppercase tracking-wider mb-2">
                                        MEDICATIONS INSTRUCTIONS
                                    </label>
                                    <textarea
                                        rows={3}
                                        required
                                        placeholder="e.g., Aspirin 81mg (Daily post breakfast), Amoxicillin 500mg (3x daily for 7 days)"
                                        value={formData.medications}
                                        onChange={(e) => setFormData({ ...formData, medications: e.target.value })}
                                        className="w-full bg-white border border-emerald-100 rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-700 resize-none"
                                    />
                                </div>

                                {/* Advisory Notes */}
                                <div>
                                    <label className="block text-xs font-bold text-emerald-800 uppercase tracking-wider mb-2">
                                        ADVISORY NOTES
                                    </label>
                                    <textarea
                                        rows={2}
                                        placeholder="e.g., Avoid strenuous workouts, take rest and rehydrate frequently."
                                        value={formData.advisoryNotes}
                                        onChange={(e) => setFormData({ ...formData, advisoryNotes: e.target.value })}
                                        className="w-full bg-white border border-emerald-100 rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-700 resize-none"
                                    />
                                </div>

                                {/* Action Buttons */}
                                <div className="flex justify-end items-center gap-3 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setShowPrescriptionModal(false)}
                                        className="bg-white border border-gray-200 text-gray-700 px-6 py-2.5 rounded-xl font-medium text-sm hover:bg-gray-50 transition-colors"
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="bg-emerald-800 hover:bg-emerald-900 text-white px-6 py-2.5 rounded-xl font-medium text-sm transition-colors disabled:opacity-50"
                                    >
                                        {loading ? 'Issuing...' : 'Issue Digital Prescription'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default DoctorAppointmentCard;