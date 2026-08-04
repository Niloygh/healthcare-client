'use client'

import { DeleteAppointment } from "@/lib/action/appointment";
import { useRouter } from "next/navigation";
import { useState } from "react";

const AppointmentCardBtn = ({onReschedule, onCancel, isCompleted, appointment}) => {
    const router = useRouter();

    // console.log(appointment)

    const [isCanceling, setIsCanceling] = useState(false);

    // Handle Cancel Action
    const handleCancel = async () => {
        if (confirm("Are you sure you want to cancel this appointment?")) {
            setIsCanceling(true);

            const DeleteAppoint = await DeleteAppointment(appointment?._id)            
            
            if (DeleteAppoint) {
                router.refresh();
            }
            
            setIsCanceling(false);
        }
    };

    return (
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
                                onClick={() => onReschedule && onReschedule(appointment)}
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
    );
};

export default AppointmentCardBtn;