import React from 'react';
import { MapPin, Clock } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function DoctorCard({ doctor }) {
  return (
    <div className="w-full max-w-xs bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col">
      {/* Top Image Section with Badge */}
      <div className="relative h-56 w-full bg-slate-100">
        <Image
          width={500}
          height={500}
          src={doctor?.image}
          alt={doctor?.name}
          className="w-full h-full object-cover"
        />
        {/* Specialty Badge */}
        {doctor?.specialty && (
          <span className="absolute top-3 left-3 bg-[#009688] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg shadow-sm">
            {doctor.specialty}
          </span>
        )}
      </div>

      {/* Card Body Info */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div className="space-y-1.5">
          {/* Doctor Name */}
          <h3 className="text-xl font-bold text-slate-800 leading-snug">
            {doctor?.name}
          </h3>

          {/* Qualifications */}
          <p className="text-sm text-slate-500 font-normal">
            {doctor?.qualifications}
          </p>

          {/* Hospital Location */}
          <div className="flex items-center gap-1.5 text-slate-600 text-sm pt-1">
            <MapPin size={16} className="text-slate-400 flex-shrink-0" />
            <span className="truncate">{doctor?.hospital}</span>
          </div>
        </div>

        {/* Divider & Footer Section */}
        <div className="mt-5 pt-4 border-t border-slate-100 space-y-4">
          <div className="flex items-center justify-between text-sm">
            {/* Experience */}
            <div className="flex items-center gap-1.5 text-slate-600">
              <Clock size={16} className="text-slate-400 flex-shrink-0" />
              <span>{doctor?.experience} Years Experience</span>
            </div>

            {/* Fee */}
            <div className="text-[#00897b] font-bold text-base">
              ${doctor?.fee} Fee
            </div>
          </div>

          {/* View Profile Button */}
          <Link
            href={`/find-doctors/${doctor?._id}`}
            className="w-full py-2.5 bg-[#009688] hover:bg-[#00897b] text-white font-semibold rounded-xl transition-colors duration-200 text-sm flex items-center justify-center"
          >
            View Profile
          </Link>
        </div>
      </div>
    </div>
  );
}