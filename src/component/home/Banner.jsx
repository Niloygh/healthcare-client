'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, Video, VideoIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';

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
                href="#"
                className="border border-gray-300 hover:bg-white bg-white px-8 py-4 rounded-2xl font-medium text-lg transition-all flex items-center gap-3"
              >
                <Video className="w-5 h-5" />
                Online Consult
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Image Section - Animated */}
          <div className="relative">
          <div className="hero-blob w-full aspect-square relative z-10 shadow-2xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2"
              alt="Healthcare Professional"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Decorative Elements */}
          <div className="absolute -top-12 -right-12 w-64 h-64 bg-[#00668a]/5 rounded-full blur-3xl -z-10"></div>
          <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-[#006a60]/5 rounded-full blur-3xl -z-10"></div>

          {/* Floating Card */}
          <div className="absolute bottom-10 -left-6 z-20 glass-card p-4 rounded-2xl shadow-xl flex items-center gap-4 animate-bounce-subtle">
            <div className="w-12 h-12 rounded-full bg-[#74f8e5] flex items-center justify-center text-[#00201c]">
              <span className="material-symbols-outlined"><VideoIcon /></span>
            </div>
            <div>
              <p className="font-medium text-[#0f172a]">Online Consult</p>
              <p className="text-sm text-[#475569]">Available Now</p>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}