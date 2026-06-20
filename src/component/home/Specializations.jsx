'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Brain, Clock, Users, Shield, Award } from 'lucide-react';

export default function Specializations() {
  const specializations = [
    {
      title: "Cardiology",
      subtitle: "BOSTON GENERAL",
      icon: Heart,
      color: "text-red-500"
    },
    {
      title: "Neurology",
      subtitle: "JOHNS HOPKINS",
      icon: Brain,
      color: "text-purple-500"
    },
    {
      title: "Orthopedics",
      subtitle: "MAYO CLINIC",
      icon: Clock,
      color: "text-blue-500"
    },
    {
      title: "Pediatrics",
      subtitle: "STANFORD KID CARE",
      icon: Users,
      color: "text-emerald-500"
    },
    {
      title: "Dermatology",
      subtitle: "YALE SCHOOL",
      icon: Shield,
      color: "text-amber-500"
    },
  ];

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
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
        duration: 0.6,
      },
    },
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with animation */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Our Medical Specializations
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            From preventive care to specialized treatments, our expert medical team is here to support your health journey every step of the way.
          </p>
        </motion.div>

        {/* Specializations Grid with staggered animation */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {specializations.map((spec, index) => {
            const IconComponent = spec.icon;
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ 
                  y: -8,
                  scale: 1.03,
                  transition: { duration: 0.3 }
                }}
                className="group bg-white border border-gray-100 rounded-3xl p-8 hover:border-gray-200 hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center cursor-pointer"
              >
                <motion.div 
                  className="w-16 h-16 bg-gray-50 group-hover:bg-gray-100 rounded-2xl flex items-center justify-center mb-6 transition-colors"
                  whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                  transition={{ duration: 0.4 }}
                >
                  <IconComponent className={`w-9 h-9 ${spec.color}`} />
                </motion.div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                  {spec.title}
                </h3>
                <p className="text-sm text-gray-500 font-medium tracking-wider">
                  {spec.subtitle}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}