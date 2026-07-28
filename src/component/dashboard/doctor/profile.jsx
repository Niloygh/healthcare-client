'use client';

import { useState, useRef } from 'react';
import { Button, Modal } from '@heroui/react';
import { Edit3, Save, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { createDoctors } from '@/lib/action/doctors';
import { authClient } from '@/lib/auth-client';

const specialties = [
  'Cardiology',
  'Neurology',
  'Orthopedics',
  'Dermatology',
  'Pediatrics',
  'Oncology',
  'Psychiatry',
];

export default function ProfessionalCredentialsPage( {userData} ) {
    
  const user = authClient.useSession().data?.user;
  // console.log(user.email)

  const [isOpen, setIsOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [data, setData] = useState({
    ...userData
  });


  // Form state
  const [formData, setFormData] = useState({
    specialty: '',
    experience: '',
    qualifications: '',
    fee: '',
    hospital: '',
  });

  const handleOpen = () => {
    setFormData({
      specialty: data?.specialty || specialties[0],
      experience: data?.experience || '',
      qualifications: data?.qualifications || '',
      fee: data?.fee || '',
      hospital: data?.hospital || '',
      email: user?.email || '',
      gender: user?.gender || '',
      id: user?.id || '',
      name: user?.name || '',
      image: user?.image || '',
      role: user?.role || '',
    });

    setIsOpen(true);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);

      const doctorsData =  await createDoctors(formData);

      setData({
        specialty: formData.specialty,
        experience: formData.experience,
        qualifications: formData.qualifications,
        fee: formData.fee,
        hospital: formData.hospital,
      });

      setIsOpen(false);
      toast.success('Credentials saved successfully!');
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong while saving');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-slate-800">
            Professional Credentials
          </h1>

          <Button
            color="primary"
            variant="solid"
            startContent={<Edit3 size={16} />}
            onPress={handleOpen}
            className="font-medium"
          >
            Edit Credentials
          </Button>
        </div>

        {/* ==================== VIEW MODE ==================== */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Clinical Specialties
              </label>
              <div className="h-11 px-3.5 flex items-center rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-800">
                {data.specialty}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Experience (Years)
              </label>
              <div className="h-11 px-3.5 flex items-center rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-800">
                {data.experience}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Qualifications Statement
              </label>
              <div className="h-11 px-3.5 flex items-center rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-800">
                {data.qualifications}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Co-pay Consultation Fee ($)
              </label>
              <div className="h-11 px-3.5 flex items-center rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-800">
                {data.fee}
              </div>
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Attached Medical Hospital Name
              </label>
              <div className="h-11 px-3.5 flex items-center rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-800">
                {data.hospital}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ==================== EDIT MODAL ==================== */}
      <Modal>
        <Modal.Backdrop isOpen={isOpen} onOpenChange={setIsOpen}>
          <Modal.Container size="lg" placement="center" scroll="inside">
            <Modal.Dialog className="bg-white rounded-2xl shadow-xl border border-slate-200">
              <Modal.CloseTrigger />

              <Modal.Header className="px-6 pt-6 pb-2">
                <Modal.Heading className="text-xl font-bold text-slate-800">
                  Professional Credentials Editor
                </Modal.Heading>
              </Modal.Header>

              <Modal.Body className="px-6 py-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Specialty */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                      Clinical Specialties
                    </label>
                    <select
                      name="specialty"
                      value={formData.specialty}
                      onChange={handleChange}
                      className="w-full h-11 px-3.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/25 focus:border-teal-500 transition"
                    >
                      {specialties.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Experience */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                      Experience (Years)
                    </label>
                    <input
                      type="number"
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      className="w-full h-11 px-3.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/25 focus:border-teal-500 transition"
                    />
                  </div>

                  {/* Qualifications */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                      Qualifications Statement
                    </label>
                    <input
                      type="text"
                      name="qualifications"
                      value={formData.qualifications}
                      onChange={handleChange}
                      className="w-full h-11 px-3.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/25 focus:border-teal-500 transition"
                    />
                  </div>

                  {/* Fee */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                      Co-pay Consultation Fee ($)
                    </label>
                    <input
                      type="number"
                      name="fee"
                      value={formData.fee}
                      onChange={handleChange}
                      className="w-full h-11 px-3.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/25 focus:border-teal-500 transition"
                    />
                  </div>

                  {/* Hospital */}
                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                      Attached Medical Hospital Name
                    </label>
                    <input
                      type="text"
                      name="hospital"
                      value={formData.hospital}
                      onChange={handleChange}
                      className="w-full h-11 px-3.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/25 focus:border-teal-500 transition"
                    />
                  </div>
                </div>
              </Modal.Body>

              <Modal.Footer className="px-6 pb-6 pt-2 flex justify-end gap-3">
                <Button
                  variant="light"
                  onPress={() => setIsOpen(false)}
                  isDisabled={isSaving}
                >
                  Cancel
                </Button>

                <Button
                  color="success"
                  startContent={
                    isSaving ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <Save size={16} />
                    )
                  }
                  onPress={handleSave}
                  isDisabled={isSaving}
                  className="font-medium text-white bg-teal-700 hover:bg-teal-800"
                >
                  {isSaving ? 'Saving...' : 'Save Professional Records'}
                </Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </div>
  );
}