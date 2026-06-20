import React from 'react';

const Statistics = ({ stat, index }) => {
    return (
        <div
            className={`rounded-3xl p-8 text-center ${index === 3 ? 'bg-emerald-100' : 'bg-gray-100'
                }`}
        >
            <div className={`text-4xl font-bold mb-2 ${index === 3 ? 'text-emerald-700' : 'text-gray-900'
                }`}>
                {stat.value}
            </div>
            <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
        </div>
    );
};

export default Statistics;