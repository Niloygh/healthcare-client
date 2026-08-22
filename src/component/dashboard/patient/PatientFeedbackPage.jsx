"use client";

import { useState } from "react";
import { Edit, Trash2, Star, X, Plus, User } from "lucide-react";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import { deleteReview, review } from "@/lib/action/revidew";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function PractitionerFeedback({ addAllDoctors, user, allReviews }) {
  const router = useRouter();



  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedDoctorId, setSelectedDoctorId] = useState(addAllDoctors[0]?._id || "");
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isCanceling, setIsCanceling] = useState(false);

  const selectedDoctor = addAllDoctors.find((doc) => doc._id === selectedDoctorId);
  console.log(selectedDoctor)

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!comment || !selectedDoctor) return;

    const newReview = {
      clientId: user?.id,
      clientName: user?.name,
      doctorId: selectedDoctor?.doctorId,
      doctorName: `${selectedDoctor?.name}`,
      specialty: selectedDoctor?.specialty,
      rating: rating,
      comment: comment,
      publishedDate: new Date().toLocaleDateString("en-US"),
      image: selectedDoctor?.image,
    };

    // console.log(newReview);

    const reviewData = await review(newReview)

    router.refresh();

    // setComment("");
    // setRating(5);
    setIsOpenModal(false);
  };



  const handleDelete = async (id) => {
    console.log(id)


    if (confirm("Are you sure you want to delete this review?")) {
      setIsCanceling(true);

      const DeleteR = await deleteReview(id)
      if (DeleteR) {
        router.refresh();
      }

      setIsCanceling(false);
    }
  };

  const handleEdit =  async (id) => {
    setIsCanceling(true);

    

    setIsCanceling(false);
  }
  

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-100/50 p-6 rounded-2xl border border-emerald-100/80">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-emerald-950 tracking-tight">
            Practitioner Feedback & Reviews
          </h1>
          <p className="text-sm text-emerald-700/80 mt-1">
            Read patient experiences or leave a review for your doctor.
          </p>
        </div>
        <button
          onClick={() => setIsOpenModal(true)}
          className="bg-[#215a45] hover:bg-[#184333] text-white font-medium px-5 py-2.5 rounded-xl transition-all duration-200 shadow-md hover:shadow-emerald-900/10 flex items-center gap-2 text-sm shrink-0"
        >
          <Plus className="w-4 h-4" />
          Write New Review
        </button>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {allReviews.map((review) => (
          <div
            key={review._id}
            className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between relative group overflow-hidden"
          >
            {/* Top Accent Line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#215a45] opacity-0 group-hover:opacity-100 transition-opacity" />

            <div>
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0 relative">
                    {review.image ? (
                      <Image
                        src={review.image}
                        alt={review.doctorName}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <User className="w-6 h-6 text-emerald-700" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">
                      {review.doctorName}
                    </h3>
                    <span className="inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-[#215a45] border border-emerald-100">
                      {review.specialty}
                    </span>
                  </div>
                </div>

                {/* Rating Stars */}
                <div className="flex items-center gap-0.5 bg-amber-50 px-2 py-1 rounded-lg border border-amber-100">
                  {[...Array(5)].map((_, index) => (
                    <Star
                      key={index}
                      className={`w-3.5 h-3.5 ${index < review.rating
                        ? "text-amber-500 fill-amber-500"
                        : "text-slate-200"
                        }`}
                    />
                  ))}
                </div>
              </div>

              {/* Review Body */}
              <p className="text-slate-600 text-sm leading-relaxed italic mb-6">
                &ldquo;{review.comment}&rdquo;
              </p>
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center border-t border-slate-100 pt-4 mt-auto text-xs text-slate-400">
              <span>Published: {review.publishedDate}</span>
              <div className="flex items-center gap-1">
                <button
                onClick={() => handleEdit(review._id)}
                  className="p-2 text-slate-500 hover:text-[#215a45] hover:bg-emerald-50 rounded-lg transition-colors"
                  title="Edit"
                >
                  <Edit className="w-4 h-4" />
                </button>

                <button
                  onClick={() => handleDelete(review._id)}
                  className="p-2 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            


            
          </div>
        ))}
      </div>

      {/* Modal */}
      {isOpenModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex justify-center items-center p-4 z-50">
          <div className="bg-white rounded-3xl p-6 sm:p-8 w-full max-w-lg shadow-2xl relative border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setIsOpenModal(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 bg-slate-100 p-1.5 rounded-full transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <h2 className="text-xl font-bold text-slate-900 mb-1">
              Write a Review
            </h2>
            <p className="text-sm text-slate-500 mb-6">
              Select a doctor and share your feedback.
            </p>

            <form onSubmit={handleSubmitReview} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                  Select Doctor
                </label>
                <select
                  value={selectedDoctorId}
                  onChange={(e) => setSelectedDoctorId(e.target.value)}
                  className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#215a45] focus:border-transparent outline-none text-sm font-medium text-slate-800 bg-slate-50/50"
                >
                  {addAllDoctors.map((doc) => (
                    <option key={doc._id} value={doc._id}>
                      Dr. {doc.name} ({doc.specialty})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                  Rating
                </label>
                <div className="flex items-center gap-1.5 bg-slate-50 p-2.5 rounded-xl border border-slate-100 w-fit">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="p-1 focus:outline-none transition-transform hover:scale-110"
                    >
                      <Star
                        className={`w-6 h-6 ${star <= (hoverRating || rating)
                          ? "text-amber-400 fill-amber-400"
                          : "text-slate-200"
                          }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                  Your Experience
                </label>
                <textarea
                  rows={4}
                  required
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder={`Write your detailed feedback for Dr. ${selectedDoctor?.name || 'the doctor'}...`}
                  className="w-full p-3.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#215a45] focus:border-transparent outline-none text-sm text-slate-800 bg-slate-50/50"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsOpenModal(false)}
                  className="px-5 py-2.5 border border-slate-200 text-slate-600 rounded-xl text-sm font-medium hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#215a45] hover:bg-[#184333] text-white rounded-xl text-sm font-medium transition-all shadow-md shadow-emerald-900/10"
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}