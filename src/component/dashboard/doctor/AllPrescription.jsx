"use client";

import React, { useState } from 'react';
import { 
    Search, 
    Edit3, 
    X, 
    FileText, 
    Calendar, 
    Pill, 
    CheckCircle2, 
    Sparkles,
    Stethoscope,
    Clock
} from 'lucide-react';
import { UpdatePrescription } from '@/lib/action/prescription';
import { useRouter } from 'next/navigation';

const AllPrescription = ({ prescriptions }) => {
    const router = useRouter()
    
    const [searchTerm, setSearchTerm] = useState('');
    
    // Modal & Edit State
    const [selectedRx, setSelectedRx] = useState(null);
    const [editForm, setEditForm] = useState({ diagnosis: '', medications: '', advisoryNotes: '' });
    const [loading, setLoading] = useState(false);

    const filteredPrescriptions = prescriptions.filter(rx => 
        rx.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rx.diagnosis.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleEditClick = (item) => {
        setSelectedRx(item);
        setEditForm({
            diagnosis: item.diagnosis,
            medications: item.medications,
            advisoryNotes: item.advisoryNotes
        });
    };


    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const prescriptionId = selectedRx._id;

        const updatePrescriptionData = await UpdatePrescription(prescriptionId, editForm)

        if (updatePrescriptionData.success || updatePrescriptionData.modifiedCount > 0) {
                setSelectedRx(null);
                setLoading(false);
                router.refresh();
            } else {
                alert("Update failed!");
            }
        
    };

    return (
        <div>
            
            {/* Header Section */}
            <div className="max-w-7xl mx-auto mb-6 sm:mb-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-1.5 text-emerald-600 font-semibold text-xs tracking-wider uppercase mb-1">
                            <Stethoscope className="w-4 h-4" /> Doctor Management
                        </div>
                        <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                            Medications & Prescription Records
                        </h1>
                        <p className="text-slate-500 text-xs sm:text-sm mt-1">
                            Manage, update and view all issued digital prescriptions for your patients.
                        </p>
                    </div>

                    {/* Stats Card */}
                    <div className="flex items-center gap-3 bg-white p-2.5 sm:p-3 px-4 rounded-2xl border border-slate-200/80 shadow-sm self-start sm:self-auto">
                        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                            <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
                        </div>
                        <div>
                            <p className="text-[10px] sm:text-xs text-slate-400 font-medium">Total Issued</p>
                            <p className="text-sm sm:text-base font-bold text-slate-800">{prescriptions.length} Records</p>
                        </div>
                    </div>
                </div>

                {/* Filter & Search Bar */}
                <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="relative w-full sm:w-80 md:w-96">
                        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                            type="text"
                            placeholder="Search patient name or diagnosis..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2 sm:py-2.5 text-xs sm:text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all shadow-sm"
                        />
                    </div>
                </div>
            </div>

            {/* Prescriptions Responsive Grid */}
            <div className="max-w-7xl mx-auto">
                {filteredPrescriptions.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                        {filteredPrescriptions.map((item) => (
                            <div 
                                key={item._id} 
                                className="bg-white border border-emerald-100/80 rounded-2xl sm:rounded-3xl p-4 sm:p-5 shadow-sm hover:shadow-md transition-all relative overflow-hidden group flex flex-col justify-between"
                            >
                                {/* Decorative Accent Bar */}
                                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-400 opacity-0 group-hover:opacity-100 transition-opacity" />

                                <div>
                                    {/* Card Top Info */}
                                    <div className="flex items-start justify-between gap-2 mb-3 pb-3 border-b border-slate-100">
                                        <div className="flex items-center gap-3 min-w-0">
                                            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-emerald-50 text-emerald-700 font-bold flex-shrink-0 flex items-center justify-center text-base sm:text-lg border border-emerald-100">
                                                {item.clientName.charAt(0).toUpperCase()}
                                            </div>
                                            <div className="min-w-0">
                                                <h2 className="text-base sm:text-lg font-bold text-slate-900 capitalize truncate">
                                                    {item.clientName}
                                                </h2>
                                                <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[11px] text-slate-400 font-medium mt-0.5">
                                                    <span className="flex items-center gap-1">
                                                        <Calendar className="w-3 h-3 text-slate-400" />
                                                        {item.prescriptionDate}
                                                    </span>
                                                    <span>•</span>
                                                    <span className="flex items-center gap-1">
                                                        <Clock className="w-3 h-3 text-slate-400" />
                                                        Rx: {item._id.slice(-5)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Action Button */}
                                        <button
                                            onClick={() => handleEditClick(item)}
                                            className="border border-emerald-200/80 text-emerald-800 bg-emerald-50/50 hover:bg-emerald-100/80 text-[11px] sm:text-xs font-bold px-2.5 sm:px-3 py-1.5 rounded-lg sm:rounded-xl transition-all cursor-pointer flex items-center gap-1 shadow-sm flex-shrink-0"
                                        >
                                            <Edit3 className="w-3.5 h-3.5" /> Modify
                                        </button>
                                    </div>

                                    {/* Details Grid */}
                                    <div className="space-y-2.5 text-xs sm:text-[13px] leading-relaxed">
                                        {/* Diagnosis */}
                                        <div className="bg-slate-50/60 rounded-xl p-2.5 sm:p-3 border border-slate-100">
                                            <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block mb-0.5">
                                                Diagnosis
                                            </span>
                                            <p className="text-slate-800 font-medium line-clamp-2">{item.diagnosis}</p>
                                        </div>

                                        {/* Medications */}
                                        <div className="bg-emerald-50/30 rounded-xl p-2.5 sm:p-3 border border-emerald-100/60">
                                            <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1 mb-0.5">
                                                <Pill className="w-3 h-3" /> Prescribed Medications
                                            </span>
                                            <p className="text-slate-800 font-medium whitespace-pre-line line-clamp-3">{item.medications}</p>
                                        </div>

                                        {/* Advisory Notes */}
                                        <div className="bg-slate-50/60 rounded-xl p-2.5 sm:p-3 border border-slate-100">
                                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-0.5">
                                                Advisory Notes
                                            </span>
                                            <p className="text-slate-600 font-normal line-clamp-2">{item.advisoryNotes}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 sm:py-16 bg-white rounded-2xl sm:rounded-3xl border border-slate-200/60">
                        <FileText className="w-10 h-10 sm:w-12 sm:h-12 text-slate-300 mx-auto mb-3" />
                        <h3 className="text-base sm:text-lg font-bold text-slate-700">No Prescriptions Found</h3>
                        <p className="text-xs text-slate-400 mt-1">Try searching with a different keyword.</p>
                    </div>
                )}
            </div>

            {/* ---------- MODERN RESPONSIVE MODAL ---------- */}
            {selectedRx && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-md p-3 sm:p-4 animate-in fade-in duration-200">
                    <div className="bg-white border border-slate-100 rounded-2xl sm:rounded-3xl max-w-xl w-full p-5 sm:p-7 shadow-2xl relative max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
                        
                        {/* Modal Header */}
                        <div className="flex justify-between items-start mb-4 sm:mb-6 border-b border-slate-100 pb-3 sm:pb-4">
                            <div>
                                <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 uppercase tracking-wider mb-0.5">
                                    <Sparkles className="w-3.5 h-3.5" /> Quick Editor
                                </div>
                                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                                    Modify Digital Rx
                                </h3>
                                <p className="text-xs text-slate-500 mt-0.5">
                                    Patient: <strong className="text-slate-800">{selectedRx.clientName}</strong>
                                </p>
                            </div>
                            <button 
                                onClick={() => setSelectedRx(null)}
                                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-all cursor-pointer flex-shrink-0"
                            >
                                <X className="w-4 h-4 sm:w-5 sm:h-5" />
                            </button>
                        </div>

                        {/* Form Body */}
                        <form onSubmit={handleUpdateSubmit} className="space-y-4">
                            <div>
                                <label className="block text-[11px] sm:text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                                    Clinical Diagnosis
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={editForm.diagnosis}
                                    onChange={(e) => setEditForm({ ...editForm, diagnosis: e.target.value })}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 font-medium transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-[11px] sm:text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                                    Medications Instructions (Rx)
                                </label>
                                <textarea
                                    rows={3}
                                    required
                                    value={editForm.medications}
                                    onChange={(e) => setEditForm({ ...editForm, medications: e.target.value })}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 font-medium resize-y transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-[11px] sm:text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                                    Advisory Notes & Lifestyle Advice
                                </label>
                                <textarea
                                    rows={3}
                                    value={editForm.advisoryNotes}
                                    onChange={(e) => setEditForm({ ...editForm, advisoryNotes: e.target.value })}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 font-medium resize-y transition-all"
                                />
                            </div>

                            {/* Modal Footer Buttons */}
                            <div className="flex justify-end items-center gap-2.5 pt-3 sm:pt-4 border-t border-slate-100">
                                <button
                                    type="button"
                                    onClick={() => setSelectedRx(null)}
                                    className="bg-slate-100 text-slate-700 font-bold text-xs px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl hover:bg-slate-200 transition-colors cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl transition-all shadow-md shadow-emerald-900/10 cursor-pointer disabled:opacity-50 flex items-center gap-1.5 sm:gap-2"
                                >
                                    <CheckCircle2 className="w-4 h-4" />
                                    {loading ? 'Updating...' : 'Save & Publish Rx'}
                                </button>
                            </div>
                        </form>

                    </div>
                </div>
            )}
        </div>
    );
};

export default AllPrescription;