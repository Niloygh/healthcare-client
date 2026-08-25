'use client';

import React, { useState } from 'react';
import { Button, Chip } from '@heroui/react';
import toast from 'react-hot-toast';
import { updateDoctorLicense } from '@/lib/action/admin';
import { useRouter } from 'next/navigation';

export const DoctorLicenseActions = ({ doctorId, currentStatus }) => {
    
    const router = useRouter()
    
    const [loading, setLoading] = useState(false);

    const handleStatusChange = async (newStatus) => {
        setLoading(true);
            const res = await updateDoctorLicense(doctorId, newStatus);
            if (res?.success) {
                if (newStatus === 'verified') toast.success('Doctor License Verified!');
                else if (newStatus === 'rejected') toast.error('Doctor License Rejected!');
                router.push('/dashboard/admin/verify-doctors')
            } else {
                toast.error(res?.error || 'Something went wrong');
            }
        setLoading(false);
    };


    return (
        <div className="flex items-center justify-between gap-2 mt-4 pt-3 border-t border-divider">
            {/* Status Chip */}
            <div className="flex flex-col gap-1">
                <span className="text-[10px] font-bold text-default-400 uppercase tracking-wider">
                    STATUS
                </span>
                <Chip
                    color={currentStatus === 'verified' ? 'success' : 'danger'}
                    variant="flat"
                    size="sm"
                    className="font-bold uppercase text-[10px] tracking-wider"
                >
                    {currentStatus === 'verified' ? 'VERIFIED' : currentStatus === 'rejected' ? 'REJECTED' : 'PENDING'}
                </Chip>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
                {currentStatus !== 'verified' && (
                    <Button
                        size="sm"
                        variant="secondary"
                        color="success"
                        isLoading={loading}
                        onPress={() => handleStatusChange('verified')}
                        className="font-semibold text-xs"
                    >
                        Verify License
                    </Button>
                )}

                {currentStatus !== 'rejected' && (
                    <Button
                        size="sm"
                        variant="danger"
                        color="danger"
                        isLoading={loading}
                        onPress={() => handleStatusChange('rejected')}
                        className="font-semibold text-xs"
                    >
                        Reject License
                    </Button>
                )}

                {currentStatus === 'verified' && (
                    <Button
                        size="sm"
                        variant="danger-soft"
                        color="warning"
                        isLoading={loading}
                        onPress={() => handleStatusChange('pending')}
                        className="font-semibold text-xs"
                    >
                        Cancel Verify
                    </Button>
                )}
            </div>
        </div>
    );
};