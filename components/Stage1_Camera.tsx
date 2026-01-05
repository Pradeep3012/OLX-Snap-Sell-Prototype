import React, { useState, useEffect } from 'react';
import { ArrowLeft, Zap, Image as ImageIcon, RotateCcw } from 'lucide-react';
import { SAMPLE_DATA } from '../constants';
import { CaptureStep } from '../types';

interface Props {
  onComplete: (images: string[]) => void;
  existingImages: string[];
}

const STEPS: CaptureStep[] = ['Front', 'Back', 'Box'];
const TOTAL_STEPS = STEPS.length;

const Stage1_Camera: React.FC<Props> = ({ onComplete, existingImages }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [captured, setCaptured] = useState<string[]>(existingImages.length > 0 ? existingImages : []);
  const [flashOn, setFlashOn] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);

  const currentStep = STEPS[currentStepIndex];
  const progress = ((currentStepIndex + 1) / TOTAL_STEPS) * 100;

  useEffect(() => {
    // If we have existing images (edit flow), start from the end or just reset
    if (existingImages.length === 3) {
      setCaptured([]);
      setCurrentStepIndex(0);
    }
  }, []);

  const handleCapture = () => {
    setIsCapturing(true);
    
    // Simulate capture delay
    setTimeout(() => {
      // Deterministically pick the image URL from sample data based on index
      const newImage = SAMPLE_DATA.images[currentStepIndex].url;
      const newCaptured = [...captured, newImage];
      setCaptured(newCaptured);
      
      setIsCapturing(false);

      if (currentStepIndex < TOTAL_STEPS - 1) {
        setCurrentStepIndex(prev => prev + 1);
      } else {
        // All done
        onComplete(newCaptured);
      }
    }, 400); // 400ms shutter lag simulation
  };

  const handleRetake = () => {
    const newCaptured = [...captured];
    newCaptured.pop();
    setCaptured(newCaptured);
    setCurrentStepIndex(Math.max(0, currentStepIndex - 1));
  };

  return (
    <div className="relative h-full bg-black text-white flex flex-col">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 p-4 pt-8 flex justify-between items-center z-20 bg-gradient-to-b from-black/60 to-transparent">
        <button className="p-2 bg-white/10 rounded-full backdrop-blur-md">
           <ArrowLeft size={20} />
        </button>
        <div className="flex flex-col items-center">
          <span className="font-bold text-sm">Show us what you're selling</span>
        </div>
        <button 
          className="p-2 bg-white/10 rounded-full backdrop-blur-md"
          onClick={() => setFlashOn(!flashOn)}
        >
           <Zap size={20} className={flashOn ? "text-yellow-400 fill-yellow-400" : "text-white"} />
        </button>
      </div>

      {/* Main Viewfinder Area */}
      <div className="flex-1 relative overflow-hidden bg-gray-900">
        {/* Mock Viewfinder Stream (Static Image that implies camera) */}
        {/* In a real app this would be a <video> element */}
        <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center"></div>
        
        {/* Flash Effect */}
        {isCapturing && (
          <div className="absolute inset-0 bg-white z-50 animate-pulse duration-75"></div>
        )}

        {/* Guided Overlay */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-64 h-64 border-2 border-dashed border-white/70 rounded-2xl flex flex-col items-center justify-center bg-black/20 backdrop-blur-[1px]">
             <span className="text-2xl font-bold uppercase tracking-widest">{currentStep}</span>
             <span className="text-xs mt-2 opacity-80 bg-black/40 px-3 py-1 rounded-full">Align item here</span>
          </div>
        </div>

        {/* Floating instruction */}
        <div className="absolute bottom-4 left-0 right-0 text-center">
          <p className="text-sm font-medium shadow-sm">Take 2–3 clear photos. We'll do the rest.</p>
        </div>
      </div>

      {/* Controls Footer */}
      <div className="h-48 bg-black flex flex-col items-center justify-between py-6 px-8 relative z-20">
        
        {/* Progress Indicators */}
        <div className="flex gap-2 mb-2">
          {STEPS.map((step, idx) => (
             <div 
               key={step} 
               className={`h-1.5 rounded-full transition-all duration-300 ${
                 idx <= currentStepIndex ? 'w-8 bg-olx-green' : 'w-2 bg-gray-600'
               }`} 
             />
          ))}
        </div>
        <div className="text-xs text-gray-400 mb-4">{currentStepIndex + 1} of 3</div>

        <div className="flex items-center justify-between w-full">
          {/* Gallery Import */}
          <button className="flex flex-col items-center gap-1 opacity-70 hover:opacity-100">
            <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center border border-gray-600">
               <ImageIcon size={20} />
            </div>
            <span className="text-[10px]">Gallery</span>
          </button>

          {/* Shutter Button */}
          <button 
            className="w-16 h-16 rounded-full border-4 border-white flex items-center justify-center hover:scale-105 active:scale-95 transition-all"
            onClick={handleCapture}
          >
            <div className="w-12 h-12 bg-white rounded-full"></div>
          </button>

          {/* Retake */}
          {currentStepIndex > 0 ? (
            <button 
              className="flex flex-col items-center gap-1 opacity-70 hover:opacity-100"
              onClick={handleRetake}
            >
              <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center border border-gray-600">
                 <RotateCcw size={18} />
              </div>
              <span className="text-[10px]">Retake</span>
            </button>
          ) : (
             <div className="w-10"></div> 
          )}
        </div>
      </div>
    </div>
  );
};

export default Stage1_Camera;