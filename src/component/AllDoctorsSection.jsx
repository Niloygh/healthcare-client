'use client';

import { useState, useMemo } from 'react';
import { Button } from '@heroui/react';
import { Search, LayoutGrid, List, MapPin, Clock, DollarSign } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const specialties = [
  'All Specialties',
  'Cardiology',
  'Neurology',
  'Orthopedics',
  'Dermatology',
  'Pediatrics',
  'Oncology',
  'Psychiatry',
];

export default function AllDoctorsSection({ allDoctors = [] }) {
  const [search, setSearch] = useState('');
  const [specialty, setSpecialty] = useState('All Specialties');
  const [sortBy, setSortBy] = useState('fee-low');
  const [layout, setLayout] = useState('grid');

  const filteredDoctors = useMemo(() => {
    let result = [...allDoctors];

    if (search.trim()) {
      const query = search.toLowerCase().trim();
      result = result.filter((doc) => {
        const nameMatch = doc.name?.toLowerCase().includes(query);
        const descriptionMatch = doc.description?.toLowerCase().includes(query);
        const qualificationsMatch = doc.qualifications?.toLowerCase().includes(query);
        
        // Name, Description ba Qualifications — er jekono ekta match korlei result-e ashbe
        return nameMatch || descriptionMatch || qualificationsMatch;
      });
    }

    if (specialty !== 'All Specialties') {
      result = result.filter((doc) => doc.specialty === specialty);
    }

    if (sortBy === 'fee-low') {
      result.sort((a, b) => a.fee - b.fee);
    } else if (sortBy === 'fee-high') {
      result.sort((a, b) => b.fee - a.fee);
    } else if (sortBy === 'experience') {
      result.sort((a, b) => b.experience - a.experience);
    }

    return result;
  }, [allDoctors, search, specialty, sortBy]);

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 tracking-tight">
              Our Clinicians Catalogue
            </h1>
            <p className="mt-2 text-slate-500 text-base sm:text-lg max-w-2xl">
              Find professional guidance, sort by experience, highest rating, or browse by medical specialties.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Search */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Search Doctor or Keyword
              </label>
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search name, description..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/25 focus:border-teal-500 transition"
                />
              </div>
            </div>

            {/* Specialty */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Medical Specialties
              </label>
              <select
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
                className="w-full h-11 px-3.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/25 focus:border-teal-500 transition appearance-none"
              >
                {specialties.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Sort Clinic Fee / Quality
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full h-11 px-3.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/25 focus:border-teal-500 transition appearance-none"
              >
                <option value="fee-low">Fee: Low to High</option>
                <option value="fee-high">Fee: High to Low</option>
                <option value="experience">Experience: High to Low</option>
              </select>
            </div>

            {/* Layout Toggle */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Layout Format
              </label>
              <div className="flex h-11 rounded-xl border border-slate-200 overflow-hidden bg-slate-50">
                <button
                  onClick={() => setLayout('grid')}
                  className={`flex-1 flex items-center justify-center gap-2 text-sm font-medium transition ${
                    layout === 'grid'
                      ? 'bg-teal-600 text-white'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <LayoutGrid size={16} />
                  Grid
                </button>
                <button
                  onClick={() => setLayout('list')}
                  className={`flex-1 flex items-center justify-center gap-2 text-sm font-medium transition ${
                    layout === 'list'
                      ? 'bg-teal-600 text-white'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <List size={16} />
                  List
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Doctors List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {filteredDoctors.length === 0 ? (
          <div className="text-center py-20 text-slate-500">
            <p className="text-lg font-medium">No doctors found</p>
            <p className="text-sm mt-1">Try changing your search or filters</p>
          </div>
        ) : (
          <motion.div
            layout
            className={
              layout === 'grid'
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
                : 'flex flex-col gap-4'
            }
          >
            <AnimatePresence mode="popLayout">
              {filteredDoctors.map((doctor, index) => (
                <motion.div
                  key={doctor._id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  {layout === 'grid' ? (
                    /* ================= GRID CARD ================= */
                    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                      <div className="relative h-52 bg-slate-100">
                        <img
                          src={doctor.image}
                          alt={doctor.name}
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute top-3 left-3 bg-teal-600 text-white text-[11px] font-semibold uppercase tracking-wide px-2.5 py-1 rounded-lg">
                          {doctor.specialty}
                        </span>
                      </div>

                      <div className="p-5 space-y-3">
                        <div>
                          <h3 className="text-lg font-bold text-slate-800">
                            {doctor.name}
                          </h3>
                          <p className="text-sm text-slate-500 mt-0.5 line-clamp-1">
                            {doctor.qualifications}
                          </p>
                          <p className="text-sm text-slate-600 mt-1.5 flex items-center gap-1.5">
                            <MapPin size={14} className="text-slate-400" />
                            {doctor.hospital}
                          </p>
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                          <div className="flex items-center gap-1.5 text-sm text-slate-600">
                            <Clock size={15} className="text-slate-400" />
                            {doctor.experience} Years Experience
                          </div>
                          <div className="font-semibold text-teal-700">
                            ${doctor.fee} Fee
                          </div>
                        </div>

                        <Link href={`/find-doctors/${doctor._id}`} className="block w-full">
                          <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-xl">
                            View Profile
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ) : (
                    /* ================= LIST CARD ================= */
                    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow p-4 sm:p-5">
                      <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">
                        <div className="relative w-full sm:w-32 h-40 sm:h-32 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">
                          <img
                            src={doctor.image}
                            alt={doctor.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex flex-wrap items-center gap-2 mb-1">
                              <h3 className="text-lg font-bold text-slate-800">
                                {doctor.name}
                              </h3>
                              <span className="bg-teal-100 text-teal-700 text-[11px] font-semibold px-2 py-0.5 rounded-md">
                                {doctor.specialty}
                              </span>
                            </div>
                            <p className="text-sm text-slate-500">
                              {doctor.qualifications}
                            </p>
                            <p className="text-sm text-slate-600 mt-1.5 flex items-center gap-1.5">
                              <MapPin size={14} className="text-slate-400" />
                              {doctor.hospital}
                            </p>
                          </div>

                          <div className="flex flex-wrap items-center justify-between gap-3 mt-4">
                            <div className="flex items-center gap-4 text-sm text-slate-600">
                              <span className="flex items-center gap-1.5">
                                <Clock size={15} className="text-slate-400" />
                                {doctor.experience} Years
                              </span>
                              <span className="flex items-center gap-1.5 font-semibold text-teal-700">
                                <DollarSign size={15} />
                                {doctor.fee} Fee
                              </span>
                            </div>

                            <Link href={`/find-doctors/${doctor._id}`}>
                              <Button
                                size="sm"
                                className="bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-xl"
                              >
                                View Profile
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
}