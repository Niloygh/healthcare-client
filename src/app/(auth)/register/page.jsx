'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, User, Mail, Lock, Heart, Upload, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {

  const router = useRouter();
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [profileImageUrl, setProfileImageUrl] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    clinicRole: 'Patient Client',
    gender: 'Male',
    profileImage: null,
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // ImgBB Upload Handler
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size exceeds 5MB limit.");
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

      if (!IMGBB_API_KEY) {
        toast.error("API Key not configured!");
        return;
      }

      const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        const imageUrl = data.data.url;
        setProfileImageUrl(imageUrl);
        setPreviewImage(imageUrl);
        setFormData(prev => ({ ...prev, profileImage: imageUrl }));
        toast.success("Image uploaded successfully!");
      } else {
        toast.error("Upload failed. Check API Key.");
        console.error(data);
      }
    } catch (err) {
      console.error(err);
      toast.error("Network error during upload");
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = () => {
    setPreviewImage(null);
    setProfileImageUrl('');
    setFormData(prev => ({ ...prev, profileImage: null }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    const { error } = await authClient.signUp.email({
      ...formData,
    })
    if(error) {
      toast.error(`Registration failed: ${error.message}`);
    }
    
    toast.success("Registration successful!");
    router.push('/dashboard');

    // console.log('Register attempt:', { ...formData, profileImageUrl });
  };

  return (
    <div className="min-h-screen flex flex-row-reverse">
      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white dark:bg-slate-950 p-6 lg:p-8">
        <div className="w-full max-w-sm">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-primary rounded-2xl flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="flex justify-center items-center gap-3 text-2xl font-bold text-slate-900 dark:text-white">
                <span className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" />
                </span>
                <span>HealthCare</span>
              </h1>
              <p className="text-xs text-slate-500 ml-11">Healthcare</p>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-1">
              Create Account
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6 text-sm">
              Join HealthCare and manage your health journey
            </p>

            <form onSubmit={handleRegister} className="space-y-5">

              {/* FULL NAME */}
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5 tracking-wider">
                  FULL REPRESENTATIVE NAME
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full pl-11 py-3.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:border-primary transition-colors text-sm"
                    placeholder="Sarah Jenkins"
                    required
                  />
                </div>
              </div>

              {/* EMAIL */}
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5 tracking-wider">
                  EMAIL ADDRESS
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-11 py-3.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:border-primary transition-colors text-sm"
                    placeholder="sarah@example.com"
                    required
                  />
                </div>
              </div>

              {/* PASSWORD */}
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5 tracking-wider">
                  SECURE PASSCODE
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-11 pr-11 py-3.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:border-primary transition-colors text-sm"
                    placeholder="At least 6 chars, 1 number, 1 special sym..."
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

              {/* CONFIRM PASSWORD */}
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5 tracking-wider">
                  CONFIRM PASSCODE
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full pl-11 pr-11 py-3.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:border-primary transition-colors text-sm"
                    placeholder="Confirm your passcode"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* ROLE & GENDER */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5 tracking-wider">
                    CLINIC ROLE
                  </label>
                  <select
                    name="clinicRole"
                    value={formData.clinicRole}
                    onChange={handleChange}
                    className="w-full py-3.5 px-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:border-primary text-sm"
                  >
                    <option value="Patient Client">Patient Client</option>
                    <option value="Medical Specialist">Medical Specialist</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5 tracking-wider">
                    GENDER
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full py-3.5 px-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:border-primary text-sm"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {/* PROFILE PICTURE */}
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5 tracking-wider">
                  PROFILE PICTURE
                </label>
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 flex items-center justify-center overflow-hidden relative bg-slate-50">
                    {previewImage ? (
                      <>
                        <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                        <button type="button" onClick={removeImage} className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full hover:bg-red-600">
                          <X size={14} />
                        </button>
                      </>
                    ) : (
                      <Upload className="w-6 h-6 text-slate-400" />
                    )}
                  </div>

                  <label className="cursor-pointer">
                    <div className="border border-slate-300 dark:border-slate-700 hover:border-primary px-5 py-3 rounded-2xl text-sm font-medium transition-colors">
                      {isUploading ? 'Uploading...' : 'Upload Photo'}
                    </div>
                    <input
                      type="file"
                      accept="image/png, image/jpeg"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                </div>
                <p className="text-xs text-slate-500 mt-1.5">JPG, PNG (Max 5MB)</p>
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-2xl font-semibold text-base transition-all mt-2"
              >
                Generate Private Identity
              </motion.button>

            </form>

            <p className="text-center mt-6 text-slate-600 dark:text-slate-400 text-sm">
              Already have an account?{' '}
              <a href="/login" className="text-primary hover:underline font-medium">
                Sign in
              </a>
            </p>
          </motion.div>
        </div>
      </div>

      {/* Left Side - Illustration */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(at_center,#ffffff15_1px,transparent_1px)] [background-size:30px_30px]"></div>

        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="text-center relative z-10 px-6"
        >
          <div className="text-white mb-6">
            <div className="text-5xl mb-4">🩺</div>
            <h3 className="text-2xl font-semibold mb-2">Join HealthCare Today</h3>
            <p className="text-base text-white/80 max-w-xs mx-auto">
              Book appointments, track your health, and connect with top doctors
            </p>
          </div>

          <div className="flex justify-center gap-6 text-4xl">
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 2.5 }}>❤️</motion.div>
            <motion.div animate={{ y: [0, 15, 0] }} transition={{ repeat: Infinity, duration: 3, delay: 0.5 }}>💊</motion.div>
            <motion.div animate={{ y: [0, -12, 0] }} transition={{ repeat: Infinity, duration: 2.8, delay: 1 }}>🧬</motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}