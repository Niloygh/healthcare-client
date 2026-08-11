import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { stripe } from '@/lib/stripe';
import { auth } from '@/lib/auth';

export async function POST(request) {
  try {
    const headersList = await headers();
   
    const origin = headersList.get('origin') || process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'; 
    const body = await request.json();

    const userSession = await auth.api.getSession({
        headers: headersList
    });

    
    if (!userSession || !userSession.user) {
      return NextResponse.json({ error: "n Unauthorized access. Please login." }, { status: 401 });
    }

    const user = userSession.user;
    const clientId = String(user.id);
    const doctorId = body.doctorId;
    const doctorName = body.doctorName;
    const amount = body.amount;
    const paymentDate = body.paymentDate;
    const appointmentId = body.appointmentId;

    
    if (!amount || isNaN(amount)) {
      return NextResponse.json({ error: "Invalid payment amount." }, { status: 400 });
    }

    
    const session = await stripe.checkout.sessions.create({
      customer_email: user.email,
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `Appointment with ${doctorName || 'Doctor'}`, 
            },
            unit_amount: Number(amount) * 100,
          },
          quantity: 1,
        },
      ],
      metadata: {
        clientId,
        doctorId: String(doctorId || ''),
        doctorName: String(doctorName || ''),
        amount: String(amount), //
        paymentDate: String(paymentDate || ''),
        appointmentId: String(appointmentId || ''),
        request: "pending"
      },
      mode: 'payment',
      success_url: `${origin}/success-payment?session_id={CHECKOUT_SESSION_ID}`,
    });

    return NextResponse.json({ url: session.url });

  } catch (err) {
    console.error("Payment API Error:", err);
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 }
    );
  }
}