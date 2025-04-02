
import React from 'react';
import MainVideoFeed from './MainVideoFeed';
import SidePanel from './SidePanel';
import ControlBar from '@/components/ControlBar';
import { useMeetingContext } from '@/contexts/MeetingContext';
import { useNavigate } from 'react-router-dom';
import { Clock } from 'lucide-react';

// Helper function to format duration
const formatTime = (seconds: number) => {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  
  const formattedHrs = hrs.toString().padStart(2, '0');
  const formattedMins = mins.toString().padStart(2, '0');
  const formattedSecs = secs.toString().padStart(2, '0');
  
  return hrs > 0 
    ? `${formattedHrs}:${formattedMins}:${formattedSecs}`
    : `${formattedMins}:${formattedSecs}`;
};

const MeetingLayout = () => {
  const { 
    micEnabled, 
    videoEnabled, 
    toggleMic, 
    toggleVideo, 
    aiEvents, 
    duration,
    connectionStatus
  } = useMeetingContext();
  const navigate = useNavigate();

  const endCall = () => {
    navigate('/summary', {
      state: {
        duration,
        aiEvents
      }
    });
  };

  return (
    <div className="container mx-auto px-4 pt-24 pb-16">
      {/* Connection status indicator */}
      {connectionStatus !== 'connected' && (
        <div className="mb-4 bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-400 px-4 py-2 rounded-lg text-sm flex items-center justify-center">
          {connectionStatus === 'connecting' ? (
            <>
              <div className="animate-pulse mr-2 h-2 w-2 rounded-full bg-amber-500"></div>
              Connecting to meeting...
            </>
          ) : (
            <>
              Disconnected from meeting
            </>
          )}
        </div>
      )}
      
      {/* Duration counter */}
      <div className="mb-4 flex justify-center">
        <div className="bg-card border border-border rounded-full px-4 py-1.5 flex items-center gap-2 text-sm">
          <Clock className="h-4 w-4" />
          <span>{formatTime(duration)}</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MainVideoFeed />
        <SidePanel />
      </div>
      
      {/* Control bar */}
      <div className="mt-6 fixed bottom-6 left-0 right-0 flex justify-center">
        <ControlBar 
          micEnabled={micEnabled}
          videoEnabled={videoEnabled}
          onToggleMic={toggleMic}
          onToggleVideo={toggleVideo}
          onEndCall={endCall}
        />
      </div>
    </div>
  );
};

export default MeetingLayout;
