'use client';

import React from 'react';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    quote: "Dr. Amanda Ross saved my father's life. Her precision, caring personality, and clear explanations made a stressful surgery very manageable. Highly recommended!",
    name: "Sarah Jenkins",
    doctor: "Dr. Amanda Ross",
    role: "CONSULTED PATIENT",
    rating: 5,
  },
  {
    quote: "Incredible doctor! Dr. James Carter took the time to understand my chronic migraines and suggested a preventative plan that has cut my symptom days in half.",
    name: "Michael Chang",
    doctor: "Dr. James Carter",
    role: "CONSULTED PATIENT",
    rating: 5,
  },
  {
    quote: "Very friendly environment! She is amazing with toddlers, very patient and gentle. My little daughter loved her clinic.",
    name: "Sarah Jenkins",
    doctor: "Dr. Emily Chen",
    role: "CONSULTED PATIENT",
    rating: 5,
  },
];

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 60,
    scale: 0.95 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      duration: 0.6
    }
  },
};

export default function SuccessFull() {
  return (
    <section className="py-16 bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header with Animation */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            TRUSTED BY PATIENTS
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mb-4">
            Real Patient Success Stories
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Read genuine testimonials about our compassionate care and accurate diagnostics
          </p>
        </motion.div>

        {/* Testimonials Grid with Stagger Animation */}
        <motion.div 
          className="grid md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ 
                y: -12, 
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
              className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 hover:shadow-2xl flex flex-col cursor-default"
            >
              {/* Testimonial Text */}
              <blockquote className="text-slate-700 dark:text-slate-300 text-[17px] leading-relaxed mb-8 flex-1">
                {testimonial.quote}
              </blockquote>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-6">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>

              {/* Author */}
              <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-800">
                <div className="font-semibold text-lg text-slate-900 dark:text-white">
                  {testimonial.name}
                </div>
                <div className="text-sm text-emerald-600 dark:text-emerald-500 font-medium">
                  {testimonial.doctor}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-500 mt-1 tracking-widest">
                  {testimonial.role}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust Bar */}
        <motion.div 
          className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Over 2,400+ verified patient reviews • 4.9/5 average rating
          </p>
        </motion.div>
      </div>
    </section>
  );
}