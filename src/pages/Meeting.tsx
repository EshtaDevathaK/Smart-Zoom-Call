
import React from 'react';
import Navbar from '@/components/Navbar';
import AIAlert from '@/components/AIAlert';
import { MeetingProvider, useMeetingContext } from '@/contexts/MeetingContext';
import MediaHandler from '@/components/meeting/MediaHandler';
import AIDetection from '@/components/meeting/AIDetection';
import DurationTracker from '@/components/meeting/DurationTracker';
import MeetingLayout from '@/components/meeting/MeetingLayout';

// This component uses the context values
const MeetingContent = () => {
  const { localStream, showAlert, alertMessage, alertType, setShowAlert } = useMeetingContext();
  
  // Clean up media stream on unmount
  React.useEffect(() => {
    return () => {
      if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [localStream]);

  return (
    <>
      <MediaHandler />
      <AIDetection />
      <DurationTracker />
      <MeetingLayout />
      
      {/* AI Alert popup */}
      <AIAlert 
        message={alertMessage}
        isVisible={showAlert}
        onClose={() => setShowAlert(false)}
        type={alertType}
      />
    </>
  );
};

// Main Meeting page component
const Meeting = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <MeetingProvider>
        <MeetingContent />
      </MeetingProvider>
    </div>
  );
};

export default Meeting;
