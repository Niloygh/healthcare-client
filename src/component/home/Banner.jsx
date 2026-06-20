'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, Video } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HeroBanner() {
  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 pt-20 pb-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content - Animated */}
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className="inline-flex items-center gap-2 bg-green-100 text-green-700 text-sm font-medium px-4 py-2 rounded-full"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              Your Health, Our Priority
            </motion.div>

            <motion.h1 
              className="text-5xl lg:text-6xl font-bold leading-tight text-gray-900"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Healthcare, <span className="text-blue-600">Simplified</span> for Your Family.
            </motion.h1>

            <motion.p 
              className="text-xl text-gray-600 max-w-lg"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              Access world-class medical expertise from the comfort of your home. 
              Book appointments, manage records, and consult with specialists in minutes.
            </motion.p>

            <motion.div 
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <Link
                href="/find-doctors"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all flex items-center gap-3 shadow-lg shadow-blue-500/30"
              >
                Find a Doctor
              </Link>

              <Link
                href="/online-consult"
                className="border border-gray-300 hover:bg-white bg-white px-8 py-4 rounded-2xl font-medium text-lg transition-all flex items-center gap-3"
              >
                <Video className="w-5 h-5" />
                Online Consult
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Image Section - Animated */}
          <motion.div 
            className="relative flex justify-center lg:justify-end pt-8 lg:pt-0"
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
          >
            <div className="relative max-w-[460px] w-full">
              <motion.img
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&h=920&fit=crop&crop=face"
                alt="Doctor"
                className="w-full shadow-2xl object-cover rounded-4xl"
                
                initial={{ scale: 0.85, rotate: -5 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 1.1, delay: 0.5 }}
                whileHover={{ scale: 1.03 }}
              />

              {/* Online Consult Badge - Animated */}
              <motion.div 
                className="absolute -bottom-5 left-6 bg-white rounded-3xl shadow-2xl p-4 flex items-center gap-3 border border-green-100 z-10"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-11 h-11 bg-green-100 rounded-2xl flex items-center justify-center">
                  <Video className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Online Consult</p>
                  <p className="text-green-600 text-sm font-medium">Available Now</p>
                </div>
              </motion.div>

              {/* Floating Heart - Animated */}
              <motion.div 
                className="absolute -top-6 -left-6 bg-white p-4 rounded-3xl shadow-xl z-10"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.4 }}
                whileHover={{ rotate: 15, scale: 1.1 }}
              >
                <Heart className="w-9 h-9 text-red-500" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}