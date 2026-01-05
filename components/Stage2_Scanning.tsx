import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Props {
  images: string[];
  onComplete: () => void;
}

const Stage2_Scanning: React.FC<Props> = ({ images, onComplete }) => {
  const [scanState, setScanState] = useState(0); // 0: Start, 1: Identify, 2: Condition, 3: Pricing
  
  const steps = [
    "Identifying item...",
    "Checking condition...",
    "Finding best price range..."
  ];

  useEffect(() => {
    // Stage timing logic:
    // Total scanning animation is 1.2s
    // Then staged reveal over 0.8s (total ~2s before moving to next screen)
    
    const scanTimer = setTimeout(() => setScanState(1), 400);
    const condTimer = setTimeout(() => setScanState(2), 800);
    const priceTimer = setTimeout(() => setScanState(3), 1200);
    
    const doneTimer = setTimeout(() => {
      onComplete();
    }, 2000);

    return () => {
      clearTimeout(scanTimer);
      clearTimeout(condTimer);
      clearTimeout(priceTimer);
      clearTimeout(doneTimer);
    };
  }, [onComplete]);

  return (
    <div className="h-full bg-olx-dark text-white flex flex-col items-center justify-center relative overflow-hidden">
      
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-10"></div>

      {/* Thumbnail Grid */}
      <div className="relative z-0 grid grid-cols-2 gap-2 w-full max-w-xs p-4 rotate-3 opacity-60 scale-105">
        {images.map((src, idx) => (
          <div key={idx} className={`relative rounded-lg overflow-hidden ${idx === 2 ? 'col-span-2 aspect-video' : 'aspect-square'}`}>
             <img src={src} alt="" className="w-full h-full object-cover" />
          </div>
        ))}
      </div>

      {/* Scanning Laser Effect */}
      <motion.div 
        className="absolute top-0 left-0 right-0 h-1 bg-green-400 shadow-[0_0_20px_rgba(74,222,128,0.8)] z-20"
        initial={{ top: '0%' }}
        animate={{ top: ['0%', '100%', '0%'] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
      />

      {/* Status Overlay */}
      <div className="absolute bottom-20 left-0 right-0 z-30 flex flex-col items-center gap-4 px-8">
        <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden">
           <motion.div 
             className="h-full bg-olx-green"
             initial={{ width: '0%' }}
             animate={{ width: '100%' }}
             transition={{ duration: 2 }}
           />
        </div>
        
        <div className="flex flex-col items-center gap-2 h-16">
          {steps.map((text, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ 
                opacity: scanState >= idx + 1 ? 1 : 0.3,
                y: scanState >= idx + 1 ? 0 : 10,
                scale: scanState === idx + 1 ? 1.05 : 1
              }}
              className={`font-medium text-lg ${scanState === idx + 1 ? 'text-olx-green' : 'text-gray-400'}`}
            >
              {scanState >= idx + 1 ? text : "..."}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stage2_Scanning;