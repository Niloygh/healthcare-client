"use client";

import React, { useState } from "react";
import { Copy, Check } from "lucide-react";
import toast from "react-hot-toast";

const AdminTransactionRow = ({ payment }) => {
  const [copied, setCopied] = useState(false);

  // Full Session ID / TxID string
  const fullTxId = payment?.session_id || payment?._id?.$oid || payment?._id || "";

  // Handle Copy function
  const handleCopy = () => {
    if (fullTxId) {
      navigator.clipboard.writeText(fullTxId);
      setCopied(true);
      toast.success("Copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Dynamic status badge styling
  const isSuccess = payment?.paymentStatus === "success";
  const isPending = payment?.request === "pending" || payment?.paymentStatus === "pending";

  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
      {/* PAID PRACTITIONER */}
      <td className="font-semibold text-gray-900 py-4 px-6 text-sm">
        Dr. {payment?.doctorName || "N/A"}
      </td>

      {/* STRIPE CHARGE / TXID (WITH COPY FEATURE) */}
      <td className="text-gray-600 font-normal text-sm py-4 px-6">
        <div className="flex items-center gap-2 group">
          <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded text-gray-700">
            {fullTxId.length > 20 ? `${fullTxId.slice(0, 18)}...` : fullTxId || "N/A"}
          </span>
          <button
            type="button"
            onClick={handleCopy}
            className="p-1 rounded text-gray-400 hover:text-emerald-600 hover:bg-gray-100 transition-colors"
            title={copied ? "Copied!" : "Copy Full ID"}
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-emerald-600" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </td>

      {/* AMOUNT */}
      <td className="font-bold text-gray-900 py-4 px-6 text-sm">
        ${payment?.amount || 0}
      </td>

      {/* DATE */}
      <td className="text-gray-700 font-medium py-4 px-6 text-sm">
        {payment?.paymentDate || "N/A"}
      </td>

      {/* STATUS */}
      <td className="py-4 px-6 text-sm">
        <span
          className={`capitalize font-bold text-[12px] tracking-wider px-3 py-1 rounded-full inline-flex items-center ${
            isSuccess
              ? "bg-[#DDF0E4] text-[#0F5132]"
              : isPending
              ? "bg-[#FEF3C7] text-[#92400E]"
              : "bg-[#FEE2E2] text-[#991B1B]"
          }`}
        >
          {payment?.paymentStatus || "N/A"}
        </span>
      </td>
    </tr>
  );
};

export default AdminTransactionRow;