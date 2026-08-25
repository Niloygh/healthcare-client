'use client'; // Client-side search & state use korar jonno client component e convertible ba server + client split korte paren

import React, { useState } from 'react';
import { Trash2, Search } from 'lucide-react';
import Image from 'next/image';
import { UserActions } from './UserActions';

const ManageUsersTable = ({ users = [] }) => {
    const [searchQuery, setSearchQuery] = useState('');

    // Name ba Email er opor base kore Filter logic
    const filteredUsers = users.filter((user) => {
        const name = user.name ? user.name.toLowerCase() : '';
        const email = user.email ? user.email.toLowerCase() : '';
        const query = searchQuery.toLowerCase();

        return name.includes(query) || email.includes(query);
    });

    return (
        <div className="p-4 md:p-8">
            <div className="max-w-6xl mx-auto space-y-4">
                
                {/* Search Bar Input */}
                <div className="flex justify-between items-center gap-4 bg-white p-4 rounded-xl border border-gray-200/80 shadow-sm">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search user by name or email..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                        />
                    </div>
                    <div className="text-xs font-semibold text-gray-500">
                        Total Users: {filteredUsers.length}
                    </div>
                </div>

                {/* Table Section */}
                <div className="bg-white border border-gray-200/80 rounded-2xl shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-gray-200 text-[11px] font-bold text-gray-700 uppercase tracking-wider bg-gray-50/50">
                                    <th className="py-4 px-6">AVATARS & USER</th>
                                    <th className="py-4 px-6">AUTHORIZATION</th>
                                    <th className="py-4 px-6">ACCOUNT EMAIL</th>
                                    <th className="py-4 px-6">SYSTEM STATUS</th>
                                    <th className="py-4 px-6 text-center">ACTIONS</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-100 text-sm">
                                {filteredUsers.length > 0 ? (
                                    filteredUsers.map((user) => {
                                        const { _id, name, email, image, role, suspend } = user;
                                        const isSuspended = suspend === 'suspend';

                                        return (
                                            <tr key={_id} className="hover:bg-gray-50/50 transition-colors">
                                                <td className="py-4 px-6">
                                                    <div className="flex items-center gap-3">
                                                        {image ? (
                                                            <Image
                                                                width={200}
                                                                height={200}
                                                                src={image}
                                                                alt={name || 'user'}
                                                                className="w-10 h-10 rounded-full object-cover border border-gray-200"
                                                            />
                                                        ) : (
                                                            <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center font-bold text-sm">
                                                                {name?.charAt(0).toUpperCase()}
                                                            </div>
                                                        )}
                                                        <span className="font-bold text-gray-900">{name}</span>
                                                    </div>
                                                </td>

                                                <td className="py-4 px-6">
                                                    <span className={`text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-md tracking-wider ${
                                                        role === 'admin'
                                                            ? 'bg-purple-100/70 text-purple-700'
                                                            : role === 'doctor'
                                                                ? 'bg-blue-100/70 text-blue-700'
                                                                : 'bg-emerald-100/70 text-emerald-800'
                                                    }`}>
                                                        {role}
                                                    </span>
                                                </td>

                                                <td className="py-4 px-6 text-gray-500 font-medium">
                                                    {email}
                                                </td>

                                                <td className="py-4 px-6">
                                                    <span className={`text-[10px] font-extrabold uppercase px-3 py-1 rounded-full tracking-wider ${
                                                        isSuspended
                                                            ? 'bg-amber-100 text-amber-800'
                                                            : 'bg-emerald-100/70 text-emerald-800'
                                                    }`}>
                                                        {isSuspended ? 'SUSPENDED' : 'ACTIVE'}
                                                    </span>
                                                </td>

                                                <td className="py-4 px-6 text-center">
                                                    <UserActions 
                                                        userId={_id} 
                                                        role={role} 
                                                        suspendStatus={suspend} 
                                                    />
                                                </td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="py-8 text-center text-gray-500 font-medium">
                                            No users found matching "{searchQuery}"
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ManageUsersTable;