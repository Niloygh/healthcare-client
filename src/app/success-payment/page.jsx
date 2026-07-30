import { stripe } from '@/lib/stripe'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle2, ArrowRight, Mail, HelpCircle } from 'lucide-react'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { payment } from '@/lib/action/payment'

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams

  const session = await auth.api.getSession({
    headers: await headers()
  })

  // console.log(session.user.role)

  if (!session_id) {
    throw new Error('Please provide a valid session_id (`cs_test_...`)')
  }

  const {
    status,
    metadata,
    customer_details
  } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent']
  })

  if (status === 'open') {
    return redirect('/')
  }

  if (status === 'complete') {
    // Database operation (Consider moving heavy mutations to Webhooks for production)
    await payment({ ...metadata, session_id })

    const customerEmail = customer_details?.email || 'your email'

    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden text-slate-800">

          {/* Top Banner Icon */}
          <div className="bg-emerald-500/10 p-8 flex justify-center items-center">
            <div className="bg-emerald-100 rounded-full p-3 ring-8 ring-emerald-50">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 animate-bounce" />
            </div>
          </div>

          {/* Main Content */}
          <div className="p-6 sm:p-8 text-center space-y-4">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Payment Successful!
            </h1>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              We appreciate your business! A confirmation email with order details has been sent to:
            </p>

            {/* Email Pill */}
            <div className="inline-flex items-center gap-2 bg-slate-100 text-slate-700 font-medium text-sm px-4 py-2 rounded-full">
              <Mail className="w-4 h-4 text-slate-500" />
              <span>{customerEmail}</span>
            </div>

            {/* Action Buttons */}
            <div className="pt-6 space-y-3">
              <Link
                href={`/dashboard/${session.user.role}/dashboard`}
                className="w-full inline-flex justify-center items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-xl transition duration-200 shadow-lg shadow-emerald-600/20"
              >
                Go to Dashboard
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href="mailto:orders@example.com"
                className="w-full inline-flex justify-center items-center gap-2 bg-transparent hover:bg-slate-50 text-slate-600 font-medium py-2.5 px-6 rounded-xl border border-slate-200 transition duration-200 text-sm"
              >
                <HelpCircle className="w-4 h-4 text-slate-400" />
                Contact Support
              </a>
            </div>
          </div>

          {/* Footer Note */}
          <div className="bg-slate-50 border-t border-slate-100 p-4 text-center text-xs text-slate-400">
            Session ID: <span className="font-mono text-slate-500">{session_id.slice(0, 15)}...</span>
          </div>

        </div>
      </main>
    )
  }

  return null
}