import DashboardLayout from '@/component/dashboard/DashboardLayout';
import AnimatedWrapper from '@/component/dashboard/AnimatedWrapper';
import { auth } from '@/lib/auth';
import { 
  Activity, Award, BadgeCheck, Calendar, Clock, 
  DollarSign, FileText, ShieldCheck, Star, User, UsersRound 
} from 'lucide-react';
import { headers } from 'next/headers';

const DashboardAllChildren = async ({ children }) => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    const user = session?.user;
    const role = user?.role;

    const navMenu = {
        patient: [
            { title: "Overview", icon: <ShieldCheck size={20} />, href: "/dashboard/patient/dashboard" },
            { title: "My Appointments", icon: <Calendar size={20} />, href: "/dashboard/patient/appointments" },
            { title: "Payment History", icon: <DollarSign size={20} />, href: "/dashboard/patient/payments" },
            { title: "Feedback Review", icon: <Star size={20} />, href: "/dashboard/patient/feedback" },
            { title: "My Profile", icon: <User size={20} />, href: "/dashboard/patient/profile" }
        ],
        doctor: [
            { title: "Dashboard Overview", icon: <Activity size={20} />, href: "/dashboard/doctor/dashboard" },
            { title: "Manage Schedules & Days", icon: <Clock size={20} />, href: "/dashboard/doctor/schedules" },
            { title: "Appointments Inbox", icon: <Calendar size={20} />, href: "/dashboard/doctor/appointments" },
            { title: "Prescriptions Cabin", icon: <FileText size={20} />, href: "/dashboard/doctor/prescriptions" },
            { title: "Profile Credentials", icon: <User size={20} />, href: "/dashboard/doctor/profile" }
        ],
        admin: [
            { title: "Ecosystem Analytics", icon: <BadgeCheck size={20} />, href: "/dashboard/admin/dashboard" },
            { title: "Manage Users Accounts", icon: <UsersRound size={20} />, href: "/dashboard/admin/users" },
            { title: "Verify Doctors Licenses", icon: <Award size={20} />, href: "/dashboard/admin/verify-doctors" },
            { title: "Clinical Appts Registration", icon: <Calendar size={20} />, href: "/dashboard/admin/appointments" },
            { title: "Stripe Cash Flows", icon: <DollarSign size={20} />, href: "/dashboard/admin/payments" }
        ]
    };

    const menu = navMenu[role] || [];

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-5 lg:py-7 flex flex-col lg:flex-row gap-6 items-start">
            <DashboardLayout menu={menu} user={user} role={role} />

            <div className="w-full flex-1 min-w-0">
                <AnimatedWrapper>
                    {children}
                </AnimatedWrapper>
            </div>
        </div>
    );
};

export default DashboardAllChildren;