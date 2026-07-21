'use client';

import React from 'react';
import { Users, Calendar, Star, MessageCircle } from 'lucide-react';

export default function DashboardPage() {
    
  const stats = [
    {
      icon: Users,
      number: "1",
      label: "Distinct Patients",
      color: "bg-blue-50 text-blue-600"
    },
    {
      icon: Calendar,
      number: "2",
      label: "Pending Requests",
      color: "bg-amber-50 text-amber-600"
    },
    {
      icon: Star,
      number: "5.0 / 5.0",
      label: "Clinician Score",
      color: "bg-emerald-50 text-emerald-600"
    },
    {
      icon: MessageCircle,
      number: "1",
      label: "FEEDBACKS",
      color: "bg-purple-50 text-purple-600"
    },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div 
              key={index}
              className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow transition-all"
            >
              <div className="flex items-center gap-4">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${stat.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-3xl font-semibold text-gray-900">{stat.number}</p>
                  <p className="text-sm text-gray-600 mt-0.5 font-medium">{stat.label}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Testimonials Section */}
      <div className="bg-white rounded-3xl p-7 shadow-sm border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Patient Testimonials</h2>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gray-50 border border-gray-100 shadow rounded-2xl p-6">
          <div className="flex justify-between items-start mb-4">
            <h4 className="font-semibold text-gray-900">Sarah Jenkins</h4>
            <div className="flex text-yellow-400 text-xl">★★★★★</div>
          </div>
          
          <p className="text-gray-700 text-[15px] leading-relaxed line-clamp-4">
            "Dr. Amanda Ross saved my fathers life. Her precision, caring personality, 
            and clear explanations made a stressful surgery very manageable. 
            Highly recommended!"
          </p>
        </div>
        </div>
      </div>
    </div>
  );
}