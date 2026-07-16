'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, User, Lock, Heart } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@heroui/react';
import { authClient } from '@/lib/auth-client';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    const {error} = authClient.signIn.email({
      email,
      password,
      callbackURL: '/dashboard'
    })
    
    if(error) {
      toast.error(error.message);
      return
    }
    // console.log('Login attempt with:', { email, password });
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white dark:bg-slate-950 p-6 lg:p-8">
        <div className="w-full max-w-sm"> {/* max-w-md থেকে max-w-sm করা হয়েছে */}
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-primary rounded-2xl flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="flex justify-center items-center gap-3 text-2xl font-bold text-slate-900 dark:text-white">
                <span className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" />
                </span>

                <span>HealthCare</span></h1>
              <p className="text-xs text-slate-500 ml-11">Healthcare</p>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-1">
              Welcome Back
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6 text-sm">
              Sign in to access your patient dashboard
            </p>

            <form onSubmit={handleLogin} className="space-y-5">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-11 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl focus:outline-none focus:border-primary transition-colors"
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-11 pr-11 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl focus:outline-none focus:border-primary transition-colors"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Login Button */}
              <Button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-2xl font-semibold text-base transition-all"
              >
                Sign In
              </Button>

              {/* Create Account */}
              <Link href='/register'>
                <button
                  type="button"
                  className="w-full border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900 py-3 rounded-2xl font-medium text-sm transition-all"
                >
                  Create New Account
                </button>
              </Link>
            </form>

            {/* Social Login */}
            <div className="mt-6">
              <div className="relative flex items-center justify-center my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200 dark:border-slate-800"></div>
                </div>
                <span className="relative z-10 !bg-white dark:!bg-slate-950 px-4 text-xs text-slate-500">
                  Or continue with
                </span>
              </div>

              <div className="">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full border border-slate-200 dark:border-slate-700 py-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-900 transition-all text-sm"
                >
                  Google
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right Side - Illustration (Compact) */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(at_center,#ffffff15_1px,transparent_1px)] [background-size:30px_30px]"></div>

        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="text-center relative z-10"
        >
          <div className="relative mx-auto w-64 h-64"> {/* ছোট করা হয়েছে */}
            <div className="w-64 h-64 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 flex items-center justify-center shadow-2xl">
              <div className="text-white text-center px-6">
                <div className="text-6xl mb-3">🩺</div>
                <h3 className="text-xl font-semibold mb-1">Your Health, Our Priority</h3>
                <p className="text-white/80 text-sm">Expert doctors • Instant appointments</p>
              </div>
            </div>
          </div>

          {/* Floating Icons - ছোট ও অবস্থান অ্যাডজাস্ট */}
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="absolute -top-6 -right-6 bg-white p-3 rounded-2xl shadow-xl text-xl"
          >
            ❤️
          </motion.div>
          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{ repeat: Infinity, duration: 4, delay: 1 }}
            className="absolute bottom-16 -left-6 bg-white p-3 rounded-2xl shadow-xl text-xl"
          >
            💊
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}