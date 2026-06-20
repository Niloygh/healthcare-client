'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import AllDoctors from '../AllDoctors';
import Statistics from './Statistics';

export default function FeaturedDoctors({ doctors = [] }) {

  // Sample data (Replace with data from your database)
  const defaultDoctors = [
    {
      id: 1,
      name: "Dr. Amanda Ross",
      specialty: "CARDIOLOGY",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop",
      credentials: "MD, FACC - Harvard Medical",
      hospital: "Boston General",
      experience: "14 Years Experience",
      fee: "$150 "
    },
    {
      id: 2,
      name: "Dr. James Carter",
      specialty: "NEUROLOGY",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop",
      credentials: "MD, PhD - Johns Hopkins",
      hospital: "Johns Hopkins",
      experience: "18 Years Experience",
      fee: "$180 "
    },
    {
      id: 3,
      name: "Dr. Sophia Patel",
      specialty: "PEDIATRICS",
      image: "https://images.unsplash.com/photo-1712215544003-af10130f8eb3",
      credentials: "MD, FAAP - Stanford University",
      hospital: "Stanford Children Health",
      experience: "10 Years Experience",
      fee: "$95 "
    },
    {
      id: 4,
      name: "Dr. Robert Chen",
      specialty: "ORTHOPEDICS",
      image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop",
      credentials: "MD, FAAOS - Mayo Clinic College",
      hospital: "Mayo Clinic Rehab",
      experience: "12 Years Experience",
      fee: "$130 "
    }
  ];

  const displayDoctors = doctors.length > 0 ? doctors : defaultDoctors;

  const stats = [
    { label: "Total Doctors", value: "1,420+" },
    { label: "Patient Trust", value: "98.4%" },
    { label: "Appointments Joined", value: "27+" },
    { label: "Expert Years", value: "25+" },
  ];

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 90,
        damping: 18,
        duration: 0.6,
      },
    },
  };

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div 
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
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
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Doctors Grid */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {displayDoctors.map((doctor, index) => (
            <motion.div
              key={doctor.id}
              variants={itemVariants}
              whileHover={{ 
                y: -12, 
                scale: 1.03,
                transition: { duration: 0.3 }
              }}
            >
              <AllDoctors doctor={doctor} />
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Bar */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
            >
              <Statistics stat={stat} index={index} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}