import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Statistics from './Statistics';
import AllDoctorsCard from '../HomeAllDoctors';
import { limitDoctors } from '@/lib/action/doctors';

export default async function FeaturedDoctors() {
  const allLimitDoctors = await limitDoctors();

  const stats = [
    { label: "Total Doctors", value: "1,420+" },
    { label: "Patient Trust", value: "98.4%" },
    { label: "Appointments Joined", value: "27+" },
    { label: "Expert Years", value: "25+" },
  ];

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-3">
              Meet Our Featured Doctors
            </h2>
            <p className="text-gray-600 max-w-2xl">
              Meet highly qualified physicians dedicated to delivering exceptional patient care.
            </p>
          </div>
          <Link 
            href="/find-doctors" 
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium mt-4 md:mt-0 group"
          >
            View All Doctors 
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {allLimitDoctors.map((doctor, index) => (
            <div
              key={doctor._id || doctor.id || index}
              className="transition-all duration-300 ease-in-out hover:-translate-y-3 hover:scale-[1.03]"
            >
              <AllDoctorsCard doctor={doctor} />
            </div>
          ))}
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="transition-transform duration-300 ease-in-out hover:scale-105"
            >
              <Statistics stat={stat} index={index} />
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}