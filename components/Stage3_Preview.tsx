import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Edit2, Camera, Share2, Info, ChevronDown, Check } from 'lucide-react';
import { ListingData } from '../types';
import { TITLE_VARIANTS, CATEGORY_HIERARCHY } from '../constants';
import BottomSheet from './BottomSheet';

interface Props {
  data: ListingData;
  onUpdate: (data: Partial<ListingData>) => void;
  onPost: () => void;
  onAddPhotos: () => void;
}

const Stage3_Preview: React.FC<Props> = ({ data, onUpdate, onPost, onAddPhotos }) => {
  // Reveal animation state
  const [revealed, setRevealed] = useState(false);
  
  // Sheet states
  const [isTitleSheetOpen, setTitleSheetOpen] = useState(false);
  const [isCategorySheetOpen, setCategorySheetOpen] = useState(false);

  useEffect(() => {
    // Progressive reveal effect
    const timer = setTimeout(() => setRevealed(true), 200);
    return () => clearTimeout(timer);
  }, []);

  // Handlers
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate({
      pricing: { ...data.pricing, default: Number(e.target.value) }
    });
  };

  const handleTitleSelect = (newTitle: string) => {
    onUpdate({ title: newTitle });
    setTitleSheetOpen(false);
  };

  const handleCategorySelect = (newCat: string) => {
    onUpdate({ category: newCat });
    setCategorySheetOpen(false);
  };

  const toggleAttribute = (key: keyof typeof data.attributes, value: string) => {
    // This is a simplified toggle logic for the prototype
    // In a real app, this would handle arrays vs strings
    if (key === 'visibleDefects') {
       // Toggle logic for array
       const current = data.attributes.visibleDefects;
       const exists = current.includes(value);
       onUpdate({
         attributes: {
           ...data.attributes,
           visibleDefects: exists ? current.filter(i => i !== value) : [...current, value]
         }
       });
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 overflow-y-auto">
      {/* Header */}
      <header className="bg-white p-4 sticky top-0 z-10 flex items-center justify-between border-b border-gray-200">
        <div className="flex items-center gap-3">
          <button className="text-olx-dark"><ArrowLeft size={24} /></button>
          <h1 className="text-lg font-bold text-olx-dark">Review your ad</h1>
        </div>
        <button className="text-olx-dark text-sm font-semibold">Save Draft</button>
      </header>

      {/* Main Content */}
      <motion.div 
        className="p-4 space-y-4 pb-24"
        variants={containerVariants}
        initial="hidden"
        animate={revealed ? "show" : "hidden"}
      >
        
        {/* Images Carousel Section */}
        <motion.div variants={itemVariants} className="relative">
          <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-hide">
            {data.images.map((img, idx) => (
              <div key={idx} className="relative w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden border border-gray-200">
                <img src={img.url} alt={img.label} className="w-full h-full object-cover" />
                <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-[10px] px-2 py-1">
                  {img.label}
                </div>
              </div>
            ))}
            <button 
              onClick={onAddPhotos}
              className="w-32 h-32 flex-shrink-0 rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center bg-gray-50 text-gray-400 hover:bg-gray-100"
            >
              <Camera size={24} className="mb-1" />
              <span className="text-xs font-medium">Add More</span>
            </button>
          </div>
          <div className="flex gap-2 mt-2">
            {data.ui.badges.map(badge => (
              <span key={badge} className="px-2 py-0.5 bg-green-100 text-green-700 text-[10px] uppercase font-bold tracking-wider rounded">
                {badge}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Title Section */}
        <motion.div variants={itemVariants} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 relative group">
          <div className="flex justify-between items-start">
             <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Title</label>
             <button onClick={() => setTitleSheetOpen(true)} className="p-1 text-olx-cyan"><Edit2 size={16} /></button>
          </div>
          <p className="font-medium text-gray-900 pr-6">{data.title}</p>
        </motion.div>

        {/* Category Section */}
        <motion.div variants={itemVariants} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="flex justify-between items-center" onClick={() => setCategorySheetOpen(true)}>
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Category</label>
              <p className="text-gray-900 text-sm">{data.category}</p>
            </div>
            <ChevronDown size={20} className="text-gray-400" />
          </div>
        </motion.div>

        {/* Attributes / Details */}
        <motion.div variants={itemVariants} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 space-y-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold text-gray-800 text-sm">Item Details</h3>
            <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded">AI Detected</span>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
               <label className="text-xs text-gray-500">Condition</label>
               <div className="text-sm font-medium">{data.attributes.condition}</div>
            </div>
            <div>
               <label className="text-xs text-gray-500">Color</label>
               <div className="text-sm font-medium">{data.attributes.color}</div>
            </div>
          </div>
          
          <div>
            <label className="text-xs text-gray-500 block mb-2">Visible Defects</label>
            <div className="flex flex-wrap gap-2">
              {data.attributes.visibleDefects.map(defect => (
                <span key={defect} className="px-3 py-1 bg-red-50 text-red-700 rounded-full text-xs border border-red-100 flex items-center gap-1">
                  {defect} <span className="cursor-pointer" onClick={() => toggleAttribute('visibleDefects', defect)}>×</span>
                </span>
              ))}
              {data.attributes.visibleDefects.length === 0 && <span className="text-sm text-gray-400">None detected</span>}
            </div>
          </div>
        </motion.div>

        {/* Description */}
        <motion.div variants={itemVariants} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
           <div className="flex justify-between items-start mb-2">
             <label className="text-xs font-bold text-gray-500 uppercase">Description</label>
             <button className="text-xs text-olx-cyan font-medium">Generate New</button>
           </div>
           <textarea 
             className="w-full text-sm text-gray-700 min-h-[80px] focus:outline-none resize-none"
             value={data.description}
             onChange={(e) => onUpdate({ description: e.target.value })}
           />
        </motion.div>

        {/* Pricing Section */}
        <motion.div variants={itemVariants} className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-olx-green relative overflow-hidden">
           <div className="flex justify-between items-center mb-4">
             <label className="font-bold text-gray-800 text-lg">Set a price</label>
             <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded text-xs text-gray-600">
               <Info size={12} />
               <span>{data.pricing.provenance.split(' ').slice(0,2).join(' ')}...</span>
             </div>
           </div>
           
           <div className="text-center mb-6">
             <span className="text-3xl font-bold text-olx-dark">₹ {data.pricing.default.toLocaleString()}</span>
           </div>

           <div className="relative pt-6 pb-2">
             <input 
                type="range"
                min={13000} // Lower than suggested fast sell for UX
                max={17000} 
                value={data.pricing.default}
                onChange={handlePriceChange}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
             />
             <div className="flex justify-between mt-2 text-xs text-gray-500 font-medium">
               <span>Fast Sell: ₹{data.pricing.fastSell.toLocaleString()}</span>
               <span>Max: ₹{data.pricing.maxValue.toLocaleString()}</span>
             </div>
           </div>
        </motion.div>
      </motion.div>

      {/* Footer Actions */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-gray-200 p-4 flex flex-col gap-3 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
        <button 
          onClick={onPost}
          className="w-full bg-olx-dark text-white font-bold py-3.5 rounded hover:bg-black transition-colors text-lg"
        >
          Post Now
        </button>
        <div className="flex justify-center">
            <button className="text-gray-500 text-sm font-medium">Edit Fields Manually</button>
        </div>
      </div>

      {/* Bottom Sheets */}
      <BottomSheet 
        isOpen={isTitleSheetOpen} 
        onClose={() => setTitleSheetOpen(false)} 
        title="Select Optimized Title"
      >
        <div className="space-y-3">
          {TITLE_VARIANTS.map((t, i) => (
            <button 
              key={i} 
              className={`w-full text-left p-3 rounded-lg border ${data.title === t ? 'border-olx-green bg-green-50' : 'border-gray-200'}`}
              onClick={() => handleTitleSelect(t)}
            >
              <div className="flex items-start gap-3">
                <div className={`mt-1 w-4 h-4 rounded-full border flex items-center justify-center ${data.title === t ? 'border-olx-green' : 'border-gray-300'}`}>
                   {data.title === t && <div className="w-2 h-2 rounded-full bg-olx-green" />}
                </div>
                <span className="text-sm text-gray-800">{t}</span>
              </div>
            </button>
          ))}
        </div>
      </BottomSheet>

      <BottomSheet
        isOpen={isCategorySheetOpen}
        onClose={() => setCategorySheetOpen(false)}
        title="Confirm Category"
      >
        <div className="space-y-2">
          {CATEGORY_HIERARCHY.map((c, i) => (
             <button
               key={i}
               onClick={() => handleCategorySelect(c)}
               className={`w-full text-left p-3 border-b border-gray-100 text-sm ${data.category === c ? 'font-bold text-olx-dark' : 'text-gray-600'}`}
             >
               {c}
               {data.category === c && <Check size={16} className="inline ml-2 text-olx-green" />}
             </button>
          ))}
        </div>
      </BottomSheet>
    </div>
  );
};

export default Stage3_Preview;