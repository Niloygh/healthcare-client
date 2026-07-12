'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Award, Users, Clock } from 'lucide-react';

const stats = [
  { icon: Users, number: "50+", label: "Expert Doctors" },
  { icon: Award, number: "15K+", label: "Happy Patients" },
  { icon: Clock, number: "24/7", label: "Emergency Support" },
  { icon: Heart, number: "98%", label: "Satisfaction Rate" },
];

export default function AboutUsSection() {
  return (
    <section className="py-20 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-6">
        {/* Mission Statement */}
        <div className="bg-slate-950 text-white rounded-3xl p-12 md:p-16 text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Our Hospital Mission
          </motion.h2>
          <p className="text-xl  max-w-3xl mx-auto leading-relaxed opacity-90">
            We build modern healthcare management systems that make hospital operations faster, smarter, and more secure—helping healthcare professionals focus on what matters most: patient care.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="aspect-video rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3" 
                alt="Modern Hospital Infrastructure"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Overlay Badge */}
            <div className="absolute -bottom-6 -right-6 bg-white dark:bg-slate-900 shadow-xl rounded-2xl p-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-900 rounded-2xl flex items-center justify-center">
                  <span className="text-3xl">🏥</span>
                </div>
                <div>
                  <p className="font-semibold text-emerald-700 dark:text-emerald-400">Est. 2026</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">MediCare Connect</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-block bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
              About MediCare Connect
            </div>

            <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-6">
              Modern Healthcare Infrastructure
            </h2>

            <div className="space-y-6 text-slate-600 dark:text-slate-400 text-[17px] leading-relaxed">
              <p>
                MediCare Connect is designed to simplify clinical bookings. Founded in 2026, 
                we specialize in high-efficiency hospital dispatch, verifying clinician licenses, 
                automating medical feedback, and formulating atomic prescription checklists.
              </p>
              <p>
                Our platform conforms thoroughly to zero-trust attribute access rules, locking 
                clinical details securely so that patients and doctors communicate with supreme confidence.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6 mt-12">
              {stats.map((stat, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-4 bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl"
                >
                  <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900 rounded-xl flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-slate-900 dark:text-white">{stat.number}</div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}