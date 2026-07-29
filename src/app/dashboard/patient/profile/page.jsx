import React from "react";
import Image from "next/image";
import { Card, Button, Chip } from "@heroui/react";
import { 
  User, 
  Mail, 
  ShieldAlert, 
  ShieldCheck, 
  Calendar, 
  Clock, 
  UserCheck, 
  Edit3 
} from "lucide-react";

export default function ProfilePage() {
  // আপনার দেয়া ডাটা
  const userData = {
    name: "patient",
    email: "patient@gamil.com",
    emailVerified: false,
    image: "https://i.ibb.co/yB7g491S/download.jpg",
    createdAt: "2026-07-29T14:41:12.220+00:00",
    updatedAt: "2026-07-29T14:41:12.220+00:00",
    role: "patient",
  };

  // ডেট ফরম্যাট করার জন্য হেল্পার ফাংশন
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
          Profile Details
        </h1>
        {/* <Button 
          variant="light" 
          startContent={<Edit3 className="w-4 h-4" />}
          className="font-semibold text-slate-700 hover:text-slate-900 dark:text-slate-300"
        >
          Edit Profile
        </Button> */}
      </div>

      {/* Main Card without CardBody */}
      <Card className="border border-slate-200/80 shadow-sm rounded-2xl bg-white dark:bg-slate-900 p-6 md:p-8">
        
        {/* Top Avatar Profile Bar */}
        <div className="flex items-center gap-5 pb-6 mb-6 border-b border-slate-100 dark:border-slate-800">
          <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-slate-200 shadow-sm">
            <Image
              src={userData.image}
              alt={userData.name}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
          <div>
            <h2 className="text-xl font-bold capitalize text-slate-800 dark:text-slate-100">
              {userData.name}
            </h2>
            <Chip 
              size="sm" 
              variant="flat" 
              color="default" 
              className="mt-1 capitalize text-xs font-semibold text-slate-600 bg-slate-100 dark:bg-slate-800 dark:text-slate-300"
            >
              {userData.role}
            </Chip>
          </div>
        </div>

        {/* Form / Field Layout (Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Name Field */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              FULL NAME
            </label>
            <div className="flex items-center gap-3 px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl">
              <User className="w-4 h-4 text-slate-400" />
              <span className="text-slate-700 dark:text-slate-200 capitalize font-medium">
                {userData.name}
              </span>
            </div>
          </div>

          {/* Role Field */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              ROLE
            </label>
            <div className="flex items-center gap-3 px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl">
              <UserCheck className="w-4 h-4 text-slate-400" />
              <span className="text-slate-700 dark:text-slate-200 capitalize font-medium">
                {userData.role}
              </span>
            </div>
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              EMAIL ADDRESS
            </label>
            <div className="flex items-center justify-between px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-slate-400" />
                <span className="text-slate-700 dark:text-slate-200 font-medium">
                  {userData.email}
                </span>
              </div>
              {userData.emailVerified ? (
                <Chip size="sm" color="success" variant="flat" startContent={<ShieldCheck className="w-3.5 h-3.5" />}>
                  Verified
                </Chip>
              ) : (
                <Chip size="sm" color="warning" variant="flat" startContent={<ShieldAlert className="w-3.5 h-3.5" />}>
                  Unverified
                </Chip>
              )}
            </div>
          </div>

          {/* Account Created Field */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              ACCOUNT CREATED
            </label>
            <div className="flex items-center gap-3 px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span className="text-slate-700 dark:text-slate-200 font-medium">
                {formatDate(userData.createdAt)}
              </span>
            </div>
          </div>

          {/* Last Updated Field (Full Width) */}
          <div className="md:col-span-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              LAST PROFILE UPDATE
            </label>
            <div className="flex items-center gap-3 px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl">
              <Clock className="w-4 h-4 text-slate-400" />
              <span className="text-slate-700 dark:text-slate-200 font-medium">
                {formatDate(userData.updatedAt)}
              </span>
            </div>
          </div>

        </div>
      </Card>
    </div>
  );
}