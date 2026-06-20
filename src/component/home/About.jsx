"use client";

import React from "react";
import { Button, Card, Chip } from "@heroui/react";
import { motion } from "framer-motion";
import { PersonPlus, Heading as MedicineIcon, ArrowRight, Check } from "@gravity-ui/icons";

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.96 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: "easeOut" } }
  };

  const features = [
    "Comprehensive Inpatient Service",
    "Management consultation",
    "Specialised Support Service",
    "Instant Operation & Appointment"
  ];

  return (
    <section className="relative w-full py-16 px-4 max-w-7xl mx-auto overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* --- LEFT SIDE: IMAGE GRID --- */}
        <motion.div 
          className="lg:col-span-6 relative w-full min-h-[420px] sm:min-h-[520px] md:min-h-[580px]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={imageVariants}
        >
          {/* Top Left Image */}
          <div className="absolute top-0 left-0 w-[55%] aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border-4 border-white z-10">
            <img 
              src="https://plus.unsplash.com/premium_photo-1681966907271-1e350ec3bb95" 
              alt="Doctor explaining diagnosis" 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Top Right Image */}
          <div className="absolute top-12 right-0 w-[40%] aspect-[3/4] rounded-2xl overflow-hidden shadow-md border-4 border-white z-0">
            <img 
              src="https://images.unsplash.com/photo-1673865641073-4479f93a7776" 
              alt="Female doctor smiling" 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Main Bottom Image */}
          <div className="absolute bottom-0 left-[5%] w-[75%] aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border-4 border-white z-20">
            <img 
              src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=600" 
              alt="Patient checkup" 
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

        {/* --- RIGHT SIDE: CONTENT & FEATURES --- */}
        <motion.div 
          className="lg:col-span-6 flex flex-col justify-center space-y-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <Chip 
              variant="secondary" 
              size="sm"
              className="bg-teal-50 text-teal-600 font-bold tracking-wider uppercase px-3 py-1 mb-2 border-none"
            >
              About Us
            </Chip>
          </motion.div>

          <motion.h2 
            className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight"
            variants={itemVariants}
          >
            Heart & Science of Medical <br /> Test for Your Treatment
          </motion.h2>

          <motion.p 
            className="text-base text-slate-500 leading-relaxed max-w-xl"
            variants={itemVariants}
          >
            Your health deserves more than just temporary attention—it deserves precise, lasting results. 
            That is why we offer end-to-end medical and clinical services designed to support your wellness journey, 
            build complete patient trust, and help you live with ultimate confidence.
          </motion.p>

          {/* --- HEROUI V3 COMPUND CARDS (No CardBody) --- */}
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2"
            variants={itemVariants}
          >
            <Card className="border border-slate-100 bg-slate-50/50 shadow-none rounded-xl">
              <Card.Header className="flex flex-row items-center gap-4 py-3 px-4">
                <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                  <PersonPlus className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <Card.Title className="font-semibold text-sm text-slate-800 leading-tight">Medical And</Card.Title>
                  <Card.Description className="text-xs text-slate-500">Expertise Services</Card.Description>
                </div>
              </Card.Header>
            </Card>

            <Card className="border border-slate-100 bg-slate-50/50 shadow-none rounded-xl">
              <Card.Header className="flex flex-row items-center gap-4 py-3 px-4">
                <div className="p-2.5 bg-red-50 text-red-500 rounded-xl flex items-center justify-center">
                  <MedicineIcon className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <Card.Title className="font-semibold text-sm text-slate-800 leading-tight">Medicine and Our</Card.Title>
                  <Card.Description className="text-xs text-slate-500">Instruments</Card.Description>
                </div>
              </Card.Header>
            </Card>
          </motion.div>

          {/* Checkbox Checklist Grid */}
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-4 pt-2"
            variants={itemVariants}
          >
            {features.map((feature, idx) => (
              <div key={idx} className="flex items-center space-x-2.5">
                <div className="flex-shrink-0 text-blue-500 bg-blue-50 p-1 rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium text-slate-700">{feature}</span>
              </div>
            ))}
          </motion.div>

          {/* Action Button */}
          <motion.div variants={itemVariants} className="pt-4">
            <Button 
              variant="primary" 
              size="lg" 
              className="font-medium px-6 py-6 bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 rounded-full shadow-lg shadow-blue-200"
            >
              <span>More About Us</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}