import { Calendar, Clock, CreditCard, Stethoscope } from 'lucide-react';
import AppointmentCardBtn from './AppointmentCardBtn';

const AppointmentCard = ({ appointment, onReschedule, onCancel }) => {
    // console.log(appointment)
    

    // Dynamic ID extraction
    const appointmentId = appointment?._id?.$oid || appointment?._id;
    const isCompleted = appointment?.appointmentComplete || appointment?.appointmentStatus === 'completed';
    const isPaid = appointment?.paymentStatus;

    

    return (
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                
                {/* 1. View Appointment Details */}
                <div className="space-y-3 flex-1">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
                            <Stethoscope className="w-5 h-5" />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-gray-800">
                                {appointment?.doctorName || 'Dr. Unknown'}
                            </h2>
                        </div>

                        {/* Status Badge */}
                        <span className={`ml-auto md:ml-2 text-xs font-semibold px-3 py-1 rounded-full border capitalize ${
                            appointment?.appointmentStatus === 'pending' 
                                ? 'bg-amber-50 text-amber-700 border-amber-200' 
                                : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        }`}>
                            {appointment?.appointmentStatus || 'Pending'}
                        </span>
                    </div>

                    {/* Meta Info (Date, Time, Fee) */}
                    <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-sm text-gray-600 pt-1">
                        <div className="flex items-center gap-1.5">
                            <Calendar className="w-4 h-4 text-emerald-600" />
                            <span>{appointment?.date} ({appointment?.day})</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Clock className="w-4 h-4 text-emerald-600" />
                            <span>{appointment?.time}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <CreditCard className="w-4 h-4 text-emerald-600" />
                            <span>
                                Fee Paid: {' '}
                                <strong className={isPaid ? 'text-emerald-600' : 'text-rose-600'}>
                                    {isPaid ? `Paid ($${appointment?.fee})` : `Unpaid ($${appointment?.fee})`}
                                </strong>
                            </span>
                        </div>
                    </div>

                    {/* Symptoms Box */}
                    {appointment?.symptoms && (
                        <div className="bg-gray-50 border border-gray-100 rounded-xl p-3 text-xs text-gray-600 mt-2">
                            <strong className="text-gray-800">Symptoms: </strong>
                            {appointment.symptoms}
                        </div>
                    )}
                </div>

                {/* 2. Reschedule & 3. Cancel Actions */}
                <AppointmentCardBtn onReschedule={onReschedule} onCancel={onCancel} isCompleted={isCompleted} appointment={appointment} />

            </div>
        </div>
    );
};

export default AppointmentCard;