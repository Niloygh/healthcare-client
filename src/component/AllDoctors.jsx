import React from 'react';

const AllDoctors = ({ doctor }) => {
    return (
        <div
            className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group"
        >
            <div className="relative h-64">
                <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                    <span className="bg-black/70 text-white text-xs font-semibold px-3 py-1 rounded-full">
                        {doctor.specialty}
                    </span>
                </div>
            </div>

            <div className="p-6">
                <h3 className="font-semibold text-xl text-gray-900 mb-1">
                    {doctor.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4">{doctor.credentials}</p>

                <p className="text-gray-500 text-sm mb-4">{doctor.hospital}</p>

                <div className="flex justify-between items-end border-t pt-4">
                    <div>
                        <p className="text-xs text-gray-500">{doctor.experience}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-lg font-semibold text-blue-600">{doctor.fee}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllDoctors;