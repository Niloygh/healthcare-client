import { doctorDashboard } from '@/lib/action/dashboard';
import { clientId } from '@/lib/action/userId';
import { Calendar, MessageCircle, Star, Users } from 'lucide-react';
import React from 'react';

const DashboardCard = async ({dashboardData}) => {    
    
    return (
       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

        {/* Distinct Patients */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow transition-all">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-blue-50 text-blue-600">
              <Users className="w-6 h-6" />
            </div>

            <div>
              <p className="text-3xl font-semibold text-gray-900">{dashboardData?.totalPatient}</p>
              <p className="text-sm text-gray-600 mt-0.5 font-medium">
                Total Patients
              </p>
            </div>
          </div>
        </div>


        {/* Pending Requests */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow transition-all">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-amber-50 text-amber-600">
              <Calendar className="w-6 h-6" />
            </div>

            <div>
              <p className="text-3xl font-semibold text-gray-900">{dashboardData?.todayAppointment}</p>
              <p className="text-sm text-gray-600 mt-0.5 font-medium">
                Today Appointments
              </p>
            </div>
          </div>
        </div>


        {/* Clinician Score */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow transition-all">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-emerald-50 text-emerald-600">
              <Star className="w-6 h-6" />
            </div>

            <div>
              <p className="text-3xl font-semibold text-gray-900">
                5 / {dashboardData?.averageRating}
              </p>
              <p className="text-sm text-gray-600 mt-0.5 font-medium">
                Clinician Score
              </p>
            </div>
          </div>
        </div>


        {/* Feedbacks */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow transition-all">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-purple-50 text-purple-600">
              <MessageCircle className="w-6 h-6" />
            </div>

            <div>
              <p className="text-3xl font-semibold text-gray-900">{dashboardData?.reviewsCount}</p>
              <p className="text-sm text-gray-600 mt-0.5 font-medium">
                FEEDBACKS
              </p>
            </div>
          </div>
        </div>

      </div>
    );
};

export default DashboardCard;