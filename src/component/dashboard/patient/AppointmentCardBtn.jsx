'use client'

import { DeleteAppointment, updateAppointment } from "@/lib/action/appointment";
import { getDoctorById } from "@/lib/action/doctors";
import { useRouter } from "next/navigation";
import { useState } from "react";

const AppointmentCardBtn = ({ onReschedule, onCancel, isCompleted, appointment }) => {
    const router = useRouter();

    const [isCanceling, setIsCanceling] = useState(false);
    const [isRescheduling, setIsRescheduling] = useState(false);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [doctor, setDoctor] = useState(null);
    const [isLoadingDoctor, setIsLoadingDoctor] = useState(false);

    // Selected state for new schedule
    const [selectedDay, setSelectedDay] = useState("");
    const [selectedTime, setSelectedTime] = useState("");
    const [selectedDate, setSelectedDate] = useState("");

    const handleOpenModal = async () => {
        setIsOpenModal(true);
        if (!doctor && appointment?.doctorId) {
            setIsLoadingDoctor(true);
            try {
                const fetchedDoctor = await getDoctorById(appointment.doctorId);
                setDoctor(fetchedDoctor);
            } catch (error) {
                console.error("Failed to fetch doctor:", error);
            }
            setIsLoadingDoctor(false);
        }
    };

    // Handle Cancel Action
    const handleCancel = async () => {
        if (confirm("Are you sure you want to cancel this appointment?")) {
            setIsCanceling(true);

            const DeleteAppoint = await DeleteAppointment(appointment?._id);
            if (DeleteAppoint) {
                router.refresh();
            }

            setIsCanceling(false);
        }
    };

    const availableTimes = doctor?.date?.find((d) => d.day === selectedDay)?.times || [];

    // Handle Submit Reschedule
    const handleRescheduleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedDate || !selectedDay || !selectedTime) {
            alert("Please fill all required fields.");
            return;
        }

        setIsRescheduling(true);

        const isSuccess = await updateAppointment(appointment?._id, {
            date: selectedDate,
            day: selectedDay,
            time: selectedTime,
        });

        if (isSuccess) {
            setIsOpenModal(false);
            router.refresh();
        } else {
            alert("Failed to reschedule. Please try again.");
        }

        setIsRescheduling(false);
    };

    return (
        <>
            <div className="flex items-center gap-2 pt-3 md:pt-0 border-t md:border-t-0 border-gray-100 justify-end">
                {isCompleted ? (
                    <span className="bg-blue-50 text-blue-600 font-semibold text-xs px-4 py-2 rounded-full border border-blue-100">
                        COMPLETED
                    </span>
                ) : (
                    <>
                        {/* Reschedule Button */}
                        <button
                            type="button"
                            onClick={handleOpenModal}
                            className="px-4 py-2 text-xs font-semibold text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 active:scale-95 transition-all cursor-pointer"
                        >
                            Reschedule
                        </button>

                        {/* Cancel Button */}
                        <button
                            type="button"
                            onClick={handleCancel}
                            disabled={isCanceling}
                            className="px-4 py-2 text-xs font-semibold text-rose-600 bg-white border border-rose-200 rounded-lg hover:bg-rose-50 active:scale-95 transition-all disabled:opacity-50 cursor-pointer"
                        >
                            {isCanceling ? 'Canceling...' : 'Cancel'}
                        </button>
                    </>                    
                )}
            </div>

            {/* Reschedule Modal */}
            {isOpenModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-100 relative">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">
                            Reschedule Appointment
                        </h3>

                        <form onSubmit={handleRescheduleSubmit} className="space-y-4">
                            {/* Date Field */}
                            <div>
                                <label className="block text-xs font-medium text-gray-600 mb-1">
                                    Select Date
                                </label>
                                <input
                                    type="date"
                                    value={selectedDate}
                                    onChange={(e) => setSelectedDate(e.target.value)}
                                    className="w-full text-sm border border-gray-200 rounded-lg p-2.5 outline-none focus:border-emerald-500"
                                    required
                                />
                            </div>

                            {/* Day Selection */}
                            <div>
                                <label className="block text-xs font-medium text-gray-600 mb-1">
                                    Select Day
                                </label>
                                {isLoadingDoctor ? (
                                    <div className="w-full text-sm border border-gray-200 rounded-lg p-2.5 bg-gray-50 text-gray-500">
                                        Loading schedules...
                                    </div>
                                ) : (
                                    <select
                                        value={selectedDay}
                                        onChange={(e) => {
                                            setSelectedDay(e.target.value);
                                            setSelectedTime("");
                                        }}
                                        className="w-full text-sm border border-gray-200 rounded-lg p-2.5 outline-none focus:border-emerald-500"
                                        required
                                    >
                                        <option value="">-- Choose Day --</option>
                                        {doctor?.date?.map((d, idx) => (
                                            <option key={idx} value={d.day}>
                                                {d.day}
                                            </option>
                                        ))}
                                    </select>
                                )}
                            </div>

                            {/* Time Slot Selection */}
                            <div>
                                <label className="block text-xs font-medium text-gray-600 mb-1">
                                    Select Time Slot
                                </label>
                                <select
                                    value={selectedTime}
                                    onChange={(e) => setSelectedTime(e.target.value)}
                                    disabled={!selectedDay}
                                    className="w-full text-sm border border-gray-200 rounded-lg p-2.5 outline-none focus:border-emerald-500 disabled:bg-gray-100"
                                    required
                                >
                                    <option value="">-- Choose Time --</option>
                                    {availableTimes.map((t, idx) => (
                                        <option key={idx} value={t}>
                                            {t}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Actions */}
                            <div className="flex justify-end gap-2 pt-3">
                                <button
                                    type="button"
                                    onClick={() => setIsOpenModal(false)}
                                    className="px-4 py-2 text-xs font-semibold text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isRescheduling}
                                    className="px-4 py-2 text-xs font-semibold text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-all disabled:opacity-50"
                                >
                                    {isRescheduling ? 'Updating...' : 'Confirm'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default AppointmentCardBtn;