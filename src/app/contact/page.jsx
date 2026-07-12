'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, MapPin, Clock, Heart, Send } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Contact Form Submitted:', formData);
    alert("Thank you! Your message has been sent successfully.");
    // এখানে তোমার API কল যোগ করবে
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Hero Section */}
      <div className="bg-slate-950 py-20 text-white">
        <div className="max-w-4xl mx-auto text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Heart className="w-16 h-16 mx-auto mb-6 text-emerald-300" />
            <h1 className="text-5xl font-bold mb-4">Contact Us</h1>
            <p className="text-xl text-emerald-100">
              Any questions or remarks? Just write us a message!
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl p-10">
              <h2 className="text-3xl font-semibold mb-8 text-slate-900 dark:text-white">
                Send us a Message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl focus:outline-none focus:border-emerald-500"
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl focus:outline-none focus:border-emerald-500"
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl focus:outline-none focus:border-emerald-500"
                      placeholder="+880 1XXX-XXXXXX"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Subject</label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl focus:outline-none focus:border-emerald-500"
                      required
                    >
                      <option value="">Select Subject</option>
                      <option value="appointment">Book Appointment</option>
                      <option value="general">General Inquiry</option>
                      <option value="emergency">Emergency Support</option>
                      <option value="feedback">Feedback</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Your Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl focus:outline-none focus:border-emerald-500 resize-none"
                    placeholder="Write your message here..."
                    required
                  ></textarea>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-semibold text-lg flex items-center justify-center gap-3 transition-all"
                >
                  <Send className="w-5 h-5" />
                  Send Message
                </motion.button>
              </form>
            </div>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Phone */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-900 rounded-2xl flex items-center justify-center">
                  <Phone className="w-7 h-7 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-xl">Call Us</h3>
                  <p className="text-emerald-600 font-medium">24/7 Emergency Support</p>
                </div>
              </div>
              <p className="text-2xl font-semibold text-slate-900 dark:text-white">+880 1711-234567</p>
              <p className="text-slate-500 mt-1">+880 2-9876543 (Landline)</p>
            </div>

            {/* Location */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-900 rounded-2xl flex items-center justify-center">
                  <MapPin className="w-7 h-7 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-xl">Visit Us</h3>
                </div>
              </div>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                123 Healthcare Avenue,<br />
                Gulshan-2, Dhaka 1212<br />
                Bangladesh
              </p>
            </div>

            {/* Hours */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-900 rounded-2xl flex items-center justify-center">
                  <Clock className="w-7 h-7 text-emerald-600" />
                </div>
                <h3 className="font-semibold text-xl">Opening Hours</h3>
              </div>
              <div className="space-y-3 text-slate-600 dark:text-slate-400">
                <div className="flex justify-between">
                  <span>Saturday - Thursday</span>
                  <span className="font-medium">8:00 AM - 8:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Friday</span>
                  <span className="font-medium">9:00 AM - 5:00 PM</span>
                </div>
                <div className="pt-3 border-t border-slate-200 dark:border-slate-700 text-emerald-600 font-medium">
                  24/7 Emergency Services
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}