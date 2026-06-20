'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Calendar, 
  DollarSign, 
  Heart 
} from 'lucide-react';

export default function WhyChooseUs() {
  const features = [
    {
      icon: Users,
      title: "Qualified Therapists",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec.",
      color: "text-blue-600"
    },
    {
      icon: Calendar,
      title: "Flexible Therapy Options",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec.",
      color: "text-purple-600"
    },
    {
      icon: DollarSign,
      title: "Health Care Savings",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec.",
      color: "text-emerald-600"
    },
    {
      icon: Heart,
      title: "Personalized Care",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec.",
      color: "text-rose-600"
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Side - Heading */}
          <motion.div 
            className="lg:col-span-5"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-2 text-blue-600 font-medium mb-4">
              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
              WHY CHOOSE US
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-bold leading-tight text-gray-900">
              Mental health is the key,<br />
              <span className="text-blue-600">set your worries free</span>
            </h2>
            
            <p className="mt-6 text-gray-600 text-lg max-w-md">
              Netus libero purus primis inceptos lorem vel penatibus mauris.
            </p>
          </motion.div>

          {/* Right Side - Features Grid */}
          <div className="lg:col-span-7">
            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <motion.div
                    key={index}
                    className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 group"
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ y: -8 }}
                  >
                    <div className={`w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${feature.color}`}>
                      <IconComponent className="w-8 h-8" />
                    </div>
                    
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {feature.title}
                    </h3>
                    
                    <p className="text-gray-600 leading-relaxed">
                      {feature.desc}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}