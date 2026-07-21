import { auth } from '@/lib/auth';
import { Activity, Award, BadgeCheck, Calendar, Check, Clock, DollarSign, FileText, ShieldCheck, Star, User, UsersRound, X } from 'lucide-react';
import { headers } from 'next/headers';
import DashboardLayout from '../../../DashboardLayout';


export default async function DashboardSidebar({ currentPath, children }) {
    
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    const user = session?.user;
    const role = user?.role;

    const navMenu = {
        patient: [
            {
                title: "Overview",
                icon: <ShieldCheck />,
                href: "/dashboard/patient/dashboard"
            },
            {
                title: "My Appointments",
                icon: <Calendar />,
                href: "/dashboard/patient/appointments"
            },
            {
                title: "Payment History",
                icon: <DollarSign />,
                href: "/dashboard/patient/payments"
            },
            {
                title: "Feedback Review",
                icon: <Star />,
                href: "/dashboard/patient/reviews"
            },
            {
                title: "My Profile",
                icon: <User />,
                href: "/dashboard/patient/profile"
            }
        ],
        doctor: [
            {
                title: "Dashboard Overview",
                icon: <Activity />,
                href: "/dashboard/doctor/dashboard"
            },
            {
                title: "Manage Schedules & Days",
                icon: <Clock />,
                href: "/dashboard/doctor/schedules"
            },
            {
                title: "Appointments Inbox",
                icon: <Calendar />,
                href: "/dashboard/doctor/appointments"
            },
            {
                title: "Prescriptions Cabin",
                icon: <FileText />,
                href: "/dashboard/doctor/prescriptions"
            },
            {
                title: "Profile Credentials",
                icon: <User />,
                href: "/dashboard/doctor/profile"
            }
        ],
        admin: [
            {
                title: "Ecosystem Analytics",
                icon: <BadgeCheck />,
                href: "/dashboard/admin/dashboard"
            },
            {
                title: "Manage Users Accounts",
                icon: <UsersRound />,
                href: "/dashboard/admin/users"
            },
            {
                title: "Verify Doctors Licenses",
                icon: <Award />,
                href: "/dashboard/admin/verify-doctors"
            },
            {
                title: "Clinical Appts Registration",
                icon: <Calendar />,
                href: "/dashboard/admin/appointments"
            },
            {
                title: "Stripe Cash Flows",
                icon: <DollarSign />,
                href: "/dashboard/admin/payments"
            }
        ]
    }

    const menu = navMenu[role] || [];

    return (
        <div className='container mx-auto my-5 flex gap-5'>
            <DashboardLayout menu={menu} user={user} role={role} />

            <div className="w-full">
                {children}
            </div>
        </div>
    );
}