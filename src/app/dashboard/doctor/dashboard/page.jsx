import React from 'react';
import { Users, Calendar, Star, MessageCircle } from 'lucide-react';
import DashboardCard from '@/component/dashboard/doctor/dashboardCard';
import { clientId } from '@/lib/action/userId';
import { doctorDashboard } from '@/lib/action/dashboard';

export default async function DashboardPage() {

  const user = await clientId();
  const id = user?.id;

  const dashboardData = await doctorDashboard(id);

  return (
    <div className="space-y-8">

      {/* Cards */}
      <DashboardCard dashboardData={dashboardData} />

      {/* Testimonials Section */}
      <div className="bg-white rounded-3xl p-7 shadow-sm border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Recent Patient Testimonials
        </h2>

        {/* Responsive Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dashboardData?.totalReview?.map((review) => (
            <div 
              key={review?._id} 
              className="bg-gray-50 border border-gray-100 shadow-sm rounded-2xl p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-center mb-4 gap-2">
                  <h4 className="font-semibold text-gray-900 truncate">
                    {review?.clientName || "Anonymous"}
                  </h4>

                  <div className="flex text-yellow-400 text-lg shrink-0">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star}>
                        {star <= review?.rating ? "★" : "☆"}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="text-gray-700 text-sm leading-relaxed line-clamp-4">
                  {review?.comment}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
}