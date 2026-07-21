import { Button } from '@heroui/react';
import { Check, X } from 'lucide-react';
import Image from 'next/image';

import Link from 'next/link';


const DashboardLayout = ({menu, user, role}) => {
    return (
        <div className="w-[300px] bg-white border border-gray-100 rounded-3xl p-6 shadow-sm flex flex-col gap-6">
                
                {/* Profile Section */}
                <div className="flex flex-col items-center text-center px-4 py-1 border-b border-gray-50">
                    <div className="relative w-20 h-20 mb-3">
                        <Image
                            width={300}
                            height={300}
                            src={user?.image || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600"}
                            alt="Profile"
                            className={`w-full h-full rounded-full object-cover border-2 ${user?.verified === 'verified' ? 'border-emerald-500' : 'border-gray-300'} p-0.5`}
                        />
                    </div>
                    <h3 className="text-lg font-bold text-slate-800">{user?.name}</h3>
                    <p className="text-sm text-emerald-600 font-bold mb-3">
                        {role?.charAt(0)?.toUpperCase() + role?.slice(1)}
                    </p>

                    {role === 'doctor' && (
                        <span className={`inline-flex items-center gap-1 ${user?.verified === 'unverified' ? 'bg-red-500' : 'bg-emerald-500'} text-white text-[11px] font-bold px-3 py-1.5 rounded-xl uppercase tracking-wider`}>
                            {user?.verified === 'unverified' ? <X size={18} /> : <Check size={18} />}
                            <span>{user?.verified}</span>
                        </span>
                    )}
                </div>

                <hr />

                {/* Navigation Menu */}
                <nav className="flex flex-col gap-2">
                    {menu.map((item, index) => {
                        return (
                            <Link href={item.href} key={index}>
                                <Button
                                variant='outline'
                                    className={`flex justify-start items-center gap-3 w-full px-6 py-3 font-semibold rounded-2xl transition-all text-left text-sm`}
                                >
                                    <span>{item.icon}</span>
                                    <span>{item.title}</span>
                                </Button>
                            </Link>
                        );
                    })}
                </nav>
            </div>
    );
};

export default DashboardLayout;