'use client'

import React, { useState } from 'react';

const AppointmentModal = ({appointment, status, showPrescriptionModal}) => {
    const { _id, clientName, appointmentStatus: initialStatus, date, time, symptoms, appointmentComplete: initialComplete } = appointment;

    // Modal & Form state for Prescription

    const [formData, setFormData] = useState({
        diagnosis: '',
        medications: '',
        advisoryNotes: ''
    });
    const [loading, setLoading] = useState(false);

    const handlePrescriptionSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        // try {
        //     const res = await issuePrescription(_id, formData);
        //     if (res.success) {
        //         setIsCompleted(true);
        //         setShowPrescriptionModal(false);
        //         alert('প্রেসক্রিপশন সফলভাবে ইস্যু করা হয়েছে!');
        //     } else {
        //         alert(res.message || 'প্রেসক্রিপশন তৈরি করা যায়নি।');
        //     }
        // } catch (error) {
        //     console.error('Prescription submission error:', error);
        //     alert('কোথাও একটি ভুল হয়েছে!');
        // } finally {
        //     setLoading(false);
        // }
    };


    return (
        <div>
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

        </div>
    );
};

export default AppointmentModal;