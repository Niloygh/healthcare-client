import React from "react";
import AdminTransactionRow from "@/component/dashboard/admin/AdminTransactionRow";
import { adminAllPayment } from "@/lib/action/admin";

const StripeTransactions = async () => {

  const payments = await adminAllPayment();
  

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Page Title */}
      <h1 className="text-2xl font-bold text-[#0F2922] mb-6">
        Stripe Payment Transactions
      </h1>

      {payments.length === 0 || !payments[0]?.session_id ? (
        <div className="flex justify-center items-center py-15 font-bold text-3xl text-gray-500">
          No Payment
        </div>
      ) : (
        /* Outer Card Wrapper */
        <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm overflow-hidden p-2">
          <div className="overflow-x-auto min-w-[650px]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-200/80">
                  <th className="bg-transparent text-gray-500 font-bold text-xs uppercase tracking-wider py-3 px-6">
                    PAID PRACTITIONER
                  </th>
                  <th className="bg-transparent text-gray-500 font-bold text-xs uppercase tracking-wider py-3 px-6">
                    STRIPE CHARGE / TXID
                  </th>
                  <th className="bg-transparent text-gray-500 font-bold text-xs uppercase tracking-wider py-3 px-6">
                    AMOUNT
                  </th>
                  <th className="bg-transparent text-gray-500 font-bold text-xs uppercase tracking-wider py-3 px-6">
                    DATE
                  </th>
                  <th className="bg-transparent text-gray-500 font-bold text-xs uppercase tracking-wider py-3 px-6">
                    STATUS
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {payments.map((payment) => (
                  <AdminTransactionRow
                    key={payment._id?.$oid || payment._id || payment.session_id}
                    payment={payment}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default StripeTransactions;