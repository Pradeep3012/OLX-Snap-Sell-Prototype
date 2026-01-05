import React, { useState } from 'react';
import { AppStage, ListingData } from './types';
import { SAMPLE_DATA } from './constants';
import Stage0_Home from './components/Stage0_Home';
import Stage1_Camera from './components/Stage1_Camera';
import Stage2_Scanning from './components/Stage2_Scanning';
import Stage3_Preview from './components/Stage3_Preview';
import Stage4_Success from './components/Stage4_Success';

export default function App() {
  const [stage, setStage] = useState<AppStage>(AppStage.HOME);
  const [listingData, setListingData] = useState<ListingData>(SAMPLE_DATA);
  const [capturedImages, setCapturedImages] = useState<string[]>([]);

  // Handlers for state transitions
  const startSelling = () => setStage(AppStage.CAMERA);
  
  const finishCapture = (images: string[]) => {
    setCapturedImages(images);
    setStage(AppStage.SCANNING);
  };

  const finishScanning = () => {
    setStage(AppStage.PREVIEW);
  };

  const updateListingData = (newData: Partial<ListingData>) => {
    setListingData(prev => ({ ...prev, ...newData }));
  };

  const postAd = () => {
    setStage(AppStage.SUCCESS);
  };

  const resetFlow = () => {
    setStage(AppStage.HOME);
    setCapturedImages([]);
    setListingData(SAMPLE_DATA);
  };

  const addMorePhotos = () => {
     // Return to camera but keep data
     setStage(AppStage.CAMERA);
  };

  // Render the appropriate stage
  const renderStage = () => {
    switch (stage) {
      case AppStage.HOME:
        return <Stage0_Home onSellClick={startSelling} />;
      case AppStage.CAMERA:
        return (
          <Stage1_Camera 
            onComplete={finishCapture} 
            existingImages={capturedImages}
          />
        );
      case AppStage.SCANNING:
        return (
          <Stage2_Scanning 
            images={capturedImages} 
            onComplete={finishScanning} 
          />
        );
      case AppStage.PREVIEW:
        return (
          <Stage3_Preview 
            data={listingData} 
            onUpdate={updateListingData} 
            onPost={postAd}
            onAddPhotos={addMorePhotos}
          />
        );
      case AppStage.SUCCESS:
        return <Stage4_Success onHome={resetFlow} />;
      default:
        return <div className="p-4">Unknown Stage</div>;
    }
  };

  return (
    <div className="h-screen bg-gray-100 flex justify-center items-start overflow-hidden">
      <div className="w-full max-w-md h-full bg-white shadow-xl relative overflow-hidden">
        {renderStage()}
      </div>
    </div>
  );
}