'use client';

import { useState } from 'react';
import { Button, Input, Textarea } from '@heroui/react';
import {
  Clock,
  DollarSign,
  GraduationCap,
  Building2,
  Calendar,
  Star,
} from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { authClient } from '@/lib/auth-client';
import { appointment } from '@/lib/action/appointment';

export default function DoctorDetails({ doctor }) {

  // console.log(doctor)

  const user = authClient.useSession().data?.user;
  // console.log(user?.name)

  const [selectedDay, setSelectedDay] = useState(
    doctor?.date?.[0]?.day || ''
  );
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [symptoms, setSymptoms] = useState('');



  // Get available times for selected day
  const availableTimes =
    doctor?.date?.find((d) => d.day === selectedDay)?.times || [];

  const handleBooking = async (e) => {
  e.preventDefault();

  if (!selectedDay || !selectedTime || !selectedDate) {
    toast.error('Please select day, date and time slot');
    return;      
  }

  try {
   
    const formData = {
      clientId: user?.id,
      clientEmail: user?.email,
      clientName: user?.name,
      doctorId: doctor?.doctorId,
      doctorName: doctor?.name,
      day: selectedDay,
      date: selectedDate,
      time: selectedTime,
      symptoms,
      fee: doctor?.fee,
      paymentStatus: false,
    };

    const appointmentData = await appointment(formData);

    if (appointmentData?.success) {
      toast.success('Appointment created! Preparing payment...');

      
      const response = await fetch('/api/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          appointmentId: appointmentData.appointment_result?.insertedId,
          doctorId: doctor?._id,
          doctorName: doctor?.name,
          amount: doctor?.fee,
          paymentDate: currentDate,
        }),
      });

      const paymentResponse = await response.json();

      
      if (response.ok && paymentResponse?.url) {
        // eslint-disable-next-line react-hooks/immutability
        window.location.href = paymentResponse.url;
      } else {
        toast.error(paymentResponse?.error || 'Payment initialization failed');
      }

    } else {
      toast.error(appointmentData?.message || 'Failed to book appointment');
    }
  } catch (error) {
    console.error('Booking or Payment Error:', error);
    toast.error('An error occurred during process');
  }
};

  if (!doctor) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-500">
        Doctor not found
      </div>
    );
  }



  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const currentDate = getTodayDate()
  // console.log(currentDate)

  // console.log(getTodayDate)
  return (
    <div className="min-h-screen bg-[#f8fafc] py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* ================= LEFT COLUMN ================= */}
          <div className="lg:col-span-2 space-y-6">
            {/* Doctor Info Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6"
            >
              <div className="flex flex-col sm:flex-row gap-6">
                {/* Photo */}
                <div className="w-full sm:w-40 h-48 sm:h-40 rounded-2xl overflow-hidden bg-slate-100 flex-shrink-0">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Info */}
                <div className="flex-1">
                  <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">
                    {doctor.name}
                  </h1>

                  <span className="inline-block mt-2 bg-teal-100 text-teal-700 text-xs font-semibold uppercase tracking-wide px-3 py-1 rounded-full">
                    {doctor.specialty} Specialist
                  </span>

                  <div className="mt-5 space-y-3">
                    <div className="flex items-start gap-3 text-sm text-slate-600">
                      <GraduationCap
                        size={18}
                        className="text-slate-400 mt-0.5 flex-shrink-0"
                      />
                      <div>
                        <span className="font-medium text-slate-700">
                          Qualifications:
                        </span>{' '}
                        {doctor.qualifications}
                      </div>
                    </div>

                    <div className="flex items-start gap-3 text-sm text-slate-600">
                      <Clock
                        size={18}
                        className="text-slate-400 mt-0.5 flex-shrink-0"
                      />
                      <div>
                        <span className="font-medium text-slate-700">
                          Clinical Background:
                        </span>{' '}
                        {doctor.experience} Years Active Practice
                      </div>
                    </div>

                    <div className="flex items-start gap-3 text-sm text-slate-600">
                      <Building2
                        size={18}
                        className="text-slate-400 mt-0.5 flex-shrink-0"
                      />
                      <div>
                        <span className="font-medium text-slate-700">
                          Practicing Hospital:
                        </span>{' '}
                        {doctor.hospital}
                      </div>
                    </div>

                    <div className="flex items-start gap-3 text-sm text-slate-600">
                      <DollarSign
                        size={18}
                        className="text-slate-400 mt-0.5 flex-shrink-0"
                      />
                      <div>
                        <span className="font-medium text-slate-700">
                          Booking Co-Pay:
                        </span>{' '}
                        <span className="text-teal-700 font-semibold">
                          ${doctor.fee}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Reviews Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6"
            >
              <h2 className="text-lg font-bold text-slate-800 mb-4">
                Clinician Reviews Feedback (1)
              </h2>

              <div className="space-y-4">
                <div className="border border-slate-100 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-slate-800">
                      Sarah Jenkins
                    </h4>
                    <div className="flex items-center gap-0.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={14}
                          className="fill-amber-400 text-amber-400"
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    "Dr. {doctor.name.split(' ').slice(-1)} saved my father's
                    life. Her precision, caring personality, and clear
                    explanations made a stressful surgery very manageable.
                    Highly recommended!"
                  </p>
                  <p className="text-xs text-slate-400 mt-3">5/25/2028</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ================= RIGHT COLUMN - Booking ================= */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 h-fit sticky top-6"
          >
            <h2 className="text-xl font-bold text-slate-800">
              Schedule Co-Pay
            </h2>
            <p className="text-sm text-slate-500 mt-1 mb-6">
              Set active weekdays, daily clinician slot, and symptoms
              presentation description.
            </p>

            {/* Available Days */}
            <div className="space-y-1.5 mb-5">
              <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Clinic Workdays <span className='text-blue-500'>(select day)</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {doctor.date?.map((item) => (
                  <button
                    key={item.day}
                    onClick={() => {
                      setSelectedDay(item.day);
                      setSelectedTime('');
                    }}
                    className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition ${selectedDay === item.day
                      ? 'bg-teal-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                  >
                    {item.day}
                  </button>
                ))}
              </div>
            </div>

            {/* Date */}
            <div className="space-y-1.5 mb-5">
              <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Configure Date
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full h-11 px-3.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/25 focus:border-teal-500 transition"
              />
            </div>

            {/* Time Slots */}
            <div className="space-y-1.5 mb-5">
              <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Available Hours Slots
              </label>
              <select
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="w-full h-11 px-3.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/25 focus:border-teal-500 transition"
              >
                <option value="">Select a time</option>
                {availableTimes.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>

            {/* Symptoms */}
            <div className="space-y-1.5 mb-6">
              <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Symptoms Presentation
              </label>
              <textarea
                rows={3}
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                placeholder="e.g. Mild headache, regular physical check..."
                className="w-full px-3.5 py-3 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/25 focus:border-teal-500 transition resize-none"
              />
            </div>

            {/* Book Button */}

            <form onSubmit={handleBooking}>
              {/* <input type="hidden" value={doctor._id} name='doctorId' />
              <input type="hidden" value={doctor.name} name='doctorName' />
              <input type="hidden" value={doctor.fee} name='amount' />
              <input type="hidden" value={currentDate} name='paymentDate' /> */}

              <Button
                // isDisabled={!symptoms || !selectedTime || !selectedDate || !selectedDay}
                type='submit'
                className="w-full h-12 bg-teal-700 hover:bg-teal-800 text-white font-semibold rounded-xl text-base"
              >
                Book Appointment (${doctor.fee})
              </Button>

            </form>


          </motion.div>
        </div>
      </div>
    </div>
  );
}