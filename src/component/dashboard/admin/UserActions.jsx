'use client';

import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { toggleUserSuspend } from '@/lib/action/admin';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export const UserActions = ({ userId, role, suspendStatus }) => {
    const router = useRouter()
    
    const [loading, setLoading] = useState(false);
    const isSuspended = suspendStatus === 'suspend';

    const handleToggle = async () => {
        setLoading(true);

        const res = await toggleUserSuspend(userId, suspendStatus || '');
        if (res?.success) {
            if (isSuspended) {
                toast.success('User activated successfully!');
                router.push('/dashboard/admin/users')
            } else {
                toast.success('User suspended successfully!');
                router.push('/dashboard/admin/users')
            }
        } else {
            toast.error(res?.error || 'Something went wrong!');
        }

        setLoading(false)
    };

    if (role === 'admin') return null;

    return (
        <div className="flex items-center justify-center gap-2">
            <button
                onClick={handleToggle}
                disabled={loading}
                className={`border text-xs font-semibold px-3 py-1 rounded-md transition-all cursor-pointer ${loading ? 'opacity-50 cursor-not-allowed' : ''
                    } ${isSuspended
                        ? 'border-emerald-400 text-emerald-600 hover:bg-emerald-50'
                        : 'border-amber-400 text-amber-600 hover:bg-amber-50'
                    }`}
            >
                {loading ? 'Updating...' : isSuspended ? 'Unsuspend' : 'Suspend'}
            </button>

            <button
                className="text-gray-400 hover:text-red-500 p-1.5 transition-colors cursor-pointer"
                title="Delete"
            >
                <Trash2 className="w-4 h-4" />
            </button>
        </div>
    );
};