import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Share2, Eye, ExternalLink } from 'lucide-react';
import { SAMPLE_DATA } from '../constants';

interface Props {
  onHome: () => void;
}

const Stage4_Success: React.FC<Props> = ({ onHome }) => {
  return (
    <div className="h-full bg-white flex flex-col items-center justify-center p-8 text-center relative overflow-hidden">
      
      {/* Confetti / Celebration graphic could go here */}
      <motion.div 
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6"
      >
        <CheckCircle size={48} className="text-green-600" />
      </motion.div>

      <h1 className="text-2xl font-bold text-olx-dark mb-2">Your ad is live!</h1>
      <p className="text-gray-500 text-sm mb-8">Great job. We expect your first inquiry within <span className="font-bold text-gray-800">12 minutes</span> based on demand.</p>

      {/* Ad Summary Card */}
      <div className="w-full bg-white border border-gray-200 rounded-lg shadow-sm p-4 mb-8 flex gap-4 text-left">
        <img src={SAMPLE_DATA.images[0].url} className="w-20 h-20 rounded object-cover bg-gray-100" alt="Listing" />
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-sm text-gray-800 truncate">{SAMPLE_DATA.title}</h3>
          <p className="text-lg font-bold text-olx-dark mt-1">₹ {SAMPLE_DATA.pricing.default.toLocaleString()}</p>
          <div className="flex items-center gap-1 mt-2 text-xs text-green-600">
             <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
             <span>Active now</span>
          </div>
        </div>
      </div>

      <div className="w-full space-y-3">
        <button className="w-full flex items-center justify-center gap-2 bg-olx-cyan/10 text-olx-cyan font-bold py-3 rounded hover:bg-olx-cyan/20 transition-colors">
          <Share2 size={20} />
          <span>Share Ad</span>
        </button>
        
        <button className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 font-bold py-3 rounded hover:bg-gray-50 transition-colors">
          <Eye size={20} />
          <span>View Ad</span>
        </button>
      </div>

      <button 
        onClick={onHome}
        className="mt-8 text-gray-400 text-sm font-medium hover:text-gray-600"
      >
        Back to Home
      </button>

    </div>
  );
};

export default Stage4_Success;