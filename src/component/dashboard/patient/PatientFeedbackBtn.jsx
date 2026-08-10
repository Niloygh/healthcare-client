
import { deleteReview, editReview } from '@/lib/action/revidew';
import { Edit, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

const PatientFeedbackBtn = ({review}) => {
    const router = useRouter();

    const handleDelete = async (id) => {
        if (confirm("Are you sure you want to delete this review?")) {
    
          const DeleteR = await deleteReview(id)
          if (DeleteR) {
            router.refresh();
          }
        }
      };
    
      const handleEdit =  async (id) => {
        
        
        
        const updateReview = await editReview(id, {
            rating,
            comment,
            publishedDate: new Date().toLocaleDateString("en-US")
        })

        if (updateReview) {
            setIsOpenModal(false);
            router.refresh();
        } else {
            alert("Failed to reschedule. Please try again.");
        }
    
        
      }
    
    
    
    return (
        <div className="flex justify-between items-center border-t border-slate-100 pt-4 mt-auto text-xs text-slate-400">
            <span>Published: {review.publishedDate}</span>
            <div className="flex items-center gap-1">
                <button
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
    );
};

export default PatientFeedbackBtn;