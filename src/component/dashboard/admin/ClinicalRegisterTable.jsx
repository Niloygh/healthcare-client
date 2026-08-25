'use client'

import { allAppointment } from '@/lib/action/admin';
import { Chip, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@heroui/react';
import React from 'react';

const ClinicalRegisterTable = ({appointments}) => {
    

    return (
        <div className="w-full">
            <Table
                aria-label="Clinical Appointments Registry Table"
                shadow="none"
                className="border border-default-200/80 rounded-2xl bg-white overflow-hidden"
                classNames={{
                    wrapper: "p-0 shadow-none",
                    th: "bg-default-50/60 text-default-600 font-bold text-[11px] uppercase tracking-wider py-4 px-6 border-b border-default-200",
                    td: "py-4 px-6 text-sm border-b border-default-100 last:border-none",
                }}
            >
                <TableHeader>
                    <TableColumn >PATIENT REPRESENTATIVE</TableColumn>
                    <TableColumn >SCHEDULES DOCTOR</TableColumn>
                    <TableColumn >SCHEDULED HOURS</TableColumn>
                    <TableColumn >BILLING CHARGE</TableColumn>
                    <TableColumn>ECOSYSTEM STATUS</TableColumn>
                </TableHeader>

                <TableBody items={appointments} emptyContent="No appointment records found.">
                    {(item) => {
                        const {
                            _id,
                            clientName,
                            doctorName,
                            date,
                            time,
                            fee,
                            paymentStatus,
                            appointmentComplete,
                        } = item;

                        const isPaid = paymentStatus === true;
                        const isCompleted = appointmentComplete === true;

                        return (
                            <TableRow key={_id || item.id}>
                                {/* Patient Name */}
                                <TableCell>
                                    <span className="font-bold text-default-900 text-sm">
                                        {clientName || 'N/A'}
                                    </span>
                                </TableCell>

                                {/* Doctor Name */}
                                <TableCell>
                                    <div>
                                        <p className="font-bold text-default-800 text-sm">
                                            Dr. {doctorName}
                                        </p>
                                    </div>
                                </TableCell>

                                {/* Scheduled Hours */}
                                <TableCell>
                                    <span className="font-medium text-default-500 text-xs font-mono">
                                        {date} <span className="mx-1 text-default-300">|</span> {time}
                                    </span>
                                </TableCell>

                                {/* Billing Charge */}
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <Chip
                                            size="sm"
                                            variant="flat"
                                            color={isPaid ? "success" : "danger"}
                                            className="font-bold text-[11px] px-2 h-6"
                                        >
                                            {isPaid ? 'Paid' : 'Unpaid'}
                                        </Chip>
                                        <span className="text-xs font-semibold text-default-600">
                                            ${fee}
                                        </span>
                                    </div>
                                </TableCell>

                                {/* Ecosystem Status */}
                                <TableCell>
                                    <Chip
                                        size="sm"
                                        variant="soft"
                                        color={isCompleted ? "primary" : "warning"}
                                        className={`font-extrabold text-[10px] uppercase tracking-wider px-3 h-6 ${
                                            isCompleted 
                                                ? 'bg-blue-100/70 text-blue-700' 
                                                : 'bg-amber-100/70 text-amber-700'
                                        }`}
                                    >
                                        {isCompleted ? 'COMPLETED' : 'PENDING'}
                                    </Chip>
                                </TableCell>
                            </TableRow>
                        );
                    }}
                </TableBody>
            </Table>
        </div>
    );
};

export default ClinicalRegisterTable;