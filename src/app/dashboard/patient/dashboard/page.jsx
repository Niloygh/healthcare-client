import React from "react";
import { Chip } from "@heroui/react";
import { Calendar, FileText, DollarSign, Star, Clock, ChevronRight } from "lucide-react";
import { patientDashboard } from "@/lib/action/dashboard";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";

export default async function PatientDashboard() {

    const session = await auth.api.getSession({
        headers: await headers()
    })
    const clientId = session?.user?.id

    const dashboardData = await patientDashboard(clientId)



    return (
        <div className="p-6 md:p-10 bg-slate-50/50 min-h-screen space-y-8 max-w-7xl mx-auto">

            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

                {/* Card 1: Upcoming Clinics */}
                <div className="p-5 bg-white border border-gray-100/80 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-4">
                    <div className="p-3.5 rounded-2xl bg-emerald-50 flex items-center justify-center shrink-0">
                        <Calendar className="w-5 h-5 text-emerald-700" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                            {dashboardData.upcomingClinicsCount}
                        </h2>
                        <p className="text-xs font-semibold text-gray-400 mt-0.5">
                            Upcoming Clinics
                        </p>
                    </div>
                </div>

                {/* Card 2: Histories & Checkups */}
                <div className="p-5 bg-white border border-gray-100/80 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-4">
                    <div className="p-3.5 rounded-2xl bg-emerald-50 flex items-center justify-center shrink-0">
                        <FileText className="w-5 h-5 text-emerald-700" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                            {dashboardData.historiesCount}
                        </h2>
                        <p className="text-xs font-semibold text-gray-400 mt-0.5">
                            Histories & Checkups
                        </p>
                    </div>
                </div>

                {/* Card 3: Total Transactions */}
                <div className="p-5 bg-white border border-gray-100/80 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-4">
                    <div className="p-3.5 rounded-2xl bg-emerald-50 flex items-center justify-center shrink-0">
                        <DollarSign className="w-5 h-5 text-emerald-700" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                            ${dashboardData.totalTransactionsAmount}
                        </h2>
                        <p className="text-xs font-semibold text-gray-400 mt-0.5">
                            Total Transactions
                        </p>
                    </div>
                </div>

                {/* Card 4: Clinical Reviews */}
                <div className="p-5 bg-white border border-gray-100/80 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-4">
                    <div className="p-3.5 rounded-2xl bg-emerald-50 flex items-center justify-center shrink-0">
                        <Star className="w-5 h-5 text-emerald-700" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                            {dashboardData.reviewsCount}
                        </h2>
                        <p className="text-xs font-semibold text-gray-400 mt-0.5">
                            Clinical Reviews
                        </p>
                    </div>
                </div>

            </div>

            {/* Bottom Section: Consultations Table/List */}
            <div className="p-6 md:p-8 bg-white border border-gray-100 rounded-3xl shadow-sm space-y-6">

                {/* Section Header */}
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-slate-800 tracking-tight">
                        Upcoming Consultations
                    </h2>
                    <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                        {dashboardData.consultations.length} Active
                    </span>
                </div>

                {/* List Items */}
                <div className="flex flex-col space-y-3.5">
                    {dashboardData.consultations.length > 0 ? (
                        dashboardData.consultations.map((item) => (
                            <Link 
                            key={item._id || item.id}
                            href={'/dashboard/patient/appointments'}>
                                <div
                                    
                                    className="group flex flex-col sm:flex-row sm:items-center justify-between p-4 md:p-5 bg-white rounded-2xl border border-gray-100 hover:border-emerald-200 hover:shadow-md hover:shadow-emerald-500/5 transition-all duration-200 gap-4 cursor-pointer"
                                >
                                    {/* Doctor Info */}
                                    <div className="space-y-2">
                                        <h3 className="text-base font-bold text-gray-900 group-hover:text-emerald-700 transition-colors">
                                            {item.doctorName}
                                        </h3>

                                        <div className="flex items-center gap-5 text-xs font-medium text-gray-500">
                                            <div className="flex items-center gap-1.5">
                                                <Calendar className="w-3.5 h-3.5 text-gray-400 group-hover:text-emerald-600 transition-colors" />
                                                <span>{item.date}</span>
                                            </div>

                                            <div className="flex items-center gap-1.5">
                                                <Clock className="w-3.5 h-3.5 text-gray-400 group-hover:text-emerald-600 transition-colors" />
                                                <span>{item.time}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Status Badge */}
                                    <div className="flex items-center gap-3">
                                        <Chip
                                            className="bg-amber-50 text-amber-700 border border-amber-200/50 font-bold text-[10px] tracking-wider px-3"
                                            size="sm"
                                            radius="full"
                                        >
                                            {item.status || "PENDING"}
                                        </Chip>

                                        <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all hidden sm:block" />
                                    </div>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <p className="text-sm text-gray-400 text-center py-6">
                            No upcoming consultations found.
                        </p>
                    )}
                </div>

            </div>

        </div>
    );
}