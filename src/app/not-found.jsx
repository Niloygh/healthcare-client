'use client';

import Link from 'next/link';
import { Heart, Home, ArrowLeft } from 'lucide-react';
import { useSession } from '@/lib/auth-client';

export default function NotFound() {

  const { data: session, isPending } = useSession();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Icon */}
        <div className="flex justify-center mb-8">
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center">
            <Heart className="w-12 h-12 text-red-500" />
          </div>
        </div>

        <h1 className="text-7xl font-bold text-gray-900 mb-2">404</h1>
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">Page Not Found</h2>

        <p className="text-gray-600 mb-10 text-lg">
          Sorry, the page you are looking for doesn't exist or has been moved.
          <br />Let's get you back to caring for your health.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-semibold transition-all"
          >
            <Home size={20} />
            Back to Home
          </Link>
          {
            session && <Link
            href="/"
            className="flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-semibold transition-all"
          >
            <Home size={20} />
            Back to Home
          </Link>
          }
          
        </div>

        <p className="mt-12 text-sm text-gray-500">
          Need help? Contact our support at <span className="text-blue-600">support@carepulse.com</span>
        </p>
      </div>
    </div>
  );
}