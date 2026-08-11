'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Button } from '@heroui/react';
import { Check, X, Menu } from 'lucide-react';

const DashboardLayout = ({ menu = [], user, role }) => {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    const toggleSidebar = () => setIsOpen((prev) => !prev);

    return (
        <>
            {/* Mobile Top Header Bar */}
            <div className="lg:hidden w-full bg-white border border-gray-100 rounded-2xl p-4 shadow-sm flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10">
                        <Image
                            width={100}
                            height={100}
                            src={user?.image || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600"}
                            alt="Profile"
                            className={`w-full h-full rounded-full object-cover border-2 ${
                                user?.verified === 'verified' ? 'border-emerald-500' : 'border-gray-300'
                            }`}
                        />
                    </div>
                    <div>
                        <h4 className="text-sm font-bold text-slate-800">{user?.name}</h4>
                        <p className="text-xs text-emerald-600 font-semibold capitalize">{role}</p>
                    </div>
                </div>

                <Button
                    isIconOnly
                    variant="light"
                    onClick={toggleSidebar}
                    aria-label="Toggle Navigation"
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </Button>
            </div>

            {/* Mobile Drawer Overlay */}
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-black/40 z-40 lg:hidden backdrop-blur-xs transition-opacity"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar Container */}
            <aside
                className={`fixed lg:static top-0 left-0 z-50 h-full lg:h-auto w-[280px] sm:w-[300px] bg-white border border-gray-100 rounded-r-3xl lg:rounded-3xl p-6 shadow-sm flex flex-col gap-6 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                {/* Mobile Close Button Inside Drawer */}
                <div className="flex lg:hidden justify-between items-center pb-2 border-b border-gray-100">
                    <span className="text-sm font-bold text-slate-500">Menu Navigation</span>
                    <button 
                        onClick={() => setIsOpen(false)}
                        className="p-1 rounded-lg text-gray-500 hover:bg-gray-100"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Profile Section */}
                <div className="flex flex-col items-center text-center px-4 py-1 border-b border-gray-50">
                    <div className="relative w-20 h-20 mb-3">
                        <Image
                            width={300}
                            height={300}
                            src={user?.image || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600"}
                            alt="Profile"
                            className={`w-full h-full rounded-full object-cover border-2 ${
                                user?.verified === 'verified' ? 'border-emerald-500' : 'border-gray-300'
                            } p-0.5`}
                        />
                    </div>
                    <h3 className="text-lg font-bold text-slate-800">{user?.name}</h3>
                    <p className="text-sm text-emerald-600 font-bold mb-3">
                        {role ? role.charAt(0).toUpperCase() + role.slice(1) : ''}
                    </p>

                    {role === 'doctor' && (
                        <span className={`inline-flex items-center gap-1 ${
                            user?.verified === 'unverified' ? 'bg-red-500' : 'bg-emerald-500'
                        } text-white text-[11px] font-bold px-3 py-1.5 rounded-xl uppercase tracking-wider`}>
                            {user?.verified === 'unverified' ? <X size={16} /> : <Check size={16} />}
                            <span>{user?.verified}</span>
                        </span>
                    )}
                </div>

                <hr className="border-gray-100" />

                {/* Navigation Menu */}
                <nav className="flex flex-col gap-2 overflow-y-auto max-h-[calc(100vh-280px)] lg:max-h-none">
                    {menu.map((item, index) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link 
                                href={item.href} 
                                key={index}
                                onClick={() => setIsOpen(false)}
                            >
                                <Button
                                    variant={isActive ? 'solid' : 'light'}
                                    className={`flex justify-start items-center gap-3 w-full px-5 py-3 font-semibold rounded-2xl transition-all text-left text-sm ${
                                        isActive 
                                            ? 'bg-emerald-500 text-white shadow-md shadow-emerald-200' 
                                            : 'text-slate-600 hover:bg-emerald-50 hover:text-emerald-600'
                                    }`}
                                >
                                    <span className="shrink-0">{item.icon}</span>
                                    <span className="truncate">{item.title}</span>
                                </Button>
                            </Link>
                        );
                    })}
                </nav>
            </aside>
        </>
    );
};

export default DashboardLayout;