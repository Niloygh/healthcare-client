'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Logo & About */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <span className="text-3xl font-bold text-white">HealthCare</span>
            </div>
            
            <p className="text-gray-400 max-w-md leading-relaxed mb-6">
              Connecting patients with trusted healthcare professionals. 
              Quality care, easy appointments, and complete medical records — all in one place.
            </p>

            <div className="flex items-center gap-2 text-sm text-gray-400">
              <MapPin className="w-5 h-5 text-blue-400" />
              <span>123 Healthcare Avenue, New York, NY</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h3 className="text-white font-semibold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3 text-gray-400">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/find-doctors" className="hover:text-white transition-colors">Find Doctors</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
            </ul>
          </div>

          {/* Emergency Hotline - Compact & Balanced */}
          <div className="lg:col-span-2">
            <h3 className="text-white font-semibold text-lg mb-5">Emergency Hotline</h3>
            
            <div className="bg-gradient-to-br from-red-900/20 to-slate-900 border border-red-500/30 rounded-3xl p-5 text-center hover:border-red-500/50 transition-all duration-300 group">
              <div className="flex justify-center mb-3">
                <div className="w-14 h-14 bg-red-500/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Phone className="w-6 h-6 text-red-500" />
                </div>
              </div>
              <p className="text-red-400 text-xs font-medium tracking-widest mb-2">24/7 MEDICAL SUPPORT</p>
              
              
              <a 
                href="#" 
                className="block text-sm font-bold text-white hover:text-red-400 transition-colors mb-2"
              >
                +1 (800) 555-CARE
              </a>
              
              <div className="inline-flex items-center gap-2 bg-slate-900/80 text-[10px] px-3 py-1.5 rounded-full border border-red-500/20">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>ACTIVE 24 HOURS • ZERO TOLL</span>
              </div>
            </div>
          </div>

          {/* Contact & Social */}
          <div className="lg:col-span-3">
            <h3 className="text-white font-semibold text-lg mb-6">Get In Touch</h3>
            
            <div className="space-y-5 mb-8">
              <a href="mailto:support@carepulse.com" className="flex items-center gap-3 hover:text-white transition-colors">
                <Mail className="w-5 h-5 text-blue-400" />
                <span>support@carepulse.com</span>
              </a>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-blue-400" />
                <span>+1 (555) 123-4567</span>
              </div>
            </div>

            <div>
              <h4 className="text-white font-medium mb-4">Follow Us</h4>
              <div className="flex gap-4">
                <a href="#" className="w-11 h-11 bg-slate-900 hover:bg-blue-600 rounded-2xl flex items-center justify-center text-xl transition-all hover:scale-110">𝕏</a>
                <a href="#" className="w-11 h-11 bg-slate-900 hover:bg-blue-600 rounded-2xl flex items-center justify-center text-xl transition-all hover:scale-110">in</a>
                <a href="#" className="w-11 h-11 bg-slate-900 hover:bg-blue-600 rounded-2xl flex items-center justify-center text-xl transition-all hover:scale-110">▶</a>
                <a href="#" className="w-11 h-11 bg-slate-900 hover:bg-blue-600 rounded-2xl flex items-center justify-center text-xl transition-all hover:scale-110">📘</a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 mt-16 pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
          <div>© 2026 CarePulse. All Rights Reserved.</div>
          <div className="mt-4 md:mt-0 flex gap-6">
            <Link href="/privacy" className="hover:text-gray-300 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-gray-300 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}