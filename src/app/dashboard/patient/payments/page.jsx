
import React from "react";
import { Table } from "@heroui/react";
import { auth } from "@/lib/auth";
import { allPayment } from "@/lib/action/payment";
import TransactionRow from "@/component/dashboard/patient/TransactionRow";
import { headers } from "next/headers";

const StripeTransactions = async () => {

  const session = await auth.api.getSession({
    headers: await headers()
  })
  const clientId = session.user.id

  const payments = await allPayment(clientId)


  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Page Title */}
      <h1 className="text-2xl font-bold text-[#0F2922] mb-6">
        Stripe Payment Transactions
      </h1>

      {!payments[0]?.session_id ? <div className="flex justify-center items-center py-15 font-bold text-3xl">No Payment</div> : <div>
        {/* Outer Card Wrapper */}
        <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm overflow-hidden p-2">
          <Table className="w-full">
            <Table.ScrollContainer>
              <Table.Content aria-label="Stripe Transactions Table" className="min-w-[650px]">
                <Table.Header>
                  <Table.Column isRowHeader className="bg-transparent text-gray-500 font-bold text-xs uppercase tracking-wider py-3">
                    PAID PRACTITIONER
                  </Table.Column>

                  <Table.Column className="bg-transparent text-gray-500 font-bold text-xs uppercase tracking-wider py-3">
                    STRIPE CHARGE / TXID
                  </Table.Column>

                  <Table.Column className="bg-transparent text-gray-500 font-bold text-xs uppercase tracking-wider py-3">
                    AMOUNT
                  </Table.Column>

                  <Table.Column className="bg-transparent text-gray-500 font-bold text-xs uppercase tracking-wider py-3">
                    DATE
                  </Table.Column>

                  <Table.Column className="bg-transparent text-gray-500 font-bold text-xs uppercase tracking-wider py-3">
                    STATUS
                  </Table.Column>
                </Table.Header>

                <Table.Body>
                  {payments?.map((payment) => (
                    <TransactionRow
                      key={payment._id?.$oid || payment._id}
                      payment={payment}
                    />
                  ))}
                </Table.Body>
              </Table.Content>
            </Table.ScrollContainer>
          </Table>
        </div>
        
      </div>}

    </div>
  );
};

export default StripeTransactions;