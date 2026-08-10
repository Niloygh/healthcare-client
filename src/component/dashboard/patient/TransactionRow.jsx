"use client";

import React, { useState } from "react";
import { Table, Chip, Button } from "@heroui/react";
import { Copy, Check } from "lucide-react";
import toast from "react-hot-toast";

const TransactionRow = ({ payment }) => {
  const [copied, setCopied] = useState(false);

  // Full Session ID / TxID string
  const fullTxId = payment.session_id || payment._id?.$oid || "";

  // Handle Copy function
  const handleCopy = () => {
    if (fullTxId) {
      navigator.clipboard.writeText(fullTxId);
      setCopied(true);
      toast.success("Copy")
      setTimeout(() => setCopied(false), 2000);
    }
  };


  return (
    <Table.Row className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
      {/* PAID PRACTITIONER */}
      <Table.Cell className="font-semibold text-gray-900 py-4">
        {payment.doctorName}
      </Table.Cell>

      {/* STRIPE CHARGE / TXID (WITH FULL COPY FEATURE) */}
      <Table.Cell className="text-gray-600 font-normal text-sm py-4">
        <div className="flex items-center gap-2 group">
          <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded text-gray-700">
            {fullTxId.length > 20 ? `${fullTxId.slice(0, 18)}...` : fullTxId}
          </span>
          <Button
            isIconOnly
            size="sm"
            variant="light"
            onClick={handleCopy}
            className="h-7 w-7 text-gray-400 hover:text-emerald-600 min-w-0"
            title={copied ? "Copied!" : "Copy Full ID"}
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-emerald-600" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
          </Button>
        </div>
      </Table.Cell>

      {/* AMOUNT */}
      <Table.Cell className="font-bold text-gray-900 py-4">
        ${payment.amount}
      </Table.Cell>

      {/* DATE */}
      <Table.Cell className="text-gray-700 font-medium py-4">
        {payment.paymentDate}
      </Table.Cell>

      {/* STATUS */}
      <Table.Cell className="py-4">
        <Chip
          className="capitalize font-bold text-[14px] tracking-wider px-3 border-0"
          style={{
            backgroundColor:
              payment.paymentStatus === "success"
                ? "#DDF0E4"
                : payment.request === "pending"
                ? "#FEF3C7"
                : "#FEE2E2",
            color:
              payment.paymentStatus === "success"
                ? "#0F5132"
                : payment.paymentStatus === "pending"
                ? "#92400E"
                : "#991B1B",
          }}
          size="sm"
          radius="full"
        >
          {payment.paymentStatus}
        </Chip>
      </Table.Cell>
    </Table.Row>
  );
};

export default TransactionRow;