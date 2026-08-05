
import { Edit, Trash2 } from 'lucide-react';

const patientFeedbackBtn = () => {
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

export default patientFeedbackBtn;